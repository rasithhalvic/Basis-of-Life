import { NextResponse } from "next/server";
import { notFound } from "@/server/errors";
import { publicRoute } from "@/server/public-route";
import { limitPublicRead, requestLocale } from "@/server/api";
import { findPioneerBySlug } from "@/server/services/pioneers";
import { slugSchema } from "@/lib/validation";

/** GET /api/pioneers/{slug} — one pioneer; an old slug answers 308 to the current one. */
export const GET = publicRoute(async (req, params) => {
  await limitPublicRead(req);
  const slug = slugSchema.safeParse(params.slug);
  if (!slug.success) throw notFound("Pioneer");
  const { pioneer, redirectTo } = await findPioneerBySlug(slug.data, requestLocale(req));
  if (redirectTo) return NextResponse.redirect(new URL(`/api/pioneers/${redirectTo}`, req.url), 308);
  if (!pioneer) throw notFound("Pioneer");
  const res = NextResponse.json({ pioneer });
  res.headers.set("Cache-Control", "no-store");
  return res;
});
