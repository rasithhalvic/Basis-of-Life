import { SessionAdmin } from "./SessionAdmin";

export default async function AdminSessionPage(props: PageProps<"/admin/sessions/[id]">) {
  const { id } = await props.params;
  return <SessionAdmin id={id} />;
}
