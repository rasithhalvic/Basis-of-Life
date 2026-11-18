import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead } from "@/server/api";
import { getParticipant } from "@/server/participant-auth";
import { sessionLeaderboard } from "@/server/services/leaderboards";
import { idSchema } from "@/lib/validation";

/** GET /api/sessions/{id}/leaderboard — session ranking (unofficial until finalized). */
export const GET = publicRoute(async (req, params) => {
  await limitPublicRead(req);
  const p = await getParticipant(req);
  return json(await sessionLeaderboard(idSchema.parse(params.id), p?.id ?? null));
});
