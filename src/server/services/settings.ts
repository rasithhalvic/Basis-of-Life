import type { Locale } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "../db";
import { env } from "../env";
import { ApiError } from "../errors";
import { logAudit } from "../audit";
import type { settingsSchema } from "@/lib/validation";

const DEFAULT_TEXT = {
  en: {
    name: "Pioneers of Medicine",
    introduction: "An exhibition about people who changed medicine. Configure this text in the admin dashboard.",
    venue: "Venue to be announced",
    dateText: null,
  },
  si: {
    name: "වෛද්‍ය විද්‍යාවේ පුරෝගාමීන්",
    introduction: "වෛද්‍ය විද්‍යාව වෙනස් කළ පුද්ගලයින් පිළිබඳ ප්‍රදර්ශනයකි.",
    venue: "ස්ථානය පසුව දැනුම් දෙනු ලැබේ",
    dateText: null,
  },
};

export async function getSettings() {
  const s = await prisma.exhibitionSettings.upsert({
    where: { id: 1 },
    create: { id: 1 },
    update: {},
    include: { translations: true },
  });
  return s;
}

export async function getPublicSettings(locale: Locale) {
  const s = await getSettings();
  const t = s.translations.find((x) => x.locale === locale) ?? s.translations.find((x) => x.locale === "en");
  const text = t ?? DEFAULT_TEXT[locale];
  return {
    name: text.name,
    introduction: text.introduction,
    venue: text.venue,
    dateText: text.dateText,
    eventStartsAt: s.eventStartsAt?.toISOString() ?? null,
    eventEndsAt: s.eventEndsAt?.toISOString() ?? null,
    grandQualifyTopN: s.grandQualifyTopN,
  };
}

/** Base URL for printed QR codes: admin setting first, then PUBLIC_BASE_URL. */
export async function getPublicBaseUrl() {
  const s = await getSettings();
  return (s.publicBaseUrl ?? env.publicBaseUrl).replace(/\/+$/, "");
}

export async function updateSettings(input: z.infer<typeof settingsSchema>, adminId: string) {
  if (input.rankingsDeclaredFinal) {
    const pending = await prisma.quizSession.count({ where: { status: { in: ["DRAFT", "OPEN", "LIVE", "COMPLETED"] } } });
    if (pending > 0) {
      throw new ApiError(409, "INVALID_TRANSITION", "Finalize or cancel all sessions before declaring the grand leaderboard final.");
    }
  }
  const before = await getSettings();
  await prisma.$transaction(async (tx) => {
    await tx.exhibitionSettings.update({
      where: { id: 1 },
      data: {
        publicBaseUrl: input.publicBaseUrl,
        eventStartsAt: input.eventStartsAt ? new Date(input.eventStartsAt) : null,
        eventEndsAt: input.eventEndsAt ? new Date(input.eventEndsAt) : null,
        grandQualifyTopN: input.grandQualifyTopN,
        defaultQuestionCount: input.defaultQuestionCount,
        defaultSecondsPerQuestion: input.defaultSecondsPerQuestion,
        rankingsDeclaredFinal: input.rankingsDeclaredFinal,
      },
    });
    for (const locale of ["en", "si"] as const) {
      const t = input.translations[locale];
      await tx.exhibitionSettingsTranslation.upsert({
        where: { settingsId_locale: { settingsId: 1, locale } },
        create: { settingsId: 1, locale, ...t },
        update: t,
      });
    }
  });
  await logAudit(prisma, adminId, "settings.update", "ExhibitionSettings", "1", {
    grandQualifyTopN: { from: before.grandQualifyTopN, to: input.grandQualifyTopN },
    publicBaseUrl: { from: before.publicBaseUrl, to: input.publicBaseUrl },
    rankingsDeclaredFinal: input.rankingsDeclaredFinal,
  });
  return getSettings();
}
