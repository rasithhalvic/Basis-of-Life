import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { ApiError } from "@/server/errors";
import { cancelSession, createSession, joinSession, leaveSession, startSession } from "@/server/services/sessions";
import { makeParticipant, makeQuestions, openSessionWith, resetDb } from "./helpers";

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

const codeOf = (e: unknown) => (e instanceof ApiError ? e.code : String(e));

describe("concurrent admission", () => {
  it("admits exactly 20 when 21 visitors join simultaneously", async () => {
    const session = await createSession({ openImmediately: true }, null);
    const people = await Promise.all(Array.from({ length: 21 }, (_, i) => makeParticipant(`Rush ${i}`)));
    const results = await Promise.allSettled(people.map((p) => joinSession(p.participant.id, session.code)));

    const ok = results.filter((r) => r.status === "fulfilled");
    const rejected = results.filter((r): r is PromiseRejectedResult => r.status === "rejected");
    expect(ok).toHaveLength(20);
    expect(rejected).toHaveLength(1);
    expect(codeOf(rejected[0].reason)).toBe("SESSION_FULL");
    expect(await prisma.sessionParticipant.count({ where: { sessionId: session.id } })).toBe(20);
  });

  it("never exceeds 20 under a larger burst of 40", async () => {
    const session = await createSession({ openImmediately: true }, null);
    const people = await Promise.all(Array.from({ length: 40 }, (_, i) => makeParticipant(`Burst ${i}`)));
    const results = await Promise.allSettled(people.map((p) => joinSession(p.participant.id, session.code)));
    expect(results.filter((r) => r.status === "fulfilled")).toHaveLength(20);
    for (const r of results) if (r.status === "rejected") expect(codeOf(r.reason)).toBe("SESSION_FULL");
    expect(await prisma.sessionParticipant.count({ where: { sessionId: session.id } })).toBe(20);
  });

  it("is idempotent when the same visitor joins twice at once", async () => {
    const session = await createSession({ openImmediately: true }, null);
    const p = await makeParticipant();
    const results = await Promise.all([joinSession(p.participant.id, session.code), joinSession(p.participant.id, session.code)]);
    expect(results.map((r) => r.alreadyAdmitted).sort()).toEqual([false, true]);
    expect(await prisma.sessionParticipant.count({ where: { sessionId: session.id } })).toBe(1);
  });

  it("offers other open sessions when full, without creating a new session", async () => {
    const { session } = await openSessionWith(20);
    const other = await createSession({ openImmediately: true }, null);
    const sessionsBefore = await prisma.quizSession.count();
    const late = await makeParticipant("Late");
    const err = await joinSession(late.participant.id, session.code).catch((e) => e);
    expect(codeOf(err)).toBe("SESSION_FULL");
    expect((err as ApiError).details?.alternatives).toEqual([
      expect.objectContaining({ id: other.id, code: other.code, seatsLeft: 20 }),
    ]);
    expect(await prisma.quizSession.count()).toBe(sessionsBefore);
  });

  it("closes admission once the session starts, and rejects draft/cancelled sessions", async () => {
    await makeQuestions(10);
    const { session } = await openSessionWith(2);
    await startSession(session.id);
    const late = await makeParticipant("Late");
    expect(codeOf(await joinSession(late.participant.id, session.code).catch((e) => e))).toBe("SESSION_CLOSED");

    const draft = await createSession({}, null);
    expect(codeOf(await joinSession(late.participant.id, draft.code).catch((e) => e))).toBe("SESSION_CLOSED");

    const open = await createSession({ openImmediately: true }, null);
    await cancelSession(open.id, "Testing cancel");
    expect(codeOf(await joinSession(late.participant.id, open.code).catch((e) => e))).toBe("SESSION_CLOSED");
  });

  it("lets a visitor hold only one active seat, and free it by leaving", async () => {
    const a = await createSession({ openImmediately: true }, null);
    const b = await createSession({ openImmediately: true }, null);
    const p = await makeParticipant();
    await joinSession(p.participant.id, a.code);
    expect(codeOf(await joinSession(p.participant.id, b.code).catch((e) => e))).toBe("ALREADY_IN_ACTIVE_SESSION");
    await leaveSession(p.participant.id, a.id);
    await expect(joinSession(p.participant.id, b.code)).resolves.toMatchObject({ alreadyAdmitted: false });
  });

  it("rejects non-20 capacity at the database level", async () => {
    const s = await createSession({}, null);
    await expect(prisma.quizSession.update({ where: { id: s.id }, data: { capacity: 25 } })).rejects.toThrow();
  });
});
