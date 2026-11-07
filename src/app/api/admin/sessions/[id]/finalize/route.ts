import { json } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { finalizeSession } from "@/server/services/sessions";

/** POST /api/admin/sessions/{id}/finalize — COMPLETED → FINALIZED. Produces official rankings. */
export const POST = adminRoute(async (req, { id }, admin) => {
  const session = await finalizeSession(id);
  await logAudit(prisma, admin.id, "session.finalize", "QuizSession", id, { code: session.code });
  return json({ session });
});
