import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const expectedPassword = process.env.CRM_PASSWORD || process.env.NEXT_PUBLIC_CRM_PASSWORD || "admin123";

    if (password && password === expectedPassword) {
      return NextResponse.json({ success: true, message: "Access granted." });
    }

    return NextResponse.json({ success: false, message: "Invalid CRM access password." }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, message: "Authentication failed." }, { status: 500 });
  }
}
