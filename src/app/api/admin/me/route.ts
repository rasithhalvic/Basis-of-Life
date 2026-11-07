import { json } from "@/server/http";
import { adminRoute } from "@/server/api";

/** GET /api/admin/me — the signed-in administrator. */
export const GET = adminRoute(async (_req, _p, admin) => json({ admin }));
