import Link from "next/link";
import { getT } from "@/i18n/server";
import { LanguageSwitcher } from "./LanguageSwitcher";

export async function SiteHeader({ siteName }: { siteName: string }) {
  const { t } = await getT();
  const links = [
    { href: "/#pioneers", label: t("nav.pioneers") },
    { href: "/quiz", label: t("nav.quiz") },
    { href: "/leaderboards", label: t("nav.leaderboards") },
  ];
  return (
    <header className="on-dark border-b-4 border-gold bg-burgundy-deep text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-12 items-center gap-3 rounded-lg">
          <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full border-2 border-gold font-display text-lg text-gold">
            ✦
          </span>
          <span className="font-display text-lg font-semibold leading-tight sm:text-xl">{siteName}</span>
        </Link>
        <LanguageSwitcher />
        <nav aria-label="Main" className="w-full sm:w-auto">
          <ul className="flex flex-wrap gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center rounded-lg px-3 font-semibold text-white/90 hover:bg-white/10 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export async function SiteFooter({ hasSample }: { hasSample: boolean }) {
  const { t } = await getT();
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="mx-auto w-full max-w-5xl space-y-2 px-4 py-8 text-sm text-muted sm:px-6">
        <span className="gold-rule" aria-hidden />
        <p>{t("footer.note")}</p>
        {hasSample && <p className="font-semibold text-gold-ink">{t("footer.sample")}</p>}
      </div>
    </footer>
  );
}
