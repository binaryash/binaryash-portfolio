import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function visitorIp(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "";
}

export async function GET(req: NextRequest) {
  const ip = visitorIp(req);

  if (!ip || ip === "::1" || ip.startsWith("127.")) {
    return NextResponse.json({ city: null }, { headers: { "Cache-Control": "no-store" } });
  }

  try {
    const res = await fetch(`https://ipwho.is/${ip}`, { cache: "no-store" });
    const data = await res.json();

    if (!data.success) {
      return NextResponse.json({ city: null }, { headers: { "Cache-Control": "no-store" } });
    }

    return NextResponse.json(
      { city: data.city as string | undefined, country: data.country as string | undefined },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ city: null }, { headers: { "Cache-Control": "no-store" } });
  }
}
