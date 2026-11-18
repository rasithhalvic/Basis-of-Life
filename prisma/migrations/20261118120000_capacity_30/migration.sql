-- Session capacity raised from 20 to 30 participants.
ALTER TABLE "QuizSession" DROP CONSTRAINT "QuizSession_capacity_fixed";
ALTER TABLE "QuizSession" ADD CONSTRAINT "QuizSession_capacity_fixed" CHECK ("capacity" = 30);
ALTER TABLE "QuizSession" ALTER COLUMN "capacity" SET DEFAULT 30;

-- Sessions that haven't started yet get the new size. Started or finished sessions keep 20.
UPDATE "QuizSession" SET "capacity" = 30 WHERE "status" IN ('DRAFT', 'OPEN');
