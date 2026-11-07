import type { Metadata } from "next";
import { GrandBoard } from "@/components/GrandBoard";
import { getT } from "@/i18n/server";
import { getPublicSettings } from "@/server/services/settings";

export const metadata: Metadata = { title: "Grand leaderboard — display" };

/** Full-screen view for exhibition screens. Auto-refreshes; no navigation chrome. */
export default async function GrandDisplayPage() {
  const { t, locale } = await getT();
  const settings = await getPublicSettings(locale);
  return (
    <main id="main" className="on-dark min-h-dvh bg-burgundy-deep px-6 py-8 text-white lg:px-16 lg:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b-2 border-gold pb-6">
        <div>
          <p className="text-xl uppercase tracking-[0.25em] text-gold">{settings.name}</p>
          <h1 className="text-5xl font-bold lg:text-7xl">{t("lb.grandTitle")}</h1>
        </div>
        <p className="max-w-md text-lg text-white/80">{t("lb.grandLead", { n: settings.grandQualifyTopN })}</p>
      </header>
      <GrandBoard display />
    </main>
  );
}
