import NextAuth from "next-auth";
import { authOptions } from "@/server/admin-auth";

// NextAuth endpoints used by the admin sign-in:
// /api/auth/csrf, /api/auth/session, /api/auth/callback/credentials, /api/auth/signout …
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
