import { createHmac, randomBytes, randomInt } from "node:crypto";
import { prisma, type Db } from "./db";
import { env } from "./env";
import { ApiError } from "./errors";
import { readCookie } from "./http";

/**
 * Visitor authentication: an opaque random token in an httpOnly cookie.
 * Only an HMAC of the token is stored, so a database leak does not expose
 * usable credentials. Recovery codes are handled the same way.
 */

export const PARTICIPANT_COOKIE = process.env.NODE_ENV === "production" ? "__Host-visitor" : "visitor_session";
const TOKEN_TTL_DAYS = 30;

const RECOVERY_ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ"; // no 0/O, 1/I/L, U

export function hmac(value: string) {
  return createHmac("sha256", env.participantSecret).update(value).digest("hex");
}

export function generateRecoveryCode(): string {
  let code = "";
  for (let i = 0; i < 12; i++) code += RECOVERY_ALPHABET[randomInt(RECOVERY_ALPHABET.length)];
  return code; // displayed as XXXX-XXXX-XXXX
}

export function formatRecoveryCode(code: string) {
  return code.match(/.{1,4}/g)!.join("-");
}

export function normalizeRecoveryCode(input: string) {
  return input.toUpperCase().replace(/[^0-9A-Z]/g, "");
}

export async function issueCredential(participantId: string, db: Db = prisma) {
  const token = randomBytes(32).toString("base64url");
  await db.participantCredential.create({
    data: {
      participantId,
      tokenHash: hmac(token),
      expiresAt: new Date(Date.now() + TOKEN_TTL_DAYS * 86_400_000),
    },
  });
  return token;
}

export function participantCookieHeader(token: string) {
  const parts = [
    `${PARTICIPANT_COOKIE}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${TOKEN_TTL_DAYS * 86_400}`,
  ];
  if (env.secureCookies) parts.push("Secure");
  return parts.join("; ");
}

export function clearParticipantCookieHeader() {
  const parts = [`${PARTICIPANT_COOKIE}=`, "Path=/", "HttpOnly", "SameSite=Lax", "Max-Age=0"];
  if (env.secureCookies) parts.push("Secure");
  return parts.join("; ");
}

export async function participantFromToken(token: string | undefined) {
  if (!token || token.length > 100) return null;
  const cred = await prisma.participantCredential.findUnique({
    where: { tokenHash: hmac(token) },
    select: {
      revokedAt: true,
      expiresAt: true,
      participant: { select: { id: true, nickname: true, nicknameConsent: true, preferredLocale: true } },
    },
  });
  if (!cred || cred.revokedAt || cred.expiresAt < new Date()) return null;
  return cred.participant;
}

export type CurrentParticipant = NonNullable<Awaited<ReturnType<typeof participantFromToken>>>;

export async function getParticipant(req: Request) {
  return participantFromToken(readCookie(req, PARTICIPANT_COOKIE));
}

export async function requireParticipant(req: Request): Promise<CurrentParticipant> {
  const p = await getParticipant(req);
  if (!p) throw new ApiError(401, "UNAUTHENTICATED", "Please register with a nickname first.");
  return p;
}
