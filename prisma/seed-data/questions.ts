import type { QuestionCategory } from "@prisma/client";

type Diff = "EASY" | "MEDIUM" | "HARD";
export type SampleQuestion = [QuestionCategory, Diff, string, [string, string, string, string], number, string, string, [string, string, string, string], string];

// Add your own questions through Admin → Question bank.
export const SAMPLE_QUESTIONS: SampleQuestion[] = [];
