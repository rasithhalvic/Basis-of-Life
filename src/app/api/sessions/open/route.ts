import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead } from "@/server/api";
import { listOpenSessions } from "@/server/services/sessions";

/** GET /api/sessions/open — sessions accepting participants. */
export const GET = publicRoute(async (req) => {
  await limitPublicRead(req);
  return json({ sessions: await listOpenSessions() });
});
