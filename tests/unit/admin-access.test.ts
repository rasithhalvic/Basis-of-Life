import { afterEach, describe, expect, it } from "vitest";
import { adminBlocked, isDirectLocalRequest } from "@/server/admin-access";

const h = (init: Record<string, string>) => new Headers(init);

afterEach(() => {
  delete process.env.ADMIN_LOCAL_ONLY;
});

describe("local-only admin guard", () => {
  it("treats direct localhost requests (incl. Next's own x-forwarded headers) as local", () => {
    expect(isDirectLocalRequest(h({ host: "localhost:3000" }))).toBe(true);
    expect(isDirectLocalRequest(h({ host: "127.0.0.1:3000", "x-forwarded-for": "::1", "x-forwarded-host": "localhost:3000" }))).toBe(true);
    expect(isDirectLocalRequest(h({ host: "[::1]:3000", "x-forwarded-for": "::ffff:127.0.0.1" }))).toBe(true);
  });

  it("rejects tunnelled or proxied requests", () => {
    expect(isDirectLocalRequest(h({ host: "abc.trycloudflare.com" }))).toBe(false);
    expect(isDirectLocalRequest(h({ host: "localhost:3000", "cf-connecting-ip": "203.0.113.5" }))).toBe(false);
    expect(isDirectLocalRequest(h({ host: "localhost:3000", "x-forwarded-for": "203.0.113.5, 127.0.0.1" }))).toBe(false);
    expect(isDirectLocalRequest(h({ host: "localhost:3000", "x-forwarded-host": "abc.trycloudflare.com" }))).toBe(false);
    expect(isDirectLocalRequest(h({ host: "localhost:3000", forwarded: "for=203.0.113.5" }))).toBe(false);
    expect(isDirectLocalRequest(h({ host: "localhost.evil.example" }))).toBe(false);
  });

  it("only blocks when ADMIN_LOCAL_ONLY=true", () => {
    const tunnelled = h({ host: "abc.trycloudflare.com" });
    expect(adminBlocked(tunnelled)).toBe(false);
    process.env.ADMIN_LOCAL_ONLY = "true";
    expect(adminBlocked(tunnelled)).toBe(true);
    expect(adminBlocked(h({ host: "localhost:3000" }))).toBe(false);
  });
});
