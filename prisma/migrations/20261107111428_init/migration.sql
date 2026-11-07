-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en', 'si');

-- CreateEnum
CREATE TYPE "DataOrigin" AS ENUM ('SAMPLE', 'DEMO', 'PRODUCTION');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('UNREVIEWED', 'REVIEWED', 'REJECTED');

-- CreateEnum
CREATE TYPE "QuestionCategory" AS ENUM ('SCIENCE', 'GEOGRAPHY', 'HISTORY', 'ARTS', 'SPORTS', 'TECHNOLOGY', 'EVERYDAY');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('DRAFT', 'OPEN', 'LIVE', 'COMPLETED', 'FINALIZED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ExhibitionSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "publicBaseUrl" TEXT,
    "eventStartsAt" TIMESTAMPTZ(3),
    "eventEndsAt" TIMESTAMPTZ(3),
    "grandQualifyTopN" INTEGER NOT NULL DEFAULT 3,
    "defaultQuestionCount" INTEGER NOT NULL DEFAULT 10,
    "defaultSecondsPerQuestion" INTEGER NOT NULL DEFAULT 30,
    "rankingsDeclaredFinal" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "ExhibitionSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitionSettingsTranslation" (
    "settingsId" INTEGER NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "dateText" TEXT,

    CONSTRAINT "ExhibitionSettingsTranslation_pkey" PRIMARY KEY ("settingsId","locale")
);

-- CreateTable
CREATE TABLE "Pioneer" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "dataOrigin" "DataOrigin" NOT NULL DEFAULT 'SAMPLE',
    "portraitUrl" TEXT,
    "portraitAttribution" TEXT,
    "portraitLicense" TEXT,
    "sources" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Pioneer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PioneerTranslation" (
    "pioneerId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "lifeDates" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "contributions" JSONB NOT NULL DEFAULT '[]',
    "timeline" JSONB NOT NULL DEFAULT '[]',
    "facts" JSONB NOT NULL DEFAULT '[]',
    "portraitAlt" TEXT NOT NULL,

    CONSTRAINT "PioneerTranslation_pkey" PRIMARY KEY ("pioneerId","locale")
);

