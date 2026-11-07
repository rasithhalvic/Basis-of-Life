import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { currentAdmin } from "@/server/admin-auth";
import { SignOutButton } from "./SignOutButton";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/sessions", label: "Quiz sessions" },
  { href: "/admin/questions", label: "Question bank" },
  { href: "/admin/pioneers", label: "Pioneers" },
  { href: "/admin/qr", label: "QR codes" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/audit", label: "Audit log" },
];

/** Every admin page is authorized server-side here (API routes check separately). */
export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const admin = await currentAdmin();
  if (!admin) redirect("/admin/login");
  return (
    <div className="flex min-h-dvh flex-col bg-ivory">
      <header className="on-dark border-b-4 border-gold bg-burgundy-deep text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/admin" className="font-display text-xl font-semibold">
            Exhibition admin
          </Link>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline">{admin.email}</span>
            <Link href="/" className="underline underline-offset-2">
              View site
            </Link>
            <SignOutButton />
          </div>
        </div>
        <nav aria-label="Admin" className="mx-auto max-w-6xl overflow-x-auto px-2">
          <ul className="flex gap-1 whitespace-nowrap pb-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-semibold text-white/90 hover:bg-white/10">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
