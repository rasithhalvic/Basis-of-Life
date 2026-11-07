import { Container, LinkButton, SectionTitle } from "@/components/ui";
import { getT } from "@/i18n/server";
import { formatDateTime } from "@/lib/format";
import { listPublishedPioneers } from "@/server/services/pioneers";
import { getPublicSettings } from "@/server/services/settings";
import { PioneerGrid } from "./PioneerGrid";

export default async function HomePage() {
  const { locale, t } = await getT();
  const [settings, pioneers] = await Promise.all([getPublicSettings(locale), listPublishedPioneers(locale)]);
  const dateLine =
    settings.dateText ??
    [formatDateTime(settings.eventStartsAt, locale, false), formatDateTime(settings.eventEndsAt, locale, false)].filter(Boolean).join(" – ");

  return (
    <>
      <section className="on-dark relative overflow-hidden bg-burgundy text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12] [background:radial-gradient(circle_at_85%_20%,#C6A15B_0,transparent_45%),radial-gradient(circle_at_10%_90%,#C6A15B_0,transparent_35%)]" />
        <Container className="relative py-12 sm:py-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gold">{t("home.eyebrow")}</p>
          <h1 className="max-w-3xl text-4xl font-bold sm:text-5xl">{settings.name}</h1>
          <span className="gold-rule mt-4" aria-hidden />
          <p className="mt-5 max-w-2xl text-lg text-white/90">{settings.introduction}</p>
          <dl className="mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            {dateLine && (
              <div className="rounded-xl border border-white/20 bg-white/5 p-3">
                <dt className="text-sm text-gold">{t("home.date")}</dt>
                <dd className="font-semibold">{dateLine}</dd>
              </div>
            )}
            <div className="rounded-xl border border-white/20 bg-white/5 p-3">
              <dt className="text-sm text-gold">{t("home.venue")}</dt>
              <dd className="font-semibold">{settings.venue}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <LinkButton href="/quiz" variant="gold" className="text-lg">
              {t("home.joinQuiz")} →
            </LinkButton>
            <LinkButton href="/leaderboards" variant="ghost" className="text-white! decoration-gold">
              {t("home.leaderboards")}
            </LinkButton>
            <LinkButton href="/leaderboards/grand" variant="ghost" className="text-white! decoration-gold">
              {t("home.grand")}
            </LinkButton>
          </div>
        </Container>
      </section>

      <Container className="py-10 sm:py-14">
        <section id="pioneers" aria-labelledby="pioneers-title" className="scroll-mt-4">
          <SectionTitle id="pioneers-title">{t("home.pioneersTitle")}</SectionTitle>
          <p className="mb-6 max-w-2xl text-muted">{t("home.pioneersLead")}</p>
          <PioneerGrid pioneers={pioneers} />
        </section>

        <section aria-labelledby="quiz-cta" className="mt-14 rounded-2xl border border-gold/60 bg-white p-6 sm:p-8">
          <SectionTitle id="quiz-cta">{t("home.quizTitle")}</SectionTitle>
          <p className="mb-5 max-w-2xl text-muted">{t("home.quizLead")}</p>
          <LinkButton href="/quiz">{t("home.joinQuiz")}</LinkButton>
        </section>
      </Container>
    </>
  );
}
