import { afterAll, beforeEach, describe, expect, it } from "vitest";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import JSZip from "jszip";
import { prisma } from "@/server/db";
import { toCsv } from "@/server/csv";
import { baseUrlWarnings, pioneerUrl, qrPng, qrZip } from "@/server/qr";
import { createPioneer, findPioneerBySlug, updatePioneer } from "@/server/services/pioneers";
import { recoverParticipant, registerParticipant } from "@/server/services/participants";
import { hmac, participantFromToken } from "@/server/participant-auth";
import { nicknameSchema, pioneerSchema } from "@/lib/validation";
import { resetDb } from "./helpers";

beforeEach(resetDb);
afterAll(() => prisma.$disconnect());

function decode(png: Buffer) {
  const img = PNG.sync.read(png);
  return jsQR(new Uint8ClampedArray(img.data), img.width, img.height)?.data;
}

function pioneerInput(slug: string, isPublished = true) {
  const t = {
    name: `Name ${slug}`,
    lifeDates: "1800–1900",
    field: "Medicine",
    introduction: "Intro",
    biography: "Bio",
    contributions: ["One"],
    timeline: [{ year: "1850", event: "Event" }],
    facts: ["Fact"],
    portraitAlt: "Portrait placeholder",
  };
  return pioneerSchema.parse({ slug, sortOrder: 1, isPublished, sources: [], translations: { en: t, si: null } });
}

describe("QR codes", () => {
  it("encode the pioneer's stable public URL", async () => {
    const url = pioneerUrl("https://exhibition.example.lk/", "edward-jenner");
    expect(url).toBe("https://exhibition.example.lk/pioneers/edward-jenner");
    expect(decode(await qrPng(url, 400))).toBe(url);
  });

  it("produce a combined ZIP whose PNGs decode to each pioneer path", async () => {
    const base = "https://exhibition.example.lk";
    const zipBuf = await qrZip(base, [
      { slug: "a-one", sortOrder: 1, name: "A" },
      { slug: "b-two", sortOrder: 2, name: "B" },
    ]);
    const zip = await JSZip.loadAsync(zipBuf);
    expect(Object.keys(zip.files)).toEqual(expect.arrayContaining(["svg/01-a-one.svg", "png/02-b-two.png", "manifest.csv"]));
    const png = await zip.file("png/02-b-two.png")!.async("nodebuffer");
    expect(decode(png)).toBe(`${base}/pioneers/b-two`);
  });

  it("warn for localhost, private and preview URLs but not a production HTTPS domain", () => {
    expect(baseUrlWarnings("http://localhost:3000").length).toBeGreaterThan(0);
    expect(baseUrlWarnings("http://192.168.1.20:3000").length).toBeGreaterThan(0);
    expect(baseUrlWarnings("https://my-app-git-main.vercel.app").join(" ")).toMatch(/preview/);
    expect(baseUrlWarnings("https://exhibition.example.lk")).toEqual([]);
  });
});

describe("pioneer slugs", () => {
  it("keep old slugs working as redirects after a change", async () => {
    const admin = await prisma.adminUser.create({ data: { email: "a@example.test", name: "A", passwordHash: "x" } });
    const p = await createPioneer(pioneerInput("old-slug"), admin.id);
    await updatePioneer(p.id, pioneerInput("new-slug"), admin.id);
    expect((await findPioneerBySlug("old-slug", "en")).redirectTo).toBe("new-slug");
    expect((await findPioneerBySlug("new-slug", "en")).pioneer?.name).toBe("Name new-slug");
    await expect(createPioneer(pioneerInput("old-slug"), admin.id)).rejects.toMatchObject({ code: "SLUG_TAKEN" });
    expect(await prisma.auditLog.count({ where: { action: "pioneer.update" } })).toBe(1);
  });

  it("allow at most 15 published pioneers", async () => {
    const admin = await prisma.adminUser.create({ data: { email: "a@example.test", name: "A", passwordHash: "x" } });
    for (let i = 0; i < 15; i++) await createPioneer(pioneerInput(`p-${i}`), admin.id);
    await expect(createPioneer(pioneerInput("p-16"), admin.id)).rejects.toMatchObject({ code: "PUBLISH_LIMIT" });
    await expect(createPioneer(pioneerInput("p-draft", false), admin.id)).resolves.toBeTruthy();
  });
});

describe("participants", () => {
  it("store only hashes of tokens and recovery codes", async () => {
    const r = await registerParticipant({ nickname: "Nimal", consentToDisplayNickname: true, locale: "si" });
    expect(r.recoveryCode).toMatch(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/);
    const row = await prisma.participant.findUniqueOrThrow({ where: { id: r.participant.id }, include: { credentials: true } });
    expect(row.recoveryCodeHash).not.toContain(r.recoveryCode.replace(/-/g, ""));
    expect(row.credentials[0].tokenHash).toBe(hmac(r.token));
    expect((await participantFromToken(r.token))?.id).toBe(r.participant.id);
    expect(await participantFromToken("forged-token")).toBeNull();
    // Recovery codes are accepted with lowercase and without dashes.
    const rec = await recoverParticipant(r.recoveryCode.toLowerCase().replace(/-/g, " "));
    expect(rec.participant.id).toBe(r.participant.id);
    await expect(recoverParticipant("AAAA-BBBB-CCCC")).rejects.toMatchObject({ code: "NOT_FOUND" });
  });

  it("accept Sinhala nicknames and reject markup", () => {
    expect(nicknameSchema.parse("  නිමල්   පෙරේරා ")).toBe("නිමල් පෙරේරා");
    expect(nicknameSchema.safeParse("<script>").success).toBe(false);
    expect(nicknameSchema.safeParse("a").success).toBe(false);
  });
});

describe("CSV export", () => {
  it("escapes quotes and neutralises spreadsheet formulas", () => {
    const csv = toCsv([["name", "score"], ['=HYPERLINK("x")', 100], ['Comma, "quoted"', null]]);
    expect(csv).toContain(`"'=HYPERLINK(""x"")"`);
    expect(csv).toContain(`"Comma, ""quoted"""`);
    expect(csv.startsWith("﻿")).toBe(true);
  });
});
