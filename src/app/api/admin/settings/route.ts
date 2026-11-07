import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { env } from "@/server/env";
import { getSettings, updateSettings } from "@/server/services/settings";
import { settingsSchema } from "@/lib/validation";

/** GET /api/admin/settings */
export const GET = adminRoute(async () => json({ settings: await getSettings(), envPublicBaseUrl: env.publicBaseUrl }));

/** PUT /api/admin/settings — exhibition text, dates, base URL and ranking settings. */
export const PUT = adminRoute(async (req, _p, admin) => {
  const input = await parseBody(req, settingsSchema);
  return json({ settings: await updateSettings(input, admin.id) });
});
