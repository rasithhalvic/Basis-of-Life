import type { Metadata } from "next";
import { Container, SectionTitle } from "@/components/ui";
import { getT } from "@/i18n/server";
import { getSettings } from "@/server/services/settings";
import { QuizLobby } from "./QuizLobby";

export const metadata: Metadata = { title: "General Knowledge Quiz" };

export default async function QuizPage() {
  const { t } = await getT();
  const settings = await getSettings();
  const rules = [
    t("quiz.rule1"),
    t("quiz.rule2", { seconds: settings.defaultSecondsPerQuestion }),
    t("quiz.rule3"),
    t("quiz.rule4"),
    t("quiz.rule5"),
  ];
  return (
    <Container className="py-8 sm:py-12">
      <SectionTitle as="h1">{t("quiz.title")}</SectionTitle>
      <p className="mb-8 max-w-2xl text-lg text-muted">{t("quiz.lead")}</p>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <QuizLobby />
        <aside aria-labelledby="rules" className="h-fit rounded-2xl bg-burgundy-deep p-6 text-white">
          <h2 id="rules" className="text-xl font-bold text-gold">
            {t("quiz.rules")}
          </h2>
          <ol className="mt-4 space-y-3">
            {rules.map((r, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold text-sm text-gold">
                  {i + 1}
                </span>
                <span>{r}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </Container>
  );
}
