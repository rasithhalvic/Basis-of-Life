"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useI18n } from "@/i18n/client";

function persistLocale(next: "en" | "si") {
  document.cookie = `lang=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  document.documentElement.lang = next;
}

export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const router = useRouter();
  const [pending, start] = useTransition();

  function choose(next: "en" | "si") {
    if (next === locale) return;
    persistLocale(next);
    start(() => router.refresh());
  }

  return (
    <div role="group" aria-label={t("nav.language")} className="inline-flex rounded-xl border border-gold/60 p-1" aria-busy={pending}>
      {(["en", "si"] as const).map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          onClick={() => choose(l)}
          aria-pressed={locale === l}
          className={`min-h-10 min-w-12 rounded-lg px-3 text-sm font-semibold transition-colors ${
            locale === l ? "bg-gold text-burgundy-deep" : "text-white hover:bg-white/10"
          }`}
        >
          {t(`lang.${l}`)}
        </button>
      ))}
    </div>
  );
}
