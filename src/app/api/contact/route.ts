import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      name,
      email,
      region,
      country,
      phone,
      users,
      solution,
      message,
    } = body as Record<string, unknown>;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Please share your name." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !EMAIL.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please share a valid email." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { ok: false, error: "Please write a short message." },
        { status: 400 }
      );
    }

    const id = `CT-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "contacts.json"),
      JSON.stringify({
        id,
        ts: new Date().toISOString(),
        name: name.trim(),
        email: email.trim(),
        region: typeof region === "string" ? region : "",
        country: typeof country === "string" ? country : "",
        phone: typeof phone === "string" ? phone : "",
        users: typeof users === "string" ? users : "",
        solution: typeof solution === "string" ? solution : "",
        message: message.trim(),
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
