import { adminRoute } from "@/server/api";
import { grandCsv } from "@/server/services/admin-sessions";

function csvResponse({ filename, csv }: { filename: string; csv: string }) {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

/** GET /api/admin/exports/grand — CSV of the grand leaderboard. */
export const GET = adminRoute(async () => csvResponse(await grandCsv()));
