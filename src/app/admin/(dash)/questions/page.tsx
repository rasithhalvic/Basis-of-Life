"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Alert, Badge, Card, LinkButton, inputClass } from "@/components/ui";
import { api } from "@/lib/client-api";
import { CATEGORIES, REVIEW_STATUSES } from "@/lib/validation";

interface Q {
  id: string;
  category: string;
  difficulty: string;
  reviewStatus: string;
  dataOrigin: string;
  source: string | null;
  correctIndex: number;
  translations: { en: { prompt: string; options: string[] } | null; si: { prompt: string; options: string[] } | null };
}

export default function AdminQuestionsPage() {
  const [filter, setFilter] = useState({ category: "", reviewStatus: "", q: "" });
  const [list, setList] = useState<Q[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const sp = new URLSearchParams(Object.entries(filter).filter(([, v]) => v));
    const ctrl = new AbortController();
    api<{ questions: Q[] }>(`/api/admin/questions?${sp}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? setList(r.data.questions) : setError(r.error.message)))
      .catch(() => {});
    return () => ctrl.abort();
  }, [filter, version]);

  async function review(id: string, reviewStatus: string) {
    const r = await api(`/api/admin/questions/${id}/review`, { method: "POST", body: { reviewStatus } });
    if (!r.ok) setError(r.error.message);
    setVersion((v) => v + 1);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-burgundy-deep">Question bank</h1>
        <LinkButton href="/admin/questions/new">New question</LinkButton>
      </div>
      <Alert tone="info">
        Only <strong>REVIEWED</strong> questions with complete English and Sinhala versions can enter a live session. Editing a question resets it to UNREVIEWED.
        Sessions already started keep their own snapshot.
      </Alert>
      <div className="grid gap-3 sm:grid-cols-3">
        <select aria-label="Category" className={inputClass} value={filter.category} onChange={(e) => setFilter({ ...filter, category: e.target.value })}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select aria-label="Review status" className={inputClass} value={filter.reviewStatus} onChange={(e) => setFilter({ ...filter, reviewStatus: e.target.value })}>
          <option value="">All review states</option>
          {REVIEW_STATUSES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input aria-label="Search" type="search" placeholder="Search prompts…" className={inputClass} value={filter.q} onChange={(e) => setFilter({ ...filter, q: e.target.value })} />
      </div>
      {error && <Alert tone="error">{error}</Alert>}
      <p className="text-sm text-muted">{list ? `${list.length} questions` : "Loading…"}</p>
      <ul className="space-y-3">
        {list?.map((q) => (
          <li key={q.id}>
            <Card className="p-4!">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <Badge tone={q.reviewStatus === "REVIEWED" ? "success" : q.reviewStatus === "REJECTED" ? "danger" : "gold"}>{q.reviewStatus}</Badge>
                <Badge>{q.category}</Badge>
                <Badge>{q.difficulty}</Badge>
                {q.dataOrigin !== "PRODUCTION" && <Badge tone="danger">{q.dataOrigin}</Badge>}
                {!q.translations.si && <Badge tone="danger">No Sinhala</Badge>}
              </div>
              <p className="mt-2 font-semibold">{q.translations.en?.prompt}</p>
              {q.translations.si && <p className="text-sm text-muted" lang="si">{q.translations.si.prompt}</p>}
              <p className="mt-1 text-sm">
                Answer: <strong>{q.translations.en?.options[q.correctIndex]}</strong>
                {q.source && <span className="text-muted"> · Source: {q.source}</span>}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <Link href={`/admin/questions/${q.id}`} className="min-h-10 rounded-lg border border-line px-3 py-2 font-semibold">Edit</Link>
                {q.reviewStatus !== "REVIEWED" && (
                  <button className="min-h-10 rounded-lg bg-success px-3 py-2 font-semibold text-white" onClick={() => review(q.id, "REVIEWED")}>Mark reviewed</button>
                )}
                {q.reviewStatus !== "REJECTED" && (
                  <button className="min-h-10 rounded-lg border border-danger px-3 py-2 font-semibold text-danger" onClick={() => review(q.id, "REJECTED")}>Reject</button>
                )}
                {q.reviewStatus !== "UNREVIEWED" && (
                  <button className="min-h-10 rounded-lg border border-line px-3 py-2" onClick={() => review(q.id, "UNREVIEWED")}>Reset to unreviewed</button>
                )}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
