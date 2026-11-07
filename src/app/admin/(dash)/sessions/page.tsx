"use client";

import Link from "next/link";
import { useState } from "react";
import { Alert, Badge, Button, Card, Field, inputClass } from "@/components/ui";
import { api, usePoll } from "@/lib/client-api";
import { formatDateTime } from "@/lib/format";
import { CATEGORIES } from "@/lib/validation";

interface Row {
  id: string;
  code: string;
  title: string | null;
  status: string;
  createdAt: string;
  questionCount: number;
  secondsPerQuestion: number;
  _count: { participants: number };
}

const statusTone = (s: string) =>
  (({ LIVE: "burgundy", OPEN: "success", COMPLETED: "gold", FINALIZED: "neutral", CANCELLED: "danger" }) as const)[s as "LIVE"] ?? "neutral";

export default function AdminSessionsPage() {
  const { data, refresh } = usePoll<{ sessions: Row[] }>("/api/admin/sessions", () => 5000);
  const [title, setTitle] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [seconds, setSeconds] = useState(30);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const r = await api("/api/admin/sessions", {
      method: "POST",
      body: { title: title || null, questionCount, secondsPerQuestion: seconds, categories, openImmediately: true },
    });
    setBusy(false);
    if (!r.ok) setError(r.error.message);
    else {
      setTitle("");
      refresh();
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-burgundy-deep">Quiz sessions</h1>
      <Card>
        <form onSubmit={create} className="space-y-4">
          <h2 className="text-xl font-bold">Create a session (capacity fixed at 20)</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Title (optional)" htmlFor="title">
              <input id="title" className={inputClass} value={title} maxLength={80} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Saturday 10:00" />
            </Field>
            <Field label="Questions" htmlFor="qcount">
              <input id="qcount" type="number" min={1} max={50} className={inputClass} value={questionCount} onChange={(e) => setQuestionCount(Number(e.target.value))} />
            </Field>
            <Field label="Seconds per question" htmlFor="secs">
              <input id="secs" type="number" min={5} max={300} className={inputClass} value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} />
            </Field>
          </div>
          <fieldset>
            <legend className="font-semibold">Categories (none selected = all)</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <label key={c} className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white px-3">
                  <input
                    type="checkbox"
                    className="h-5 w-5 accent-burgundy"
                    checked={categories.includes(c)}
                    onChange={(e) => setCategories(e.target.checked ? [...categories, c] : categories.filter((x) => x !== c))}
                  />
                  {c.toLowerCase()}
                </label>
              ))}
            </div>
          </fieldset>
          {error && <Alert tone="error">{error}</Alert>}
          <Button type="submit" disabled={busy}>Create and open registration</Button>
          <p className="text-sm text-muted">Settings can be changed until the session starts. Visitors see open sessions on the Quiz page and can join with the code.</p>
        </form>
      </Card>

      <Card className="overflow-x-auto p-0!">
        <table className="w-full text-left text-sm">
          <thead className="bg-burgundy-deep text-white">
            <tr>
              <th className="p-3">Code</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Admitted</th>
              <th className="p-3">Created (Colombo)</th>
            </tr>
          </thead>
          <tbody>
            {data?.sessions.map((s) => (
              <tr key={s.id} className="border-t border-line">
                <td className="p-3">
                  <Link href={`/admin/sessions/${s.id}`} className="font-mono text-base font-bold tracking-wider text-burgundy underline">
                    {s.code}
                  </Link>
                </td>
                <td className="p-3">{s.title}</td>
                <td className="p-3"><Badge tone={statusTone(s.status)}>{s.status}</Badge></td>
                <td className="p-3">{s._count.participants} / 20</td>
                <td className="p-3">{formatDateTime(s.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {data?.sessions.length === 0 && <p className="p-4 text-muted">No sessions yet.</p>}
      </Card>
    </div>
  );
}
