import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { requireParticipant } from "@/server/participant-auth";
import { leaveSession } from "@/server/services/sessions";
import { idSchema } from "@/lib/validation";

/** POST /api/sessions/{id}/leave — give up a seat before the session starts. */
export const POST = publicRoute(async (req, params) => {
  const p = await requireParticipant(req);
  await leaveSession(p.id, idSchema.parse(params.id));
  return json({ ok: true });
});
