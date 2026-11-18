-- Session capacity raised from 20 to 30 participants.
ALTER TABLE "QuizSession" DROP CONSTRAINT IF EXISTS "QuizSession_capacity_fixed";
UPDATE "QuizSession" SET "capacity" = 30;
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_capacity_fixed" CHECK ("capacity" = 30);
ALTER TABLE "QuizSession" ALTER COLUMN "capacity" SET DEFAULT 30;
