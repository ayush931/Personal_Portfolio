import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
  starred: boolean;
  archived: boolean;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "messages.json");

const SEED_MESSAGES: MessageItem[] = [
  {
    id: "msg_1721893000000_1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@apexinnovations.io",
    subject: "Lead Full Stack / System Architect Opportunity",
    message: "Hi Ayush, I reviewed your impressive portfolio and 3D web interactive projects. We are currently scaling our core engine team at Apex Innovations and would love to discuss a Lead Full Stack role with you. Are you open for a quick introductory call this week?",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    read: false,
    starred: true,
    archived: false,
  },
  {
    id: "msg_1721880000000_2",
    name: "David Chen",
    email: "david.c@cloudflux.dev",
    subject: "Contract Inquiry: High-Performance Web Canvas Dashboard",
    message: "Hello Ayush, we saw your Three.js & Framer Motion work. We have a client project requiring real-time web telemetry and custom 3D web graphics. Could you let us know your availability for a 4-week freelance sprint?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    read: true,
    starred: false,
    archived: false,
  },
  {
    id: "msg_1721800000000_3",
    name: "Elena Rostova",
    email: "elena@quantumlabs.ai",
    subject: "Tech Talk / Workshop Invitation - WebGL Architecture",
    message: "Greetings Ayush! We are organizing a developer summit on Next.js 15 and WebGL graphics performance. We would be thrilled to have you as a guest speaker to showcase your real-time 3D UI patterns.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
    read: true,
    starred: true,
    archived: false,
  }
];

async function ensureDataFile(): Promise<MessageItem[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(FILE_PATH, "utf-8");
      return JSON.parse(data);
    } catch {
      // File doesn't exist, write seed messages
      await fs.writeFile(FILE_PATH, JSON.stringify(SEED_MESSAGES, null, 2), "utf-8");
      return SEED_MESSAGES;
    }
  } catch (error) {
    console.error("Error reading messages store:", error);
    return SEED_MESSAGES;
  }
}

async function saveMessages(messages: MessageItem[]) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(messages, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing to messages store:", error);
  }
}

// GET /api/messages - List all messages
export async function GET() {
  const messages = await ensureDataFile();
  return NextResponse.json({ success: true, count: messages.length, messages });
}

// POST /api/messages - Submit a new message
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const messages = await ensureDataFile();

    const newMessage: MessageItem = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "General Inquiry",
      message: message.trim(),
      createdAt: new Date().toISOString(),
      read: false,
      starred: false,
      archived: false,
    };

    messages.unshift(newMessage);
    await saveMessages(messages);

    return NextResponse.json({ success: true, message: newMessage }, { status: 201 });
  } catch (error) {
    console.error("POST /api/messages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PATCH /api/messages - Update message status (read, starred, archived)
export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, read, starred, archived, bulkAction, ids } = body;

    let messages = await ensureDataFile();

    if (bulkAction && Array.isArray(ids)) {
      messages = messages.map((msg) => {
        if (ids.includes(msg.id)) {
          return {
            ...msg,
            ...(bulkAction === "markRead" ? { read: true } : {}),
            ...(bulkAction === "markUnread" ? { read: false } : {}),
            ...(bulkAction === "star" ? { starred: true } : {}),
            ...(bulkAction === "unstar" ? { starred: false } : {}),
            ...(bulkAction === "archive" ? { archived: true } : {}),
            ...(bulkAction === "unarchive" ? { archived: false } : {}),
          };
        }
        return msg;
      });
    } else if (id) {
      let found = false;
      messages = messages.map((msg) => {
        if (msg.id === id) {
          found = true;
          return {
            ...msg,
            read: typeof read === "boolean" ? read : msg.read,
            starred: typeof starred === "boolean" ? starred : msg.starred,
            archived: typeof archived === "boolean" ? archived : msg.archived,
          };
        }
        return msg;
      });

      if (!found) {
        return NextResponse.json(
          { success: false, error: "Message not found" },
          { status: 404 }
        );
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Missing message id or bulk action parameters" },
        { status: 400 }
      );
    }

    await saveMessages(messages);
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("PATCH /api/messages error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update message" },
      { status: 500 }
    );
  }
}

// DELETE /api/messages - Delete message(s)
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const body = await req.json().catch(() => ({}));
    const idsToDelete = body.ids || (id ? [id] : null);

    if (!idsToDelete || idsToDelete.length === 0) {
      return NextResponse.json(
        { success: false, error: "No message ID specified for deletion." },
        { status: 400 }
      );
    }

    let messages = await ensureDataFile();
    messages = messages.filter((msg) => !idsToDelete.includes(msg.id));

    await saveMessages(messages);
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("DELETE /api/messages error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete message" },
      { status: 500 }
    );
  }
}
