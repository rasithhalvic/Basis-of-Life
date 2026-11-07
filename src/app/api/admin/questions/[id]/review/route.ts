import { json, parseBody } from "@/server/http";
import { adminRoute } from "@/server/api";
import { setReviewStatus } from "@/server/services/questions";
import { reviewSchema } from "@/lib/validation";

/** POST /api/admin/questions/{id}/review — { reviewStatus: REVIEWED | REJECTED | UNREVIEWED } */
export const POST = adminRoute(async (req, { id }, admin) => {
  const { reviewStatus } = await parseBody(req, reviewSchema);
  return json({ question: await setReviewStatus(id, reviewStatus, admin.id) });
});
