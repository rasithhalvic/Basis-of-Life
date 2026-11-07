import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { prisma } from "@/server/db";
import { notFound } from "@/server/errors";
import { deletePioneer, updatePioneer } from "@/server/services/pioneers";
import { pioneerSchema } from "@/lib/validation";

/** GET /api/admin/pioneers/{id} */
export const GET = adminRoute(async (_req, { id }) => {
  const pioneer = await prisma.pioneer.findUnique({ where: { id }, include: { translations: true, redirects: true } });
  if (!pioneer) throw notFound("Pioneer");
  return json({ pioneer });
});

/** PUT /api/admin/pioneers/{id} — changing the slug keeps the old URL as a redirect. */
export const PUT = adminRoute(async (req, { id }, admin) => {
  const input = await parseBody(req, pioneerSchema);
  return json({ pioneer: await updatePioneer(id, input, admin.id) });
});

/** DELETE /api/admin/pioneers/{id} — only unpublished pioneers can be deleted. */
export const DELETE = adminRoute(async (_req, { id }, admin) => {
  await deletePioneer(id, admin.id);
  return json({ deleted: true });
});
