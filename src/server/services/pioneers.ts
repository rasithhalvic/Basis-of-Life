import type { Locale, Pioneer, PioneerTranslation, Prisma } from "@prisma/client";
import type { z } from "zod";
import { prisma } from "../db";
import { ApiError, notFound } from "../errors";
import { logAudit } from "../audit";
import type { pioneerSchema } from "@/lib/validation";

export const PUBLISHED_PIONEER_LIMIT = 15;

type PioneerWithT = Pioneer & { translations: PioneerTranslation[] };

function pick(p: PioneerWithT, locale: Locale) {
  return p.translations.find((t) => t.locale === locale) ?? p.translations.find((t) => t.locale === "en")!;
}

export function toPublicPioneer(p: PioneerWithT, locale: Locale) {
  const t = pick(p, locale);
  return {
    slug: p.slug,
    isSample: p.dataOrigin !== "PRODUCTION",
    locale: t.locale,
    name: t.name,
    lifeDates: t.lifeDates,
    field: t.field,
    introduction: t.introduction,
    biography: t.biography,
    contributions: t.contributions as string[],
    timeline: t.timeline as { year: string; event: string }[],
    facts: t.facts as string[],
    portrait: {
      url: p.portraitUrl,
      alt: t.portraitAlt,
      attribution: p.portraitAttribution,
      license: p.portraitLicense,
    },
    sources: p.sources as { title: string; url: string | null }[],
  };
}

export async function listPublishedPioneers(locale: Locale) {
  const list = await prisma.pioneer.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: { translations: true },
  });
  return list.map((p) => {
    const full = toPublicPioneer(p, locale);
    return {
      slug: full.slug,
      isSample: full.isSample,
      name: full.name,
      lifeDates: full.lifeDates,
      field: full.field,
      introduction: full.introduction,
      portrait: full.portrait,
      // English name is always included so search works across languages.
      nameEn: pick(p, "en").name,
    };
  });
}

/** Returns the pioneer, or a redirect target when an old slug is used. */
export async function findPioneerBySlug(slug: string, locale: Locale) {
  const p = await prisma.pioneer.findUnique({ where: { slug }, include: { translations: true } });
  if (p && p.isPublished) return { pioneer: toPublicPioneer(p, locale), redirectTo: null };
  if (!p) {
    const r = await prisma.pioneerSlugRedirect.findUnique({
      where: { oldSlug: slug },
      select: { pioneer: { select: { slug: true, isPublished: true } } },
    });
    if (r?.pioneer.isPublished) return { pioneer: null, redirectTo: r.pioneer.slug };
  }
  return { pioneer: null, redirectTo: null };
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

type PioneerInput = z.infer<typeof pioneerSchema>;

function translationRows(input: PioneerInput) {
  const rows: Prisma.PioneerTranslationCreateWithoutPioneerInput[] = [];
  for (const locale of ["en", "si"] as const) {
    const t = input.translations[locale];
    if (t) rows.push({ locale, ...t });
  }
  return rows;
}

async function assertPublishCapacity(excludeId: string | null) {
  const published = await prisma.pioneer.count({
    where: { isPublished: true, ...(excludeId ? { id: { not: excludeId } } : {}) },
  });
  if (published >= PUBLISHED_PIONEER_LIMIT) {
    throw new ApiError(409, "PUBLISH_LIMIT", `Exactly ${PUBLISHED_PIONEER_LIMIT} pioneers can be published. Unpublish another first.`);
  }
}

async function assertSlugAvailable(slug: string, pioneerId: string | null) {
  const owner = await prisma.pioneer.findUnique({ where: { slug }, select: { id: true } });
  if (owner && owner.id !== pioneerId) throw new ApiError(409, "SLUG_TAKEN", "That slug is already used.");
  const redirect = await prisma.pioneerSlugRedirect.findUnique({ where: { oldSlug: slug } });
  if (redirect && redirect.pioneerId !== pioneerId) {
    throw new ApiError(409, "SLUG_TAKEN", "That slug was previously used by another pioneer (printed QR codes may point to it).");
  }
}

export async function createPioneer(input: PioneerInput, adminId: string) {
  await assertSlugAvailable(input.slug, null);
  if (input.isPublished) await assertPublishCapacity(null);
  const p = await prisma.pioneer.create({
    data: {
      slug: input.slug,
      sortOrder: input.sortOrder,
      isPublished: input.isPublished,
      dataOrigin: "PRODUCTION",
      portraitUrl: input.portraitUrl,
      portraitAttribution: input.portraitAttribution,
      portraitLicense: input.portraitLicense,
      sources: input.sources,
      translations: { create: translationRows(input) },
    },
  });
  await logAudit(prisma, adminId, "pioneer.create", "Pioneer", p.id, { slug: p.slug });
  return p;
}

export async function updatePioneer(id: string, input: PioneerInput, adminId: string) {
  const current = await prisma.pioneer.findUnique({ where: { id } });
  if (!current) throw notFound("Pioneer");
  await assertSlugAvailable(input.slug, id);
  if (input.isPublished && !current.isPublished) await assertPublishCapacity(id);

  const slugChanged = input.slug !== current.slug;
  const updated = await prisma.$transaction(async (tx) => {
    if (slugChanged) {
      // Keep the old URL working for printed QR codes.
      await tx.pioneerSlugRedirect.deleteMany({ where: { oldSlug: input.slug } });
      await tx.pioneerSlugRedirect.upsert({
        where: { oldSlug: current.slug },
        create: { oldSlug: current.slug, pioneerId: id },
        update: { pioneerId: id },
      });
    }
    await tx.pioneerTranslation.deleteMany({ where: { pioneerId: id } });
    return tx.pioneer.update({
      where: { id },
      data: {
        slug: input.slug,
        sortOrder: input.sortOrder,
        isPublished: input.isPublished,
        // Once edited by an administrator the record is no longer untouched sample data.
        dataOrigin: "PRODUCTION",
        portraitUrl: input.portraitUrl,
        portraitAttribution: input.portraitAttribution,
        portraitLicense: input.portraitLicense,
        sources: input.sources,
        translations: { create: translationRows(input) },
      },
    });
  });
  await logAudit(prisma, adminId, "pioneer.update", "Pioneer", id, {
    slug: updated.slug,
    ...(slugChanged ? { previousSlug: current.slug, redirectCreated: true } : {}),
    isPublished: updated.isPublished,
  });
  return updated;
}

export async function deletePioneer(id: string, adminId: string) {
  const p = await prisma.pioneer.findUnique({ where: { id } });
  if (!p) throw notFound("Pioneer");
  if (p.isPublished) {
    throw new ApiError(409, "CONFLICT", "Unpublish the pioneer before deleting it. Printed QR codes may point to it.");
  }
  await prisma.pioneer.delete({ where: { id } });
  await logAudit(prisma, adminId, "pioneer.delete", "Pioneer", id, { slug: p.slug });
}

export async function adminListPioneers() {
  return prisma.pioneer.findMany({
    orderBy: [{ sortOrder: "asc" }],
    include: { translations: true, redirects: true },
  });
}
