import { notFound } from "next/navigation";
import { Container, SectionTitle } from "@/components/ui";
import { getT } from "@/i18n/server";
import { JoinFlow } from "./JoinFlow";

export default async function JoinPage(props: PageProps<"/quiz/join/[code]">) {
  const code = (await props.params).code.toUpperCase().replace(/[^0-9A-Z]/g, "");
  if (code.length !== 6) notFound();
  const { t } = await getT();
  return (
    <Container className="max-w-2xl py-8 sm:py-12">
      <SectionTitle as="h1">{t("join.title", { code })}</SectionTitle>
      <JoinFlow code={code} />
    </Container>
  );
}
