import { adminRoute } from "@/server/api";
import { prisma } from "@/server/db";
import { logAudit } from "@/server/audit";
import { baseUrlWarnings, qrZip } from "@/server/qr";
import { getPublicBaseUrl } from "@/server/services/settings";

/** GET /api/admin/qr/all — ZIP with SVG + PNG codes for every published pioneer and a manifest. */
export const GET = adminRoute(async (_req, _p, admin) => {
  const baseUrl = await getPublicBaseUrl();
  const pioneers = await prisma.pioneer.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    select: { slug: true, sortOrder: true, translations: { where: { locale: "en" }, select: { name: true } } },
  });
  const zip = await qrZip(
    baseUrl,
    pioneers.map((p) => ({ slug: p.slug, sortOrder: p.sortOrder, name: p.translations[0]?.name ?? p.slug })),
  );
  await logAudit(prisma, admin.id, "qr.download_all", "Pioneer", null, { baseUrl, count: pioneers.length, warnings: baseUrlWarnings(baseUrl) });
  return new Response(new Uint8Array(zip), {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": 'attachment; filename="pioneer-qr-codes.zip"',
      "Cache-Control": "no-store",
    },
  });
});
