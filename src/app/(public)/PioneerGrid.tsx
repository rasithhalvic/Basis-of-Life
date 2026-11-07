"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Portrait } from "@/components/Portrait";
import { Badge, inputClass } from "@/components/ui";
import { useI18n } from "@/i18n/client";

export interface PioneerCard {
  slug: string;
  name: string;
  nameEn: string;
  lifeDates: string;
  field: string;
  isSample: boolean;
  portrait: { url: string | null; alt: string };
}

export function PioneerGrid({ pioneers }: { pioneers: PioneerCard[] }) {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  const shown = useMemo(() => {
    const needle = q.trim().toLocaleLowerCase();
    if (!needle) return pioneers;
    return pioneers.filter((p) => [p.name, p.nameEn, p.field, p.lifeDates].some((s) => s.toLocaleLowerCase().includes(needle)));
  }, [q, pioneers]);

  return (
    <div>
      <div className="mb-6 max-w-md">
        <label htmlFor="pioneer-search" className="mb-1.5 block font-semibold">
          {t("home.search")}
        </label>
        <input
          id="pioneer-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("home.searchPlaceholder")}
          className={inputClass}
          autoComplete="off"
        />
        <p className="mt-2 text-sm text-muted" aria-live="polite">
          {t("home.count", { n: shown.length })}
        </p>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-muted">{t("home.noResults")}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {shown.map((p, i) => (
            <li key={p.slug} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 12) * 25}ms` }}>
              <Link
                href={`/pioneers/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:border-gold hover:shadow-md sm:p-3"
              >
                <Portrait url={p.portrait.url} alt={p.portrait.alt} name={p.nameEn} />
                <span className="mt-3 block font-display text-base font-semibold leading-snug text-burgundy-deep group-hover:text-burgundy sm:text-lg">
                  {p.name}
                </span>
                <span className="text-sm text-muted">{p.lifeDates}</span>
                <span className="mt-1 text-sm text-ink">{p.field}</span>
                {p.isSample && (
                  <span className="mt-2">
                    <Badge tone="gold">Sample</Badge>
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
