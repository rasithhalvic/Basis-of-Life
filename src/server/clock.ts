import type { Db } from "./db";

/**
 * Authoritative server time, taken from the database clock so that every
 * application instance agrees on question windows.
 */
export async function dbNow(db: Db): Promise<Date> {
  const rows = await db.$queryRaw<{ now: Date }[]>`SELECT clock_timestamp() AS now`;
  return rows[0].now;
}
