import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { createQuestion, listQuestions } from "@/server/services/questions";
import { categorySchema, questionSchema, reviewStatusSchema } from "@/lib/validation";

/** GET /api/admin/questions?category=&reviewStatus=&q= */
export const GET = adminRoute(async (req) => {
  const sp = new URL(req.url).searchParams;
  const category = sp.get("category") ? categorySchema.parse(sp.get("category")) : undefined;
  const reviewStatus = sp.get("reviewStatus") ? reviewStatusSchema.parse(sp.get("reviewStatus")) : undefined;
  const q = sp.get("q")?.slice(0, 100) || undefined;
  return json({ questions: await listQuestions({ category, reviewStatus, q }) });
});

/** POST /api/admin/questions — new questions start UNREVIEWED. */
export const POST = adminRoute(async (req, _p, admin) => {
  const input = await parseBody(req, questionSchema);
  return json({ question: await createQuestion(input, admin.id) }, { status: 201 });
});