-- CreateTable
CREATE TABLE "PioneerSlugRedirect" (
    "oldSlug" TEXT NOT NULL,
    "pioneerId" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PioneerSlugRedirect_pkey" PRIMARY KEY ("oldSlug")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "nicknameConsent" BOOLEAN NOT NULL,
    "recoveryCodeHash" TEXT NOT NULL,
    "preferredLocale" "Locale" NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantCredential" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMPTZ(3) NOT NULL,
    "revokedAt" TIMESTAMPTZ(3),

    CONSTRAINT "ParticipantCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tokenVersion" INTEGER NOT NULL DEFAULT 0,
    "failedLoginCount" INTEGER NOT NULL DEFAULT 0,
    "lockedUntil" TIMESTAMPTZ(3),
    "lastLoginAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "category" "QuestionCategory" NOT NULL,
    "difficulty" "Difficulty" NOT NULL DEFAULT 'MEDIUM',
    "reviewStatus" "ReviewStatus" NOT NULL DEFAULT 'UNREVIEWED',
    "dataOrigin" "DataOrigin" NOT NULL DEFAULT 'PRODUCTION',
    "source" TEXT,
    "reviewedById" TEXT,
    "reviewedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionTranslation" (
    "questionId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "prompt" TEXT NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "QuestionTranslation_pkey" PRIMARY KEY ("questionId","locale")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOptionTranslation" (
    "optionId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "QuestionOptionTranslation_pkey" PRIMARY KEY ("optionId","locale")
);

-- CreateTable
CREATE TABLE "QuizSession" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT,
    "status" "SessionStatus" NOT NULL DEFAULT 'DRAFT',
    "capacity" INTEGER NOT NULL DEFAULT 20,
    "questionCount" INTEGER NOT NULL DEFAULT 10,
    "secondsPerQuestion" INTEGER NOT NULL DEFAULT 30,
    "breakSeconds" INTEGER NOT NULL DEFAULT 5,
    "countdownSeconds" INTEGER NOT NULL DEFAULT 10,
    "categories" "QuestionCategory"[] DEFAULT ARRAY[]::"QuestionCategory"[],
    "createdById" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "openedAt" TIMESTAMPTZ(3),
    "startedAt" TIMESTAMPTZ(3),
    "endsAt" TIMESTAMPTZ(3),
    "completedAt" TIMESTAMPTZ(3),
    "finalizedAt" TIMESTAMPTZ(3),
    "cancelledAt" TIMESTAMPTZ(3),
    "cancelReason" TEXT,

    CONSTRAINT "QuizSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionQuestion" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "sourceQuestionId" TEXT,
    "category" "QuestionCategory" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "promptEn" TEXT NOT NULL,
    "promptSi" TEXT NOT NULL,
    "explanationEn" TEXT,
    "explanationSi" TEXT,
    "source" TEXT,
    "secondsPerQuestion" INTEGER NOT NULL,
    "opensAt" TIMESTAMPTZ(3) NOT NULL,
    "closesAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "SessionQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionQuestionOption" (
    "id" TEXT NOT NULL,
    "sessionQuestionId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "textEn" TEXT NOT NULL,
    "textSi" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,

    CONSTRAINT "SessionQuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionParticipant" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "admittedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disqualifiedAt" TIMESTAMPTZ(3),
    "disqualificationReason" TEXT,
    "disqualifiedById" TEXT,

    CONSTRAINT "SessionParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "sessionParticipantId" TEXT NOT NULL,
    "sessionQuestionId" TEXT NOT NULL,
    "selectedOptionId" TEXT NOT NULL,
    "receivedAt" TIMESTAMPTZ(3) NOT NULL,
    "responseMs" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "details" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimitBucket" (
    "key" TEXT NOT NULL,
    "windowStart" TIMESTAMPTZ(3) NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "RateLimitBucket_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pioneer_slug_key" ON "Pioneer"("slug");

-- CreateIndex
CREATE INDEX "Pioneer_isPublished_sortOrder_idx" ON "Pioneer"("isPublished", "sortOrder");

-- CreateIndex
CREATE INDEX "PioneerSlugRedirect_pioneerId_idx" ON "PioneerSlugRedirect"("pioneerId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_recoveryCodeHash_key" ON "Participant"("recoveryCodeHash");

-- CreateIndex
CREATE UNIQUE INDEX "ParticipantCredential_tokenHash_key" ON "ParticipantCredential"("tokenHash");

-- CreateIndex
CREATE INDEX "ParticipantCredential_participantId_idx" ON "ParticipantCredential"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE INDEX "Question_reviewStatus_category_idx" ON "Question"("reviewStatus", "category");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionId_position_key" ON "QuestionOption"("questionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "QuizSession_code_key" ON "QuizSession"("code");

-- CreateIndex
CREATE INDEX "QuizSession_status_createdAt_idx" ON "QuizSession"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SessionQuestion_sessionId_opensAt_idx" ON "SessionQuestion"("sessionId", "opensAt");

-- CreateIndex
CREATE UNIQUE INDEX "SessionQuestion_sessionId_position_key" ON "SessionQuestion"("sessionId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "SessionQuestionOption_sessionQuestionId_position_key" ON "SessionQuestionOption"("sessionQuestionId", "position");

-- CreateIndex
CREATE INDEX "SessionParticipant_participantId_idx" ON "SessionParticipant"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionParticipant_sessionId_participantId_key" ON "SessionParticipant"("sessionId", "participantId");

-- CreateIndex
CREATE INDEX "Answer_sessionQuestionId_idx" ON "Answer"("sessionQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answer_sessionParticipantId_sessionQuestionId_key" ON "Answer"("sessionParticipantId", "sessionQuestionId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "RateLimitBucket_windowStart_idx" ON "RateLimitBucket"("windowStart");

-- AddForeignKey
ALTER TABLE "ExhibitionSettingsTranslation" ADD CONSTRAINT "ExhibitionSettingsTranslation_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "ExhibitionSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PioneerTranslation" ADD CONSTRAINT "PioneerTranslation_pioneerId_fkey" FOREIGN KEY ("pioneerId") REFERENCES "Pioneer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PioneerSlugRedirect" ADD CONSTRAINT "PioneerSlugRedirect_pioneerId_fkey" FOREIGN KEY ("pioneerId") REFERENCES "Pioneer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantCredential" ADD CONSTRAINT "ParticipantCredential_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionTranslation" ADD CONSTRAINT "QuestionTranslation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOptionTranslation" ADD CONSTRAINT "QuestionOptionTranslation_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "QuestionOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestion" ADD CONSTRAINT "SessionQuestion_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestion" ADD CONSTRAINT "SessionQuestion_sourceQuestionId_fkey" FOREIGN KEY ("sourceQuestionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionQuestionOption" ADD CONSTRAINT "SessionQuestionOption_sessionQuestionId_fkey" FOREIGN KEY ("sessionQuestionId") REFERENCES "SessionQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionParticipant" ADD CONSTRAINT "SessionParticipant_disqualifiedById_fkey" FOREIGN KEY ("disqualifiedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_sessionParticipantId_fkey" FOREIGN KEY ("sessionParticipantId") REFERENCES "SessionParticipant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_sessionQuestionId_fkey" FOREIGN KEY ("sessionQuestionId") REFERENCES "SessionQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "SessionQuestionOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- ===========================================================================
-- Hand-written constraints, triggers and views (not expressible in Prisma DSL)
-- ===========================================================================

-- Session capacity is fixed at 20 participants.
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_capacity_fixed" CHECK ("capacity" = 20);
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_question_count_range" CHECK ("questionCount" BETWEEN 1 AND 50);
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_seconds_range" CHECK ("secondsPerQuestion" BETWEEN 5 AND 300);
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_break_range" CHECK ("breakSeconds" BETWEEN 0 AND 60);
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_countdown_range" CHECK ("countdownSeconds" BETWEEN 0 AND 120);
ALTER TABLE "ExhibitionSettings" ADD CONSTRAINT "ExhibitionSettings_singleton" CHECK ("id" = 1);
ALTER TABLE "ExhibitionSettings" ADD CONSTRAINT "ExhibitionSettings_topn_range" CHECK ("grandQualifyTopN" BETWEEN 1 AND 20);
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_position_range" CHECK ("position" BETWEEN 0 AND 3);
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_response_nonnegative" CHECK ("responseMs" >= 0);

-- At most one correct option per bank question.
CREATE UNIQUE INDEX "QuestionOption_one_correct" ON "QuestionOption" ("questionId") WHERE "isCorrect";

-- Session question snapshots are immutable once written. The only permitted
-- change is ON DELETE SET NULL of the back-reference to the question bank.
CREATE FUNCTION reject_snapshot_update() RETURNS trigger AS $$
BEGIN
  IF (to_jsonb(NEW) - 'sourceQuestionId') IS DISTINCT FROM (to_jsonb(OLD) - 'sourceQuestionId') THEN
    RAISE EXCEPTION 'Session question snapshots are immutable (table %)', TG_TABLE_NAME
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "SessionQuestion_immutable" BEFORE UPDATE ON "SessionQuestion"
  FOR EACH ROW EXECUTE FUNCTION reject_snapshot_update();
CREATE TRIGGER "SessionQuestionOption_immutable" BEFORE UPDATE ON "SessionQuestionOption"
  FOR EACH ROW EXECUTE FUNCTION reject_snapshot_update();

-- Snapshots may only be added while the session has not started.
CREATE FUNCTION reject_snapshot_insert_after_start() RETURNS trigger AS $$
DECLARE s "SessionStatus";
BEGIN
  SELECT status INTO s FROM "QuizSession" WHERE id = NEW."sessionId";
  IF s NOT IN ('DRAFT', 'OPEN') THEN
    RAISE EXCEPTION 'Cannot add questions to a session with status %', s
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "SessionQuestion_insert_before_start" BEFORE INSERT ON "SessionQuestion"
  FOR EACH ROW EXECUTE FUNCTION reject_snapshot_insert_after_start();

-- Derived per-participant session scores. Scores are never stored or accepted
-- from clients: 100 points per correct answer, response time from server
-- receipt, full question time for unanswered questions.
CREATE VIEW "SessionParticipantScore" AS
SELECT
  sp."id"                                                   AS "sessionParticipantId",
  sp."sessionId",
  sp."participantId",
  (sp."disqualifiedAt" IS NOT NULL)                         AS "disqualified",
  COALESCE(SUM(CASE WHEN o."isCorrect" THEN 100 ELSE 0 END), 0)::int AS "totalPoints",
  COALESCE(SUM(CASE WHEN o."isCorrect" THEN 1 ELSE 0 END), 0)::int   AS "correctCount",
  COUNT(a."id")::int                                        AS "answeredCount",
  COUNT(sq."id")::int                                       AS "questionCount",
  COALESCE(SUM(COALESCE(a."responseMs", sq."secondsPerQuestion" * 1000)), 0)::bigint AS "totalTimeMs"
FROM "SessionParticipant" sp
JOIN "SessionQuestion" sq ON sq."sessionId" = sp."sessionId"
LEFT JOIN "Answer" a ON a."sessionParticipantId" = sp."id" AND a."sessionQuestionId" = sq."id"
LEFT JOIN "SessionQuestionOption" o ON o."id" = a."selectedOptionId"
GROUP BY sp."id";
