import { clientIp, json, parseBody } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { LIMITS, limitAll, rule } from "@/server/rate-limit";
import { participantCookieHeader } from "@/server/participant-auth";
import { registerParticipant } from "@/server/services/participants";
import { registerSchema } from "@/lib/validation";

/** POST /api/participants — register a nickname; sets the visitor cookie and returns the recovery code once. */
export const POST = publicRoute(async (req) => {
  await limitAll([
    rule(`register:ip:${clientIp(req)}`, LIMITS.registerPerIp),
    rule("register:global", LIMITS.registerGlobal),
  ]);
  const input = await parseBody(req, registerSchema);
  const { participant, token, recoveryCode } = await registerParticipant(input);
  const res = json({ participant, recoveryCode }, { status: 201 });
  res.headers.append("Set-Cookie", participantCookieHeader(token));
  return res;
});
