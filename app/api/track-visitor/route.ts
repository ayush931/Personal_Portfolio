import { NextResponse } from "next/server";
import { addVisitorLog } from "@/lib/crm-store";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || request.headers.get("x-real-ip") || "127.0.0.1";
    const userAgent = request.headers.get("user-agent") || "Web Browser";

    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const deviceType = isMobile ? "Mobile" : "Desktop";

    const log = addVisitorLog({
      ip: clientIp,
      path: body.path || "/",
      userAgent,
      device: deviceType,
      referrer: body.referrer || request.headers.get("referer") || "Direct",
    });

    return NextResponse.json({ success: true, log });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
