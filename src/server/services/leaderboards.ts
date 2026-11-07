import { prisma } from "../db";
import { ApiError } from "../errors";
import { loadSession } from "./sessions";

/**
 * All rankings are derived from stored answers via the "SessionParticipantScore"
 * view, so disqualifications and corrections are reflected immediately.
 *
 * Order: total points DESC, then total response time ASC. Identical score and
 * time share a rank (SQL RANK(): 1, 1, 3 ...). Disqualified participants are
 * excluded before ranking.
 */

export interface SessionRankRow {
  sessionParticipantId: string;
  participantId: string;
  nickname: string;
  nicknameConsent: boolean;
  totalPoints: number;
  correctCount: number;
  answeredCount: number;
  questionCount: number;
  totalTimeMs: number;
  rank: number;
}

async function rankedSessionRows(sessionId: string): Promise<SessionRankRow[]> {
  const rows = await prisma.$queryRaw<SessionRankRow[]>`
    SELECT s."sessionParticipantId", s."participantId", p."nickname", p."nicknameConsent",
           s."totalPoints", s."correctCount", s."answeredCount", s."questionCount",
           s."totalTimeMs"::float8 AS "totalTimeMs",
           RANK() OVER (ORDER BY s."totalPoints" DESC, s."totalTimeMs" ASC)::int AS "rank"
    FROM "SessionParticipantScore" s
    JOIN "Participant" p ON p.id = s."participantId"
    WHERE s."sessionId" = ${sessionId} AND NOT s."disqualified"
    ORDER BY "rank", p."nickname"`;
  return rows.map((r) => ({ ...r, totalTimeMs: Number(r.totalTimeMs) }));
}

/** Public nickname only when the visitor consented; otherwise anonymous. */
const publicName = (r: { nickname: string; nicknameConsent: boolean }) => (r.nicknameConsent ? r.nickname : null);

export async function sessionLeaderboard(sessionId: string, viewerParticipantId: string | null) {
  const s = await loadSession(sessionId);
  if (s.status !== "COMPLETED" && s.status !== "FINALIZED") {
    throw new ApiError(409, "RESULTS_NOT_AVAILABLE", "Results are available after the session finishes.", {
      status: s.status,
    });
  }
  const rows = await rankedSessionRows(sessionId);
  return {
    session: { id: s.id, code: s.code, title: s.title, status: s.status, finalizedAt: s.finalizedAt?.toISOString() ?? null },
    official: s.status === "FINALIZED",
    entries: rows.map((r) => ({
      rank: r.rank,
      displayName: publicName(r),
      totalPoints: r.totalPoints,
      correctCount: r.correctCount,
      questionCount: r.questionCount,
      totalTimeMs: r.totalTimeMs,
      isMe: viewerParticipantId === r.participantId,
    })),
  };
}

/** Admin view (includes nicknames regardless of consent, and internal ids). */
export async function adminSessionRanking(sessionId: string) {
  return rankedSessionRows(sessionId);
}

export async function participantResults(sessionId: string, participantId: string) {
  const s = await loadSession(sessionId);
  if (s.status !== "COMPLETED" && s.status !== "FINALIZED") {
    throw new ApiError(409, "RESULTS_NOT_AVAILABLE", "Results are available after the session finishes.", {
      status: s.status,
    });
  }
  const membership = await prisma.sessionParticipant.findUnique({
    where: { sessionId_participantId: { sessionId, participantId } },
    select: { id: true, disqualifiedAt: true, disqualificationReason: true },
  });
  if (!membership) throw new ApiError(403, "NOT_A_MEMBER", "You were not admitted to this session.");

  const questions = await prisma.sessionQuestion.findMany({
    where: { sessionId },
    orderBy: { position: "asc" },
    include: {
      options: { orderBy: { position: "asc" } },
      answers: { where: { sessionParticipantId: membership.id } },
    },
  });
  const rows = await rankedSessionRows(sessionId);
  const mine = rows.find((r) => r.sessionParticipantId === membership.id);

  const breakdown = questions.map((q) => {
    const a = q.answers[0];
    const correct = q.options.find((o) => o.isCorrect)!;
    const isCorrect = a ? a.selectedOptionId === correct.id : false;
    return {
      number: q.position + 1,
      category: q.category,
      prompt: { en: q.promptEn, si: q.promptSi },
      explanation: { en: q.explanationEn, si: q.explanationSi },
      options: q.options.map((o) => ({ id: o.id, text: { en: o.textEn, si: o.textSi }, isCorrect: o.isCorrect })),
      selectedOptionId: a?.selectedOptionId ?? null,
      isCorrect,
      points: isCorrect ? 100 : 0,
      responseMs: a ? a.responseMs : q.secondsPerQuestion * 1000,
      answered: Boolean(a),
    };
  });

  return {
    session: { id: s.id, code: s.code, title: s.title, status: s.status },
    official: s.status === "FINALIZED",
    disqualified: membership.disqualifiedAt !== null,
    totalPoints: breakdown.reduce((n, b) => n + b.points, 0),
    totalTimeMs: breakdown.reduce((n, b) => n + b.responseMs, 0),
    rank: mine?.rank ?? null,
    rankedCount: rows.length,
    questions: breakdown,
  };
}

