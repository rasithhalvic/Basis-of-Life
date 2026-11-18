import { json } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead, requestLocale } from "@/server/api";
import { listPublishedPioneers } from "@/server/services/pioneers";

/** GET /api/pioneers?lang=en|si — published pioneers. */
export const GET = publicRoute(async (req) => {
  await limitPublicRead(req);
  return json({ pioneers: await listPublishedPioneers(requestLocale(req)) });
});
