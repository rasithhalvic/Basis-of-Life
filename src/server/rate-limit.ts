import { prisma, type Db } from "./db";
import { ApiError } from "./errors";

/**
 * Database-backed fixed-window rate limiter shared by all app instances.
 *
 * Exhibition visitors share one Wi-Fi network (often one public IP), so
 * per-IP limits are deliberately generous and are combined with
 * per-participant and global limits rather than being the only control.
 */
export async function hit(key: string, limit: number, windowSeconds: number, db: Db = prisma) {
  const windowMs = windowSeconds * 1000;
  const windowStart = new Date(Math.floor(Date.now() / windowMs) * windowMs);
  const rows = await db.$queryRaw<{ count: number }[]>`
    INSERT INTO "RateLimitBucket" ("key", "windowStart", "count")
    VALUES (${key}, ${windowStart}, 1)
    ON CONFLICT ("key") DO UPDATE SET
      "count" = CASE WHEN "RateLimitBucket"."windowStart" = EXCLUDED."windowStart"
                     THEN "RateLimitBucket"."count" + 1 ELSE 1 END,
      "windowStart" = EXCLUDED."windowStart"
    RETURNING "count"`;
  const count = Number(rows[0].count);
  if (Math.random() < 0.01) {
    await db.$executeRaw`DELETE FROM "RateLimitBucket" WHERE "windowStart" < now() - interval '1 day'`;
  }
  if (count > limit) {
    const retryAfterSeconds = Math.max(1, Math.ceil((windowStart.getTime() + windowMs - Date.now()) / 1000));
    throw new ApiError(429, "RATE_LIMITED", "Too many requests. Please wait a moment and try again.", {
      retryAfterSeconds,
    });
  }
}

export async function limitAll(rules: Array<[key: string, limit: number, windowSeconds: number]>) {
  if (process.env.DISABLE_RATE_LIMIT === "true" && process.env.NODE_ENV !== "production") return;
  for (const [key, limit, windowSeconds] of rules) await hit(key, limit, windowSeconds);
}

/** Policies (requests per window). */
export const LIMITS = {
  registerPerIp: [120, 600], // shared Wi-Fi: many visitors behind one IP
  registerGlobal: [1500, 600],
  recoverPerIp: [30, 600],
  recoverGlobal: [300, 600],
  joinPerParticipant: [30, 300],
  answerPerParticipant: [120, 60],
  statePerParticipant: [240, 60],
  publicReadPerIp: [3000, 60],
  adminLoginPerIp: [20, 900],
  adminLoginPerEmail: [10, 900],
} as const satisfies Record<string, readonly [number, number]>;

export function rule(key: string, policy: readonly [number, number]): [string, number, number] {
  return [key, policy[0], policy[1]];
}
