import Link from "next/link";
import { storageConfigured } from "@/lib/taraStore";
export const dynamic = "force-dynamic";
const yes = (ok: boolean) => ok ? "Configured" : "Not configured";
export default function Health() {
  const items = [
    ["Chat & site knowledge", "Ready — available without an AI key"],
    ["Gemini free-tier AI", yes(Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY))],
    ["OpenAI optional AI", yes(Boolean(process.env.OPENAI_API_KEY))],
    ["Azure Indian female speech", yes(Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION))],
    ["Upstash Redis", yes(storageConfigured())],
    ["Persistent conversation logs", process.env.LOG_CHATS === "true" ? "Enabled" : "Disabled (privacy default)"],
    ["Admin protection", Boolean(process.env.ADMIN_PASSWORD) ? "Configured" : "Disabled"],
  ];
  return <main className="min-h-screen bg-[#0B1611] px-5 pb-20 pt-32 text-white">
    <div className="mx-auto max-w-3xl"><Link href="/admin" className="text-sm text-[#C9FB47]">Back to Tara dashboard</Link><h1 className="mb-5 mt-6 text-3xl font-bold">Tara system health</h1>
      <p className="mb-5 text-sm text-white/60">These are configuration checks, not a guarantee that external providers or free quotas are currently available.</p>
      <div className="overflow-hidden rounded-2xl border border-white/10">{items.map(([name, value]) => <div key={name} className="flex justify-between gap-4 border-b border-white/10 p-5 text-sm"><strong>{name}</strong><span className="text-right text-[#C9FB47]">{value}</span></div>)}</div>
      <p className="mt-6 text-xs text-white/50">Add provider credentials only in Vercel's protected Environment Variables, never in code or browser storage.</p>
    </div></main>;
}
