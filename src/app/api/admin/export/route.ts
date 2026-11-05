import { getLeads } from "@/lib/taraStore";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function csv(value: unknown) {
  let s = String(value ?? "");
  // Spreadsheet formula injection prevention when opening exported CSVs.
  if (/^[\t\r\n ]*[=+\-@]/.test(s)) s = "'" + s;
  return '"' + s.replace(/"/g, '""') + '"';
}
export async function GET() {
  const rows = await getLeads(200).catch(() => []);
  const cols = ["id", "createdAt", "name", "phone", "email", "company", "need", "source", "page", "status"];
  const body = [cols.map(csv).join(","), ...rows.map((r) => cols.map((k) => csv(r[k])).join(","))].join("\r\n");
  return new Response(body, { headers: {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": 'attachment; filename="tara-leads.csv"',
    "Cache-Control": "no-store"
  } });
}
