import type { Prisma } from "@prisma/client";
import type { Db } from "./db";

export async function logAudit(
  db: Db,
  actorId: string | null,
  action: string,
  entityType: string,
  entityId: string | null,
  details: Prisma.InputJsonValue,
) {
  await db.auditLog.create({ data: { actorId, action, entityType, entityId, details } });
}
