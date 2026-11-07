import { QuestionEditor } from "./QuestionEditor";

export default async function QuestionEditPage(props: PageProps<"/admin/questions/[id]">) {
  const { id } = await props.params;
  return <QuestionEditor id={id} />;
}
