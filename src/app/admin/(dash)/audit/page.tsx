import { Card, LinkButton } from "@/components/ui";
import { formatDateTime } from "@/lib/format";
import { prisma } from "@/server/db";

export default async function AuditPage() {
  const entries = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: { actor: { select: { email: true } } },
  });
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-burgundy-deep">Audit log</h1>
        <LinkButton href="/api/admin/exports/grand" variant="secondary" prefetch={false}>Export grand leaderboard CSV</LinkButton>
      </div>
      <Card className="overflow-x-auto p-0!">
        <table className="w-full text-left text-sm">
          <thead className="bg-burgundy-deep text-white">
            <tr>
              <th className="p-3">Time (Colombo)</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Action</th>
              <th className="p-3">Entity</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t border-line align-top">
                <td className="whitespace-nowrap p-3">{formatDateTime(e.createdAt)}</td>
                <td className="p-3">{e.actor?.email ?? "system"}</td>
                <td className="p-3 font-mono">{e.action}</td>
                <td className="p-3">{e.entityType}</td>
                <td className="max-w-md break-all p-3 font-mono text-xs">{JSON.stringify(e.details)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
