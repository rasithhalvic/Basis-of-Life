import { expect, type APIRequestContext, type Browser, type Page } from "@playwright/test";

export const ADMIN_STATE = "tests/e2e/.auth/admin.json";

export async function adminContext(browser: Browser) {
  const ctx = await browser.newContext({ storageState: ADMIN_STATE });
  return { ctx, page: await ctx.newPage() };
}

export async function createOpenSession(api: APIRequestContext, body: Record<string, unknown> = {}) {
  const res = await api.post("/api/admin/sessions", {
    data: { questionCount: 3, secondsPerQuestion: 8, breakSeconds: 1, countdownSeconds: 2, openImmediately: true, ...body },
  });
  expect(res.status(), await res.text()).toBe(201);
  return (await res.json()).session as { id: string; code: string };
}

/** Registers a visitor through the UI and returns once the lobby is shown. */
export async function registerVisitor(page: Page, nickname: string) {
  await page.goto("/quiz");
  await page.getByRole("textbox", { name: "Nickname" }).fill(nickname);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByTestId("recovery-code")).toHaveText(/^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}$/);
  await page.getByRole("button", { name: "I have saved my code" }).click();
  await expect(page.getByText(`Playing as ${nickname}`)).toBeVisible();
}

export function uniqueName(prefix: string) {
  return `${prefix}${Math.random().toString(36).slice(2, 7)}`;
}
