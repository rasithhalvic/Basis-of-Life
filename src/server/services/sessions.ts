import { randomInt } from "node:crypto";
import { Prisma, type QuestionCategory, type QuizSession, type SessionStatus } from "@prisma/client";
import { prisma, type Db, type Tx } from "../db";
import { dbNow } from "../clock";
import { ApiError, notFound } from "../errors";
import { SESSION_CAPACITY } from "@/lib/validation";

const CODE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";

export function generateSessionCode() {
  let code = "";
  for (let i = 0; i < 6; i++) code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return code;
}

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Statuses in which a session still holds a participant's seat. */
const ACTIVE: SessionStatus[] = ["OPEN", "LIVE"];

// ---------------------------------------------------------------------------
// Lifecycle (admin)
// ---------------------------------------------------------------------------

export interface SessionSettingsInput {
  title?: string | null;
  questionCount?: number;
  secondsPerQuestion?: number;
  breakSeconds?: number;
  countdownSeconds?: number;
  categories?: QuestionCategory[];
}

export async function createSession(input: SessionSettingsInput & { openImmediately?: boolean }, adminId: string | null) {
  const settings = await prisma.exhibitionSettings.findUnique({ where: { id: 1 } });
  // A new session means the grand leaderboard can change again.
  await prisma.exhibitionSettings.updateMany({ where: { id: 1, rankingsDeclaredFinal: true }, data: { rankingsDeclaredFinal: false } });
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      return await prisma.quizSession.create({
        data: {
          code: generateSessionCode(),
          title: input.title ?? null,
          capacity: SESSION_CAPACITY,
          questionCount: input.questionCount ?? settings?.defaultQuestionCount ?? 10,
          secondsPerQuestion: input.secondsPerQuestion ?? settings?.defaultSecondsPerQuestion ?? 30,
          breakSeconds: input.breakSeconds ?? 5,
          countdownSeconds: input.countdownSeconds ?? 10,
          categories: input.categories ?? [],
          createdById: adminId,
          ...(input.openImmediately ? { status: "OPEN" as const, openedAt: new Date() } : {}),
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") continue;
      throw e;
    }
  }
  throw new ApiError(500, "INTERNAL_ERROR", "Could not allocate a unique session code.");
}

async function lockSession(tx: Tx, id: string) {
  const rows = await tx.$queryRaw<{ id: string }[]>`SELECT id FROM "QuizSession" WHERE id = ${id} FOR UPDATE`;
  if (rows.length === 0) throw notFound("Session");
  return tx.quizSession.findUniqueOrThrow({ where: { id } });
}

function transitionError(from: SessionStatus, action: string) {
  return new ApiError(409, "INVALID_TRANSITION", `Cannot ${action} a session that is ${from.toLowerCase()}.`, {
    status: from,
  });
}

export async function updateSessionSettings(id: string, input: SessionSettingsInput) {
  return prisma.$transaction(async (tx) => {
    const s = await lockSession(tx, id);
    if (s.status !== "DRAFT" && s.status !== "OPEN") throw transitionError(s.status, "edit");
    return tx.quizSession.update({ where: { id }, data: { ...input } });
  });
}

export async function openSession(id: string) {
  return prisma.$transaction(async (tx) => {
    const s = await lockSession(tx, id);
    if (s.status !== "DRAFT") throw transitionError(s.status, "open");
    return tx.quizSession.update({ where: { id }, data: { status: "OPEN", openedAt: await dbNow(tx) } });
  });
}

/**
 * Starts a session: closes admission, snapshots reviewed questions and fixes
 * every question window on the server clock. All admitted participants get
 * the same snapshot.
 */
export async function startSession(id: string) {
  return prisma.$transaction(
    async (tx) => {
      const s = await lockSession(tx, id);
      if (s.status !== "OPEN") throw transitionError(s.status, "start");
      const admitted = await tx.sessionParticipant.count({ where: { sessionId: id } });
      if (admitted === 0) {
        throw new ApiError(409, "INVALID_TRANSITION", "At least one participant must be admitted before starting.");
      }

      const picked = await pickQuestions(tx, s.questionCount, s.categories);
      const now = await dbNow(tx);
      const firstOpens = now.getTime() + s.countdownSeconds * 1000;
      const slot = (s.secondsPerQuestion + s.breakSeconds) * 1000;

      let endsAt = new Date(firstOpens);
      for (const [i, q] of picked.entries()) {
        const opensAt = new Date(firstOpens + i * slot);
        const closesAt = new Date(opensAt.getTime() + s.secondsPerQuestion * 1000);
        endsAt = closesAt;
        const en = q.translations.find((t) => t.locale === "en")!;
        const si = q.translations.find((t) => t.locale === "si")!;
        await tx.sessionQuestion.create({
          data: {
            sessionId: id,
            position: i,
            sourceQuestionId: q.id,
            category: q.category,
            difficulty: q.difficulty,
            promptEn: en.prompt,
            promptSi: si.prompt,
            explanationEn: en.explanation,
            explanationSi: si.explanation,
            source: q.source,
            secondsPerQuestion: s.secondsPerQuestion,
            opensAt,
            closesAt,
            options: {
              create: shuffle(q.options).map((o, position) => ({
                position,
                isCorrect: o.isCorrect,
                textEn: o.translations.find((t) => t.locale === "en")!.text,
                textSi: o.translations.find((t) => t.locale === "si")!.text,
              })),
            },
          },
        });
      }
      return tx.quizSession.update({ where: { id }, data: { status: "LIVE", startedAt: now, endsAt } });
    },
    { timeout: 20_000 },
  );
}

/**
 * Chooses reviewed, fully translated questions, spreading them across
 * categories (round-robin over shuffled per-category pools).
 */
async function pickQuestions(tx: Tx, count: number, categories: QuestionCategory[]) {
  const candidates = await tx.question.findMany({
    where: {
      reviewStatus: "REVIEWED",
      ...(categories.length ? { category: { in: categories } } : {}),
    },
    include: { translations: true, options: { include: { translations: true }, orderBy: { position: "asc" } } },
  });
  const complete = candidates.filter(
    (q) =>
      q.translations.some((t) => t.locale === "en") &&
      q.translations.some((t) => t.locale === "si") &&
      q.options.length === 4 &&
      q.options.filter((o) => o.isCorrect).length === 1 &&
      q.options.every((o) => o.translations.some((t) => t.locale === "en") && o.translations.some((t) => t.locale === "si")),
  );
  if (complete.length < count) {
    throw new ApiError(
      409,
      "NOT_ENOUGH_QUESTIONS",
      `Only ${complete.length} reviewed bilingual questions match this session; ${count} are needed.`,
      { available: complete.length, needed: count },
    );
  }
  const pools = new Map<QuestionCategory, typeof complete>();
  for (const q of shuffle(complete)) pools.set(q.category, [...(pools.get(q.category) ?? []), q]);
  const order = shuffle([...pools.keys()]);
  const picked: typeof complete = [];
  while (picked.length < count) {
    for (const c of order) {
      const q = pools.get(c)!.pop();
      if (q && picked.length < count) picked.push(q);
    }
  }
  return shuffle(picked);
}

export async function cancelSession(id: string, reason: string) {
  return prisma.$transaction(async (tx) => {
    const s = await lockSession(tx, id);
    if (s.status === "FINALIZED" || s.status === "CANCELLED") throw transitionError(s.status, "cancel");
    return tx.quizSession.update({
      where: { id },
      data: { status: "CANCELLED", cancelledAt: await dbNow(tx), cancelReason: reason },
    });
  });
}

export async function finalizeSession(id: string) {
  return prisma.$transaction(async (tx) => {
    let s = await lockSession(tx, id);
    s = await syncStatus(tx, s);
    if (s.status !== "COMPLETED") {
      if (s.status === "LIVE") {
        throw new ApiError(409, "INVALID_TRANSITION", "The session is still running. Finalize after the last question closes.");
      }
      throw transitionError(s.status, "finalize");
    }
    return tx.quizSession.update({ where: { id }, data: { status: "FINALIZED", finalizedAt: await dbNow(tx) } });
  });
}

/** Lazily moves a LIVE session to COMPLETED once its last question has closed. */
export async function syncStatus<S extends Pick<QuizSession, "id" | "status" | "endsAt">>(db: Db, s: S): Promise<S> {
  if (s.status !== "LIVE" || !s.endsAt) return s;
  const now = await dbNow(db);
  if (now < s.endsAt) return s;
  await db.quizSession.updateMany({
    where: { id: s.id, status: "LIVE" },
    data: { status: "COMPLETED", completedAt: s.endsAt },
  });
  return { ...s, status: "COMPLETED" };
}

export async function loadSession(id: string) {
  const s = await prisma.quizSession.findUnique({ where: { id } });
  if (!s) throw notFound("Session");
  return syncStatus(prisma, s);
}

// ---------------------------------------------------------------------------
// Admission (visitor)
// ---------------------------------------------------------------------------

export async function listOpenSessions() {
  const sessions = await prisma.quizSession.findMany({
    where: { status: "OPEN" },
    orderBy: { openedAt: "asc" },
    select: {
      id: true,
      code: true,
      title: true,
      capacity: true,
      questionCount: true,
      secondsPerQuestion: true,
      openedAt: true,
      _count: { select: { participants: true } },
    },
  });
  return sessions.map(({ _count, ...s }) => ({
    ...s,
    admittedCount: _count.participants,
    seatsLeft: Math.max(0, s.capacity - _count.participants),
    isFull: _count.participants >= s.capacity,
  }));
}

/**
 * Admits a participant to a session. Safe under concurrency: the participant
 * row and the session row are locked (in that order) so at most `capacity`
 * participants are ever admitted and a participant holds one active seat.
 */
export async function joinSession(participantId: string, code: string) {
  return prisma.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT id FROM "Participant" WHERE id = ${participantId} FOR UPDATE`;
    const rows = await tx.$queryRaw<{ id: string; status: SessionStatus; capacity: number }[]>`
      SELECT id, status, capacity FROM "QuizSession" WHERE code = ${code} FOR UPDATE`;
    const s = rows[0];
    if (!s) throw notFound("Session");

    const existing = await tx.sessionParticipant.findUnique({
      where: { sessionId_participantId: { sessionId: s.id, participantId } },
    });
    if (existing) return { sessionId: s.id, alreadyAdmitted: true };

    if (s.status !== "OPEN") {
      const message =
        s.status === "DRAFT"
          ? "This session is not open for registration yet."
          : s.status === "CANCELLED"
            ? "This session was cancelled."
            : "This session has already started or finished. Late admission is closed.";
      throw new ApiError(409, "SESSION_CLOSED", message, {
        status: s.status,
        alternatives: await openAlternatives(tx, s.id),
      });
    }

    const other = await tx.sessionParticipant.findFirst({
      where: { participantId, session: { status: { in: ACTIVE } } },
      select: { session: { select: { id: true, code: true } } },
    });
    if (other) {
      throw new ApiError(409, "ALREADY_IN_ACTIVE_SESSION", "You are already in another session.", {
        sessionId: other.session.id,
        code: other.session.code,
      });
    }

    const admitted = await tx.sessionParticipant.count({ where: { sessionId: s.id } });
    if (admitted >= s.capacity) {
      throw new ApiError(409, "SESSION_FULL", `This session is full (${s.capacity} participants).`, {
        alternatives: await openAlternatives(tx, s.id),
      });
    }
    await tx.sessionParticipant.create({ data: { sessionId: s.id, participantId } });
    return { sessionId: s.id, alreadyAdmitted: false };
  });
}

async function openAlternatives(db: Db, excludeId: string) {
  const open = await db.quizSession.findMany({
    where: { status: "OPEN", id: { not: excludeId } },
    select: { id: true, code: true, title: true, capacity: true, _count: { select: { participants: true } } },
    orderBy: { openedAt: "asc" },
  });
  return open
    .filter((s) => s._count.participants < s.capacity)
    .map((s) => ({ id: s.id, code: s.code, title: s.title, seatsLeft: s.capacity - s._count.participants }));
}

export async function leaveSession(participantId: string, sessionId: string) {
  return prisma.$transaction(async (tx) => {
    const s = await lockSession(tx, sessionId);
    if (s.status !== "OPEN") {
      throw new ApiError(409, "SESSION_CLOSED", "You can only leave a session before it starts.");
    }
    await tx.sessionParticipant.deleteMany({ where: { sessionId, participantId } });
  });
}

// ---------------------------------------------------------------------------
// Live state (visitor)
// ---------------------------------------------------------------------------

export type Phase = "waiting" | "countdown" | "question" | "break" | "finished" | "cancelled";

/**
 * Authoritative session state for polling clients. Only the question that is
 * currently open is ever included, never upcoming questions, and option
 * payloads never carry correctness flags.
 */
export async function getSessionState(sessionId: string, participantId: string | null) {
  const s = await loadSession(sessionId);
  const now = await dbNow(prisma);
  const admittedCount = await prisma.sessionParticipant.count({ where: { sessionId } });
  const membership = participantId
    ? await prisma.sessionParticipant.findUnique({
        where: { sessionId_participantId: { sessionId, participantId } },
        select: { id: true, disqualifiedAt: true },
      })
    : null;

  const base = {
    serverNow: now.toISOString(),
    session: {
      id: s.id,
      code: s.code,
      title: s.title,
      status: s.status,
      capacity: s.capacity,
      admittedCount,
      questionCount: s.questionCount,
      secondsPerQuestion: s.secondsPerQuestion,
      breakSeconds: s.breakSeconds,
      startedAt: s.startedAt?.toISOString() ?? null,
      endsAt: s.endsAt?.toISOString() ?? null,
    },
    me: membership
      ? { admitted: true, disqualified: membership.disqualifiedAt !== null }
      : { admitted: false, disqualified: false },
  };

  if (s.status === "DRAFT" || s.status === "OPEN") return { ...base, phase: "waiting" as Phase, live: null };
  if (s.status === "CANCELLED") return { ...base, phase: "cancelled" as Phase, live: null };
  if (s.status === "COMPLETED" || s.status === "FINALIZED") return { ...base, phase: "finished" as Phase, live: null };

  // LIVE: find the question window that contains `now`.
  const windows = await prisma.sessionQuestion.findMany({
    where: { sessionId },
    select: { id: true, position: true, opensAt: true, closesAt: true },
    orderBy: { position: "asc" },
  });
  const total = windows.length;
  const current = windows.find((w) => w.opensAt <= now && now < w.closesAt);
  const next = windows.find((w) => w.opensAt > now);

  if (!current) {
    const phase: Phase = windows[0] && now < windows[0].opensAt ? "countdown" : "break";
    const done = windows.filter((w) => w.closesAt <= now).length;
    return {
      ...base,
      phase,
      live: { total, completed: done, nextOpensAt: next?.opensAt.toISOString() ?? null, question: null },
    };
  }

  let question = null;
  if (membership) {
    const q = await prisma.sessionQuestion.findUniqueOrThrow({
      where: { id: current.id },
      select: {
        id: true,
        position: true,
        category: true,
        promptEn: true,
        promptSi: true,
        opensAt: true,
        closesAt: true,
        // Deliberately excludes isCorrect.
        options: { select: { id: true, position: true, textEn: true, textSi: true }, orderBy: { position: "asc" } },
      },
    });
    const mine = await prisma.answer.findUnique({
      where: { sessionParticipantId_sessionQuestionId: { sessionParticipantId: membership.id, sessionQuestionId: q.id } },
      select: { selectedOptionId: true, receivedAt: true },
    });
    question = {
      id: q.id,
      number: q.position + 1,
      category: q.category,
      prompt: { en: q.promptEn, si: q.promptSi },
      options: q.options.map((o) => ({ id: o.id, text: { en: o.textEn, si: o.textSi } })),
      opensAt: q.opensAt.toISOString(),
      closesAt: q.closesAt.toISOString(),
      myAnswer: mine ? { optionId: mine.selectedOptionId, receivedAt: mine.receivedAt.toISOString() } : null,
    };
  }

  return {
    ...base,
    phase: "question" as Phase,
    live: {
      total,
      completed: current.position,
      number: current.position + 1,
      opensAt: current.opensAt.toISOString(),
      closesAt: current.closesAt.toISOString(),
      nextOpensAt: next?.opensAt.toISOString() ?? null,
      question,
    },
  };
}
