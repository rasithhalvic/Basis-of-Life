"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Field, inputClass } from "@/components/ui";
import { api } from "@/lib/client-api";
import { CATEGORIES, DIFFICULTIES } from "@/lib/validation";

type Lang = { prompt: string; options: string[]; explanation: string };
const emptyLang = (): Lang => ({ prompt: "", options: ["", "", "", ""], explanation: "" });

export function QuestionEditor({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "new";
  const [loaded, setLoaded] = useState(isNew);
  const [category, setCategory] = useState<string>("SCIENCE");
  const [difficulty, setDifficulty] = useState<string>("MEDIUM");
  const [source, setSource] = useState("");
  const [correctIndex, setCorrectIndex] = useState(0);
  const [en, setEn] = useState<Lang>(emptyLang());
  const [si, setSi] = useState<Lang>(emptyLang());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    api<{ question: { category: string; difficulty: string; source: string | null; correctIndex: number; translations: Record<"en" | "si", (Omit<Lang, "explanation"> & { explanation: string | null }) | null> } }>(
      `/api/admin/questions/${id}`,
    ).then((r) => {
      if (!r.ok) return setError(r.error.message);
      const q = r.data.question;
      setCategory(q.category);
      setDifficulty(q.difficulty);
      setSource(q.source ?? "");
      setCorrectIndex(q.correctIndex);
      if (q.translations.en) setEn({ ...q.translations.en, explanation: q.translations.en.explanation ?? "" });
      if (q.translations.si) setSi({ ...q.translations.si, explanation: q.translations.si.explanation ?? "" });
      setLoaded(true);
    });
  }, [id, isNew]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const hasSi = si.prompt.trim() || si.options.some((o) => o.trim());
    const body = { category, difficulty, source: source || null, correctIndex, translations: { en, si: hasSi ? si : null } };
    const r = await api<{ question: { id: string } }>(isNew ? "/api/admin/questions" : `/api/admin/questions/${id}`, { method: isNew ? "POST" : "PUT", body });
    if (!r.ok) {
      const issues = (r.error.details?.issues as { path: string; message: string }[] | undefined)?.map((i) => `${i.path}: ${i.message}`).join("; ");
      return setError(issues || r.error.message);
    }
    router.push("/admin/questions");
  }

  async function remove() {
    if (!window.confirm("Delete this question? Sessions that already used it keep their snapshot.")) return;
    const r = await api(`/api/admin/questions/${id}`, { method: "DELETE" });
    if (r.ok) router.push("/admin/questions");
    else setError(r.error.message);
  }

  if (!loaded) return <p>{error ?? "Loading…"}</p>;

  const langBlock = (code: "en" | "si", label: string, v: Lang, set: (l: Lang) => void) => (
    <Card className="space-y-3" lang={code}>
      <h2 className="text-lg font-bold">{label}</h2>
      <Field label="Question" htmlFor={`${code}-prompt`}>
        <textarea id={`${code}-prompt`} rows={2} className={inputClass} value={v.prompt} onChange={(e) => set({ ...v, prompt: e.target.value })} />
      </Field>
      {v.options.map((o, i) => (
        <Field key={i} label={`Option ${"ABCD"[i]}${i === correctIndex ? " (correct)" : ""}`} htmlFor={`${code}-o${i}`}>
          <input id={`${code}-o${i}`} className={inputClass} value={o} onChange={(e) => set({ ...v, options: v.options.map((x, j) => (j === i ? e.target.value : x)) })} />
        </Field>
      ))}
      <Field label="Explanation (shown after the session)" htmlFor={`${code}-expl`}>
        <textarea id={`${code}-expl`} rows={2} className={inputClass} value={v.explanation} onChange={(e) => set({ ...v, explanation: e.target.value })} />
      </Field>
    </Card>
  );

  return (
    <form onSubmit={save} className="space-y-5">
      <h1 className="text-3xl font-bold text-burgundy-deep">{isNew ? "New question" : "Edit question"}</h1>
      <Alert tone="warning">Saving sends the question back to UNREVIEWED. The Sinhala version must say exactly the same thing as the English version, with options in the same order.</Alert>
      <Card className="grid gap-4 sm:grid-cols-4">
        <Field label="Category" htmlFor="cat">
          <select id="cat" className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
        </Field>
        <Field label="Difficulty" htmlFor="dif">
          <select id="dif" className={inputClass} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>{DIFFICULTIES.map((c) => <option key={c}>{c}</option>)}</select>
        </Field>
        <Field label="Correct option" htmlFor="correct">
          <select id="correct" className={inputClass} value={correctIndex} onChange={(e) => setCorrectIndex(Number(e.target.value))}>
            {[0, 1, 2, 3].map((i) => <option key={i} value={i}>{"ABCD"[i]}</option>)}
          </select>
        </Field>
        <Field label="Source / reference" htmlFor="src">
          <input id="src" className={inputClass} value={source} onChange={(e) => setSource(e.target.value)} />
        </Field>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        {langBlock("en", "English", en, setEn)}
        {langBlock("si", "Sinhala (සිංහල)", si, setSi)}
      </div>
      {error && <Alert tone="error">{error}</Alert>}
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Save</Button>
        {!isNew && <Button type="button" variant="danger" onClick={remove}>Delete</Button>}
      </div>
    </form>
  );
}
