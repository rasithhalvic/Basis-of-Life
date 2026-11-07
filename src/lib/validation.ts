import { z } from "zod";

// Shared between client forms and server route handlers.

export const LOCALES = ["en", "si"] as const;
export const localeSchema = z.enum(LOCALES);

export const CATEGORIES = ["SCIENCE", "GEOGRAPHY", "HISTORY", "ARTS", "SPORTS", "TECHNOLOGY", "EVERYDAY"] as const;
export const categorySchema = z.enum(CATEGORIES);
export const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"] as const;
export const difficultySchema = z.enum(DIFFICULTIES);
export const REVIEW_STATUSES = ["UNREVIEWED", "REVIEWED", "REJECTED"] as const;
export const reviewStatusSchema = z.enum(REVIEW_STATUSES);

/** Letters (any script, incl. Sinhala combining marks), digits, spaces, . _ - */
const NICKNAME_RE = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N} ._-]*$/u;

export const nicknameSchema = z
  .string()
  .transform((s) => s.normalize("NFC").trim().replace(/\s+/g, " "))
  .pipe(
    z
      .string()
      .min(2, "Nickname must be at least 2 characters.")
      .max(24, "Nickname must be at most 24 characters.")
      .regex(NICKNAME_RE, "Use letters, numbers, spaces, dots, dashes or underscores."),
  );

export const registerSchema = z.object({
  nickname: nicknameSchema,
  consentToDisplayNickname: z.boolean(),
  locale: localeSchema.default("en"),
});

export const recoverSchema = z.object({
  recoveryCode: z
    .string()
    .transform((s) => s.toUpperCase().replace(/[^0-9A-Z]/g, ""))
    .pipe(z.string().length(12, "Recovery codes have 12 letters and numbers.")),
});

export const sessionCodeSchema = z
  .string()
  .transform((s) => s.toUpperCase().replace(/[^0-9A-Z]/g, ""))
  .pipe(z.string().length(6, "Session codes have 6 characters."));

export const idSchema = z.string().min(1).max(64).regex(/^[a-z0-9]+$/i, "Invalid id.");

export const answerSchema = z.object({
  sessionQuestionId: idSchema,
  optionId: idSchema,
});

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export const SESSION_CAPACITY = 20;

export const sessionSettingsSchema = z.object({
  title: z.string().trim().max(80).optional().nullable(),
  questionCount: z.number().int().min(1).max(50),
  secondsPerQuestion: z.number().int().min(5).max(300),
  breakSeconds: z.number().int().min(0).max(60),
  countdownSeconds: z.number().int().min(0).max(120),
  categories: z.array(categorySchema).max(CATEGORIES.length),
});
export const createSessionSchema = sessionSettingsSchema.partial().extend({
  openImmediately: z.boolean().optional(),
});
export const updateSessionSchema = sessionSettingsSchema.partial();

export const disqualifySchema = z.object({
  reason: z.string().trim().min(3, "Please give a reason.").max(500),
});
export const cancelSchema = z.object({
  reason: z.string().trim().min(3, "Please give a reason.").max(500),
});

export const slugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and single hyphens.");

const shortText = (max: number) => z.string().trim().min(1).max(max);
const stringList = z.array(z.string().trim().min(1).max(1000)).max(30);

export const pioneerTranslationSchema = z.object({
  name: shortText(120),
  lifeDates: shortText(60),
  field: shortText(120),
  introduction: shortText(1500),
  biography: shortText(20000),
  contributions: stringList,
  timeline: z.array(z.object({ year: shortText(30), event: shortText(500) })).max(40),
  facts: stringList,
  portraitAlt: shortText(300),
});

const optionalUrl = z
  .union([z.literal(""), z.url({ protocol: /^https?$/ })])
  .optional()
  .nullable()
  .transform((v) => v || null);

export const pioneerSchema = z.object({
  slug: slugSchema,
  sortOrder: z.number().int().min(0).max(1000),
  isPublished: z.boolean(),
  portraitUrl: z
    .union([z.literal(""), z.url({ protocol: /^https?$/ }), z.string().regex(/^\/[\w\-./]+$/)])
    .optional()
    .nullable()
    .transform((v) => v || null),
  portraitAttribution: z.string().trim().max(500).optional().nullable().transform((v) => v || null),
  portraitLicense: z.string().trim().max(200).optional().nullable().transform((v) => v || null),
  sources: z.array(z.object({ title: shortText(300), url: optionalUrl })).max(30),
  translations: z.object({ en: pioneerTranslationSchema, si: pioneerTranslationSchema.optional().nullable() }),
});

export const questionTranslationSchema = z.object({
  prompt: shortText(500),
  options: z.array(shortText(200)).length(4),
  explanation: z.string().trim().max(1000).optional().nullable().transform((v) => v || null),
});

export const questionSchema = z.object({
  category: categorySchema,
  difficulty: difficultySchema,
  source: z.string().trim().max(500).optional().nullable().transform((v) => v || null),
  correctIndex: z.number().int().min(0).max(3),
  translations: z.object({ en: questionTranslationSchema, si: questionTranslationSchema.optional().nullable() }),
});

export const reviewSchema = z.object({ reviewStatus: reviewStatusSchema });

const settingsTranslationSchema = z.object({
  name: shortText(160),
  introduction: shortText(3000),
  venue: shortText(300),
  dateText: z.string().trim().max(120).optional().nullable().transform((v) => v || null),
});

export const settingsSchema = z.object({
  publicBaseUrl: optionalUrl,
  eventStartsAt: z.iso.datetime({ offset: true }).optional().nullable(),
  eventEndsAt: z.iso.datetime({ offset: true }).optional().nullable(),
  grandQualifyTopN: z.number().int().min(1).max(20),
  defaultQuestionCount: z.number().int().min(1).max(50),
  defaultSecondsPerQuestion: z.number().int().min(5).max(300),
  rankingsDeclaredFinal: z.boolean(),
  translations: z.object({ en: settingsTranslationSchema, si: settingsTranslationSchema }),
});
