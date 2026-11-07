"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Badge, Button, Card, Field, inputClass } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { api, usePoll, type ApiFailure } from "@/lib/client-api";
import { JoinProblem, RegisterForm, SignedInBar, useMe } from "./participant";

interface OpenSession {
  id: string;
  code: string;
  title: string | null;
  admittedCount: number;
  capacity: number;
  seatsLeft: number;
  isFull: boolean;
}

/** Joins by code and routes to the waiting room; reports full/closed states. */
export function useJoin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<ApiFailure | null>(null);
  async function join(code: string) {
    setBusy(true);
    setError(null);
    const clean = code.toUpperCase().replace(/[^0-9A-Z]/g, "");
    const r = await api<{ sessionId: string }>(`/api/sessions/${clean}/join`, { method: "POST" });
    if (r.ok) {
      router.push(`/quiz/session/${r.data.sessionId}`);
      return;
    }
    setBusy(false);
    setError(r.error);
  }
  return { join, busy, error };
}

export function QuizLobby() {
  const { t } = useI18n();
  const { me, loaded, reload } = useMe();
  const { join, busy, error } = useJoin();
  const [code, setCode] = useState("");
  const open = usePoll<{ sessions: OpenSession[] }>("/api/sessions/open", () => 5000);

  if (!loaded) return <p className="text-muted">{t("common.loading")}</p>;
  if (!me) return <RegisterForm onRegistered={reload} />;

  return (
    <div className="space-y-6">
      <SignedInBar me={me} onSignOut={reload} />

      {me.activeSession && (me.activeSession.status === "OPEN" || me.activeSession.status === "LIVE") && (
        <Alert tone="info">
          <p>{t("quiz.alreadyIn", { code: me.activeSession.code })}</p>
          <Link href={`/quiz/session/${me.activeSession.id}`} className="mt-2 inline-block font-semibold text-burgundy underline">
            {t("quiz.goToSession")} →
          </Link>
        </Alert>
      )}

      {error && <JoinProblem error={error} onPick={join} />}

      <Card>
        <h2 className="text-2xl font-bold text-burgundy-deep">{t("quiz.openSessions")}</h2>
        <div aria-live="polite" className="mt-4">
          {!open.data ? (
            <p className="text-muted">{t("common.loading")}</p>
          ) : open.data.sessions.length === 0 ? (
            <p className="text-muted">{t("quiz.noOpen")}</p>
          ) : (
            <ul className="space-y-3">
              {open.data.sessions.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4">
                  <div>
                    <p className="font-mono text-xl font-bold tracking-widest text-burgundy-deep">{s.code}</p>
                    {s.title && <p className="text-sm text-muted">{s.title}</p>}
                    <p className="text-sm">{s.isFull ? <Badge tone="danger">{t("quiz.full")}</Badge> : t("quiz.seatsLeft", { n: s.seatsLeft })}</p>
                  </div>
                  <Button type="button" disabled={busy || s.isFull} onClick={() => join(s.code)}>
                    {t("quiz.join")}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>

      <Card>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void join(code);
          }}
        >
          <h2 className="text-2xl font-bold text-burgundy-deep">{t("quiz.joinByCode")}</h2>
          <Field label={t("quiz.code")} hint={t("quiz.codeHint")} htmlFor="session-code">
            <input
              id="session-code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className={`${inputClass} font-mono text-xl tracking-[0.3em] uppercase`}
              maxLength={7}
              autoComplete="off"
              autoCapitalize="characters"
              inputMode="text"
              aria-describedby="session-code-hint"
            />
          </Field>
          <Button type="submit" disabled={busy || code.replace(/[^0-9A-Z]/gi, "").length !== 6}>
            {busy ? t("join.joining") : t("quiz.join")}
          </Button>
        </form>
      </Card>
    </div>
  );
}
