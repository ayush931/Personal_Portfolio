import { NextResponse } from "next/server";
import { readBlogPosts, saveBlogPost, deleteBlogPost } from "@/lib/blog-store";

export async function GET() {
  try {
    const posts = await readBlogPosts();
    return NextResponse.json({ success: true, posts });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch CRM blog posts." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, post } = body;

    if (action === "save" && post) {
      const saved = await saveBlogPost(post);
      return NextResponse.json({ success: true, post: saved });
    }

    if (action === "delete" && id) {
      const ok = await deleteBlogPost(id);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, message: "Invalid CRM blog action." }, { status: 400 });
  } catch {
    return NextResponse.json({ success: false, message: "Server error executing CRM blog operation." }, { status: 500 });
  }
}
