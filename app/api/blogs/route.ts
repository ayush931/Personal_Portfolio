import { NextResponse } from "next/server";
import { readBlogPosts } from "@/lib/blog-store";

export async function GET() {
  try {
    const posts = await readBlogPosts();
    const published = posts.filter((p) => p.status === "published");
    return NextResponse.json({ success: true, posts: published });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch blog posts." }, { status: 500 });
  }
}
