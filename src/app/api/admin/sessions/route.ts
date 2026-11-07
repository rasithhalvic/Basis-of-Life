import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { logAudit } from "@/server/audit";
import { prisma } from "@/server/db";
import { createSession } from "@/server/services/sessions";
import { adminListSessions } from "@/server/services/admin-sessions";
import { createSessionSchema } from "@/lib/validation";

/** GET /api/admin/sessions */
export const GET = adminRoute(async () => json({ sessions: await adminListSessions() }));

/** POST /api/admin/sessions — creates a session (capacity fixed at 20) with a unique join code. */
export const POST = adminRoute(async (req, _p, admin) => {
  const input = await parseBody(req, createSessionSchema);
  const session = await createSession(input, admin.id);
  await logAudit(prisma, admin.id, "session.create", "QuizSession", session.id, { code: session.code, status: session.status });
  return json({ session }, { status: 201 });
});
