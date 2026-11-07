import { expect, test } from "@playwright/test";

async function noHorizontalScroll(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
}

test("homepage lists 15 pioneers, searches, and links to the quiz", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const cards = page.locator("#pioneers li a");
  await expect(cards).toHaveCount(15);
  await page.getByLabel("Search pioneers").fill("jenner");
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText("Edward Jenner");
  await expect(page.getByRole("link", { name: /Join General Knowledge Quiz/ }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Grand leaderboard" })).toBeVisible();
  await noHorizontalScroll(page);
});

test("pioneer page shows all sections, sample label and links", async ({ page }) => {
  await page.goto("/pioneers/marie-curie");
  await expect(page.getByRole("heading", { level: 1, name: "Marie Curie" })).toBeVisible();
  for (const h of ["Biography", "Major contributions", "Timeline", "Interesting facts", "Sources"]) {
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  }
  await expect(page.getByText(/Sample content/)).toBeVisible();
  await expect(page.getByRole("img", { name: /Placeholder in place of a portrait of Marie Curie/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /All pioneers/ }).first()).toHaveAttribute("href", "/#pioneers");
  await expect(page.getByRole("link", { name: /Join General Knowledge Quiz/ })).toHaveAttribute("href", "/quiz");
  await noHorizontalScroll(page);
});

test("language switcher shows Sinhala content on the same URL", async ({ page }) => {
  await page.goto("/pioneers/edward-jenner");
  await page.getByRole("button", { name: "සිංහල" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "එඩ්වඩ් ජෙනර්" })).toBeVisible();
  await expect(page).toHaveURL(/\/pioneers\/edward-jenner$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "si");
  await page.getByRole("button", { name: "English" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Edward Jenner" })).toBeVisible();
});

test("quiz landing explains the rules and the 20-person limit", async ({ page }) => {
  await page.goto("/quiz");
  await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
  await expect(page.getByText(/at most 20 participants/)).toBeVisible();
  await expect(page.getByText(/network delays/i)).toBeVisible();
  await expect(page.getByText(/cannot fully prevent one person registering more than once/)).toBeVisible();
  await noHorizontalScroll(page);
});

test("leaderboards pages render", async ({ page }) => {
  await page.goto("/leaderboards");
  await expect(page.getByRole("heading", { level: 1, name: "Leaderboards" })).toBeVisible();
  await page.goto("/leaderboards/grand");
  await expect(page.getByText(/comparable but different question sets/)).toBeVisible();
  await noHorizontalScroll(page);
});

test("unknown pioneer slugs return 404", async ({ page }) => {
  const res = await page.goto("/pioneers/not-a-real-person");
  expect(res?.status()).toBe(404);
});
