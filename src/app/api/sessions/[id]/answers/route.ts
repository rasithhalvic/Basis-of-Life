import { json, parseBody } from "@/server/http";
import { publicRoute } from "@/server/public-route";
import { LIMITS, limitAll, rule } from "@/server/rate-limit";
import { requireParticipant } from "@/server/participant-auth";
import { submitAnswer } from "@/server/services/answers";
import { answerSchema, idSchema } from "@/lib/validation";

/** POST /api/sessions/{id}/answers — submit an answer (correctness is never returned). */
export const POST = publicRoute(async (req, params) => {
  const p = await requireParticipant(req);
  await limitAll([rule(`answer:p:${p.id}`, LIMITS.answerPerParticipant)]);
  const sessionId = idSchema.parse(params.id);
  const body = await parseBody(req, answerSchema);
  const receipt = await submitAnswer({
    participantId: p.id,
    sessionId,
    sessionQuestionId: body.sessionQuestionId,
    optionId: body.optionId,
  });
  return json(receipt, { status: receipt.duplicate ? 200 : 201 });
});
