/**
 * Base seed (safe for any environment, idempotent):
 *  - exhibition settings with placeholder text (only if none exist)
 *  - 15 SAMPLE pioneer records (only slugs that do not exist yet)
 *  - 63 SAMPLE general-knowledge questions, all UNREVIEWED (only if none exist)
 *
 * Nothing here is approved exhibition content. No administrator is created.
 */
import { PrismaClient } from "@prisma/client";
import { SAMPLE_PIONEERS } from "./seed-data/pioneers";
import { SAMPLE_QUESTIONS } from "./seed-data/questions";

const prisma = new PrismaClient();

async function main() {
  const settings = await prisma.exhibitionSettings.findUnique({ where: { id: 1 }, include: { translations: true } });
  if (!settings || settings.translations.length === 0) {
    await prisma.exhibitionSettings.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} });
    await prisma.exhibitionSettingsTranslation.createMany({
      data: [
        {
          settingsId: 1,
          locale: "en",
          name: "Pioneers of Medicine",
          introduction:
            "SAMPLE TEXT — replace in Admin → Settings. An exhibition of 15 posters about people who changed medicine, with a general knowledge quiz for visitors.",
          venue: "Venue to be confirmed",
          dateText: "Dates to be confirmed",
        },
        {
          settingsId: 1,
          locale: "si",
          name: "වෛද්‍ය විද්‍යාවේ පුරෝගාමීන්",
          introduction:
            "නියැදි පාඨය — පරිපාලක → සැකසුම් හි වෙනස් කරන්න. වෛද්‍ය විද්‍යාව වෙනස් කළ පුද්ගලයින් පිළිබඳ පෝස්ටර් 15 කින් යුත් ප්‍රදර්ශනයක් සහ නරඹන්නන් සඳහා සාමාන්‍ය දැනීම ප්‍රශ්න විචාරයක්.",
          venue: "ස්ථානය තහවුරු කළ යුතුය",
          dateText: "දිනයන් තහවුරු කළ යුතුය",
        },
      ],
      skipDuplicates: true,
    });
    console.log("✓ Settings (sample text)");
  }

  let created = 0;
  for (const [i, p] of SAMPLE_PIONEERS.entries()) {
    const exists = await prisma.pioneer.findUnique({ where: { slug: p.slug } });
    if (exists) continue;
    const publishedCount = await prisma.pioneer.count({ where: { isPublished: true } });
    await prisma.pioneer.create({
      data: {
        slug: p.slug,
        sortOrder: i + 1,
        isPublished: publishedCount < 15,
        dataOrigin: "SAMPLE",
        sources: p.sources,
        translations: { create: [{ locale: "en", ...p.en }, { locale: "si", ...p.si }] },
      },
    });
    created++;
  }
  console.log(`✓ Pioneers: ${created} sample records created (${SAMPLE_PIONEERS.length - created} already present)`);

  const existingSample = await prisma.question.count({ where: { dataOrigin: "SAMPLE" } });
  if (existingSample === 0) {
    for (const [category, difficulty, enPrompt, enOptions, correct, enExpl, siPrompt, siOptions, siExpl] of SAMPLE_QUESTIONS) {
      await prisma.question.create({
        data: {
          category,
          difficulty,
          reviewStatus: "UNREVIEWED",
          dataOrigin: "SAMPLE",
          source: "Sample question — verify against a reliable reference before review",
          translations: {
            create: [
              { locale: "en", prompt: enPrompt, explanation: enExpl },
              { locale: "si", prompt: siPrompt, explanation: siExpl },
            ],
          },
          options: {
            create: [0, 1, 2, 3].map((position) => ({
              position,
              isCorrect: position === correct,
              translations: {
                create: [
                  { locale: "en", text: enOptions[position] },
                  { locale: "si", text: siOptions[position] },
                ],
              },
            })),
          },
        },
      });
    }
    console.log(`✓ Questions: ${SAMPLE_QUESTIONS.length} sample questions (UNREVIEWED)`);
  } else {
    console.log(`✓ Questions: ${existingSample} sample questions already present`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
