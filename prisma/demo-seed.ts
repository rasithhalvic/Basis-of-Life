/**
 * DEVELOPMENT-ONLY demo fixture.
 *
 * Creates DEMO copies of the sample questions marked REVIEWED (so a complete
 * quiz can be demonstrated locally) and a demo administrator.
 *
 * Refuses to run in production or against a non-local database unless
 * ALLOW_DEMO_SEED=true is set explicitly. Remove with `npm run db:demo:remove`.
 */
import { randomBytes } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SAMPLE_QUESTIONS } from "./seed-data/questions";

const prisma = new PrismaClient();

function guard() {
  const url = process.env.DATABASE_URL ?? "";
  const host = (() => {
    try {
      return new URL(url).hostname;
    } catch {
      return "";
    }
  })();
  const local = ["localhost", "127.0.0.1", "::1", "db"].includes(host);
  if (process.env.NODE_ENV === "production" || process.env.APP_ENV === "production") {
    throw new Error("Refusing to load demo data in production.");
  }
  if (!local && process.env.ALLOW_DEMO_SEED !== "true") {
    throw new Error(`Refusing to load demo data into non-local database host "${host}". Set ALLOW_DEMO_SEED=true to override.`);
  }
}

async function remove() {
  const q = await prisma.question.deleteMany({ where: { dataOrigin: "DEMO" } });
  const a = await prisma.adminUser.deleteMany({ where: { email: { endsWith: "@demo.invalid" } } });
  console.log(`Removed ${q.count} demo questions and ${a.count} demo administrators.`);
}

async function main() {
  guard();
  if (process.argv.includes("--remove")) return remove();

  const existing = await prisma.question.count({ where: { dataOrigin: "DEMO" } });
  if (existing === 0) {
    for (const [category, difficulty, enPrompt, enOptions, correct, enExpl, siPrompt, siOptions, siExpl] of SAMPLE_QUESTIONS) {
      await prisma.question.create({
        data: {
          category,
          difficulty,
          reviewStatus: "REVIEWED",
          reviewedAt: new Date(),
          dataOrigin: "DEMO",
          source: "DEMO fixture — not reviewed by a human; for local demonstration only",
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
              translations: { create: [{ locale: "en", text: enOptions[position] }, { locale: "si", text: siOptions[position] }] },
            })),
          },
        },
      });
    }
    console.log(`✓ ${SAMPLE_QUESTIONS.length} DEMO questions marked REVIEWED (development only)`);
  } else {
    console.log(`✓ ${existing} DEMO questions already present`);
  }

  const email = (process.env.DEMO_ADMIN_EMAIL ?? "admin@demo.invalid").toLowerCase();
  if (!email.endsWith("@demo.invalid")) throw new Error("DEMO_ADMIN_EMAIL must end with @demo.invalid");
  const generated = !process.env.DEMO_ADMIN_PASSWORD;
  const password = process.env.DEMO_ADMIN_PASSWORD ?? randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    create: { email, name: "Demo administrator", passwordHash },
    update: { passwordHash, isActive: true, failedLoginCount: 0, lockedUntil: null, tokenVersion: { increment: 1 } },
  });
  console.log(`✓ Demo administrator: ${email}`);
  if (generated) console.log(`  Generated password (shown once): ${password}`);
}

main()
  .catch((e) => {
    console.error(e.message ?? e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
