import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { prisma } from "@/server/db";
import { grandLeaderboard, sessionLeaderboard } from "@/server/services/leaderboards";
import { setDisqualification } from "@/server/services/admin-sessions";
import { cancelSession } from "@/server/services/sessions";
import { finishedSession, makeParticipant, resetDb } from "./helpers";

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

async function people(n: number, prefix = "P") {
  const list = [];
  for (let i = 0; i < n; i++) list.push((await makeParticipant(`${prefix}${i + 1}`)).participant.id);
  return list;
}

async function setTopN(n: number) {
  await prisma.exhibitionSettings.upsert({ where: { id: 1 }, create: { id: 1, grandQualifyTopN: n }, update: { grandQualifyTopN: n } });
}

describe("session ranking", () => {
  it("ranks by points desc, then total time asc, with shared ranks for exact ties", async () => {
    const [a, b, c, d, e] = await people(5);
    // 2 questions, 30 s each. Unanswered counts the full 30 000 ms.
    const s = await finishedSession([
      { participantId: a, answers: [[true, 5000], [true, 5000]] }, //   200 pts, 10 000 ms
      { participantId: b, answers: [[true, 4000], [true, 6000]] }, //   200 pts, 10 000 ms (tie with a)
      { participantId: c, answers: [[true, 2000], [true, 3000]] }, //   200 pts,  5 000 ms
      { participantId: d, answers: [[true, 1000], [false, 1000]] }, //  100 pts,  2 000 ms
      { participantId: e, answers: [[true, 1000], [false, null]] }, //  100 pts, 31 000 ms
    ]);
    const board = await sessionLeaderboard(s.id, a);
    expect(board.official).toBe(true);
    expect(board.entries.map((r) => [r.displayName, r.rank, r.totalPoints, r.totalTimeMs])).toEqual([
      ["P3", 1, 200, 5000],
      ["P1", 2, 200, 10000],
      ["P2", 2, 200, 10000],
      ["P4", 4, 100, 2000],
      ["P5", 5, 100, 31000],
    ]);
    expect(board.entries.find((r) => r.isMe)?.displayName).toBe("P1");
    expect(JSON.stringify(board)).not.toMatch(/participantId|recovery/i);
  });

  it("hides nicknames without consent", async () => {
    const shy = (await makeParticipant("Secret Name", false)).participant.id;
    const s = await finishedSession([{ participantId: shy, answers: [[true, 1000]] }]);
    const board = await sessionLeaderboard(s.id, null);
    expect(board.entries[0].displayName).toBeNull();
    expect(JSON.stringify(board)).not.toContain("Secret Name");
  });

  it("labels completed-but-not-finalized results as unofficial", async () => {
    const [a] = await people(1);
    const s = await finishedSession([{ participantId: a, answers: [[true, 1000]] }], { finalize: false });
    expect((await sessionLeaderboard(s.id, null)).official).toBe(false);
  });
});

