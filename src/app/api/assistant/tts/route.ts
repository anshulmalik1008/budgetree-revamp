import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const windows = new Map<string, { at: number; used: number }>();

function xmlEscape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  return NextResponse.json({
    configured: Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    voices: ["hi-IN-SwaraNeural", "en-IN-NeerjaNeural"]
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const key = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) {
    return NextResponse.json({ error: "Azure Speech F0 is not configured" }, { status: 501 });
  }
  if (!/^[a-z0-9-]{3,30}$/.test(region)) return NextResponse.json({ error: "Invalid region" }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";
  const now = Date.now();
  if (windows.size > 500) windows.forEach((value, name) => {
    if (now - value.at > 60_000) windows.delete(name);
  });
  const current = windows.get(ip);
  if (current && now - current.at < 60_000 && current.used >= 10) {
    return NextResponse.json({ error: "Please wait before playing more audio." }, { status: 429 });
  }
  if (!current || now - current.at >= 60_000) windows.set(ip, { at: now, used: 1 });
  else current.used++;
  const size = Number(req.headers.get("content-length") || "0");
  if (size > 5000) return NextResponse.json({ error: "Text too long" }, { status: 413 });
  let input: unknown;
  try { input = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!input || typeof input !== "object") return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  const { text: rawText, language: rawLanguage } = input as Record<string, unknown>;
  if (typeof rawText !== "string" || !rawText.trim()) return NextResponse.json({ error: "Text required" }, { status: 400 });
  const text = rawText.trim().slice(0, 1200);
  const hindi = rawLanguage === "hi" || (rawLanguage !== "en" && /[\u0900-\u097F]/u.test(text));
  const voice = hindi ? "hi-IN-SwaraNeural" : "en-IN-NeerjaNeural";
  const locale = hindi ? "hi-IN" : "en-IN";
  const ssml = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="' + locale +
    '"><voice name="' + voice + '">' + xmlEscape(text) + "</voice></speak>";
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch("https://" + region + ".tts.speech.microsoft.com/cognitiveservices/v1", {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": "audio-16khz-64kbitrate-mono-mp3",
        "User-Agent": "Budgetree-Tara/1.0"
      },
      body: ssml, signal: controller.signal, cache: "no-store"
    });
    if (!response.ok) {
      console.warn("Azure Speech request failed with HTTP", response.status);
      return NextResponse.json({ error: "Speech service unavailable" }, { status: 502 });
    }
    const buffer = await response.arrayBuffer();
    if (!buffer.byteLength || buffer.byteLength > 3_000_000) return NextResponse.json({ error: "Invalid audio response" }, { status: 502 });
    return new NextResponse(buffer, {
      headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" }
    });
  } catch {
    return NextResponse.json({ error: "Speech connection failed" }, { status: 503 });
  } finally { clearTimeout(timeout); }
}
