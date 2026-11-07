"use client";

import { LeaderboardTable, type BoardEntry } from "@/components/LeaderboardTable";
import { Alert, Card } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { usePoll } from "@/lib/client-api";

interface Board {
  session: { code: string; title: string | null; status: string };
  official: boolean;
  entries: BoardEntry[];
}

export function SessionBoard({ sessionId }: { sessionId: string }) {
  const { t } = useI18n();
  const { data, error } = usePoll<Board>(`/api/sessions/${sessionId}/leaderboard`, (d) => (d?.official ? 60_000 : 10_000));
  if (error && !data) return <Alert tone="warning">{error.message}</Alert>;
  if (!data) return <Card>{t("common.loading")}</Card>;
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-burgundy-deep">
        {t("lb.session", { code: data.session.code })}
        {data.session.title && <span className="block text-lg font-normal text-muted">{data.session.title}</span>}
      </h1>
      <Alert tone={data.official ? "success" : "warning"}>{data.official ? t("results.official") : t("lb.unofficial")}</Alert>
      <LeaderboardTable entries={data.entries} />
      <p className="text-sm text-muted">{t("lb.tieNote")}</p>
    </div>
  );
}
