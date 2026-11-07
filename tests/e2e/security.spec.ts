import { expect, test } from "@playwright/test";
import { adminContext, createOpenSession, uniqueName } from "./helpers";

test.describe("admin API authorization", () => {
  const endpoints: [string, string][] = [
    ["GET", "/api/admin/me"],
    ["GET", "/api/admin/settings"],
    ["PUT", "/api/admin/settings"],
    ["GET", "/api/admin/pioneers"],
    ["POST", "/api/admin/pioneers"],
    ["PUT", "/api/admin/pioneers/abc123"],
    ["DELETE", "/api/admin/pioneers/abc123"],
    ["GET", "/api/admin/questions"],
    ["POST", "/api/admin/questions"],
    ["POST", "/api/admin/questions/abc123/review"],
    ["GET", "/api/admin/sessions"],
    ["POST", "/api/admin/sessions"],
    ["PATCH", "/api/admin/sessions/abc123"],
    ["POST", "/api/admin/sessions/abc123/open"],
    ["POST", "/api/admin/sessions/abc123/start"],
    ["POST", "/api/admin/sessions/abc123/cancel"],
    ["POST", "/api/admin/sessions/abc123/finalize"],
    ["POST", "/api/admin/sessions/abc123/participants/def456/disqualify"],
    ["GET", "/api/admin/exports/sessions/abc123"],
    ["GET", "/api/admin/exports/grand"],
    ["GET", "/api/admin/qr"],
    ["GET", "/api/admin/qr/all"],
    ["GET", "/api/admin/audit"],
  ];
  for (const [method, path] of endpoints) {
    test(`${method} ${path} rejects anonymous requests`, async ({ request }) => {
      const res = await request.fetch(path, { method, data: method === "GET" ? undefined : {} });
      expect(res.status()).toBe(401);
      expect((await res.json()).error.code).toBe("UNAUTHENTICATED");
    });
  }

  test("a visitor session cookie does not grant admin access", async ({ request }) => {
    await request.post("/api/participants", { data: { nickname: uniqueName("Vis"), consentToDisplayNickname: true } });
    expect((await request.get("/api/admin/sessions")).status()).toBe(401);
  });

  test("admin pages redirect to login", async ({ page }) => {
    await page.goto("/admin/sessions");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test("cross-origin state-changing requests are rejected", async ({ request }) => {
  const res = await request.post("/api/participants", {
    headers: { Origin: "https://evil.example" },
    data: { nickname: "Mallory", consentToDisplayNickname: true },
  });
  expect(res.status()).toBe(403);
  expect((await res.json()).error.code).toBe("ORIGIN_REJECTED");
});

test("participant responses never contain answer keys before completion", async ({ browser, playwright }) => {
  const admin = await adminContext(browser);
  const session = await createOpenSession(admin.page.request, { questionCount: 2, secondsPerQuestion: 15, countdownSeconds: 0 });
  const visitor = await playwright.request.newContext({ baseURL: test.info().project.use.baseURL });
  const reg = await visitor.post("/api/participants", { data: { nickname: uniqueName("Key"), consentToDisplayNickname: true } });
  expect(reg.status()).toBe(201);
  const regBody = await reg.json();
  expect(Object.keys(regBody.participant).sort()).toEqual(["id", "nickname", "nicknameConsent"]);
  expect((await visitor.post(`/api/sessions/${session.code}/join`)).status()).toBe(200);
  expect((await admin.page.request.post(`/api/admin/sessions/${session.id}/start`)).status()).toBe(200);

  const state = await (await visitor.get(`/api/sessions/${session.id}/state`)).json();
  expect(state.phase).toBe("question");
  const text = JSON.stringify(state);
  expect(text).not.toMatch(/isCorrect|correct/i);
  expect(state.live.question.options).toHaveLength(4);

  // Submit, then confirm the receipt and a duplicate do not reveal correctness either.
  const q = state.live.question;
  const first = await visitor.post(`/api/sessions/${session.id}/answers`, { data: { sessionQuestionId: q.id, optionId: q.options[0].id } });
  expect(first.status()).toBe(201);
  const dup = await visitor.post(`/api/sessions/${session.id}/answers`, { data: { sessionQuestionId: q.id, optionId: q.options[0].id } });
  expect(dup.status()).toBe(200);
  expect((await dup.json()).duplicate).toBe(true);
  const changed = await visitor.post(`/api/sessions/${session.id}/answers`, { data: { sessionQuestionId: q.id, optionId: q.options[1].id } });
  expect(changed.status()).toBe(409);
  expect((await changed.json()).error.code).toBe("ANSWER_ALREADY_SUBMITTED");
  expect(JSON.stringify(await first.json())).not.toMatch(/correct/i);

  // Results are withheld until the session finishes.
  const results = await visitor.get(`/api/sessions/${session.id}/results`);
  expect(results.status()).toBe(409);
  expect((await results.json()).error.code).toBe("RESULTS_NOT_AVAILABLE");

  // Public leaderboards never expose identities or recovery codes.
  await admin.page.request.post(`/api/admin/sessions/${session.id}/cancel`, { data: { reason: "E2E cleanup" } });
  const grand = await (await visitor.get("/api/leaderboards/grand")).text();
  expect(grand).not.toMatch(/recovery|participantId|tokenHash/i);
});

test("full sessions offer alternatives and are never over-filled", async ({ browser, playwright }) => {
  const admin = await adminContext(browser);
  const full = await createOpenSession(admin.page.request);
  const alt = await createOpenSession(admin.page.request);
  const baseURL = test.info().project.use.baseURL;
  const contexts = await Promise.all(Array.from({ length: 21 }, () => playwright.request.newContext({ baseURL })));
  await Promise.all(contexts.map((c, i) => c.post("/api/participants", { data: { nickname: `Rush ${i}`, consentToDisplayNickname: false } })));
  const results = await Promise.all(contexts.map((c) => c.post(`/api/sessions/${full.code}/join`)));
  const statuses = results.map((r) => r.status());
  expect(statuses.filter((s) => s === 200)).toHaveLength(20);
  expect(statuses.filter((s) => s === 409)).toHaveLength(1);
  const rejected = await results[statuses.indexOf(409)].json();
  expect(rejected.error.code).toBe("SESSION_FULL");
  expect(rejected.error.details.alternatives.map((a: { code: string }) => a.code)).toContain(alt.code);

  // The UI explains the full state and lets the visitor pick another session.
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  await page.goto("/quiz");
  await page.getByRole("textbox", { name: "Nickname" }).fill(uniqueName("Late"));
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: "I have saved my code" }).click();
  await page.goto(`/quiz/join/${full.code}`);
  await expect(page.getByTestId("join-problem")).toContainText("full");
  await page.getByRole("button", { name: new RegExp(alt.code) }).click();
  await page.waitForURL(`**/quiz/session/${alt.id}`);

  for (const s of [full, alt]) await admin.page.request.post(`/api/admin/sessions/${s.id}/cancel`, { data: { reason: "E2E cleanup" } });
});

test("QR codes target the configured base URL and resolve to pioneer pages", async ({ browser, request }) => {
  const admin = await adminContext(browser);
  const info = await (await admin.page.request.get("/api/admin/qr")).json();
  expect(info.pioneers).toHaveLength(15);
  for (const p of info.pioneers) {
    expect(p.url).toBe(`${info.baseUrl}/pioneers/${p.slug}`);
    const path = new URL(p.url).pathname;
    const res = await request.get(path);
    expect(res.status(), path).toBe(200);
    expect(await res.text()).toContain(p.name);
  }
  // Local base URL triggers a printing warning.
  expect(info.warnings.join(" ")).toMatch(/local address|HTTPS/);
  const one = await admin.page.request.get(`/api/admin/qr?slug=${info.pioneers[0].slug}&format=png`);
  expect(one.headers()["content-type"]).toBe("image/png");
  expect(one.headers()["x-qr-target"]).toBe(info.pioneers[0].url);
  const zip = await admin.page.request.get("/api/admin/qr/all");
  expect(zip.headers()["content-type"]).toBe("application/zip");
});
