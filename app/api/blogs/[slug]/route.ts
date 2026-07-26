import { NextResponse } from "next/server";
import { readBlogPosts } from "@/lib/blog-store";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const posts = await readBlogPosts();
    const post = posts.find((p) => p.slug === slug && p.status === "published");

    if (!post) {
      return NextResponse.json({ success: false, message: "Blog post not found." }, { status: 404 });
    }

    const related = posts
      .filter((p) => p.slug !== slug && p.status === "published")
      .slice(0, 2);

    return NextResponse.json({ success: true, post, related });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch blog post." }, { status: 500 });
  }
}
