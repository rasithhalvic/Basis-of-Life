import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { SessionBoard } from "./SessionBoard";

export default async function SessionLeaderboardPage(props: PageProps<"/leaderboards/sessions/[id]">) {
  const { id } = await props.params;
  if (!/^[a-z0-9]{10,40}$/i.test(id)) notFound();
  return (
    <Container className="py-8 sm:py-12">
      <SessionBoard sessionId={id} />
    </Container>
  );
}
