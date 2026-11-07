"use client";

import { useState } from "react";
import { Alert, Badge, Button, Card, Field, buttonClass, inputClass } from "@/components/ui";
import { api, usePoll } from "@/lib/client-api";
import { formatDateTime, formatSeconds, formatTime } from "@/lib/format";

interface Detail {
  serverNow: string;
  session: {
    id: string; code: string; title: string | null; status: string; capacity: number; questionCount: number;
    secondsPerQuestion: number; breakSeconds: number; countdownSeconds: number; startedAt: string | null; endsAt: string | null;
    finalizedAt: string | null; cancelReason: string | null;
  };
  participants: {
    id: string; admittedAt: string; disqualifiedAt: string | null; disqualificationReason: string | null;
    disqualifiedBy: { email: string } | null; participant: { nickname: string; nicknameConsent: boolean }; _count: { answers: number };
  }[];
  questions: { id: string; position: number; category: string; promptEn: string; opensAt: string; closesAt: string; state: string; _count: { answers: number } }[];
  ranking: { sessionParticipantId: string; nickname: string; rank: number; totalPoints: number; totalTimeMs: number }[];
}

const STATUS_TONE = { LIVE: "burgundy", OPEN: "success", COMPLETED: "gold", FINALIZED: "neutral", CANCELLED: "danger", DRAFT: "neutral" } as const;

