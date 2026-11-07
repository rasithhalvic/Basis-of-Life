export type ErrorCode =
  | "BAD_REQUEST"
  | "VALIDATION_FAILED"
  | "UNAUTHENTICATED"
  | "FORBIDDEN"
  | "ORIGIN_REJECTED"
  | "NOT_FOUND"
  | "RATE_LIMITED"
  | "CONFLICT"
  | "SESSION_FULL"
  | "SESSION_CLOSED"
  | "SESSION_NOT_LIVE"
  | "ALREADY_IN_ACTIVE_SESSION"
  | "NOT_A_MEMBER"
  | "DISQUALIFIED"
  | "QUESTION_NOT_OPEN"
  | "QUESTION_EXPIRED"
  | "ANSWER_ALREADY_SUBMITTED"
  | "INVALID_OPTION"
  | "INVALID_TRANSITION"
  | "NOT_ENOUGH_QUESTIONS"
  | "PUBLISH_LIMIT"
  | "SLUG_TAKEN"
  | "RESULTS_NOT_AVAILABLE"
  | "INTERNAL_ERROR";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const notFound = (what = "Resource") => new ApiError(404, "NOT_FOUND", `${what} not found.`);
