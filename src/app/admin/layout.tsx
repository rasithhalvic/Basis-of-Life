import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { adminBlocked } from "@/server/admin-access";

/** Applies to every /admin page, including the login page. */
export default async function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  if (adminBlocked(await headers())) notFound();
  return children;
}
