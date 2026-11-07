"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Alert, Button, Card, Field, inputClass } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { api } from "@/lib/client-api";

export interface Me {
  participant: { id: string; nickname: string; nicknameConsent: boolean };
  activeSession: { id: string; code: string; status: string } | null;
}

/** Current visitor identity (server-issued cookie session). */
export function useMe() {
  const [me, setMe] = useState<Me | null>(null);
  const [loaded, setLoaded] = useState(false);
  const reload = useCallback(async () => {
    const r = await api<Me>("/api/participants/me");
    setMe(r.ok ? r.data : null);
    setLoaded(true);
  }, []);
  useEffect(() => {
    // Initial fetch of the visitor identity on mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload();
  }, [reload]);
  return { me, loaded, reload };
}

export function RegisterForm({ onRegistered }: { onRegistered: () => void }) {
  const { t, locale } = useI18n();
  const [nickname, setNickname] = useState("");
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [recovery, setRecovery] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await api<{ recoveryCode: string }>("/api/participants", {
      method: "POST",
      body: { nickname, consentToDisplayNickname: consent, locale },
    });
    setBusy(false);
    if (!r.ok) {
      const issue = (r.error.details?.issues as { message: string }[] | undefined)?.[0]?.message;
      setError(issue ?? r.error.message);
      return;
    }
    setRecovery(r.data.recoveryCode);
  }

  if (recovery) {
    return (
      <Card className="border-gold">
        <h2 className="text-2xl font-bold text-burgundy-deep">{t("register.recoveryTitle")}</h2>
        <p className="mt-2 text-muted">{t("register.recoveryLead")}</p>
        <p className="my-5 rounded-xl border-2 border-dashed border-gold bg-ivory p-4 text-center font-mono text-2xl font-bold tracking-widest text-burgundy-deep" data-testid="recovery-code">
          {recovery}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="secondary"
            type="button"
            onClick={async () => {
              await navigator.clipboard?.writeText(recovery).catch(() => {});
              setCopied(true);
            }}
          >
            {copied ? t("register.copied") : t("register.copy")}
          </Button>
          <Button type="button" onClick={onRegistered}>
            {t("register.recoverySaved")}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <form onSubmit={submit} className="space-y-5" noValidate>
        <div>
          <h2 className="text-2xl font-bold text-burgundy-deep">{t("register.title")}</h2>
          <p className="mt-1 text-muted">{t("register.lead")}</p>
        </div>
        <Field label={t("register.nickname")} hint={t("register.nicknameHint")} error={error} htmlFor="nickname">
          <input
            id="nickname"
            className={inputClass}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            maxLength={24}
            minLength={2}
            required
            autoComplete="nickname"
            aria-describedby={`nickname-hint${error ? " nickname-error" : ""}`}
            aria-invalid={Boolean(error)}
          />
        </Field>
        <div className="flex gap-3">
          <input
            id="consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-6 w-6 shrink-0 accent-burgundy"
            aria-describedby="consent-hint"
          />
          <div>
            <label htmlFor="consent" className="font-semibold">
              {t("register.consent")}
            </label>
            <p id="consent-hint" className="text-sm text-muted">
              {t("register.consentHint")}
            </p>
          </div>
        </div>
        <p className="rounded-lg bg-ivory p-3 text-sm text-muted">{t("register.privacy")}</p>
        <Button type="submit" disabled={busy || nickname.trim().length < 2} className="w-full sm:w-auto">
          {busy ? t("common.loading") : t("register.submit")}
        </Button>
        <p className="text-sm">
          <Link href="/quiz/recover" className="text-burgundy underline underline-offset-2">
            {t("register.notYou")}
          </Link>
        </p>
      </form>
    </Card>
  );
}

export function SignedInBar({ me, onSignOut }: { me: Me; onSignOut: () => void }) {
  const { t } = useI18n();
  const [before, after] = t("register.signedInAs", { name: "\u0000" }).split("\u0000");
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-2">
      <p>
        {before}
        <strong className="text-burgundy-deep">{me.participant.nickname}</strong>
        {after}
      </p>
      <button
        type="button"
        className="min-h-11 text-sm text-muted underline underline-offset-2"
        onClick={async () => {
          await api("/api/participants/me", { method: "DELETE" });
          onSignOut();
        }}
      >
        {t("register.signOut")}
      </button>
    </div>
  );
}

export interface Alternative {
  id: string;
  code: string;
  title: string | null;
  seatsLeft: number;
}

/** Shows a join failure (full / closed / already in another session) with next steps. */
export function JoinProblem({
  error,
  onPick,
}: {
  error: { code: string; message: string; details?: Record<string, unknown> };
  onPick: (code: string) => void;
}) {
  const { t } = useI18n();
  const alternatives = (error.details?.alternatives as Alternative[] | undefined) ?? [];
  if (error.code === "ALREADY_IN_ACTIVE_SESSION") {
    const d = error.details as { sessionId: string; code: string };
    return (
      <Alert tone="warning">
        <p>{t("quiz.alreadyIn", { code: d.code })}</p>
        <Link href={`/quiz/session/${d.sessionId}`} className="mt-2 inline-block font-semibold text-burgundy underline">
          {t("quiz.goToSession")} →
        </Link>
      </Alert>
    );
  }
  if (error.code !== "SESSION_FULL" && error.code !== "SESSION_CLOSED") return <Alert tone="error">{error.message}</Alert>;
  return (
    <Alert tone="warning">
      <p className="font-semibold" data-testid="join-problem">
        {error.code === "SESSION_FULL" ? t("join.full") : t("join.closed")}
      </p>
      {alternatives.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {alternatives.map((a) => (
            <li key={a.id}>
              <Button type="button" variant="secondary" className="w-full justify-between" onClick={() => onPick(a.code)}>
                <span className="font-mono tracking-wider">{a.code}</span>
                <span className="text-sm font-normal">{t("quiz.seatsLeft", { n: a.seatsLeft })}</span>
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2">{t("join.noAlternatives")}</p>
      )}
    </Alert>
  );
}
