import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { adminListPioneers, createPioneer } from "@/server/services/pioneers";
import { pioneerSchema } from "@/lib/validation";

/** GET /api/admin/pioneers — all pioneers including unpublished drafts. */
export const GET = adminRoute(async () => json({ pioneers: await adminListPioneers() }));

/** POST /api/admin/pioneers */
export const POST = adminRoute(async (req, _p, admin) => {
  const input = await parseBody(req, pioneerSchema);
  return json({ pioneer: await createPioneer(input, admin.id) }, { status: 201 });
});
