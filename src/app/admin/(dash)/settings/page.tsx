"use client";

import { useEffect, useState } from "react";
import { Alert, Button, Card, Field, inputClass } from "@/components/ui";
import { api } from "@/lib/client-api";

type T = { name: string; introduction: string; venue: string; dateText: string };
const emptyT = (): T => ({ name: "", introduction: "", venue: "", dateText: "" });

/** datetime-local value in Asia/Colombo (UTC+05:30, no DST) ↔ ISO UTC. */
const toLocal = (iso: string | null) => (iso ? new Date(new Date(iso).getTime() + 330 * 60_000).toISOString().slice(0, 16) : "");
const fromLocal = (v: string) => (v ? `${v}:00+05:30` : null);

export default function AdminSettingsPage() {
  const [form, setForm] = useState<null | {
    publicBaseUrl: string; eventStartsAt: string; eventEndsAt: string; grandQualifyTopN: number;
    defaultQuestionCount: number; defaultSecondsPerQuestion: number; rankingsDeclaredFinal: boolean; en: T; si: T;
  }>(null);
  const [envUrl, setEnvUrl] = useState("");
  const [msg, setMsg] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    api<{ envPublicBaseUrl: string; settings: { publicBaseUrl: string | null; eventStartsAt: string | null; eventEndsAt: string | null; grandQualifyTopN: number; defaultQuestionCount: number; defaultSecondsPerQuestion: number; rankingsDeclaredFinal: boolean; translations: (T & { locale: "en" | "si"; dateText: string | null })[] } }>(
      "/api/admin/settings",
    ).then((r) => {
      if (!r.ok) return;
      const s = r.data.settings;
      const tr = (l: "en" | "si") => {
        const x = s.translations.find((t) => t.locale === l);
        return x ? { name: x.name, introduction: x.introduction, venue: x.venue, dateText: x.dateText ?? "" } : emptyT();
      };
      setEnvUrl(r.data.envPublicBaseUrl);
      setForm({
        publicBaseUrl: s.publicBaseUrl ?? "",
        eventStartsAt: toLocal(s.eventStartsAt),
        eventEndsAt: toLocal(s.eventEndsAt),
        grandQualifyTopN: s.grandQualifyTopN,
        defaultQuestionCount: s.defaultQuestionCount,
        defaultSecondsPerQuestion: s.defaultSecondsPerQuestion,
        rankingsDeclaredFinal: s.rankingsDeclaredFinal,
        en: tr("en"),
        si: tr("si"),
      });
    });
  }, []);

  if (!form) return <p>Loading…</p>;

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    const r = await api("/api/admin/settings", {
      method: "PUT",
      body: {
        ...form,
        publicBaseUrl: form.publicBaseUrl || null,
        eventStartsAt: fromLocal(form.eventStartsAt),
        eventEndsAt: fromLocal(form.eventEndsAt),
        translations: { en: form.en, si: form.si },
        en: undefined,
        si: undefined,
      },
    });
    if (r.ok) setMsg({ tone: "success", text: "Settings saved." });
    else {
      const issues = (r.error.details?.issues as { path: string; message: string }[] | undefined)?.map((i) => `${i.path}: ${i.message}`).join("; ");
      setMsg({ tone: "error", text: issues || r.error.message });
    }
  }

  const tBlock = (l: "en" | "si", label: string) => {
    const v = form[l];
    const set = (patch: Partial<T>) => setForm({ ...form, [l]: { ...v, ...patch } });
    return (
      <Card className="space-y-3" lang={l}>
        <h2 className="text-lg font-bold">{label}</h2>
        <Field label="Exhibition name" htmlFor={`${l}-name`}><input id={`${l}-name`} className={inputClass} value={v.name} onChange={(e) => set({ name: e.target.value })} /></Field>
        <Field label="Introduction" htmlFor={`${l}-intro`}><textarea id={`${l}-intro`} rows={4} className={inputClass} value={v.introduction} onChange={(e) => set({ introduction: e.target.value })} /></Field>
        <Field label="Venue" htmlFor={`${l}-venue`}><input id={`${l}-venue`} className={inputClass} value={v.venue} onChange={(e) => set({ venue: e.target.value })} /></Field>
        <Field label="Date line (optional, overrides formatted dates)" htmlFor={`${l}-date`}><input id={`${l}-date`} className={inputClass} value={v.dateText} onChange={(e) => set({ dateText: e.target.value })} /></Field>
      </Card>
    );
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <h1 className="text-3xl font-bold text-burgundy-deep">Settings</h1>
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Public base URL (used in printed QR codes)" hint={`Production HTTPS domain. If blank: ${envUrl}`} htmlFor="base">
          <input id="base" className={inputClass} value={form.publicBaseUrl} placeholder="https://exhibition.example.lk" onChange={(e) => setForm({ ...form, publicBaseUrl: e.target.value })} />
        </Field>
        <Field label="Grand leaderboard: top N per session" hint="Ties at the cutoff all qualify." htmlFor="topn">
          <input id="topn" type="number" min={1} max={20} className={inputClass} value={form.grandQualifyTopN} onChange={(e) => setForm({ ...form, grandQualifyTopN: Number(e.target.value) })} />
        </Field>
        <Field label="Exhibition starts (Asia/Colombo)" htmlFor="start">
          <input id="start" type="datetime-local" className={inputClass} value={form.eventStartsAt} onChange={(e) => setForm({ ...form, eventStartsAt: e.target.value })} />
        </Field>
        <Field label="Exhibition ends (Asia/Colombo)" htmlFor="end">
          <input id="end" type="datetime-local" className={inputClass} value={form.eventEndsAt} onChange={(e) => setForm({ ...form, eventEndsAt: e.target.value })} />
        </Field>
        <Field label="Default questions per session" htmlFor="dq">
          <input id="dq" type="number" min={1} max={50} className={inputClass} value={form.defaultQuestionCount} onChange={(e) => setForm({ ...form, defaultQuestionCount: Number(e.target.value) })} />
        </Field>
        <Field label="Default seconds per question" htmlFor="ds">
          <input id="ds" type="number" min={5} max={300} className={inputClass} value={form.defaultSecondsPerQuestion} onChange={(e) => setForm({ ...form, defaultSecondsPerQuestion: Number(e.target.value) })} />
        </Field>
        <label className="flex items-start gap-3 sm:col-span-2">
          <input type="checkbox" className="mt-1 h-6 w-6 accent-burgundy" checked={form.rankingsDeclaredFinal} onChange={(e) => setForm({ ...form, rankingsDeclaredFinal: e.target.checked })} />
          <span>
            <strong>Declare the grand leaderboard final</strong>
            <span className="block text-sm text-muted">Allowed only when every session is finalized or cancelled. Creating a new session clears this.</span>
          </span>
        </label>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        {tBlock("en", "English")}
        {tBlock("si", "Sinhala (සිංහල)")}
      </div>
      {msg && <Alert tone={msg.tone}>{msg.text}</Alert>}
      <Button type="submit">Save settings</Button>
    </form>
  );
}
