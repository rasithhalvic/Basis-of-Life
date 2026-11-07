import { json } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { openSession } from "@/server/services/sessions";

/** POST /api/admin/sessions/{id}/open — DRAFT → OPEN (registration opens). */
export const POST = adminRoute(async (req, { id }, admin) => {
  const session = await openSession(id);
  await logAudit(prisma, admin.id, "session.open", "QuizSession", id, { code: session.code });
  return json({ session });
});
