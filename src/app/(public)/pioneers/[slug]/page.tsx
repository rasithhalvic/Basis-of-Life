import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { Portrait } from "@/components/Portrait";
import { Alert, Container, LinkButton, SectionTitle } from "@/components/ui";
import { getLocale, getT } from "@/i18n/server";
import { findPioneerBySlug } from "@/server/services/pioneers";

async function load(slugParam: string) {
  const slug = decodeURIComponent(slugParam).toLowerCase();
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) notFound();
  const result = await findPioneerBySlug(slug, await getLocale());
  // Old slugs from printed QR codes keep working.
  if (result.redirectTo) permanentRedirect(`/pioneers/${result.redirectTo}`);
  if (!result.pioneer) notFound();
  return result.pioneer;
}

export async function generateMetadata(props: PageProps<"/pioneers/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const res = await findPioneerBySlug(slug.toLowerCase(), await getLocale()).catch(() => null);
  return res?.pioneer ? { title: res.pioneer.name, description: res.pioneer.introduction } : {};
}

export default async function PioneerPage(props: PageProps<"/pioneers/[slug]">) {
  const { slug } = await props.params;
  const p = await load(slug);
  const { t } = await getT();

  return (
    <article lang={p.locale}>
      <div className="border-b border-line bg-white">
        <Container className="py-3">
          <Link href="/#pioneers" className="inline-flex min-h-11 items-center gap-1 font-semibold text-burgundy hover:underline">
            ← {t("pioneer.back")}
          </Link>
        </Container>
      </div>
      <Container className="py-8 sm:py-12">
        {p.isSample && (
          <div className="mb-6">
            <Alert tone="warning">{t("pioneer.sample")}</Alert>
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
          <figure className="mx-auto w-full max-w-xs md:mx-0">
            <Portrait url={p.portrait.url} alt={p.portrait.alt} name={p.name} size="hero" priority />
            <figcaption className="mt-3 text-sm text-muted">
              {p.portrait.url && p.portrait.attribution ? (
                <>
                  {t("pioneer.imageCredit")}: {p.portrait.attribution}
                  {p.portrait.license ? ` (${p.portrait.license})` : ""}
                </>
              ) : (
                t("pioneer.portraitPending")
              )}
            </figcaption>
          </figure>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-gold-ink">{p.field}</p>
            <h1 className="mt-2 text-4xl font-bold text-burgundy-deep sm:text-5xl">{p.name}</h1>
            <p className="mt-2 text-lg text-muted">{p.lifeDates}</p>
            <span className="gold-rule mt-4" aria-hidden />
            <p className="mt-5 text-lg leading-relaxed sm:text-xl">{p.introduction}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-12">
            <section aria-labelledby="bio">
              <SectionTitle id="bio">{t("pioneer.biography")}</SectionTitle>
              <div className="prose-museum max-w-prose text-lg leading-relaxed">
                {p.biography.split(/\n{2,}/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>

            {p.contributions.length > 0 && (
              <section aria-labelledby="contrib">
                <SectionTitle id="contrib">{t("pioneer.contributions")}</SectionTitle>
                <ul className="space-y-3">
                  {p.contributions.map((c, i) => (
                    <li key={i} className="flex gap-3 rounded-xl border border-line bg-white p-4">
                      <span aria-hidden className="mt-1 text-gold">◆</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {p.timeline.length > 0 && (
              <section aria-labelledby="timeline">
                <SectionTitle id="timeline">{t("pioneer.timeline")}</SectionTitle>
                <ol className="relative ml-2 border-l-2 border-gold/70">
                  {p.timeline.map((e, i) => (
                    <li key={i} className="relative pb-6 pl-6 last:pb-0">
                      <span aria-hidden className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-gold bg-burgundy" />
                      <p className="font-display text-lg font-semibold text-burgundy">{e.year}</p>
                      <p>{e.event}</p>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="space-y-8">
            {p.facts.length > 0 && (
              <section aria-labelledby="facts" className="rounded-2xl bg-burgundy-deep p-6 text-white">
                <h2 id="facts" className="text-xl font-bold text-gold">
                  {t("pioneer.facts")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {p.facts.map((f, i) => (
                    <li key={i} className="border-t border-white/15 pt-3 first:border-0 first:pt-0">
                      {f}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <section className="on-dark rounded-2xl border border-gold/60 bg-white p-6">
              <h2 className="text-xl font-bold text-burgundy-deep">{t("pioneer.quizCta")}</h2>
              <p className="mt-2 text-muted">{t("pioneer.quizCtaLead")}</p>
              <LinkButton href="/quiz" className="mt-4 w-full">
                {t("home.joinQuiz")}
              </LinkButton>
            </section>
          </aside>
        </div>

        {p.sources.length > 0 && (
          <section aria-labelledby="sources" className="mt-12 border-t border-line pt-8">
            <SectionTitle id="sources" as="h2">
              {t("pioneer.sources")}
            </SectionTitle>
            <ol className="list-decimal space-y-2 pl-6 text-muted">
              {p.sources.map((s, i) => (
                <li key={i}>
                  {s.url ? (
                    <a href={s.url} className="text-burgundy underline underline-offset-2" rel="noopener noreferrer" target="_blank">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="mt-12">
          <LinkButton href="/#pioneers" variant="secondary">
            ← {t("pioneer.back")}
          </LinkButton>
        </div>
      </Container>
    </article>
  );
}
