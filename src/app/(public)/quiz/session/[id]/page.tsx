import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { QuizRoom } from "./QuizRoom";

export default async function SessionPage(props: PageProps<"/quiz/session/[id]">) {
  const { id } = await props.params;
  if (!/^[a-z0-9]{10,40}$/i.test(id)) notFound();
  return (
    <Container className="max-w-2xl py-6 sm:py-10">
      <QuizRoom sessionId={id} />
    </Container>
  );
}
