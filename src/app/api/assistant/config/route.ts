import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({
    name: "Tara",
    tts: Boolean(process.env.AZURE_SPEECH_KEY && process.env.AZURE_SPEECH_REGION),
    stt: false,
    sttMode: "browser",
    bargeIn: false,
    phone: process.env.ASSISTANT_SALES_PHONE || "+91 91939 11100",
    email: process.env.ASSISTANT_SALES_EMAIL || "sales@budgetree.in",
    whatsapp: process.env.ASSISTANT_WHATSAPP_NUMBER || "",
    privacyUrl: "/legal/privacy-policy",
    demoUrl: "/demo"
  }, { headers: { "Cache-Control": "no-store" } });
}
