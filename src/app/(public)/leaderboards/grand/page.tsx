import type { Metadata } from "next";
import { GrandBoard } from "@/components/GrandBoard";
import { Container, LinkButton, SectionTitle } from "@/components/ui";
import { getT } from "@/i18n/server";

export const metadata: Metadata = { title: "Grand leaderboard" };

export default async function GrandPage() {
  const { t } = await getT();
  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle as="h1">{t("lb.grandTitle")}</SectionTitle>
      <GrandBoard />
      <LinkButton href="/leaderboards/grand/display" variant="secondary" className="mt-8">
        {t("lb.displayMode")}
      </LinkButton>
    </Container>
  );
}
