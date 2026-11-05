import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const requests = new Map<string, { at: number; n: number }>();
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const size = Number(req.headers.get("content-length") || "0");
  if (size > 15_000) return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!redisUrl || !redisToken) return NextResponse.json({
    ok: false, error: "storage_not_configured",
    message: "Lead storage has not been connected. Email sales@budgetree.in or visit /contact."
  }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const now = Date.now(), previous = requests.get(ip);
  if (previous && now - previous.at < 3600_000 && previous.n >= 5) return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  requests.set(ip, previous && now - previous.at < 3600_000 ? { at: previous.at, n: previous.n + 1 } : { at: now, n: 1 });
  if (requests.size > 1000) requests.forEach((value, key) => {
    if (now - value.at > 3600_000) requests.delete(key);
  });
  let input: unknown;
  try { input = await req.json(); } catch {
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
  if (!input || typeof input !== "object") return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  const b = input as Record<string, unknown>;
  if (b.website) return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  const name = typeof b.name === "string" ? b.name.trim().slice(0, 100) : "";
  const phone = typeof b.phone === "string" ? b.phone.trim().slice(0, 25) : "";
  const email = typeof b.email === "string" ? b.email.trim().slice(0, 150) : "";
  const company = typeof b.company === "string" ? b.company.trim().slice(0, 120) : "";
  const need = typeof b.need === "string" ? b.need.trim().slice(0, 700) : "";
  const digits = phone.replace(/\D/g, "");
  if (name.length < 2 || (!email && !phone) || (phone && (digits.length < 10 || digits.length > 13)) ||
      (email && !EMAIL.test(email)) || b.consent !== true) {
    return NextResponse.json({ ok: false, error: "invalid", fields: {
      name: name.length < 2 ? "Please enter your name" : undefined,
      phone: phone && (digits.length < 10 || digits.length > 13) ? "Invalid phone number" : undefined,
      email: email && !EMAIL.test(email) ? "Invalid email" : undefined,
      consent: b.consent !== true ? "Consent required" : undefined
    } }, { status: 422 });
  }
  const id = "L-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  const lead = {
    id, name, phone, email, company, need, createdAt: Date.now(),
    status: "new",
    page: typeof b.page === "string" ? b.page.slice(0, 200) : "",
    source: b.source === "voice" ? "voice" : "chat",
  };
  // Store the lead only after a validated opt-in; no unconfigured provider or
  // temporary filesystem ever returns a fake "saved" confirmation.
  try {
    const commands = [
      ["HSET", "bt:lead:" + id, ...Object.entries(lead).flatMap(([k, v]) => [k, String(v)])],
      ["ZADD", "bt:leads", String(lead.createdAt), id],
    ];
    const response = await fetch(redisUrl.replace(/\/$/, "") + "/pipeline", {
      method: "POST",
      headers: { Authorization: "Bearer " + redisToken, "Content-Type": "application/json" },
      body: JSON.stringify(commands), signal: AbortSignal.timeout(6000), cache: "no-store"
    });
    const result = await response.json() as Array<{ error?: string; result?: unknown }>;
    if (!response.ok || !Array.isArray(result) || result.some((x) => x.error)) throw new Error("Storage failed");
    return NextResponse.json({ ok: true, stored: true, id });
  } catch {
    return NextResponse.json({ ok: false, error: "storage_unavailable" }, { status: 503 });
  }
}
