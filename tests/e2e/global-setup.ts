import { chromium, type FullConfig } from "@playwright/test";
import { mkdirSync } from "node:fs";

export const ADMIN_STATE = "tests/e2e/.auth/admin.json";

/** Signs in once as the administrator through the real login form. */
export default async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL!;
  const browser = await chromium.launch();
  const page = await browser.newPage({ baseURL });
  await page.goto("/admin/login");
  await page.getByLabel("Email").fill(process.env.E2E_ADMIN_EMAIL ?? "admin@demo.invalid");
  await page.getByLabel("Password").fill(process.env.E2E_ADMIN_PASSWORD ?? "local-demo-password-123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("**/admin", { timeout: 30_000 });
  mkdirSync("tests/e2e/.auth", { recursive: true });
  await page.context().storageState({ path: ADMIN_STATE });
  await browser.close();
}
