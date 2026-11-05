import Link from "next/link";
import { getLeads, storageConfigured } from "@/lib/taraStore";
export const dynamic = "force-dynamic";
export default async function Leads() {
  const rows = await getLeads(200).catch(() => []);
  return <main className="min-h-screen bg-[#0B1611] px-5 pb-20 pt-32 text-white"><div className="mx-auto max-w-5xl">
    <Link href="/admin" className="text-sm text-[#C9FB47]">Back to dashboard</Link>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-3"><h1 className="text-3xl font-bold">Tara leads ({rows.length})</h1><a href="/api/admin/export" className="rounded-xl bg-[#C9FB47] px-4 py-2 text-sm font-semibold text-[#0B1611]">Export CSV</a></div>
    {!storageConfigured() && <p className="mt-5 rounded-xl border border-amber-300/30 p-4 text-sm">Connect the free Upstash Redis database in Vercel to enable permanent lead storage.</p>}
    <div className="mt-7 space-y-3">{rows.map((r) => <article key={r.id} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex flex-wrap justify-between gap-3"><strong>{r.name}</strong><span className="text-xs text-white/50">{r.id}</span></div><div className="mt-2 text-sm text-white/70">{r.company || "Company not provided"} · {r.phone || "No phone"} · {r.email || "No email"}</div><p className="mt-3 whitespace-pre-wrap text-sm">{r.need || "No requirement provided"}</p></article>)}</div>
    {!rows.length && <p className="mt-9 text-center text-sm text-white/50">No leads saved yet.</p>}
  </div></main>;
}
