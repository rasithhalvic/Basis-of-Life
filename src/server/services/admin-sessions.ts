import { prisma } from "../db";
import { dbNow } from "../clock";
import { ApiError, notFound } from "../errors";
import { logAudit } from "../audit";
import { adminSessionRanking, grandRows } from "./leaderboards";
import { loadSession, syncStatus } from "./sessions";
import { toCsv } from "../csv";

export async function adminListSessions() {
  const sessions = await prisma.quizSession.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { participants: true } } },
  });
  return Promise.all(sessions.map((s) => syncStatus(prisma, s)));
}

export async function adminSessionDetail(id: string) {
  const s = await loadSession(id);
  const now = await dbNow(prisma);
  const participants = await prisma.sessionParticipant.findMany({
    where: { sessionId: id },
    orderBy: { admittedAt: "asc" },
    select: {
      id: true,
      admittedAt: true,
      disqualifiedAt: true,
      disqualificationReason: true,
      disqualifiedBy: { select: { email: true } },
      participant: { select: { id: true, nickname: true, nicknameConsent: true } },
      _count: { select: { answers: true } },
    },
  });
  const questions = await prisma.sessionQuestion.findMany({
    where: { sessionId: id },
    orderBy: { position: "asc" },
    select: {
      id: true,
      position: true,
      category: true,
      promptEn: true,
      opensAt: true,
      closesAt: true,
      _count: { select: { answers: true } },
    },
  });
  const ranking = s.status === "LIVE" || s.status === "COMPLETED" || s.status === "FINALIZED" ? await adminSessionRanking(id) : [];
  return {
    session: s,
    serverNow: now,
    participants,
    questions: questions.map((q) => ({
      ...q,
      state: now < q.opensAt ? "upcoming" : now < q.closesAt ? "open" : "closed",
    })),
    ranking,
  };
}

/**
 * Disqualification never deletes answers; the participant is excluded from
 * every derived ranking (session and grand), which are recomputed on read.
 */
export async function setDisqualification(
  sessionId: string,
  sessionParticipantId: string,
  adminId: string,
  reason: string | null,
) {
  const sp = await prisma.sessionParticipant.findFirst({
    where: { id: sessionParticipantId, sessionId },
    include: { participant: { select: { nickname: true } } },
  });
  if (!sp) throw notFound("Participant");
  if (reason !== null && sp.disqualifiedAt) throw new ApiError(409, "CONFLICT", "Already disqualified.");
  if (reason === null && !sp.disqualifiedAt) throw new ApiError(409, "CONFLICT", "Participant is not disqualified.");

  await prisma.$transaction(async (tx) => {
    await tx.sessionParticipant.update({
      where: { id: sp.id },
      data:
        reason !== null
          ? { disqualifiedAt: await dbNow(tx), disqualificationReason: reason, disqualifiedById: adminId }
          : { disqualifiedAt: null, disqualificationReason: null, disqualifiedById: null },
    });
    await logAudit(
      tx,
      adminId,
      reason !== null ? "participant.disqualify" : "participant.reinstate",
      "SessionParticipant",
      sp.id,
      { sessionId, participantId: sp.participantId, nickname: sp.participant.nickname, reason },
    );
  });
}

export async function sessionResultsCsv(sessionId: string) {
  const s = await loadSession(sessionId);
  if (s.status !== "FINALIZED") {
    throw new ApiError(409, "RESULTS_NOT_AVAILABLE", "Only finalized sessions can be exported.");
  }
  const ranking = await adminSessionRanking(sessionId);
  const dq = await prisma.sessionParticipant.findMany({
    where: { sessionId, disqualifiedAt: { not: null } },
    include: { participant: { select: { nickname: true } } },
  });
  const rows: (string | number | null)[][] = [
    ["session_code", "rank", "nickname", "nickname_public_consent", "points", "correct", "questions", "total_time_seconds", "status"],
    ...ranking.map((r) => [
      s.code,
      r.rank,
      r.nickname,
      r.nicknameConsent ? "yes" : "no",
      r.totalPoints,
      r.correctCount,
      r.questionCount,
      (r.totalTimeMs / 1000).toFixed(3),
      "ranked",
    ]),
    ...dq.map((d) => [s.code, null, d.participant.nickname, null, null, null, null, null, `disqualified: ${d.disqualificationReason}`]),
  ];
  return { filename: `session-${s.code}-results.csv`, csv: toCsv(rows) };
}

export async function grandCsv() {
  const settings = await prisma.exhibitionSettings.findUnique({ where: { id: 1 } });
  const rows = await grandRows(settings?.grandQualifyTopN ?? 3);
  return {
    filename: "grand-leaderboard.csv",
    csv: toCsv([
      ["grand_rank", "nickname", "nickname_public_consent", "qualifying_session", "session_rank", "points", "total_time_seconds"],
      ...rows.map((r) => [
        r.grandRank,
        r.nickname,
        r.nicknameConsent ? "yes" : "no",
        r.sessionCode,
        r.sessionRank,
        r.totalPoints,
        (r.totalTimeMs / 1000).toFixed(3),
      ]),
    ]),
  };
}