describe("grand leaderboard", () => {
  it("qualifies the top N per finalized session, including ties at the cutoff", async () => {
    await setTopN(3);
    const ids = await people(5);
    await finishedSession([
      { participantId: ids[0], answers: [[true, 1000]] }, // rank 1
      { participantId: ids[1], answers: [[true, 2000]] }, // rank 2
      { participantId: ids[2], answers: [[true, 3000]] }, // rank 3 (tie)
      { participantId: ids[3], answers: [[true, 3000]] }, // rank 3 (tie)
      { participantId: ids[4], answers: [[true, 4000]] }, // rank 5 — out
    ]);
    const g = await grandLeaderboard(null);
    expect(g.entries.map((e) => e.displayName)).toEqual(["P1", "P2", "P3", "P4"]);
    expect(g.entries.map((e) => e.rank)).toEqual([1, 2, 3, 3]);
  });

  it("respects the configurable qualification count", async () => {
    await setTopN(1);
    const ids = await people(3);
    await finishedSession(ids.map((id, i) => ({ participantId: id, answers: [[true, 1000 * (i + 1)]] as [boolean, number][] })));
    expect((await grandLeaderboard(null)).entries.map((e) => e.displayName)).toEqual(["P1"]);
  });

  it("keeps one entry per participant: their best qualifying result, never a sum", async () => {
    await setTopN(3);
    const [rep, x, y] = await people(3);
    const s1 = await finishedSession([
      { participantId: rep, answers: [[true, 9000], [false, 9000]] }, // 100
      { participantId: x, answers: [[true, 1000], [true, 1000]] }, //   200
    ]);
    const s2 = await finishedSession([
      { participantId: rep, answers: [[true, 2000], [true, 2000]] }, // 200, 4 000 ms (best)
      { participantId: y, answers: [[false, 1000], [false, 1000]] }, //   0
    ]);
    const g = await grandLeaderboard(rep);
    const mine = g.entries.filter((e) => e.isMe);
    expect(mine).toHaveLength(1);
    expect(mine[0]).toMatchObject({ totalPoints: 200, totalTimeMs: 4000, sessionCode: s2.code });
    expect(g.entries.map((e) => [e.displayName, e.rank, e.totalPoints])).toEqual([
      ["P2", 1, 200],
      ["P1", 2, 200],
      ["P3", 3, 0],
    ]);
    expect(g.entries.some((e) => e.sessionCode === s1.code && e.isMe)).toBe(false);
  });

  it("ignores cancelled and unfinalized sessions and stays provisional while sessions are pending", async () => {
    await setTopN(3);
    const [a, b] = await people(2);
    const done = await finishedSession([{ participantId: a, answers: [[true, 5000]] }]);
    const notFinal = await finishedSession([{ participantId: b, answers: [[true, 1000]] }], { finalize: false });
    let g = await grandLeaderboard(null);
    expect(g.entries.map((e) => e.sessionCode)).toEqual([done.code]);
    expect(g.provisional).toBe(true);

    await cancelSession(notFinal.id, "Fire alarm");
    g = await grandLeaderboard(null);
    expect(g.entries.map((e) => e.displayName)).toEqual(["P1"]);
    expect(g.pendingSessions).toBe(0);
    expect(g.provisional).toBe(true); // until organizers declare it final

    await prisma.exhibitionSettings.update({ where: { id: 1 }, data: { rankingsDeclaredFinal: true } });
    expect((await grandLeaderboard(null)).provisional).toBe(false);
  });
});

describe("disqualification", () => {
  it("removes the participant from session and grand rankings and lets the next person qualify", async () => {
    await setTopN(1);
    const [cheat, honest] = await people(2);
    const admin = await prisma.adminUser.create({ data: { email: "a@example.test", name: "A", passwordHash: "x" } });
    const s = await finishedSession([
      { participantId: cheat, answers: [[true, 500]] },
      { participantId: honest, answers: [[true, 3000]] },
    ]);
    expect((await grandLeaderboard(null)).entries.map((e) => e.displayName)).toEqual(["P1"]);

    const sp = await prisma.sessionParticipant.findFirstOrThrow({ where: { sessionId: s.id, participantId: cheat } });
    await setDisqualification(s.id, sp.id, admin.id, "Used a second device");

    const board = await sessionLeaderboard(s.id, null);
    expect(board.entries.map((e) => [e.displayName, e.rank])).toEqual([["P2", 1]]);
    expect((await grandLeaderboard(null)).entries.map((e) => e.displayName)).toEqual(["P2"]);

    const audit = await prisma.auditLog.findFirstOrThrow({ where: { action: "participant.disqualify" } });
    expect(audit).toMatchObject({ actorId: admin.id, entityId: sp.id });
    expect(audit.details).toMatchObject({ reason: "Used a second device" });

    await setDisqualification(s.id, sp.id, admin.id, null);
    expect((await sessionLeaderboard(s.id, null)).entries[0].displayName).toBe("P1");
  });
});
