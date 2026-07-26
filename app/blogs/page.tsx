"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Search, Tag } from "lucide-react";
import { BlogPost } from "@/lib/blog-store";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";

const CATEGORIES = ["All", "Microservices", "Game Engine & Networking", "WebGL & 3D", "System Design"];

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.posts) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.error("Failed to load blog posts:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-[1600px] w-full px-gutter pt-32 pb-24 flex-1">
        {/* Top Breadcrumb & Title */}
        <div className="mb-12 border-b border-line pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cobalt hover:underline mb-6 font-semibold"
          >
            <ArrowLeft size={14} />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-ink-muted mb-2">
                SYS_LOGS // TECHNICAL ARTICLES
              </div>
              <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight text-ink">
                Engineering Writings &amp; Case Studies
              </h1>
            </div>
            <p className="max-w-md text-xs text-ink-muted leading-relaxed">
              Deep dives into distributed Python document microservices, WebGL shader math, real-time Phaser.js networking, and system design.
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between rounded-xl border border-line bg-canvas-raised p-4 md:p-6 shadow-sm">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cobalt text-white shadow-sm"
                    : "border border-line bg-canvas text-ink-muted hover:border-cobalt hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input
              type="text"
              placeholder="Search by keyword or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-line bg-canvas pl-10 pr-4 py-2 text-xs text-ink outline-none transition-colors focus:border-cobalt"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-panel border border-line bg-canvas-raised/50 animate-pulse" />
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-panel border border-line bg-canvas-raised p-12 text-center">
            <BookOpen size={32} className="mx-auto text-cobalt mb-3" />
            <h3 className="font-sans text-xl font-bold text-ink mb-1">No articles found</h3>
            <p className="text-xs text-ink-muted">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="group relative flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-8 transition-all duration-300 hover:border-cobalt hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-[0.6875rem] uppercase tracking-wider text-ink-muted mb-4">
                    <span className="inline-flex items-center gap-1 text-cobalt font-semibold">
                      <Tag size={12} />
                      {post.category}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-sans text-xl font-bold text-ink tracking-tight mb-3 group-hover:text-cobalt transition-colors">
                    <Link href={`/blogs/${post.slug}`} className="before:absolute before:inset-0">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-ink-muted leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-line bg-canvas px-2.5 py-0.5 text-[0.65rem] text-ink-muted"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-line/60 pt-4 flex items-center justify-between text-xs text-ink-muted">
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
      </main>

      <Footer />
    </div>
  );
}
