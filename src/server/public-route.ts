import { route } from "./http";

type Ctx = { params: Promise<Record<string, string | string[]>> };

/** Public/visitor route: origin check + safe error responses + flattened route params. */
export function publicRoute(handler: (req: Request, params: Record<string, string>) => Promise<Response>) {
  return route<Ctx>(async (req, ctx) => {
    const raw = ctx?.params ? await ctx.params : {};
    const params: Record<string, string> = {};
    for (const [k, v] of Object.entries(raw)) params[k] = Array.isArray(v) ? v[0] : v;
    return handler(req, params);
  });
}
