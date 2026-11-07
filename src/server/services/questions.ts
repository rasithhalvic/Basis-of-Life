import type { Prisma, QuestionCategory, ReviewStatus } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "../db";
import { notFound } from "../errors";
import { logAudit } from "../audit";
import type { questionSchema } from "@/lib/validation";

type QuestionInput = z.infer<typeof questionSchema>;

const include = {
  translations: true,
  options: { include: { translations: true }, orderBy: { position: "asc" } },
} satisfies Prisma.QuestionInclude;

export type QuestionWithContent = Prisma.QuestionGetPayload<{ include: typeof include }>;

/** Flattens a question into the same shape the admin form submits. */
export function toQuestionDto(q: QuestionWithContent) {
  const lang = (locale: "en" | "si") => {
    const t = q.translations.find((x) => x.locale === locale);
    if (!t) return null;
    return {
      prompt: t.prompt,
      explanation: t.explanation,
      options: q.options.map((o) => o.translations.find((x) => x.locale === locale)?.text ?? ""),
    };
  };
  return {
    id: q.id,
    category: q.category,
    difficulty: q.difficulty,
    reviewStatus: q.reviewStatus,
    dataOrigin: q.dataOrigin,
    source: q.source,
    reviewedAt: q.reviewedAt,
    updatedAt: q.updatedAt,
    correctIndex: q.options.findIndex((o) => o.isCorrect),
    translations: { en: lang("en"), si: lang("si") },
  };
}

function optionCreates(input: QuestionInput) {
  return [0, 1, 2, 3].map((position) => ({
    position,
    isCorrect: position === input.correctIndex,
    translations: {
      create: (["en", "si"] as const)
        .filter((l) => input.translations[l])
        .map((locale) => ({ locale, text: input.translations[locale]!.options[position] })),
    },
  }));
}

function translationCreates(input: QuestionInput) {
  return (["en", "si"] as const)
    .filter((l) => input.translations[l])
    .map((locale) => ({
      locale,
      prompt: input.translations[locale]!.prompt,
      explanation: input.translations[locale]!.explanation,
    }));
}

export async function listQuestions(filter: { category?: QuestionCategory; reviewStatus?: ReviewStatus; q?: string }) {
  const list = await prisma.question.findMany({
    where: {
      ...(filter.category ? { category: filter.category } : {}),
      ...(filter.reviewStatus ? { reviewStatus: filter.reviewStatus } : {}),
      ...(filter.q ? { translations: { some: { prompt: { contains: filter.q, mode: "insensitive" } } } } : {}),
    },
    orderBy: [{ category: "asc" }, { createdAt: "asc" }],
    include,
  });
  return list.map(toQuestionDto);
}

export async function getQuestion(id: string) {
  const q = await prisma.question.findUnique({ where: { id }, include });
  if (!q) throw notFound("Question");
  return toQuestionDto(q);
}

export async function createQuestion(input: QuestionInput, adminId: string) {
  const q = await prisma.question.create({
    data: {
      category: input.category,
      difficulty: input.difficulty,
      source: input.source,
      dataOrigin: "PRODUCTION",
      reviewStatus: "UNREVIEWED",
      translations: { create: translationCreates(input) },
      options: { create: optionCreates(input) },
    },
    include,
  });
  await logAudit(prisma, adminId, "question.create", "Question", q.id, { category: q.category });
  return toQuestionDto(q);
}

/** Any content edit sends the question back to UNREVIEWED. Live session snapshots are unaffected. */
export async function updateQuestion(id: string, input: QuestionInput, adminId: string) {
  const exists = await prisma.question.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw notFound("Question");
  const q = await prisma.$transaction(async (tx) => {
    await tx.questionOption.deleteMany({ where: { questionId: id } });
    await tx.questionTranslation.deleteMany({ where: { questionId: id } });
    return tx.question.update({
      where: { id },
      data: {
        category: input.category,
        difficulty: input.difficulty,
        source: input.source,
        reviewStatus: "UNREVIEWED",
        reviewedById: null,
        reviewedAt: null,
        translations: { create: translationCreates(input) },
        options: { create: optionCreates(input) },
      },
      include,
    });
  });
  await logAudit(prisma, adminId, "question.update", "Question", id, { reviewReset: true });
  return toQuestionDto(q);
}

export async function setReviewStatus(id: string, reviewStatus: ReviewStatus, adminId: string) {
  const exists = await prisma.question.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw notFound("Question");
  const q = await prisma.question.update({
    where: { id },
    data: {
      reviewStatus,
      reviewedById: reviewStatus === "UNREVIEWED" ? null : adminId,
      reviewedAt: reviewStatus === "UNREVIEWED" ? null : new Date(),
    },
    include,
  });
  await logAudit(prisma, adminId, "question.review", "Question", id, { reviewStatus });
  return toQuestionDto(q);
}

export async function deleteQuestion(id: string, adminId: string) {
  const exists = await prisma.question.findUnique({ where: { id }, select: { id: true } });
  if (!exists) throw notFound("Question");
  // Session snapshots keep their own copy; only the back-reference is cleared.
  await prisma.question.delete({ where: { id } });
  await logAudit(prisma, adminId, "question.delete", "Question", id, {});
}
