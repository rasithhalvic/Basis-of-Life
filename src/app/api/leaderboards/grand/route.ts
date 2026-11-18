import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead } from "@/server/api";
import { getParticipant } from "@/server/participant-auth";
import { grandLeaderboard } from "@/server/services/leaderboards";

/** GET /api/leaderboards/grand — grand ranking. */
export const GET = publicRoute(async (req) => {
  await limitPublicRead(req);
  const p = await getParticipant(req);
  return json(await grandLeaderboard(p?.id ?? null));
});
