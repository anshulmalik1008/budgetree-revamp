import { NextRequest, NextResponse } from "next/server";

// Tara's admin dashboard must never be public or accept a default password.
// With no ADMIN_PASSWORD it is completely disabled (HTTP 503).
function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}
export function middleware(req: NextRequest) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) {
    return new NextResponse("Tara admin is disabled. Configure a strong ADMIN_PASSWORD in Vercel.", {
      status: 503, headers: { "Cache-Control": "no-store" }
    });
  }
  const authorization = req.headers.get("authorization") || "";
  if (authorization.startsWith("Basic ")) {
    try {
      const decoded = atob(authorization.slice(6));
      const colon = decoded.indexOf(":");
      const user = decoded.slice(0, colon);
      const supplied = colon >= 0 ? decoded.slice(colon + 1) : "";
      if (user === "admin" && timingSafeEqual(supplied, password)) return NextResponse.next();
    } catch { /* Invalid login */ }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Tara Admin", charset="UTF-8"',
      "Cache-Control": "no-store"
    }
  });
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };
