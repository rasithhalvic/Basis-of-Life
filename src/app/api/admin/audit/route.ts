import { json } from "@/server/http";
import { adminRoute } from "@/server/api";
import { prisma } from "@/server/db";

/** GET /api/admin/audit?limit=100 — most recent audit records. */
export const GET = adminRoute(async (req) => {
  const limit = Math.min(500, Math.max(1, Number(new URL(req.url).searchParams.get("limit")) || 100));
  const entries = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { actor: { select: { email: true } } },
  });
  return json({ entries });
});
