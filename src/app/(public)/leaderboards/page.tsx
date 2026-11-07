import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Container, LinkButton, SectionTitle } from "@/components/ui";
import { getT } from "@/i18n/server";
import { formatDateTime } from "@/lib/format";
import { finalizedSessionsList } from "@/server/services/leaderboards";

export const metadata: Metadata = { title: "Leaderboards" };

export default async function LeaderboardsPage() {
  const { t, locale } = await getT();
  const sessions = await finalizedSessionsList();
  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle as="h1">{t("lb.title")}</SectionTitle>
      <div className="mb-10 rounded-2xl bg-burgundy-deep p-6 text-white">
        <h2 className="text-2xl font-bold text-gold">{t("lb.grandTitle")}</h2>
        <LinkButton href="/leaderboards/grand" variant="gold" className="mt-4">
          {t("lb.grandTitle")} →
        </LinkButton>
      </div>
      <h2 className="mb-4 text-2xl font-bold text-burgundy-deep">{t("lb.sessions")}</h2>
      {sessions.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-muted">{t("lb.none")}</p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {sessions.map((s) => (
            <li key={s.id}>
              <Link href={`/leaderboards/sessions/${s.id}`} className="flex min-h-16 items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 hover:border-gold">
                <span>
                  <span className="font-mono text-lg font-bold tracking-widest text-burgundy-deep">{s.code}</span>
                  {s.title && <span className="block text-sm text-muted">{s.title}</span>}
                  <span className="block text-sm text-muted">{formatDateTime(s.finalizedAt ?? s.completedAt, locale)}</span>
                </span>
                <Badge tone={s.status === "FINALIZED" ? "success" : "gold"}>{t(s.status === "FINALIZED" ? "lb.final" : "lb.provisional")}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
