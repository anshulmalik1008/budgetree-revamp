import Link from "next/link";
import { getConversations, getLeads, storageConfigured } from "@/lib/taraStore";

export const dynamic = "force-dynamic";
const fmt = (value: string | undefined) => {
  if (!value) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? new Date(n).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "—";
};
export default async function TaraAdminPage() {
  const stored = storageConfigured();
  const [leads, chats] = await Promise.all([
    getLeads(50).catch(() => []),
    getConversations(50).catch(() => []),
  ]);
  return (
    <main className="min-h-screen bg-[#0B1611] px-5 pb-20 pt-32 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <div className="mb-2 text-sm font-bold uppercase tracking-[.2em] text-[#C9FB47]">Budgetree admin</div>
            <h1 className="text-4xl font-extrabold">Tara Assistant</h1>
            <p className="mt-2 max-w-xl text-sm text-white/60">Private dashboard for consenting customer enquiries and optionally retained conversations.</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href="/admin/leads" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">All Leads</Link>
            <Link href="/admin/chats" className="rounded-xl bg-white/10 px-4 py-3 hover:bg-white/15">Chats</Link>
            <Link href="/admin/health" className="rounded-xl bg-[#C9FB47] px-4 py-3 text-[#111C13]">Health</Link>
          </div>
        </header>
        {!stored && <p className="mb-7 rounded-2xl border border-amber-300/25 bg-amber-300/10 p-5 text-sm text-amber-100">Permanent storage is not connected. Create a free Upstash Redis database and add its REST URL and token in Vercel environment variables. Tara chat still works without it; leads cannot be saved until connected.</p>}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-xs font-bold uppercase tracking-wider text-white/50">Recent leads</p><p className="mt-3 text-4xl font-extrabold text-[#C9FB47]">{leads.length}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-xs font-bold uppercase tracking-wider text-white/50">Saved conversations</p><p className="mt-3 text-4xl font-extrabold text-[#C9FB47]">{chats.length}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6"><p className="text-xs font-bold uppercase tracking-wider text-white/50">Chat logging</p><p className="mt-3 text-lg font-extrabold">{process.env.LOG_CHATS === "true" ? "Enabled" : "Off by default"}</p></div>
        </div>
        <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-6 py-5"><h2 className="text-lg font-bold">Recent enquiries</h2><a href="/api/admin/export" className="text-sm font-semibold text-[#C9FB47]">Export CSV</a></header>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-white/5 text-white/50"><tr><th className="p-4">Name</th><th className="p-4">Company</th><th className="p-4">Phone</th><th className="p-4">Requirement</th><th className="p-4">Date (IST)</th></tr></thead>
              <tbody>{leads.map((lead) => <tr key={lead.id} className="border-t border-white/10"><td className="p-4 font-semibold">{lead.name || "—"}<div className="text-xs font-normal text-white/50">{lead.email}</div></td><td className="p-4">{lead.company || "—"}</td><td className="p-4">{lead.phone || "—"}</td><td className="max-w-sm p-4">{lead.need || "—"}</td><td className="p-4 text-white/60">{fmt(lead.createdAt)}</td></tr>)}</tbody>
            </table>
            {!leads.length && <p className="p-10 text-center text-sm text-white/50">No stored enquiries yet.</p>}
          </div>
        </section>
        <p className="mt-6 text-xs text-white/40">Admin requires ADMIN_PASSWORD (12+ characters). Do not paste database credentials into website source or customer chats.</p>
      </div>
    </main>
  );
}
