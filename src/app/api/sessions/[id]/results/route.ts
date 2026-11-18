import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { requireParticipant } from "@/server/participant-auth";
import { participantResults } from "@/server/services/leaderboards";
import { idSchema } from "@/lib/validation";

/** GET /api/sessions/{id}/results — the visitor's own breakdown after the session finishes. */
export const GET = publicRoute(async (req, params) => {
  const p = await requireParticipant(req);
  return json(await participantResults(idSchema.parse(params.id), p.id));
});
