"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react";
import { BlogPost } from "@/lib/blog-store";
import { TextReveal } from "@/components/common/TextReveal";
import { Magnetic } from "@/components/common/Magnetic";

export function BlogsSection() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.posts) {
          setPosts(data.posts.slice(0, 3));
        }
      })
      .catch((err) => console.error("Failed to load blog posts:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              05 / Technical Writings &amp; Insights
            </div>
            <TextReveal
              text="Engineering Systems & Deep Dives."
              as="h2"
              className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink"
            />
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
              Articles on distributed Python pipelines, real-time Phaser.js multiplayer engines, and WebGL optimization.
            </p>
            <Magnetic>
              <Link
                href="/blogs"
                className="group inline-flex items-center gap-2 rounded-full border border-line bg-canvas-raised px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-cobalt hover:text-cobalt shadow-sm"
              >
                <span>View All Articles</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Magnetic>
          </div>
        </div>

        {/* Blog Post Cards Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-panel border border-line bg-canvas-raised/50 animate-pulse" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-panel border border-line bg-canvas-raised p-12 text-center font-mono">
            <BookOpen size={32} className="mx-auto text-cobalt mb-3" />
            <h3 className="font-sans text-xl font-bold text-ink mb-1">No Published Articles in Database</h3>
            <p className="text-xs text-ink-muted">
              Add and publish your technical articles via the CRM Dashboard (`/crm`).
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-8 transition-all duration-300 hover:border-cobalt hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-wider text-ink-muted mb-4">
                    <span className="inline-flex items-center gap-1 text-cobalt font-semibold">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-sans text-xl font-semibold text-ink tracking-tight mb-3 group-hover:text-cobalt transition-colors">
                    <Link href={`/blogs/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="font-mono text-xs text-ink-muted leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="border-t border-line/60 pt-4 flex items-center justify-between font-mono text-xs text-ink-muted">
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span className="inline-flex items-center gap-1 text-cobalt font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
