import type { Locale } from "@prisma/client";
import { requireAdmin, type CurrentAdmin } from "./admin-auth";
import { adminBlocked } from "./admin-access";
import { notFound } from "./errors";
import { clientIp, readCookie, route } from "./http";
import { LIMITS, limitAll, rule } from "./rate-limit";
import { idSchema } from "@/lib/validation";

export const LOCALE_COOKIE = "lang";

export function requestLocale(req: Request): Locale {
  const q = new URL(req.url).searchParams.get("lang");
  const v = q ?? readCookie(req, LOCALE_COOKIE);
  return v === "si" ? "si" : "en";
}

/** Generous per-IP limit for anonymous reads (shared exhibition Wi-Fi). */
export async function limitPublicRead(req: Request) {
  await limitAll([rule(`read:ip:${clientIp(req)}`, LIMITS.publicReadPerIp)]);
}

type Params = Record<string, string | string[]>;
type Ctx = { params: Promise<Params> };

/** Admin route: origin check + server-side administrator authorization. */
export function adminRoute(
  handler: (req: Request, params: Record<string, string>, admin: CurrentAdmin) => Promise<Response>,
) {
  return route<Ctx>(async (req, ctx) => {
    if (adminBlocked(req.headers)) throw notFound();
    const admin = await requireAdmin();
    const raw = ctx?.params ? await ctx.params : {};
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) params[k] = idSchema.parse(Array.isArray(v) ? v[0] : v);
    return handler(req, params, admin);
  });
}

export async function routeParam(ctx: Ctx, name: string) {
  const v = (await ctx.params)[name];
  return Array.isArray(v) ? v[0] : v;
}
