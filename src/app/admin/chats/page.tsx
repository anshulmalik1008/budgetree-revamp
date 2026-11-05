import Link from "next/link";
import { getConversations, storageConfigured } from "@/lib/taraStore";
export const dynamic = "force-dynamic";
export default async function Chats() {
  const rows = await getConversations(100).catch(() => []);
  return <main className="min-h-screen bg-[#0B1611] px-5 pb-20 pt-32 text-white"><div className="mx-auto max-w-5xl">
    <Link href="/admin" className="text-sm text-[#C9FB47]">Back to dashboard</Link><h1 className="mb-3 mt-6 text-3xl font-bold">Tara conversations</h1>
    <p className="text-sm text-white/60">Server-side chat retention stays off unless LOG_CHATS=true and Redis is connected. Visitor chat history still works in their browser.</p>
    {!storageConfigured() && <p className="mt-5 rounded-xl border border-amber-300/30 p-4 text-sm">Redis database is not connected.</p>}
    <div className="mt-7 space-y-3">{rows.map((r) => <Link key={r.id} href={"/admin/chats/" + encodeURIComponent(r.id)} className="block rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"><div className="flex flex-wrap justify-between gap-3"><strong>{r.lastQuestion || r.id}</strong><span className="text-xs text-[#C9FB47]">Open</span></div><div className="mt-2 text-xs text-white/50">Session {r.id} · {r.page || "Unknown page"}</div></Link>)}</div>
    {!rows.length && <p className="mt-9 text-sm text-white/50">No saved conversations.</p>}
  </div></main>;
}
