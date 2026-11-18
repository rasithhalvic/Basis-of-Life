import { json, readCookie } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { prisma } from "@/server/db";
import { PARTICIPANT_COOKIE, clearParticipantCookieHeader, hmac, requireParticipant } from "@/server/participant-auth";
import { currentMembership } from "@/server/services/participants";

/** GET /api/participants/me — current visitor and their active session (if any). */
export const GET = publicRoute(async (req) => {
  const p = await requireParticipant(req);
  const activeSession = await currentMembership(p.id);
  return json({
    participant: { id: p.id, nickname: p.nickname, nicknameConsent: p.nicknameConsent },
    activeSession,
  });
});

/** DELETE /api/participants/me — sign out (revokes this browser's token). */
export const DELETE = publicRoute(async (req) => {
  const token = readCookie(req, PARTICIPANT_COOKIE);
  if (token && token.length <= 100) {
    await prisma.participantCredential.updateMany({
      where: { tokenHash: hmac(token), revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }
  const res = json({ ok: true });
  res.headers.append("Set-Cookie", clearParticipantCookieHeader());
  return res;
});
