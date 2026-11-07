"use client";

import { LeaderboardTable, type BoardEntry } from "@/components/LeaderboardTable";
import { Badge } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { usePoll } from "@/lib/client-api";
import { formatTime } from "@/lib/format";

interface Grand {
  provisional: boolean;
  qualifyTopN: number;
  finalizedSessions: number;
  entries: BoardEntry[];
}

export function GrandBoard({ display = false }: { display?: boolean }) {
  const { t, locale } = useI18n();
  const { data } = usePoll<Grand>("/api/leaderboards/grand", () => (display ? 10_000 : 20_000));
  if (!data) return <p className={display ? "text-2xl" : "text-muted"}>{t("common.loading")}</p>;
  const entries = display ? data.entries.slice(0, 15) : data.entries;
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        {data.provisional ? <Badge tone="gold">{t("lb.provisional")}</Badge> : <Badge tone="success">{t("lb.final")}</Badge>}
        <span className={display ? "text-lg text-white/70" : "text-sm text-muted"}>{t("lb.updated", { time: formatTime(new Date(), locale) })}</span>
      </div>
      {data.provisional && <p className={display ? "text-xl text-gold" : "font-semibold text-gold-ink"}>{t("lb.provisionalNote")}</p>}
      <LeaderboardTable entries={entries} showSession large={display} />
      {!display && (
        <div className="space-y-2 text-sm text-muted">
          <p>{t("lb.grandLead", { n: data.qualifyTopN })}</p>
          <p>{t("lb.tieNote")}</p>
          <p>{t("lb.difficultyNote")}</p>
        </div>
      )}
    </div>
  );
}
