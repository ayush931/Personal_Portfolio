import { NextResponse } from "next/server";
import { readCrmStore, updateMessageStatus, deleteCrmMessage } from "@/lib/crm-store";

export async function GET() {
  try {
    const data = await readCrmStore();
    const unreadCount = data.messages.filter((m) => m.status === "unread").length;
    const uniqueVisitorsCount = new Set(data.visitors.map((v) => v.ip)).size;

    return NextResponse.json({
      success: true,
      messages: data.messages,
      visitors: data.visitors,
      stats: {
        totalMessages: data.messages.length,
        unreadMessages: unreadCount,
        totalVisits: data.visitors.length,
        uniqueVisitors: uniqueVisitorsCount,
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to read CRM data." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, status } = body;

    if (action === "update_status" && id && status) {
      const ok = await updateMessageStatus(id, status);
      return NextResponse.json({ success: ok });
    }

    if (action === "delete_message" && id) {
      const ok = await deleteCrmMessage(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, message: "Invalid action." }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: "Server error handling CRM action." }, { status: 500 });
  }
}
