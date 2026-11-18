import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead } from "@/server/api";
import { LIMITS, limitAll, rule } from "@/server/rate-limit";
import { getParticipant } from "@/server/participant-auth";
import { getSessionState } from "@/server/services/sessions";
import { idSchema } from "@/lib/validation";

/** GET /api/sessions/{id}/state — authoritative live state for polling clients. */
export const GET = publicRoute(async (req, params) => {
  const p = await getParticipant(req);
  if (p) await limitAll([rule(`state:p:${p.id}`, LIMITS.statePerParticipant)]);
  else await limitPublicRead(req);
  return json(await getSessionState(idSchema.parse(params.id), p?.id ?? null));
});
