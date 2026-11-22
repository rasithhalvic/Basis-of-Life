-- Add the GENERAL question category (existing data is untouched).
ALTER TYPE "QuestionCategory" ADD VALUE IF NOT EXISTS 'GENERAL';
