"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, Card, Field, inputClass } from "@/components/ui";
import { api } from "@/lib/client-api";

interface TForm {
  name: string;
  lifeDates: string;
  field: string;
  introduction: string;
  biography: string;
  contributions: string; // one per line
  timeline: string; // "year | event" per line
  facts: string; // one per line
  portraitAlt: string;
}
const emptyT = (): TForm => ({ name: "", lifeDates: "", field: "", introduction: "", biography: "", contributions: "", timeline: "", facts: "", portraitAlt: "" });

interface ApiT {
  locale: "en" | "si";
  name: string;
  lifeDates: string;
  field: string;
  introduction: string;
  biography: string;
  contributions: string[];
  timeline: { year: string; event: string }[];
  facts: string[];
  portraitAlt: string;
}

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);
const toForm = (t: ApiT): TForm => ({
  ...t,
  contributions: t.contributions.join("\n"),
  facts: t.facts.join("\n"),
  timeline: t.timeline.map((e) => `${e.year} | ${e.event}`).join("\n"),
});
const fromForm = (t: TForm) => ({
  ...t,
  contributions: lines(t.contributions),
  facts: lines(t.facts),
  timeline: lines(t.timeline).map((l) => {
    const [year, ...rest] = l.split("|");
    return { year: year.trim(), event: rest.join("|").trim() };
  }),
});

