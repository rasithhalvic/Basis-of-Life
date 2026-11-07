import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { setDisqualification } from "@/server/services/admin-sessions";
import { disqualifySchema } from "@/lib/validation";

/**
 * POST /api/admin/sessions/{id}/participants/{sessionParticipantId}/disqualify — { reason }
 * Excludes the participant from all rankings (recomputed on read) and writes an audit record.
 */
export const POST = adminRoute(async (req, { id, participantId }, admin) => {
  const { reason } = await parseBody(req, disqualifySchema);
  await setDisqualification(id, participantId, admin.id, reason);
  return json({ disqualified: true });
});

/** DELETE …/disqualify — reinstate a participant (audited). */
export const DELETE = adminRoute(async (_req, { id, participantId }, admin) => {
  await setDisqualification(id, participantId, admin.id, null);
  return json({ disqualified: false });
});