export interface GrandRow {
  participantId: string;
  nickname: string;
  nicknameConsent: boolean;
  sessionId: string;
  sessionCode: string;
  sessionTitle: string | null;
  sessionRank: number;
  totalPoints: number;
  totalTimeMs: number;
  grandRank: number;
}

/**
 * Grand leaderboard: the top N ranks of every FINALIZED session qualify
 * (everyone tied at the cutoff included, because RANK() gives ties the same
 * rank). Each participant appears once with their single best qualifying
 * result; scores from different sessions are never added together.
 */
export async function grandRows(topN: number): Promise<GrandRow[]> {
  const rows = await prisma.$queryRaw<GrandRow[]>`
    WITH ranked AS (
      SELECT s.*, q."code" AS "sessionCode", q."title" AS "sessionTitle", q."finalizedAt",
             RANK() OVER (PARTITION BY s."sessionId" ORDER BY s."totalPoints" DESC, s."totalTimeMs" ASC)::int AS "sessionRank"
      FROM "SessionParticipantScore" s
      JOIN "QuizSession" q ON q.id = s."sessionId"
      WHERE q.status = 'FINALIZED' AND NOT s."disqualified"
    ),
    best AS (
      SELECT DISTINCT ON ("participantId") *
      FROM ranked
      WHERE "sessionRank" <= ${topN}
      ORDER BY "participantId", "totalPoints" DESC, "totalTimeMs" ASC, "finalizedAt" ASC
    )
    SELECT b."participantId", p."nickname", p."nicknameConsent", b."sessionId", b."sessionCode", b."sessionTitle",
           b."sessionRank", b."totalPoints", b."totalTimeMs"::float8 AS "totalTimeMs",
           RANK() OVER (ORDER BY b."totalPoints" DESC, b."totalTimeMs" ASC)::int AS "grandRank"
    FROM best b JOIN "Participant" p ON p.id = b."participantId"
    ORDER BY "grandRank", p."nickname"`;
  return rows.map((r) => ({ ...r, totalTimeMs: Number(r.totalTimeMs) }));
}

export async function grandLeaderboard(viewerParticipantId: string | null) {
  const settings = await prisma.exhibitionSettings.findUnique({ where: { id: 1 } });
  const topN = settings?.grandQualifyTopN ?? 3;
  const [rows, pending, finalizedCount] = await Promise.all([
    grandRows(topN),
    prisma.quizSession.count({ where: { status: { in: ["DRAFT", "OPEN", "LIVE", "COMPLETED"] } } }),
    prisma.quizSession.count({ where: { status: "FINALIZED" } }),
  ]);
  return {
    provisional: !settings?.rankingsDeclaredFinal || pending > 0,
    qualifyTopN: topN,
    finalizedSessions: finalizedCount,
    pendingSessions: pending,
    entries: rows.map((r) => ({
      rank: r.grandRank,
      displayName: publicName(r),
      sessionCode: r.sessionCode,
      sessionTitle: r.sessionTitle,
      sessionRank: r.sessionRank,
      totalPoints: r.totalPoints,
      totalTimeMs: r.totalTimeMs,
      isMe: viewerParticipantId === r.participantId,
    })),
  };
}

export async function finalizedSessionsList() {
  const sessions = await prisma.quizSession.findMany({
    where: { status: { in: ["FINALIZED", "COMPLETED"] } },
    orderBy: [{ finalizedAt: "desc" }, { completedAt: "desc" }],
    select: { id: true, code: true, title: true, status: true, finalizedAt: true, completedAt: true, _count: { select: { participants: true } } },
  });
  return sessions.map(({ _count, ...s }) => ({ ...s, participantCount: _count.participants }));
}
