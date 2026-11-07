"use client";

import { useI18n } from "@/i18n/client";
import { formatSeconds } from "@/lib/format";

export interface BoardEntry {
  rank: number;
  displayName: string | null;
  totalPoints: number;
  totalTimeMs: number;
  isMe?: boolean;
  sessionCode?: string;
}

export function LeaderboardTable({ entries, showSession = false, large = false }: { entries: BoardEntry[]; showSession?: boolean; large?: boolean }) {
  const { t } = useI18n();
  if (entries.length === 0) return <p className="rounded-xl bg-white p-6 text-muted">{t("lb.empty")}</p>;
  const cell = large ? "px-4 py-4 text-2xl lg:text-3xl" : "px-3 py-3";
  return (
    <div className={`overflow-hidden rounded-2xl border ${large ? "border-gold/40" : "border-line bg-white"}`}>
      <table className="w-full border-collapse text-left">
        <thead className={large ? "bg-black/20 text-gold" : "bg-burgundy-deep text-white"}>
          <tr>
            <th scope="col" className={`${cell} w-16 font-semibold`}>{t("lb.rank")}</th>
            <th scope="col" className={`${cell} font-semibold`}>{t("lb.name")}</th>
            {showSession && <th scope="col" className={`${cell} hidden font-semibold sm:table-cell`}>{t("lb.qualifyingSession")}</th>}
            <th scope="col" className={`${cell} text-right font-semibold`}>{t("lb.points")}</th>
            <th scope="col" className={`${cell} text-right font-semibold`}>{t("lb.time")}</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr
              key={i}
              className={`border-t ${large ? "border-white/10" : "border-line"} ${e.isMe ? (large ? "bg-gold/20" : "bg-[#fbf3e3] font-semibold") : ""}`}
              aria-current={e.isMe ? "true" : undefined}
            >
              <td className={`${cell} font-display font-bold ${e.rank <= 3 ? (large ? "text-gold" : "text-burgundy") : ""}`}>
                {e.rank <= 3 ? ["🥇", "🥈", "🥉"][e.rank - 1] : ""} {e.rank}
              </td>
              <td className={cell}>
                {e.displayName ?? <span className={large ? "text-white/70" : "text-muted"}>{t("lb.anonymous")}</span>}
                {e.isMe && <span className="ml-2 rounded-full bg-burgundy px-2 py-0.5 text-xs text-white">{t("lb.you")}</span>}
                {showSession && <span className="block font-mono text-xs opacity-70 sm:hidden">{e.sessionCode}</span>}
              </td>
              {showSession && <td className={`${cell} hidden font-mono sm:table-cell`}>{e.sessionCode}</td>}
              <td className={`${cell} text-right font-bold tabular-nums`}>{e.totalPoints}</td>
              <td className={`${cell} text-right tabular-nums`}>{formatSeconds(e.totalTimeMs)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
