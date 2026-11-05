import Link from "next/link";
import { redisBatch, storageConfigured } from "@/lib/taraStore";
export const dynamic = "force-dynamic";
export default async function ChatDetail({ params }: { params: { id: string } }) {
  const id = params.id;
  const valid = /^[a-zA-Z0-9_-]{8,64}$/.test(id);
  let messages: Array<{ r?: string; c?: string }> = [];
  if (valid && storageConfigured()) {
    try {
      const result = await redisBatch([["LRANGE", "bt:conv:" + id + ":m", "0", "100"]]);
      const values = result?.[0];
      if (Array.isArray(values)) messages = values.map((s) => {
        try { return JSON.parse(String(s)) as { r?: string; c?: string }; } catch { return {}; }
      });
    } catch { /* No cached chat */ }
  }
  return <main className="min-h-screen bg-[#0B1611] px-5 pb-20 pt-32 text-white"><div className="mx-auto max-w-3xl">
    <Link href="/admin/chats" className="text-sm text-[#C9FB47]">Back to chats</Link><h1 className="mb-7 mt-6 break-all text-2xl font-bold">Conversation {id}</h1>
    {messages.map((m, i) => <article key={i} className={"mb-3 rounded-xl border p-4 text-sm " + (m.r === "user" ? "border-[#C9FB47]/20 bg-[#C9FB47]/10" : "border-white/10 bg-white/5")}><p className="mb-2 text-xs uppercase tracking-wide text-white/50">{m.r === "user" ? "Visitor" : "Tara"}</p><p className="whitespace-pre-wrap">{m.c || ""}</p></article>)}
    {!messages.length && <p className="text-sm text-white/50">No stored messages for this session.</p>}
  </div></main>;
}
