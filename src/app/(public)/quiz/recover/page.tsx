"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Button, Card, Container, Field, SectionTitle, inputClass } from "@/components/ui";
import { useI18n } from "@/i18n/client";
import { api } from "@/lib/client-api";

export default function RecoverPage() {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await api<{ participant: { nickname: string } }>("/api/participants/recover", { method: "POST", body: { recoveryCode: code } });
    setBusy(false);
    if (r.ok) setName(r.data.participant.nickname);
    else setError(r.error.message);
  }

  return (
    <Container className="max-w-xl py-8 sm:py-12">
      <SectionTitle as="h1">{t("recover.title")}</SectionTitle>
      {name ? (
        <Alert tone="success">
          <p>{t("recover.done", { name })}</p>
          <Link href="/quiz" className="mt-2 inline-block font-semibold text-burgundy underline">
            {t("nav.quiz")} →
          </Link>
        </Alert>
      ) : (
        <Card>
          <form onSubmit={submit} className="space-y-4">
            <Field label={t("recover.code")} htmlFor="recovery" error={error}>
              <input
                id="recovery"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className={`${inputClass} font-mono tracking-widest`}
                placeholder="XXXX-XXXX-XXXX"
                autoComplete="off"
                autoCapitalize="characters"
              />
            </Field>
            <Button type="submit" disabled={busy || code.replace(/[^0-9A-Z]/gi, "").length !== 12}>
              {t("recover.submit")}
            </Button>
          </form>
        </Card>
      )}
    </Container>
  );
}