export function PioneerEditor({ id }: { id: string }) {
  const router = useRouter();
  const isNew = id === "new";
  const [loaded, setLoaded] = useState(isNew);
  const [meta, setMeta] = useState({ slug: "", sortOrder: 1, isPublished: false, portraitUrl: "", portraitAttribution: "", portraitLicense: "", sources: "" });
  const [originalSlug, setOriginalSlug] = useState("");
  const [en, setEn] = useState<TForm>(emptyT());
  const [si, setSi] = useState<TForm>(emptyT());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    api<{ pioneer: { slug: string; sortOrder: number; isPublished: boolean; portraitUrl: string | null; portraitAttribution: string | null; portraitLicense: string | null; sources: { title: string; url: string | null }[]; translations: ApiT[] } }>(
      `/api/admin/pioneers/${id}`,
    ).then((r) => {
      if (!r.ok) return setError(r.error.message);
      const p = r.data.pioneer;
      setMeta({
        slug: p.slug,
        sortOrder: p.sortOrder,
        isPublished: p.isPublished,
        portraitUrl: p.portraitUrl ?? "",
        portraitAttribution: p.portraitAttribution ?? "",
        portraitLicense: p.portraitLicense ?? "",
        sources: p.sources.map((s) => (s.url ? `${s.title} | ${s.url}` : s.title)).join("\n"),
      });
      setOriginalSlug(p.slug);
      const e = p.translations.find((t) => t.locale === "en");
      const s = p.translations.find((t) => t.locale === "si");
      if (e) setEn(toForm(e));
      if (s) setSi(toForm(s));
      setLoaded(true);
    });
  }, [id, isNew]);

  async function save(ev: React.FormEvent) {
    ev.preventDefault();
    setError(null);
    if (!isNew && originalSlug && meta.slug !== originalSlug && !window.confirm(`Change the URL from /pioneers/${originalSlug} to /pioneers/${meta.slug}? The old URL will keep redirecting, but reprint QR codes if possible.`)) return;
    const hasSi = si.name.trim().length > 0;
    const body = {
      slug: meta.slug,
      sortOrder: meta.sortOrder,
      isPublished: meta.isPublished,
      portraitUrl: meta.portraitUrl || null,
      portraitAttribution: meta.portraitAttribution || null,
      portraitLicense: meta.portraitLicense || null,
      sources: lines(meta.sources).map((l) => {
        const [title, url] = l.split("|").map((x) => x.trim());
        return { title, url: url || null };
      }),
      translations: { en: fromForm(en), si: hasSi ? fromForm(si) : null },
    };
    const r = await api(isNew ? "/api/admin/pioneers" : `/api/admin/pioneers/${id}`, { method: isNew ? "POST" : "PUT", body });
    if (!r.ok) {
      const issues = (r.error.details?.issues as { path: string; message: string }[] | undefined)?.map((i) => `${i.path}: ${i.message}`).join("; ");
      return setError(issues || r.error.message);
    }
    router.push("/admin/pioneers");
    router.refresh();
  }

  async function remove() {
    if (!window.confirm("Delete this unpublished pioneer permanently?")) return;
    const r = await api(`/api/admin/pioneers/${id}`, { method: "DELETE" });
    if (r.ok) {
      router.push("/admin/pioneers");
      router.refresh();
    } else setError(r.error.message);
  }

  if (!loaded) return <p>{error ?? "Loading…"}</p>;

  const tBlock = (code: "en" | "si", label: string, v: TForm, set: (t: TForm) => void) => {
    const f = (k: keyof TForm, l: string, rows = 0, hint?: string) => (
      <Field key={k} label={l} hint={hint} htmlFor={`${code}-${k}`}>
        {rows ? (
          <textarea id={`${code}-${k}`} rows={rows} className={inputClass} value={v[k]} onChange={(e) => set({ ...v, [k]: e.target.value })} />
        ) : (
          <input id={`${code}-${k}`} className={inputClass} value={v[k]} onChange={(e) => set({ ...v, [k]: e.target.value })} />
        )}
      </Field>
    );
    return (
      <Card className="space-y-3" lang={code}>
        <h2 className="text-lg font-bold">{label}</h2>
        {f("name", "Name")}
        {f("lifeDates", "Dates", 0, "e.g. 1749–1823")}
        {f("field", "Field")}
        {f("introduction", "Introduction", 3)}
        {f("biography", "Biography", 8, "Separate paragraphs with a blank line.")}
        {f("contributions", "Major contributions", 4, "One per line.")}
        {f("timeline", "Timeline", 5, "One per line: year | event")}
        {f("facts", "Interesting facts", 4, "One per line.")}
        {f("portraitAlt", "Portrait alt text", 0, "Describe the image for screen-reader users.")}
      </Card>
    );
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <h1 className="text-3xl font-bold text-burgundy-deep">{isNew ? "New pioneer" : "Edit pioneer"}</h1>
      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Slug (URL)" hint="Lowercase letters, numbers and hyphens. Printed in QR codes — avoid changing." htmlFor="slug">
          <input id="slug" className={`${inputClass} font-mono`} value={meta.slug} onChange={(e) => setMeta({ ...meta, slug: e.target.value })} />
        </Field>
        <Field label="Order" htmlFor="order">
          <input id="order" type="number" min={0} className={inputClass} value={meta.sortOrder} onChange={(e) => setMeta({ ...meta, sortOrder: Number(e.target.value) })} />
        </Field>
        <Field label="Portrait URL" hint="Only licensed images. Leave blank to show the placeholder." htmlFor="purl">
          <input id="purl" className={inputClass} value={meta.portraitUrl} onChange={(e) => setMeta({ ...meta, portraitUrl: e.target.value })} />
        </Field>
        <Field label="Image attribution (as required by the licence)" htmlFor="pattr">
          <input id="pattr" className={inputClass} value={meta.portraitAttribution} onChange={(e) => setMeta({ ...meta, portraitAttribution: e.target.value })} />
        </Field>
        <Field label="Image licence" htmlFor="plic">
          <input id="plic" className={inputClass} value={meta.portraitLicense} onChange={(e) => setMeta({ ...meta, portraitLicense: e.target.value })} />
        </Field>
        <label className="flex items-center gap-3 font-semibold">
          <input type="checkbox" className="h-6 w-6 accent-burgundy" checked={meta.isPublished} onChange={(e) => setMeta({ ...meta, isPublished: e.target.checked })} />
          Published (max 15)
        </label>
        <div className="sm:col-span-2">
          <Field label="Sources" hint="One per line: title | https://url (URL optional)" htmlFor="sources">
            <textarea id="sources" rows={4} className={inputClass} value={meta.sources} onChange={(e) => setMeta({ ...meta, sources: e.target.value })} />
          </Field>
        </div>
      </Card>
      <div className="grid gap-5 lg:grid-cols-2">
        {tBlock("en", "English", en, setEn)}
        {tBlock("si", "Sinhala (සිංහල) — leave name empty to omit", si, setSi)}
      </div>
      {error && <Alert tone="error">{error}</Alert>}
      <div className="flex flex-wrap gap-3">
        <Button type="submit">Save</Button>
        {!isNew && !meta.isPublished && <Button type="button" variant="danger" onClick={remove}>Delete</Button>}
      </div>
    </form>
  );
}
