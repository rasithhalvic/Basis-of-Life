"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Alert, Badge, Button, Card, LinkButton } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import type { MessageKey } from "@/i18n/messages";
import { api, usePoll, useServerClock } from "@/lib/client-api";
import { Results } from "./Results";

type Phase = "waiting" | "countdown" | "question" | "break" | "finished" | "cancelled";
type Text = { en: string; si: string };

interface LiveQuestion {
  id: string;
  number: number;
  category: string;
  prompt: Text;
  options: { id: string; text: Text }[];
  opensAt: string;
  closesAt: string;
  myAnswer: { optionId: string; receivedAt: string } | null;
}

interface State {
  serverNow: string;
  phase: Phase;
  session: { id: string; code: string; title: string | null; status: string; capacity: number; admittedCount: number; questionCount: number; secondsPerQuestion: number };
  me: { admitted: boolean; disqualified: boolean };
  live: null | {
    total: number;
    completed: number;
    number?: number;
    closesAt?: string;
    nextOpensAt: string | null;
    question: LiveQuestion | null;
  };
}

/** Poll faster around phase boundaries, slower while waiting. */
function nextDelay(s: State | null) {
  if (!s) return 2000;
  const now = new Date(s.serverNow).getTime();
  const boundary = s.phase === "question" ? s.live?.closesAt : s.live?.nextOpensAt;
  const untilBoundary = boundary ? new Date(boundary).getTime() - now + 200 : Infinity;
  const base = s.phase === "waiting" ? 3000 : s.phase === "finished" || s.phase === "cancelled" ? 60_000 : 3000;
  return Math.max(400, Math.min(base, untilBoundary));
}

export function QuizRoom({ sessionId }: { sessionId: string }) {
  const { t, locale } = useI18n();
  const router = useRouter();
  const { data: s, failures, refresh } = usePoll<State>(`/api/sessions/${sessionId}/state`, nextDelay);
  const now = useServerClock(s?.serverNow);

  if (!s) return <Card>{t("common.loading")}</Card>;
  const statusKey = `status.${s.session.status}` as MessageKey;

  const header = (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <span className="font-mono text-2xl font-bold tracking-widest text-burgundy-deep">{s.session.code}</span>
      <Badge tone={s.session.status === "LIVE" ? "burgundy" : s.session.status === "CANCELLED" ? "danger" : "gold"}>{t(statusKey)}</Badge>
      {failures > 0 && (
        <span role="status" className="text-sm font-semibold text-danger">
          {t("room.offline")}
        </span>
      )}
    </div>
  );

  if (s.phase === "cancelled") return <div>{header}<Alert tone="error">{t("room.cancelled")}</Alert></div>;

  if (!s.me.admitted) {
    return (
      <div>
        {header}
        <Alert tone="warning">
          <p>{s.phase === "waiting" ? t("room.notMember") : t("room.lateClosed")}</p>
          <Link href="/quiz" className="mt-2 inline-block font-semibold text-burgundy underline">
            {t("quiz.openSessions")} →
          </Link>
        </Alert>
      </div>
    );
  }

  if (s.me.disqualified && s.phase !== "finished") return <div>{header}<Alert tone="error">{t("room.disqualified")}</Alert></div>;

  if (s.phase === "waiting") {
    return (
      <div>
        {header}
        <Card className="text-center">
          <p className="text-lg font-semibold text-muted">{t("room.waiting")}</p>
          <p className="my-6 font-display text-6xl font-bold text-burgundy" aria-live="polite">
            {s.session.admittedCount}
            <span className="text-3xl text-muted"> / {s.session.capacity}</span>
          </p>
          <p className="text-muted">{t("room.admitted")}</p>
          <div className="mx-auto mt-4 h-3 max-w-sm overflow-hidden rounded-full bg-ivory" aria-hidden>
            <div className="h-full bg-gold transition-all" style={{ width: `${(s.session.admittedCount / s.session.capacity) * 100}%` }} />
          </div>
          <span className="mx-auto mt-8 block h-2 w-2 animate-ping rounded-full bg-burgundy" aria-hidden />
        </Card>
        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            type="button"
            onClick={async () => {
              const r = await api(`/api/sessions/${sessionId}/leave`, { method: "POST" });
              if (r.ok) router.push("/quiz");
              else refresh();
            }}
          >
            {t("room.leave")}
          </Button>
        </div>
      </div>
    );
  }

  if (s.phase === "countdown" || s.phase === "break") {
    const left = s.live?.nextOpensAt ? Math.max(0, Math.ceil((new Date(s.live.nextOpensAt).getTime() - now) / 1000)) : 0;
    return (
      <div>
        {header}
        <Progress done={s.live?.completed ?? 0} total={s.live?.total ?? s.session.questionCount} />
        <Card className="mt-5 text-center">
          <p className="text-lg font-semibold">{s.phase === "countdown" ? t("room.countdown") : t("room.break")}</p>
          <p className="my-4 font-display text-7xl font-bold text-burgundy" aria-live="polite" aria-atomic>
            {left}
          </p>
        </Card>
      </div>
    );
  }

  if (s.phase === "question" && s.live?.question) {
    return (
      <div>
        {header}
        <Progress done={s.live.completed} total={s.live.total} />
        <QuestionCard key={s.live.question.id} sessionId={sessionId} q={s.live.question} total={s.live.total} now={now} locale={locale} onChange={refresh} />
      </div>
    );
  }

  if (s.phase === "finished") {
    return (
      <div>
        {header}
        <Alert tone="success">
          <p className="text-lg font-semibold">{t("room.finished")}</p>
        </Alert>
        <div className="mt-6">
          <Results sessionId={sessionId} />
        </div>
        <div className="mt-6">
          <LinkButton href={`/leaderboards/sessions/${sessionId}`} variant="secondary">
            {t("results.leaderboard")} →
          </LinkButton>
        </div>
      </div>
    );
  }

  return <div>{header}<Card>{t("room.spectator")}</Card></div>;
}

