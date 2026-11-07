import Link from "next/link";
import { Alert, Badge, Card, LinkButton } from "@/components/ui";
import { adminListPioneers, PUBLISHED_PIONEER_LIMIT } from "@/server/services/pioneers";

export default async function AdminPioneersPage() {
  const pioneers = await adminListPioneers();
  const published = pioneers.filter((p) => p.isPublished).length;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-burgundy-deep">Pioneers</h1>
        <LinkButton href="/admin/pioneers/new">New pioneer</LinkButton>
      </div>
      <Alert tone={published === PUBLISHED_PIONEER_LIMIT ? "success" : "warning"}>
        {published} of {PUBLISHED_PIONEER_LIMIT} pages published. Slugs are printed in QR codes: if you change a published slug, the old URL
        automatically redirects to the new one.
      </Alert>
      <Card className="overflow-x-auto p-0!">
        <table className="w-full text-left text-sm">
          <thead className="bg-burgundy-deep text-white">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">State</th>
              <th className="p-3">Portrait</th>
            </tr>
          </thead>
          <tbody>
            {pioneers.map((p) => {
              const en = p.translations.find((t) => t.locale === "en");
              return (
                <tr key={p.id} className="border-t border-line">
                  <td className="p-3">{p.sortOrder}</td>
                  <td className="p-3">
                    <Link className="font-semibold text-burgundy underline" href={`/admin/pioneers/${p.id}`}>{en?.name}</Link>
                    {!p.translations.some((t) => t.locale === "si") && <span className="block text-xs text-danger">No Sinhala version</span>}
                  </td>
                  <td className="p-3 font-mono">
                    /pioneers/{p.slug}
                    {p.redirects.length > 0 && <span className="block text-xs text-muted">redirects from: {p.redirects.map((r) => r.oldSlug).join(", ")}</span>}
                  </td>
                  <td className="space-x-1 p-3">
                    <Badge tone={p.isPublished ? "success" : "neutral"}>{p.isPublished ? "Published" : "Draft"}</Badge>
                    {p.dataOrigin !== "PRODUCTION" && <Badge tone="gold">{p.dataOrigin}</Badge>}
                  </td>
                  <td className="p-3">{p.portraitUrl ? (p.portraitAttribution ? "Licensed" : "Missing credit") : "Placeholder"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
