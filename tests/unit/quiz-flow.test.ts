import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { ApiError } from "@/server/errors";
import { participantFromToken } from "@/server/participant-auth";
import { submitAnswer } from "@/server/services/answers";
import { participantResults, sessionLeaderboard } from "@/server/services/leaderboards";
import { recoverParticipant } from "@/server/services/participants";
import { finalizeSession, getSessionState, startSession } from "@/server/services/sessions";
import { goLiveWithWindows, makeParticipant, makeQuestions, openSessionWith, resetDb } from "./helpers";

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

const codeOf = (e: unknown) => (e instanceof ApiError ? e.code : String(e));

describe("starting a session", () => {
  it("snapshots only reviewed bilingual questions with server-fixed windows", async () => {
    await makeQuestions(12, "REVIEWED");
    await makeQuestions(30, "UNREVIEWED");
    const { session } = await openSessionWith(3, { questionCount: 10, secondsPerQuestion: 30, breakSeconds: 5, countdownSeconds: 10 });
    const live = await startSession(session.id);
    expect(live.status).toBe("LIVE");

    const qs = await prisma.sessionQuestion.findMany({
      where: { sessionId: session.id },
      orderBy: { position: "asc" },
      include: { sourceQuestion: true, options: true },
    });
    expect(qs).toHaveLength(10);
    for (const q of qs) {
      expect(q.sourceQuestion?.reviewStatus).toBe("REVIEWED");
      expect(q.options.filter((o) => o.isCorrect)).toHaveLength(1);
      expect(q.closesAt.getTime() - q.opensAt.getTime()).toBe(30_000);
    }
    expect(qs[0].opensAt.getTime() - live.startedAt!.getTime()).toBe(10_000);
    expect(qs[1].opensAt.getTime() - qs[0].opensAt.getTime()).toBe(35_000);
    expect(live.endsAt!.getTime()).toBe(qs[9].closesAt.getTime());
  });

  it("refuses to start when there are not enough reviewed questions", async () => {
    await makeQuestions(5, "REVIEWED");
    await makeQuestions(20, "UNREVIEWED");
    const { session } = await openSessionWith(1, { questionCount: 10 });
    expect(codeOf(await startSession(session.id).catch((e) => e))).toBe("NOT_ENOUGH_QUESTIONS");
    expect((await prisma.quizSession.findUniqueOrThrow({ where: { id: session.id } })).status).toBe("OPEN");
  });

  it("makes session question snapshots immutable after start", async () => {
    await makeQuestions(10);
    const { session } = await openSessionWith(1);
    await startSession(session.id);
    const q = await prisma.sessionQuestion.findFirstOrThrow({ where: { sessionId: session.id }, include: { options: true } });
    await expect(prisma.sessionQuestion.update({ where: { id: q.id }, data: { promptEn: "Changed" } })).rejects.toThrow(/immutable/);
    await expect(
      prisma.sessionQuestionOption.update({ where: { id: q.options[0].id }, data: { isCorrect: !q.options[0].isCorrect } }),
    ).rejects.toThrow(/immutable/);
    await expect(
      prisma.sessionQuestion.create({
        data: {
          sessionId: session.id, position: 99, category: "SCIENCE", difficulty: "EASY", promptEn: "x", promptSi: "x",
          secondsPerQuestion: 30, opensAt: new Date(), closesAt: new Date(),
        },
      }),
    ).rejects.toThrow(/Cannot add questions/);
    // Editing or deleting the bank question does not touch the snapshot.
    await prisma.question.delete({ where: { id: q.sourceQuestionId! } });
    const after = await prisma.sessionQuestion.findUniqueOrThrow({ where: { id: q.id } });
    expect(after.promptEn).toBe(q.promptEn);
    expect(after.sourceQuestionId).toBeNull();
  });
});