function Progress({ done, total }: { done: number; total: number }) {
  return (
    <div className="flex gap-1" aria-hidden>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`h-2 flex-1 rounded-full ${i < done ? "bg-burgundy" : "bg-line"}`} />
      ))}
    </div>
  );
}

function QuestionCard({
  sessionId,
  q,
  total,
  now,
  locale,
  onChange,
}: {
  sessionId: string;
  q: LiveQuestion;
  total: number;
  now: number;
  locale: "en" | "si";
  onChange: () => void;
}) {
  const { t } = useI18n();
  const [selected, setSelected] = useState<string | null>(q.myAnswer?.optionId ?? null);
  const [accepted, setAccepted] = useState<string | null>(q.myAnswer?.optionId ?? null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => headingRef.current?.focus(), []);
  useEffect(() => {
    // Server state is authoritative: adopt an answer accepted earlier (e.g. before a refresh).
    if (q.myAnswer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccepted(q.myAnswer.optionId);
      setSelected(q.myAnswer.optionId);
    }
  }, [q.myAnswer]);

  const totalMs = new Date(q.closesAt).getTime() - new Date(q.opensAt).getTime();
  const leftMs = Math.max(0, new Date(q.closesAt).getTime() - now);
  const expired = leftMs <= 0;
  const leftS = Math.ceil(leftMs / 1000);

  async function submit() {
    if (!selected || accepted) return;
    setBusy(true);
    setError(null);
    // Retries are safe: the server treats an identical resubmission as the same answer.
    for (let attempt = 0; attempt < 3; attempt++) {
      const r = await api<{ optionId: string }>(`/api/sessions/${sessionId}/answers`, {
        method: "POST",
        body: { sessionQuestionId: q.id, optionId: selected },
      });
      if (r.ok) {
        setAccepted(r.data.optionId);
        break;
      }
      if (r.error.code === "ANSWER_ALREADY_SUBMITTED") {
        const acc = r.error.details?.acceptedOptionId as string | undefined;
        setAccepted(acc ?? null);
        if (acc) setSelected(acc);
        break;
      }
      if (r.error.status !== 0 && r.error.status < 500 && r.error.status !== 429) {
        setError(r.error.code === "QUESTION_EXPIRED" ? t("room.expired") : r.error.message);
        break;
      }
      await new Promise((res) => setTimeout(res, 400 * (attempt + 1)));
      if (attempt === 2) setError(t("common.error"));
    }
    setBusy(false);
    onChange();
  }

  const locked = Boolean(accepted) || expired;
  return (
    <Card className="mt-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">
          {t("room.question", { n: q.number, total })} · {t(`cat.${q.category}` as MessageKey)}
        </p>
        <p className={`font-mono text-2xl font-bold ${leftS <= 5 ? "text-danger" : "text-burgundy"}`} aria-label={`${t("room.timeLeft")}: ${leftS}`}>
          {leftS}s
        </p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-ivory" aria-hidden>
        <div className="h-full bg-gold transition-[width] duration-200 ease-linear" style={{ width: `${(leftMs / totalMs) * 100}%` }} />
      </div>
      <h2 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-bold leading-snug text-burgundy-deep outline-none sm:text-3xl" lang={locale}>
        {q.prompt[locale] || q.prompt.en}
      </h2>
      <fieldset className="mt-5" disabled={locked || busy}>
        <legend className="sr-only">{t("room.notAnswered")}</legend>
        <div className="grid gap-3">
          {q.options.map((o, i) => {
            const isSel = selected === o.id;
            return (
              <label
                key={o.id}
                className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-lg transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-burgundy ${
                  isSel ? "border-burgundy bg-[#f9eef0]" : "border-line bg-white hover:border-gold"
                } ${locked && !isSel ? "opacity-60" : ""}`}
              >
                <input type="radio" name={`q-${q.id}`} value={o.id} checked={isSel} onChange={() => setSelected(o.id)} className="sr-only" />
                <span aria-hidden className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 font-bold ${isSel ? "border-burgundy bg-burgundy text-white" : "border-gold text-gold-ink"}`}>
                  {"ABCD"[i]}
                </span>
                <span lang={locale}>{o.text[locale] || o.text.en}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="mt-5" aria-live="polite">
        {accepted ? (
          <Alert tone="success">{t("room.accepted")}</Alert>
        ) : expired ? (
          <Alert tone="warning">{t("room.expired")}</Alert>
        ) : (
          <Button type="button" onClick={submit} disabled={!selected || busy} className="w-full text-lg">
            {busy ? t("room.submitting") : t("room.submit")}
          </Button>
        )}
        {error && !accepted && (
          <p className="mt-3 font-semibold text-danger" role="alert">
            {error}
          </p>
        )}
      </div>
    </Card>
  );
}
