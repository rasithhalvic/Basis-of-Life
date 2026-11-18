import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { LIMITS, limitAll, rule } from "@/server/rate-limit";
import { requireParticipant } from "@/server/participant-auth";
import { joinSession } from "@/server/services/sessions";
import { sessionCodeSchema } from "@/lib/validation";

/** POST /api/sessions/{code}/join — admission. For this route the [id] segment is the 6-character session code. */
export const POST = publicRoute(async (req, params) => {
  const p = await requireParticipant(req);
  await limitAll([rule(`join:p:${p.id}`, LIMITS.joinPerParticipant)]);
  const code = sessionCodeSchema.parse(params.id);
  const result = await joinSession(p.id, code);
  return json({ admitted: true, ...result });
});
