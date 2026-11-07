import type { QuestionCategory } from "@prisma/client";
import { prisma } from "@/server/db";
import { dbNow } from "@/server/clock";
import { registerParticipant } from "@/server/services/participants";
import { createSession, joinSession } from "@/server/services/sessions";
import { CATEGORIES } from "@/lib/validation";

export async function resetDb() {
  await prisma.$executeRawUnsafe(`
    TRUNCATE "Answer", "SessionParticipant", "SessionQuestionOption", "SessionQuestion", "QuizSession",
             "ParticipantCredential", "Participant", "QuestionOptionTranslation", "QuestionOption",
             "QuestionTranslation", "Question", "AuditLog", "RateLimitBucket", "PioneerSlugRedirect",
             "PioneerTranslation", "Pioneer", "ExhibitionSettingsTranslation", "ExhibitionSettings", "AdminUser"
    CASCADE`);
}

/** Creates bilingual questions. Option 0 is always the correct one in the bank. */
export async function makeQuestions(n: number, reviewStatus: "REVIEWED" | "UNREVIEWED" = "REVIEWED") {
  for (let i = 0; i < n; i++) {
    const category = CATEGORIES[i % CATEGORIES.length] as QuestionCategory;
    await prisma.question.create({
      data: {
        category,
        reviewStatus,
        dataOrigin: "DEMO",
        translations: {
          create: [
            { locale: "en", prompt: `EN question ${i}`, explanation: `EN explanation ${i}` },
            { locale: "si", prompt: `SI question ${i}`, explanation: `SI explanation ${i}` },
          ],
        },
        options: {
          create: [0, 1, 2, 3].map((position) => ({
            position,
            isCorrect: position === 0,
            translations: {
              create: [
                { locale: "en", text: `Q${i} option ${position}${position === 0 ? " (right)" : ""}` },
                { locale: "si", text: `Q${i} විකල්පය ${position}` },
              ],
            },
          })),
        },
      },
    });
  }
}

export async function makeParticipant(nickname = "Visitor", consent = true) {
  return registerParticipant({ nickname, consentToDisplayNickname: consent, locale: "en" });
}

export async function openSessionWith(participantCount: number, settings: Parameters<typeof createSession>[0] = {}) {
  const session = await createSession({ openImmediately: true, ...settings }, null);
  const participants = [];
  for (let i = 0; i < participantCount; i++) {
    const p = await makeParticipant(`Player ${i + 1}`);
    await joinSession(p.participant.id, session.code);
    participants.push(p);
  }
  return { session, participants };
}

/**
 * Test-only: makes an OPEN session LIVE with hand-made question windows relative
 * to the database clock (offsets in ms). Mirrors what startSession writes.
 */
export async function goLiveWithWindows(sessionId: string, windows: Array<[openOffsetMs: number, closeOffsetMs: number]>) {
  const now = await dbNow(prisma);
  const secondsPerQuestion = 30;
  for (const [i, [o, c]] of windows.entries()) {
    await prisma.sessionQuestion.create({
      data: {
        sessionId,
        position: i,
        category: "SCIENCE",
        difficulty: "MEDIUM",
        promptEn: `Live question ${i}`,
        promptSi: `සජීවී ප්‍රශ්නය ${i}`,
        secondsPerQuestion,
        opensAt: new Date(now.getTime() + o),
        closesAt: new Date(now.getTime() + c),
        options: {
          create: [0, 1, 2, 3].map((position) => ({
            position,
            textEn: `Option ${position}`,
            textSi: `විකල්පය ${position}`,
            isCorrect: position === 0,
          })),
        },
      },
    });
  }
  const last = windows[windows.length - 1];
  await prisma.quizSession.update({
    where: { id: sessionId },
    data: { status: "LIVE", startedAt: now, endsAt: new Date(now.getTime() + last[1]) },
  });
  return prisma.sessionQuestion.findMany({
    where: { sessionId },
    orderBy: { position: "asc" },
    include: { options: { orderBy: { position: "asc" } } },
  });
}

/**
 * Test-only: writes a finished session with exact per-participant outcomes so
 * ranking rules can be checked deterministically.
 * results[i] = list of [correct?, responseMs | null(unanswered)] per question.
 */
export async function finishedSession(
  people: { participantId: string; answers: Array<[boolean, number | null]> }[],
  opts: { finalize?: boolean; questionCount?: number } = {},
) {
  const qCount = opts.questionCount ?? people[0]?.answers.length ?? 1;
  const session = await createSession({ openImmediately: true, questionCount: qCount }, null);
  for (const p of people) {
    await prisma.sessionParticipant.create({ data: { sessionId: session.id, participantId: p.participantId } });
  }
  const questions = await goLiveWithWindows(
    session.id,
    Array.from({ length: qCount }, (_, i) => [-100_000 + i * 1000, -60_000 + i * 1000] as [number, number]),
  );
  for (const p of people) {
    const sp = await prisma.sessionParticipant.findFirstOrThrow({
      where: { sessionId: session.id, participantId: p.participantId },
    });
    for (const [qi, [correct, ms]] of p.answers.entries()) {
      if (ms === null) continue;
      const q = questions[qi];
      await prisma.answer.create({
        data: {
          sessionParticipantId: sp.id,
          sessionQuestionId: q.id,
          selectedOptionId: q.options[correct ? 0 : 1].id,
          receivedAt: new Date(q.opensAt.getTime() + ms),
          responseMs: ms,
        },
      });
    }
  }
  // endsAt is in the past, so the session is COMPLETED on next read.
  await prisma.quizSession.update({ where: { id: session.id }, data: { status: "COMPLETED", completedAt: new Date() } });
  if (opts.finalize !== false) {
    await prisma.quizSession.update({ where: { id: session.id }, data: { status: "FINALIZED", finalizedAt: new Date() } });
  }
  return session;
}
