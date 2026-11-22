/**
 * Sets the public exhibition text (name, introduction, venue) in BOTH languages
 * so the Sinhala home page is a faithful translation of the English one.
 * Idempotent. Run once:  npm run db:text   (needs DATABASE_URL)
 * Afterwards the text can still be edited in Admin → Settings.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TEXT = {
  en: {
    name: "Basis Of Life",
    introduction: "Learn about the Basis of Life",
    venue: "Faculty of Medicine",
    dateText: null as string | null,
  },
  si: {
    name: "ජීවයේ පදනම",
    introduction: "ජීවයේ පදනම ගැන ඉගෙන ගන්න",
    venue: "වෛද්‍ය පීඨය",
    dateText: null as string | null,
  },
};

async function main() {
  await prisma.exhibitionSettings.upsert({ where: { id: 1 }, create: { id: 1 }, update: {} });
  for (const locale of ["en", "si"] as const) {
    await prisma.exhibitionSettingsTranslation.upsert({
      where: { settingsId_locale: { settingsId: 1, locale } },
      create: { settingsId: 1, locale, ...TEXT[locale] },
      update: TEXT[locale],
    });
  }
  console.log("✓ Exhibition text set for en and si");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