describe("live state", () => {
  it("never exposes answer keys or unreleased questions to participants", async () => {
    const { session, participants } = await openSessionWith(2);
    await goLiveWithWindows(session.id, [
      [-1000, 20_000],
      [25_000, 45_000],
    ]);
    const state = await getSessionState(session.id, participants[0].participant.id);
    expect(state.phase).toBe("question");
    const text = JSON.stringify(state);
    expect(text).not.toMatch(/isCorrect/i);
    expect(text).not.toMatch(/correct/i);
    expect(text).toContain("Live question 0");
    expect(text).not.toContain("Live question 1");
    expect(state.live?.question?.options).toHaveLength(4);
    for (const o of state.live!.question!.options) expect(Object.keys(o).sort()).toEqual(["id", "text"]);

    // Non-members get no question content at all.
    const outsider = await makeParticipant("Outsider");
    const anon = await getSessionState(session.id, outsider.participant.id);
    expect(anon.live?.question).toBeNull();
    expect(JSON.stringify(anon)).not.toContain("Live question 0");
  });

  it("shows countdown before the first question without revealing it", async () => {
    const { session, participants } = await openSessionWith(1);
    await goLiveWithWindows(session.id, [[10_000, 40_000]]);
    const state = await getSessionState(session.id, participants[0].participant.id);
    expect(state.phase).toBe("countdown");
    expect(JSON.stringify(state)).not.toContain("Live question 0");
  });

  it("restores the same authoritative state after refresh or recovery on a new device", async () => {
    const { session, participants } = await openSessionWith(1);
    const [q] = await goLiveWithWindows(session.id, [[-1000, 20_000]]);
    const me = participants[0];
    await submitAnswer({ participantId: me.participant.id, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[2].id });

    const before = await getSessionState(session.id, me.participant.id);
    // "New device": recover identity with the recovery code; a new token is issued.
    const recovered = await recoverParticipant(me.recoveryCode);
    expect(recovered.token).not.toBe(me.token);
    const viaNewToken = await participantFromToken(recovered.token);
    expect(viaNewToken?.id).toBe(me.participant.id);

    const after = await getSessionState(session.id, viaNewToken!.id);
    expect(after.phase).toBe("question");
    expect(after.live?.question?.id).toBe(before.live?.question?.id);
    expect(after.live?.question?.myAnswer?.optionId).toBe(q.options[2].id);
    expect(after.session.status).toBe("LIVE");
  });
});