export function SessionAdmin({ id }: { id: string }) {
  const { data, refresh } = usePoll<Detail>(`/api/admin/sessions/${id}`, (d) => (d?.session.status === "LIVE" ? 2000 : 5000));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function act(path: string, body?: unknown, confirmText?: string) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    setError(null);
    const r = await api(path, { method: "POST", body });
    setBusy(false);
    if (!r.ok) setError(r.error.message);
    refresh();
  }

  if (!data) return <p>Loading…</p>;
  const s = data.session;
  const joinUrl = typeof window !== "undefined" ? `${window.location.origin}/quiz/join/${s.code}` : "";
  const editable = s.status === "DRAFT" || s.status === "OPEN";
  const rankBySp = new Map(data.ranking.map((r) => [r.sessionParticipantId, r]));

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-4xl font-bold tracking-widest text-burgundy-deep">{s.code}</h1>
        <Badge tone={STATUS_TONE[s.status as keyof typeof STATUS_TONE]}>{s.status}</Badge>
        {s.title && <span className="text-muted">{s.title}</span>}
      </div>
      {error && <Alert tone="error">{error}</Alert>}

      <Card className="space-y-4">
        <p>
          <strong>{data.participants.length} / {s.capacity}</strong> admitted · {s.questionCount} questions × {s.secondsPerQuestion}s (+{s.breakSeconds}s break, {s.countdownSeconds}s countdown)
        </p>
        {s.status === "OPEN" && (
          <p className="text-sm">
            Direct join link: <code className="break-all rounded bg-ivory px-1">{joinUrl}</code>
          </p>
        )}
        {s.startedAt && <p className="text-sm text-muted">Started {formatDateTime(s.startedAt)} · ends {s.endsAt && formatTime(s.endsAt)} (Asia/Colombo)</p>}
        {s.cancelReason && <Alert tone="error">Cancelled: {s.cancelReason}</Alert>}
        <div className="flex flex-wrap gap-3">
          {s.status === "DRAFT" && <Button disabled={busy} onClick={() => act(`/api/admin/sessions/${id}/open`)}>Open registration</Button>}
          {s.status === "OPEN" && (
            <Button
              disabled={busy || data.participants.length === 0}
              onClick={() => act(`/api/admin/sessions/${id}/start`, undefined, `Start session ${s.code} now? Late admission will close and questions will be fixed.`)}
            >
              Start session
            </Button>
          )}
          {s.status === "COMPLETED" && (
            <Button disabled={busy} onClick={() => act(`/api/admin/sessions/${id}/finalize`, undefined, "Finalize? This publishes official rankings.")}>
              Finalize results
            </Button>
          )}
          {s.status === "FINALIZED" && (
            <a className={buttonClass("secondary")} href={`/api/admin/exports/sessions/${id}`}>
              Export CSV
            </a>
          )}
          {s.status !== "FINALIZED" && s.status !== "CANCELLED" && (
            <Button
              variant="danger"
              disabled={busy}
              onClick={() => {
                const reason = window.prompt("Reason for cancelling this session (shown in the audit log):");
                if (reason && reason.trim().length >= 3) void act(`/api/admin/sessions/${id}/cancel`, { reason });
              }}
            >
              Cancel session
            </Button>
          )}
        </div>
      </Card>

      {editable && <SettingsEditor detail={data} onSaved={refresh} />}

      {data.questions.length > 0 && (
        <Card>
          <h2 className="mb-3 text-xl font-bold">Question progress</h2>
          <ol className="space-y-2 text-sm">
            {data.questions.map((q) => (
              <li key={q.id} className="flex flex-wrap items-center gap-2 border-b border-line pb-2">
                <Badge tone={q.state === "open" ? "burgundy" : q.state === "closed" ? "neutral" : "gold"}>{q.state}</Badge>
                <span className="font-semibold">{q.position + 1}.</span>
                <span className="flex-1">{q.promptEn}</span>
                <span className="text-muted">{q._count.answers} answers · opens {formatTime(q.opensAt)}</span>
              </li>
            ))}
          </ol>
        </Card>
      )}

      <Card className="overflow-x-auto">
        <h2 className="mb-3 text-xl font-bold">Participants</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="p-2">Rank</th>
              <th className="p-2">Nickname</th>
              <th className="p-2">Answers</th>
              <th className="p-2">Points</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.participants.map((p) => {
              const r = rankBySp.get(p.id);
              return (
                <tr key={p.id} className="border-b border-line align-top">
                  <td className="p-2">{r?.rank ?? "—"}</td>
                  <td className="p-2">
                    {p.participant.nickname}
                    {!p.participant.nicknameConsent && <span className="block text-xs text-muted">(anonymous publicly)</span>}
                  </td>
                  <td className="p-2">{p._count.answers}</td>
                  <td className="p-2">{r?.totalPoints ?? "—"}</td>
                  <td className="p-2">{r ? formatSeconds(r.totalTimeMs) : "—"}</td>
                  <td className="p-2">
                    {p.disqualifiedAt ? (
                      <div>
                        <Badge tone="danger">Disqualified</Badge>
                        <p className="text-xs text-muted">{p.disqualificationReason} — {p.disqualifiedBy?.email}</p>
                        <button className="text-xs underline" onClick={() => act2(`/api/admin/sessions/${id}/participants/${p.id}/disqualify`, "DELETE")}>
                          Reinstate
                        </button>
                      </div>
                    ) : (
                      <button
                        className="min-h-9 rounded-lg border border-danger px-2 text-xs font-semibold text-danger"
                        onClick={() => {
                          const reason = window.prompt(`Disqualify ${p.participant.nickname}? Enter the reason (recorded in the audit log):`);
                          if (reason && reason.trim().length >= 3) void act(`/api/admin/sessions/${id}/participants/${p.id}/disqualify`, { reason });
                        }}
                      >
                        Disqualify
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {data.participants.length === 0 && <p className="text-muted">No participants admitted yet.</p>}
        <p className="mt-3 text-xs text-muted">Rankings are recalculated from stored answers on every request, so disqualification takes effect immediately in session and grand leaderboards.</p>
      </Card>
    </div>
  );

  async function act2(path: string, method: string) {
    const r = await api(path, { method });
    if (!r.ok) setError(r.error.message);
    refresh();
  }
}

function SettingsEditor({ detail, onSaved }: { detail: Detail; onSaved: () => void }) {
  const s = detail.session;
  const [form, setForm] = useState({
    title: s.title ?? "",
    questionCount: s.questionCount,
    secondsPerQuestion: s.secondsPerQuestion,
    breakSeconds: s.breakSeconds,
    countdownSeconds: s.countdownSeconds,
  });
  const [msg, setMsg] = useState<string | null>(null);
  const num = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: Number(e.target.value) });
  return (
    <Card>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const r = await api(`/api/admin/sessions/${s.id}`, { method: "PATCH", body: { ...form, title: form.title || null } });
          setMsg(r.ok ? "Saved." : r.error.message);
          onSaved();
        }}
      >
        <h2 className="text-xl font-bold">Settings (editable until start)</h2>
        <div className="grid gap-3 sm:grid-cols-5">
          <Field label="Title" htmlFor="st"><input id="st" className={inputClass} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Questions" htmlFor="sq"><input id="sq" type="number" min={1} max={50} className={inputClass} value={form.questionCount} onChange={num("questionCount")} /></Field>
          <Field label="Seconds" htmlFor="ss"><input id="ss" type="number" min={5} max={300} className={inputClass} value={form.secondsPerQuestion} onChange={num("secondsPerQuestion")} /></Field>
          <Field label="Break (s)" htmlFor="sb"><input id="sb" type="number" min={0} max={60} className={inputClass} value={form.breakSeconds} onChange={num("breakSeconds")} /></Field>
          <Field label="Countdown (s)" htmlFor="sc"><input id="sc" type="number" min={0} max={120} className={inputClass} value={form.countdownSeconds} onChange={num("countdownSeconds")} /></Field>
        </div>
        <Button type="submit" variant="secondary">Save settings</Button>
        {msg && <p role="status" className="text-sm">{msg}</p>}
      </form>
    </Card>
  );
}
