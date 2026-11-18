import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead } from "@/server/api";
import { finalizedSessionsList } from "@/server/services/leaderboards";

/** GET /api/leaderboards/sessions — finished sessions. */
export const GET = publicRoute(async (req) => {
  await limitPublicRead(req);
  return json({ sessions: await finalizedSessionsList() });
});
