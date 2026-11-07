import { PioneerEditor } from "./PioneerEditor";

export default async function PioneerEditPage(props: PageProps<"/admin/pioneers/[id]">) {
  const { id } = await props.params;
  return <PioneerEditor id={id} />;
}
