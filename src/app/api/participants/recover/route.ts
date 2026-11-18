import { clientIp, json, parseBody } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { LIMITS, limitAll, rule } from "@/server/rate-limit";
import { participantCookieHeader } from "@/server/participant-auth";
import { recoverParticipant } from "@/server/services/participants";
import { recoverSchema } from "@/lib/validation";

/** POST /api/participants/recover — new cookie from a recovery code. */
export const POST = publicRoute(async (req) => {
  await limitAll([
    rule(`recover:ip:${clientIp(req)}`, LIMITS.recoverPerIp),
    rule("recover:global", LIMITS.recoverGlobal),
  ]);
  const { recoveryCode } = await parseBody(req, recoverSchema);
  const { participant, token } = await recoverParticipant(recoveryCode);
  const res = json({ participant });
  res.headers.append("Set-Cookie", participantCookieHeader(token));
  return res;
});
