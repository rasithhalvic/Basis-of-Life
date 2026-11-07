import { NextResponse } from "next/server";
import { ZodError, type ZodType } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "./errors";
import { env } from "./env";

type Handler<C> = (req: Request, ctx: C) => Promise<Response>;

const MUTATING = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * CSRF / origin protection for state-changing requests. Cookies are also
 * SameSite=Lax; this additionally rejects cross-site form and fetch posts.
 */
export function assertSameOrigin(req: Request) {
  if (!MUTATING.has(req.method)) return;
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (origin) {
    let originHost: string;
    try {
      originHost = new URL(origin).host;
    } catch {
      throw new ApiError(403, "ORIGIN_REJECTED", "Request origin not allowed.");
    }
    if (originHost === host || env.allowedOrigins.includes(origin)) return;
    throw new ApiError(403, "ORIGIN_REJECTED", "Request origin not allowed.");
  }
  // No Origin header: fall back to Fetch Metadata.
  const site = req.headers.get("sec-fetch-site");
  if (site === "same-origin" || site === "none") return;
  // Non-browser clients (no cookies from a victim's browser) are allowed outside production.
  if (site === null && !env.isProduction) return;
  throw new ApiError(403, "ORIGIN_REJECTED", "Request origin not allowed.");
}

export function json(data: unknown, init?: ResponseInit) {
  const res = NextResponse.json(data, init);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export function errorResponse(err: unknown) {
  if (err instanceof ApiError) {
    const res = json(
      { error: { code: err.code, message: err.message, ...(err.details ? { details: err.details } : {}) } },
      { status: err.status },
    );
    if (err.status === 429 && err.details?.retryAfterSeconds) {
      res.headers.set("Retry-After", String(err.details.retryAfterSeconds));
    }
    return res;
  }
  if (err instanceof ZodError) {
    return json(
      {
        error: {
          code: "VALIDATION_FAILED",
          message: "Request validation failed.",
          details: { issues: err.issues.map((i) => ({ path: i.path.join("."), message: i.message })) },
        },
      },
      { status: 400 },
    );
  }
  if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
    return json({ error: { code: "CONFLICT", message: "A record with these values already exists." } }, { status: 409 });
  }
  console.error("[api] unhandled error", err);
  return json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, { status: 500 });
}

/** Wraps a route handler with origin checks and safe error responses. */
export function route<C = unknown>(handler: Handler<C>): Handler<C> {
  return async (req, ctx) => {
    try {
      assertSameOrigin(req);
      return await handler(req, ctx);
    } catch (err) {
      return errorResponse(err);
    }
  };
}

export async function parseBody<T>(req: Request, schema: ZodType<T>): Promise<T> {
  let body: unknown;
  try {
    const text = await req.text();
    if (text.length > 200_000) throw new ApiError(413, "BAD_REQUEST", "Request body too large.");
    body = text ? JSON.parse(text) : {};
  } catch (e) {
    if (e instanceof ApiError) throw e;
    throw new ApiError(400, "BAD_REQUEST", "Request body must be valid JSON.");
  }
  return schema.parse(body);
}

export function clientIp(req: Request): string {
  if (env.trustProxy) {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    const real = req.headers.get("x-real-ip");
    if (real) return real.trim();
  }
  return "direct";
}

export function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return undefined;
}
