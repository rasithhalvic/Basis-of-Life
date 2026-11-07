import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { cancelSession } from "@/server/services/sessions";
import { cancelSchema } from "@/lib/validation";

/** POST /api/admin/sessions/{id}/cancel — Any non-final status → CANCELLED. Cancelled sessions never count in rankings. */
export const POST = adminRoute(async (req, { id }, admin) => {
  const { reason } = await parseBody(req, cancelSchema);
  const session = await cancelSession(id, reason);
  await logAudit(prisma, admin.id, "session.cancel", "QuizSession", id, { code: session.code, reason });
  return json({ session });
});