describe("answer submission", () => {
  it("is idempotent: retries and parallel duplicates cannot increase the score", async () => {
    const { session, participants } = await openSessionWith(1);
    const [q] = await goLiveWithWindows(session.id, [[-1000, 20_000]]);
    const pid = participants[0].participant.id;
    const correct = q.options[0].id;

    const parallel = await Promise.allSettled(
      Array.from({ length: 10 }, () => submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: q.id, optionId: correct })),
    );
    expect(parallel.every((r) => r.status === "fulfilled")).toBe(true);
    const receipts = parallel.map((r) => (r as PromiseFulfilledResult<Awaited<ReturnType<typeof submitAnswer>>>).value);
    expect(receipts.filter((r) => !r.duplicate)).toHaveLength(1);
    expect(JSON.stringify(receipts)).not.toMatch(/correct/i);

    const changed = await submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[1].id }).catch((e) => e);
    expect(codeOf(changed)).toBe("ANSWER_ALREADY_SUBMITTED");
    expect(await prisma.answer.count()).toBe(1);
    const score = await prisma.$queryRaw<{ totalPoints: number }[]>`SELECT "totalPoints" FROM "SessionParticipantScore"`;
    expect(score[0].totalPoints).toBe(100);
  });

  it("rejects late and early answers using server time", async () => {
    const { session, participants } = await openSessionWith(1);
    const [closed, open, future] = await goLiveWithWindows(session.id, [
      [-40_000, -10_000],
      [-1000, 20_000],
      [30_000, 60_000],
    ]);
    const pid = participants[0].participant.id;
    const late = await submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: closed.id, optionId: closed.options[0].id }).catch((e) => e);
    expect(codeOf(late)).toBe("QUESTION_EXPIRED");
    const early = await submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: future.id, optionId: future.options[0].id }).catch((e) => e);
    expect(codeOf(early)).toBe("QUESTION_NOT_OPEN");
    const ok = await submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: open.id, optionId: open.options[0].id });
    expect(ok.status).toBe("accepted");
    const row = await prisma.answer.findFirstOrThrow();
    expect(row.responseMs).toBeGreaterThanOrEqual(1000);
    expect(row.responseMs).toBeLessThan(10_000);
  });

  it("rejects answers after a short real-time window closes", async () => {
    const { session, participants } = await openSessionWith(1);
    const [q] = await goLiveWithWindows(session.id, [[-100, 1200]]);
    await new Promise((r) => setTimeout(r, 1500));
    const err = await submitAnswer({ participantId: participants[0].participant.id, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[0].id }).catch((e) => e);
    expect(codeOf(err)).toBe("QUESTION_EXPIRED");
  });

  it("checks membership, disqualification and option validity", async () => {
    const { session, participants } = await openSessionWith(2);
    const [q] = await goLiveWithWindows(session.id, [[-1000, 20_000]]);
    const outsider = await makeParticipant("Outsider");
    expect(codeOf(await submitAnswer({ participantId: outsider.participant.id, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[0].id }).catch((e) => e))).toBe("NOT_A_MEMBER");

    await expect(
      prisma.sessionQuestionOption.create({ data: { sessionQuestionId: q.id, position: 9, textEn: "x", textSi: "x", isCorrect: true } }),
    ).rejects.toThrow(/Cannot add options/);

    const sp = await prisma.sessionParticipant.findFirstOrThrow({ where: { participantId: participants[1].participant.id } });
    await prisma.sessionParticipant.update({ where: { id: sp.id }, data: { disqualifiedAt: new Date(), disqualificationReason: "test" } });
    expect(codeOf(await submitAnswer({ participantId: participants[1].participant.id, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[0].id }).catch((e) => e))).toBe("DISQUALIFIED");
  });

  it("rejects an option from a different question", async () => {
    const { session, participants } = await openSessionWith(1);
    const [q1, q2] = await goLiveWithWindows(session.id, [
      [-1000, 20_000],
      [25_000, 45_000],
    ]);
    const err = await submitAnswer({ participantId: participants[0].participant.id, sessionId: session.id, sessionQuestionId: q1.id, optionId: q2.options[0].id }).catch((e) => e);
    expect(codeOf(err)).toBe("INVALID_OPTION");
  });
});

describe("finishing", () => {
  it("reveals correct answers only after the session finishes, and finalizes", async () => {
    const { session, participants } = await openSessionWith(1);
    const [q] = await goLiveWithWindows(session.id, [[-1000, 1500]]);
    const pid = participants[0].participant.id;
    await submitAnswer({ participantId: pid, sessionId: session.id, sessionQuestionId: q.id, optionId: q.options[0].id });

    expect(codeOf(await participantResults(session.id, pid).catch((e) => e))).toBe("RESULTS_NOT_AVAILABLE");
    expect(codeOf(await sessionLeaderboard(session.id, pid).catch((e) => e))).toBe("RESULTS_NOT_AVAILABLE");
    expect(codeOf(await finalizeSession(session.id).catch((e) => e))).toBe("INVALID_TRANSITION");

    await new Promise((r) => setTimeout(r, 1800));
    const state = await getSessionState(session.id, pid);
    expect(state.phase).toBe("finished");
    const results = await participantResults(session.id, pid);
    expect(results.official).toBe(false);
    expect(results.totalPoints).toBe(100);
    expect(results.questions[0].options.find((o) => o.isCorrect)?.id).toBe(q.options[0].id);

    await finalizeSession(session.id);
    const board = await sessionLeaderboard(session.id, pid);
    expect(board.official).toBe(true);
    expect(board.entries[0]).toMatchObject({ rank: 1, totalPoints: 100, isMe: true });
  });
});
