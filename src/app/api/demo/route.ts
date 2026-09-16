import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, company, size, interests, date, slot, notes } =
      body as Record<string, unknown>;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please share your name." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !EMAIL.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please share a valid work email." },
        { status: 400 }
      );
    }
    if (!company || typeof company !== "string" || company.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please share your company name." },
        { status: 400 }
      );
    }
    if (!date || typeof date !== "string" || !slot || typeof slot !== "string") {
      return NextResponse.json(
        { ok: false, error: "Please pick a date and time slot." },
        { status: 400 }
      );
    }

    const id = `BT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "leads.json"),
      JSON.stringify({
        id,
        ts: new Date().toISOString(),
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
        size: typeof size === "string" ? size : "",
        interests: Array.isArray(interests) ? interests : [],
        date,
        slot,
        notes: typeof notes === "string" ? notes.trim() : "",
      }) + "\n"
    );

    return NextResponse.json({ ok: true, id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
