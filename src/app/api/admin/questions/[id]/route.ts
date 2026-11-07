import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { deleteQuestion, getQuestion, updateQuestion } from "@/server/services/questions";
import { questionSchema } from "@/lib/validation";

/** GET /api/admin/questions/{id} */
export const GET = adminRoute(async (_req, { id }) => json({ question: await getQuestion(id) }));

/** PUT /api/admin/questions/{id} — any edit resets review status to UNREVIEWED. */
export const PUT = adminRoute(async (req, { id }, admin) => {
  const input = await parseBody(req, questionSchema);
  return json({ question: await updateQuestion(id, input, admin.id) });
});

/** DELETE /api/admin/questions/{id} — session snapshots are unaffected. */
export const DELETE = adminRoute(async (_req, { id }, admin) => {
  await deleteQuestion(id, admin.id);
  return json({ deleted: true });
});
