import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./db";
import { env } from "./env";
import { ApiError } from "./errors";
import { hit, LIMITS } from "./rate-limit";
import { logAudit } from "./audit";

const MAX_FAILED_LOGINS = 5;
const LOCK_MINUTES = 15;
// Compared against when the email is unknown, to keep timing uniform.
let dummyHash: string | undefined;
const getDummyHash = () => (dummyHash ??= bcrypt.hashSync("timing-equaliser", 12));

function headerIp(headers: Record<string, unknown> | undefined) {
  if (!env.trustProxy || !headers) return "direct";
  const fwd = headers["x-forwarded-for"];
  return typeof fwd === "string" ? fwd.split(",")[0].trim() : "direct";
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 12 * 60 * 60 },
  jwt: { maxAge: 12 * 60 * 60 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Administrator",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");
        if (!email || !password || password.length > 200) return null;
        try {
          if (process.env.DISABLE_RATE_LIMIT !== "true" || env.isProduction) {
            await hit(`admin-login:ip:${headerIp(req?.headers)}`, ...LIMITS.adminLoginPerIp);
            await hit(`admin-login:email:${email}`, ...LIMITS.adminLoginPerEmail);
          }
        } catch {
          return null;
        }
        const admin = await prisma.adminUser.findUnique({ where: { email } });
        const ok = await bcrypt.compare(password, admin?.passwordHash ?? getDummyHash());
        if (!admin || !admin.isActive) return null;
        if (admin.lockedUntil && admin.lockedUntil > new Date()) return null;
        if (!ok) {
          const failed = admin.failedLoginCount + 1;
          await prisma.adminUser.update({
            where: { id: admin.id },
            data: {
              failedLoginCount: failed >= MAX_FAILED_LOGINS ? 0 : failed,
              lockedUntil: failed >= MAX_FAILED_LOGINS ? new Date(Date.now() + LOCK_MINUTES * 60_000) : null,
            },
          });
          if (failed >= MAX_FAILED_LOGINS) {
            await logAudit(prisma, null, "admin.locked", "AdminUser", admin.id, { email });
          }
          return null;
        }
        await prisma.adminUser.update({
          where: { id: admin.id },
          data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
        });
        await logAudit(prisma, admin.id, "admin.login", "AdminUser", admin.id, {});
        return { id: admin.id, email: admin.email, name: admin.name, tokenVersion: admin.tokenVersion };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.adminId = user.id;
        token.tokenVersion = (user as { tokenVersion?: number }).tokenVersion ?? 0;
      }
      return token;
    },
    async session({ session, token }) {
      const s = session as { adminId?: string; tokenVersion?: number };
      s.adminId = token.adminId as string | undefined;
      s.tokenVersion = token.tokenVersion as number | undefined;
      return session;
    },
  },
};

export interface CurrentAdmin {
  id: string;
  email: string;
  name: string;
}

/** Server-side admin check used by every admin page and API route. */
export async function currentAdmin(): Promise<CurrentAdmin | null> {
  const session = await getServerSession(authOptions);
  const { adminId, tokenVersion } = (session ?? {}) as { adminId?: string; tokenVersion?: number };
  if (!adminId) return null;
  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, name: true, isActive: true, tokenVersion: true },
  });
  // tokenVersion lets an operator revoke all sessions (password reset, deactivation).
  if (!admin || !admin.isActive || admin.tokenVersion !== tokenVersion) return null;
  return { id: admin.id, email: admin.email, name: admin.name };
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await currentAdmin();
  if (!admin) throw new ApiError(401, "UNAUTHENTICATED", "Administrator login required.");
  return admin;
}
