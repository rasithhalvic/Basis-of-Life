import { Prisma } from "@prisma/client";
import { prisma } from "../db";
import { dbNow } from "../clock";
import { ApiError, notFound } from "../errors";
import { syncStatus } from "./sessions";

export interface AnswerReceipt {
  status: "accepted";
  duplicate: boolean;
  sessionQuestionId: string;
  optionId: string;
  receivedAt: string;
}

/**
 * Accepts one answer per participant per question. Every check runs on the
 * server: membership, session status, question window (database clock) and
 * option validity. Retrying the same answer is idempotent; a different
 * answer for an already-answered question is rejected. Correctness is never
 * returned here.
 */
export async function submitAnswer(input: {
  participantId: string;
  sessionId: string;
  sessionQuestionId: string;
  optionId: string;
}): Promise<AnswerReceipt> {
  const session = await prisma.quizSession.findUnique({
    where: { id: input.sessionId },
    select: { id: true, status: true, endsAt: true },
  });
  if (!session) throw notFound("Session");

  const membership = await prisma.sessionParticipant.findUnique({
    where: { sessionId_participantId: { sessionId: input.sessionId, participantId: input.participantId } },
    select: { id: true, disqualifiedAt: true },
  });
  if (!membership) throw new ApiError(403, "NOT_A_MEMBER", "You are not admitted to this session.");
  if (membership.disqualifiedAt) throw new ApiError(403, "DISQUALIFIED", "You have been disqualified from this session.");

  // Retries of an already-accepted answer succeed even after the window closes.
  const existing = await findExisting(membership.id, input.sessionQuestionId);
  if (existing) return receipt(existing, input.optionId);

  const status = (await syncStatus(prisma, session)).status;
  if (status === "COMPLETED" || status === "FINALIZED") {
    throw new ApiError(409, "QUESTION_EXPIRED", "The time for this question has ended.");
  }
  if (status !== "LIVE") throw new ApiError(409, "SESSION_NOT_LIVE", "This session is not running.");

  const question = await prisma.sessionQuestion.findFirst({
    where: { id: input.sessionQuestionId, sessionId: input.sessionId },
    select: { id: true, opensAt: true, closesAt: true, secondsPerQuestion: true, options: { select: { id: true } } },
  });
  if (!question) throw notFound("Question");
  if (!question.options.some((o) => o.id === input.optionId)) {
    throw new ApiError(422, "INVALID_OPTION", "That option does not belong to this question.");
  }

  const now = await dbNow(prisma);
  if (now < question.opensAt) throw new ApiError(409, "QUESTION_NOT_OPEN", "This question is not open yet.");
  if (now >= question.closesAt) throw new ApiError(409, "QUESTION_EXPIRED", "The time for this question has ended.");

  const responseMs = Math.min(
    Math.max(0, now.getTime() - question.opensAt.getTime()),
    question.secondsPerQuestion * 1000,
  );
  try {
    const created = await prisma.answer.create({
      data: {
        sessionParticipantId: membership.id,
        sessionQuestionId: question.id,
        selectedOptionId: input.optionId,
        receivedAt: now,
        responseMs,
      },
      select: { sessionQuestionId: true, selectedOptionId: true, receivedAt: true },
    });
    return { status: "accepted", duplicate: false, ...format(created) };
  } catch (e) {
    // Concurrent duplicate submission: the unique constraint picked one winner.
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const winner = await findExisting(membership.id, question.id);
      if (winner) return receipt(winner, input.optionId);
    }
    throw e;
  }
}

function findExisting(sessionParticipantId: string, sessionQuestionId: string) {
  return prisma.answer.findUnique({
    where: { sessionParticipantId_sessionQuestionId: { sessionParticipantId, sessionQuestionId } },
    select: { sessionQuestionId: true, selectedOptionId: true, receivedAt: true },
  });
}

function format(a: { sessionQuestionId: string; selectedOptionId: string; receivedAt: Date }) {
  return { sessionQuestionId: a.sessionQuestionId, optionId: a.selectedOptionId, receivedAt: a.receivedAt.toISOString() };
}

function receipt(
  a: { sessionQuestionId: string; selectedOptionId: string; receivedAt: Date },
  requestedOptionId: string,
): AnswerReceipt {
  if (a.selectedOptionId !== requestedOptionId) {
    throw new ApiError(409, "ANSWER_ALREADY_SUBMITTED", "An answer was already accepted for this question and cannot be changed.", {
      acceptedOptionId: a.selectedOptionId,
    });
  }
  return { status: "accepted", duplicate: true, ...format(a) };
}
