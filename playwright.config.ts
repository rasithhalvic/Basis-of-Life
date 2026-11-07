import { defineConfig, devices } from "@playwright/test";

/**
 * E2E tests run against a dev or production server with the DEMO fixture
 * loaded (npm run db:seed && npm run db:demo). Admin credentials come from
 * E2E_ADMIN_EMAIL / E2E_ADMIN_PASSWORD (defaults match the demo fixture
 * when DEMO_ADMIN_PASSWORD was set to the same value).
 */
const baseURL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 120_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  globalSetup: "./tests/e2e/global-setup.ts",
  use: { baseURL, trace: "retain-on-failure" },
  projects: [
    { name: "mobile-360", use: { ...devices["Pixel 5"], viewport: { width: 360, height: 740 } } },
    { name: "desktop", use: { ...devices["Desktop Chrome"] }, testMatch: /pages\.spec\.ts/ },
  ],
  webServer: {
    command: "npm run dev",
    url: `${baseURL}/api/sessions/open`,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
