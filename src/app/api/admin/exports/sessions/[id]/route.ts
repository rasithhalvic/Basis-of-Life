import { adminRoute } from "@/server/api";
import { sessionResultsCsv } from "@/server/services/admin-sessions";

function csvResponse({ filename, csv }: { filename: string; csv: string }) {
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}

/** GET /api/admin/exports/sessions/{id} — CSV of a finalized session's results. */
export const GET = adminRoute(async (_req, { id }) => csvResponse(await sessionResultsCsv(id)));
