import Link from "next/link";
import { Alert, Card, LinkButton } from "@/components/ui";
import { prisma } from "@/server/db";
import { baseUrlWarnings } from "@/server/qr";
import { PUBLISHED_PIONEER_LIMIT } from "@/server/services/pioneers";
import { getPublicBaseUrl } from "@/server/services/settings";

export default async function AdminHome() {
  const [published, samplePioneers, reviewed, unreviewed, demoReviewed, byStatus, baseUrl] = await Promise.all([
    prisma.pioneer.count({ where: { isPublished: true } }),
    prisma.pioneer.count({ where: { isPublished: true, dataOrigin: { not: "PRODUCTION" } } }),
    prisma.question.count({ where: { reviewStatus: "REVIEWED" } }),
    prisma.question.count({ where: { reviewStatus: "UNREVIEWED" } }),
    prisma.question.count({ where: { reviewStatus: "REVIEWED", dataOrigin: "DEMO" } }),
    prisma.quizSession.groupBy({ by: ["status"], _count: true }),
    getPublicBaseUrl(),
  ]);
  const count = (s: string) => byStatus.find((b) => b.status === s)?._count ?? 0;
  const warnings: React.ReactNode[] = [];
  if (published !== PUBLISHED_PIONEER_LIMIT) warnings.push(`${published} pioneers are published; the exhibition expects exactly ${PUBLISHED_PIONEER_LIMIT}.`);
  if (samplePioneers > 0) warnings.push(`${samplePioneers} published pioneer pages still contain unedited SAMPLE content.`);
  if (demoReviewed > 0) warnings.push(`${demoReviewed} DEMO questions are marked reviewed. Remove the demo fixture before the public launch.`);
  if (reviewed < 10) warnings.push(`Only ${reviewed} reviewed questions. A 10-question session needs at least 10 reviewed bilingual questions.`);
  for (const w of baseUrlWarnings(baseUrl)) warnings.push(<>QR base URL: {w} <Link className="underline" href="/admin/settings">Fix in settings</Link></>);

  const stats = [
    ["Published pioneers", `${published} / ${PUBLISHED_PIONEER_LIMIT}`],
    ["Reviewed questions", reviewed],
    ["Awaiting review", unreviewed],
    ["Open sessions", count("OPEN")],
    ["Live sessions", count("LIVE")],
    ["Awaiting finalization", count("COMPLETED")],
    ["Finalized sessions", count("FINALIZED")],
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-burgundy-deep">Overview</h1>
      {warnings.length > 0 && (
        <Alert tone="warning">
          <p className="font-semibold">Before public launch</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </Alert>
      )}
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([k, v]) => (
          <Card key={String(k)} className="p-4!">
            <dt className="text-sm text-muted">{k}</dt>
            <dd className="font-display text-3xl font-bold text-burgundy">{v}</dd>
          </Card>
        ))}
      </dl>
      <div className="flex flex-wrap gap-3">
        <LinkButton href="/admin/sessions">Manage sessions</LinkButton>
        <LinkButton href="/admin/questions" variant="secondary">Review questions</LinkButton>
        <LinkButton href="/leaderboards/grand/display" variant="secondary" target="_blank">Open display screen</LinkButton>
      </div>
    </div>
  );
}
