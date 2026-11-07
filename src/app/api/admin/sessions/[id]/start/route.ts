import { json } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { startSession } from "@/server/services/sessions";

/** POST /api/admin/sessions/{id}/start — OPEN → LIVE. Closes admission, snapshots questions, fixes server-side question windows. */
export const POST = adminRoute(async (req, { id }, admin) => {
  const session = await startSession(id);
  await logAudit(prisma, admin.id, "session.start", "QuizSession", id, { code: session.code, startedAt: session.startedAt, endsAt: session.endsAt });
  return json({ session });
});
