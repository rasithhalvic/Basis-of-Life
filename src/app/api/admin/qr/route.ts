import { json } from "@/server/http";
import { adminRoute } from "@/server/api";
import { prisma } from "@/server/db";
import { notFound } from "@/server/errors";
import { baseUrlWarnings, pioneerUrl, qrPng, qrSvg } from "@/server/qr";
import { getPublicBaseUrl } from "@/server/services/settings";
import { slugSchema } from "@/lib/validation";
import { z } from "zod";

/**
 * GET /api/admin/qr — base URL, warnings and target URLs for all published pioneers.
 * GET /api/admin/qr?slug={slug}&format=svg|png — download one QR code.
 */
export const GET = adminRoute(async (req) => {
  const sp = new URL(req.url).searchParams;
  const baseUrl = await getPublicBaseUrl();
  const slugParam = sp.get("slug");
  if (!slugParam) {
    const pioneers = await prisma.pioneer.findMany({
      where: { isPublished: true },
      orderBy: { sortOrder: "asc" },
      select: { slug: true, translations: { where: { locale: "en" }, select: { name: true } } },
    });
    return json({
      baseUrl,
      warnings: baseUrlWarnings(baseUrl),
      pioneers: pioneers.map((p) => ({ slug: p.slug, name: p.translations[0]?.name ?? p.slug, url: pioneerUrl(baseUrl, p.slug) })),
    });
  }
  const slug = slugSchema.parse(slugParam);
  const format = z.enum(["svg", "png"]).parse(sp.get("format") ?? "svg");
  const pioneer = await prisma.pioneer.findUnique({ where: { slug }, select: { isPublished: true } });
  if (!pioneer) throw notFound("Pioneer");
  const url = pioneerUrl(baseUrl, slug);
  const headers = {
    "Content-Disposition": `attachment; filename="qr-${slug}.${format}"`,
    "Cache-Control": "no-store",
    "X-QR-Target": url,
  };
  if (format === "svg") return new Response(await qrSvg(url), { headers: { ...headers, "Content-Type": "image/svg+xml" } });
  return new Response(new Uint8Array(await qrPng(url)), { headers: { ...headers, "Content-Type": "image/png" } });
});
