import { NextResponse, type NextRequest } from "next/server";
import { adminBlocked } from "@/server/admin-access";

/**
 * Hides the admin area from non-local requests when ADMIN_LOCAL_ONLY=true
 * (temporary public preview through a tunnel). Responds 404 so the public
 * link does not reveal that an admin area exists.
 */
export function proxy(request: NextRequest) {
  if (!adminBlocked(request.headers)) return NextResponse.next();
  const isApi = request.nextUrl.pathname.startsWith("/api/");
  const res = isApi
    ? NextResponse.json({ error: { code: "NOT_FOUND", message: "Not found." } }, { status: 404 })
    : new NextResponse("Not found", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*", "/api/auth/:path*"],
};
