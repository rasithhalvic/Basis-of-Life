"use client";

import { Alert, Card } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { formatSeconds } from "@/lib/format";
import { usePoll } from "@/lib/client-api";

type Text = { en: string; si: string };
interface ResultsData {
  official: boolean;
  disqualified: boolean;
  totalPoints: number;
  totalTimeMs: number;
  rank: number | null;
  rankedCount: number;
  questions: {
    number: number;
    prompt: Text;
    explanation: { en: string | null; si: string | null };
    options: { id: string; text: Text; isCorrect: boolean }[];
    selectedOptionId: string | null;
    isCorrect: boolean;
    points: number;
    responseMs: number;
    answered: boolean;
  }[];
}

export function Results({ sessionId }: { sessionId: string }) {
  const { t, locale } = useI18n();
  // Re-check occasionally so "provisional" becomes "official" once finalized.
  const { data } = usePoll<ResultsData>(`/api/sessions/${sessionId}/results`, (d) => (d?.official ? 600_000 : 15_000));
  if (!data) return <Card>{t("common.loading")}</Card>;
  const L = (x: Text) => x[locale] || x.en;

  return (
    <section aria-labelledby="results-title" className="space-y-5">
      <h2 id="results-title" className="text-2xl font-bold text-burgundy-deep">
        {t("results.title")}
      </h2>
      {data.disqualified && <Alert tone="error">{t("room.disqualified")}</Alert>}
      <Alert tone={data.official ? "success" : "warning"}>{data.official ? t("results.official") : t("results.provisional")}</Alert>
      <dl className="grid grid-cols-3 gap-3">
        {[
          [t("results.points"), String(data.totalPoints)],
          [t("results.time"), formatSeconds(data.totalTimeMs)],
          [t("results.rank"), data.rank ? t("results.rankOf", { rank: data.rank, count: data.rankedCount }) : "—"],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl border border-line bg-white p-3 text-center">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="font-display text-2xl font-bold text-burgundy" data-testid={k === t("results.points") ? "my-points" : undefined}>
              {v}
            </dd>
          </div>
        ))}
      </dl>
      <ol className="space-y-3">
        {data.questions.map((q) => {
          const correct = q.options.find((o) => o.isCorrect)!;
          const mine = q.options.find((o) => o.id === q.selectedOptionId);
          const expl = q.explanation[locale] || q.explanation.en;
          return (
            <li key={q.number} className={`rounded-xl border-l-4 bg-white p-4 shadow-sm ${q.isCorrect ? "border-success" : "border-danger"}`}>
              <p className="text-sm text-muted">
                {q.number}. {q.isCorrect ? "✓" : "✗"} {q.points} · {formatSeconds(q.responseMs)}
              </p>
              <p className="mt-1 font-semibold">{L(q.prompt)}</p>
              <p className="mt-2 text-sm">
                {t("results.yourAnswer")}: <strong>{mine ? L(mine.text) : t("results.noAnswer")}</strong>
              </p>
              {!q.isCorrect && (
                <p className="text-sm">
                  {t("results.correctAnswer")}: <strong className="text-success">{L(correct.text)}</strong>
                </p>
              )}
              {expl && <p className="mt-2 text-sm text-muted">{expl}</p>}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
