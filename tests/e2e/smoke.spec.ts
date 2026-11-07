import { expect, test } from "@playwright/test";
import { adminContext, createOpenSession, registerVisitor, uniqueName } from "./helpers";

/**
 * register → join → wait → admin starts → answer → finish →
 * session leaderboard → grand leaderboard
 */
test("complete quiz session from registration to grand leaderboard", async ({ browser }) => {
  test.setTimeout(180_000);
  const admin = await adminContext(browser);
  const session = await createOpenSession(admin.page.request);

  // Two visitors on phones.
  const names = [uniqueName("Ama"), uniqueName("Ravi")];
  const visitors = [];
  for (const name of names) {
    const ctx = await browser.newContext({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });
    const page = await ctx.newPage();
    await registerVisitor(page, name);
    visitors.push({ name, page });
  }

  // Visitor 1 joins from the open-sessions list, visitor 2 by typing the code.
  const [v1, v2] = visitors;
  await v1.page.getByRole("listitem").filter({ hasText: session.code }).getByRole("button", { name: "Join" }).click();
  await v1.page.waitForURL(`**/quiz/session/${session.id}`);
  await v2.page.getByLabel("Session code").fill(session.code);
  await v2.page.getByRole("button", { name: "Join", exact: true }).last().click();
  await v2.page.waitForURL(`**/quiz/session/${session.id}`);

  // Waiting room shows the admitted count.
  for (const v of visitors) {
    await expect(v.page.getByText("Waiting for the organizer to start")).toBeVisible();
    await expect(v.page.getByText("/ 20")).toBeVisible();
  }
  await expect(v1.page.locator("p", { hasText: "/ 20" })).toContainText("2");

  // Organizer starts the session from the dashboard.
  await admin.page.goto(`/admin/sessions/${session.id}`);
  admin.page.once("dialog", (d) => d.accept());
  await admin.page.getByRole("button", { name: "Start session" }).click();
  await expect(admin.page.getByText("LIVE", { exact: true })).toBeVisible();

  // Answer all three questions: visitor 1 picks A, visitor 2 picks B.
  for (let q = 1; q <= 3; q++) {
    for (const [i, v] of visitors.entries()) {
      await expect(v.page.getByText(`Question ${q} of 3`)).toBeVisible({ timeout: 20_000 });
      await v.page.locator("label").filter({ has: v.page.locator('input[type="radio"]') }).nth(i).click();
      await v.page.getByRole("button", { name: "Submit answer" }).click();
      await expect(v.page.getByText("Answer received")).toBeVisible();
    }
  }

  // Finished: provisional personal results with correct answers revealed.
  for (const v of visitors) {
    await expect(v.page.getByText("The quiz has finished!")).toBeVisible({ timeout: 30_000 });
    await expect(v.page.getByText(/Provisional/)).toBeVisible();
    await expect(v.page.getByTestId("my-points")).toHaveText(/^(0|100|200|300)$/);
  }

  // Organizer finalizes.
  await admin.page.reload();
  admin.page.once("dialog", (d) => d.accept());
  await admin.page.getByRole("button", { name: "Finalize results" }).click();
  await expect(admin.page.getByText("FINALIZED", { exact: true })).toBeVisible();

  // Session leaderboard: official, current participant highlighted.
  await v1.page.goto(`/leaderboards/sessions/${session.id}`);
  await expect(v1.page.getByText("Official results")).toBeVisible();
  await expect(v1.page.locator('tr[aria-current="true"]')).toContainText(v1.name);
  await expect(v1.page.getByRole("row")).toHaveCount(3); // header + 2

  // Grand leaderboard includes both (top 3 qualify) with the qualifying session.
  await v2.page.goto("/leaderboards/grand");
  for (const name of names) await expect(v2.page.getByRole("row").filter({ hasText: name })).toContainText(session.code);
  await expect(v2.page.locator('tr[aria-current="true"]')).toContainText(v2.name);

  // Large-screen display mode renders the same data.
  await v2.page.goto("/leaderboards/grand/display");
  await expect(v2.page.getByRole("heading", { name: "Grand leaderboard" })).toBeVisible();
  await expect(v2.page.getByText(names[0])).toBeVisible();
});

test("refresh during a live question restores the server state", async ({ browser }) => {
  const admin = await adminContext(browser);
  const session = await createOpenSession(admin.page.request, { questionCount: 1, secondsPerQuestion: 20, countdownSeconds: 1 });
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  await registerVisitor(page, uniqueName("Nim"));
  await page.goto(`/quiz/join/${session.code}`);
  await page.waitForURL(`**/quiz/session/${session.id}`);
  expect((await admin.page.request.post(`/api/admin/sessions/${session.id}/start`)).status()).toBe(200);

  await expect(page.getByText("Question 1 of 1")).toBeVisible({ timeout: 15_000 });
  await page.locator("label").filter({ has: page.locator('input[type="radio"]') }).nth(2).click();
  await page.getByRole("button", { name: "Submit answer" }).click();
  await expect(page.getByText("Answer received")).toBeVisible();

  await page.reload();
  await expect(page.getByText("Question 1 of 1")).toBeVisible();
  await expect(page.getByText("Answer received")).toBeVisible();
  await expect(page.locator('input[type="radio"]').nth(2)).toBeChecked();
  await expect(page.getByRole("button", { name: "Submit answer" })).toHaveCount(0);

  // Clean up so the grand leaderboard is not affected.
  await admin.page.request.post(`/api/admin/sessions/${session.id}/cancel`, { data: { reason: "E2E cleanup" } });
});
