import { NextRequest, NextResponse } from "next/server";
import { POST as knowledgeAnswer } from "../route";
import { saveChat } from "@/lib/taraStore";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Entry = { role: "user" | "assistant"; content: string };
const DEVANAGARI = /[\u0900-\u097F]/;
const HINGLISH = /\b(kya|kaise|kese|hai|batao|btao|mujhe|mujhko|karna|chahiye|karo|samjhao|kitna|sare|sab|iska|iske|aap|hum|bhai)\b/i;

function detectLanguage(last: string): "hi" | "en" | "hinglish" {
  if (DEVANAGARI.test(last)) return "hi";
  if (HINGLISH.test(last)) return "hinglish";
  return "en";
}

export async function POST(req: NextRequest) {
  const length = Number(req.headers.get("content-length") || "0");
  if (length > 18_000) {
    return NextResponse.json({ message: "Message is too long" }, { status: 413 });
  }
  let input: unknown;
  try { input = await req.json(); } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }
  if (!input || typeof input !== "object") {
    return NextResponse.json({ message: "Invalid chat request" }, { status: 400 });
  }
  const data = input as Record<string, unknown>;
  const messages: Entry[] = Array.isArray(data.messages)
    ? data.messages.slice(-12)
      .filter((value): value is Entry => Boolean(value) &&
        (value.role === "assistant" || value.role === "user") &&
        typeof value.content === "string" && Boolean(value.content.trim()))
      .map((value) => ({ role: value.role, content: value.content.slice(0, 1300) }))
    : [];
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") {
    return NextResponse.json({ message: "Please enter your question." }, { status: 400 });
  }

  const payload = {
    message: last.content,
    language: detectLanguage(last.content),
    history: messages.slice(0, -1).slice(-8).map((m) => ({
      role: m.role, text: m.content
    })),
  };
  try {
    const internalReq = new NextRequest(new URL("/api/assistant", req.url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Propagate forwarded information for the same visitor rate limit.
        ...(req.headers.get("x-forwarded-for") ?
          { "x-forwarded-for": req.headers.get("x-forwarded-for")! } : {})
      },
      body: JSON.stringify(payload)
    });
    const result = await knowledgeAnswer(internalReq);
    if (!result.ok) {
      return NextResponse.json({
        message: result.status === 429
          ? "Tara has received too many requests. Please try again shortly."
          : "Tara's website knowledge service is temporarily unavailable."
      }, { status: result.status });
    }
    const parsed: unknown = await result.json();
    if (!parsed || typeof parsed !== "object") throw new Error("Empty answer");
    const { answer } = parsed as { answer?: string };
    if (!answer) throw new Error("Empty answer");
    await saveChat(typeof data.sid === "string" ? data.sid : "", last.content, answer,
      typeof data.page === "string" ? data.page : "");
    const encoder = new TextEncoder();
    const output = new ReadableStream({
      start(controller) {
        // The original Tara ZIP widget expects newline-delimited JSON.
        const statements = answer.match(/[^.!?\u0964\n]+[.!?\u0964\n]?/g) || [answer];
        let pending = "";
        for (const statement of statements) {
          pending += statement;
          if (pending.length < 65) continue;
          controller.enqueue(encoder.encode(JSON.stringify({ t: "text", v: pending }) + "\n"));
          pending = "";
        }
        if (pending) controller.enqueue(encoder.encode(JSON.stringify({ t: "text", v: pending }) + "\n"));
        controller.enqueue(encoder.encode(JSON.stringify({ t: "done" }) + "\n"));
        controller.close();
      }
    });
    return new Response(output, { headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff"
    } });
  } catch {
    return NextResponse.json({ message: "Tara is temporarily unavailable." }, { status: 503 });
  }
}
