import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { updateSessionSettings } from "@/server/services/sessions";
import { adminSessionDetail } from "@/server/services/admin-sessions";
import { updateSessionSchema } from "@/lib/validation";

/** GET /api/admin/sessions/{id} — admissions, question progress and live ranking. */
export const GET = adminRoute(async (_req, { id }) => json(await adminSessionDetail(id)));

/** PATCH /api/admin/sessions/{id} — edit settings; only before the session starts. */
export const PATCH = adminRoute(async (req, { id }, admin) => {
  const input = await parseBody(req, updateSessionSchema);
  const session = await updateSessionSettings(id, input);
  await logAudit(prisma, admin.id, "session.update", "QuizSession", id, input);
  return json({ session });
});
