import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email } = body as { email?: unknown };

    if (!email || typeof email !== "string" || !EMAIL.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please share a valid email." },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(
      path.join(dir, "newsletter.json"),
      JSON.stringify({ ts: new Date().toISOString(), email: email.trim() }) +
        "\n"
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
