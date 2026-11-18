-- Replace the category list. Old categories can't be mapped to the new ones,
-- so questions and started sessions that use them are removed first.
DELETE FROM "QuizSession" WHERE "id" IN (SELECT DISTINCT "sessionId" FROM "SessionQuestion");
UPDATE "QuizSession" SET "categories" = ARRAY[]::"QuestionCategory"[];
DELETE FROM "Question";

ALTER TABLE "QuizSession" ALTER COLUMN "categories" DROP DEFAULT;
ALTER TYPE "QuestionCategory" RENAME TO "QuestionCategory_old";
CREATE TYPE "QuestionCategory" AS ENUM ('NERVOUS', 'MUSCULOSKELETAL', 'RADIOLOGY', 'CARDIOVASCULAR', 'RESPIRATORY', 'RENAL', 'GASTROINTESTINAL', 'GENETICS', 'ENDOCRINE');
ALTER TABLE "Question" ALTER COLUMN "category" TYPE "QuestionCategory" USING ("category"::text::"QuestionCategory");
ALTER TABLE "SessionQuestion" ALTER COLUMN "category" TYPE "QuestionCategory" USING ("category"::text::"QuestionCategory");
ALTER TABLE "QuizSession" ALTER COLUMN "categories" TYPE "QuestionCategory"[] USING ("categories"::text[]::"QuestionCategory"[]);
ALTER TABLE "QuizSession" ALTER COLUMN "categories" SET DEFAULT ARRAY[]::"QuestionCategory"[];
DROP TYPE "QuestionCategory_old";
