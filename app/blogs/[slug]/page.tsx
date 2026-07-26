"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag, Share2, Check } from "lucide-react";
import { BlogPost } from "@/lib/blog-store";
import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/footer/Footer";

export default function SingleBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.post) {
          setPost(data.post);
          setRelated(data.related || []);
        }
      })
      .catch((err) => console.error("Failed to load post:", err))
      .finally(() => setLoading(false));
  }, [slug]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex items-center justify-center p-4">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-8 w-64 bg-canvas-raised rounded mx-auto" />
          <div className="h-4 w-48 bg-canvas-raised rounded mx-auto" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex flex-col justify-between">
        <Header />
        <main className="mx-auto max-w-2xl text-center py-32 px-gutter">
          <h1 className="text-3xl font-bold font-sans mb-4">404 — Article Not Found</h1>
          <p className="text-sm text-ink-muted mb-6">The technical article you requested could not be located or has been archived.</p>
          <Link href="/blogs" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cobalt hover:underline font-bold">
            <ArrowLeft size={14} />
            <span>Return to Articles</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex flex-col justify-between">
      <Header />

      <main className="mx-auto max-w-4xl w-full px-gutter pt-32 pb-24 flex-1">
        {/* Top Back Navigation */}
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-cobalt hover:underline font-bold"
          >
            <ArrowLeft size={14} />
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header Header */}
        <header className="border-b border-line pb-8 mb-12">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-ink-muted mb-4">
            <span className="rounded-md border border-cobalt/30 bg-cobalt/10 px-3 py-1 font-semibold text-cobalt flex items-center gap-1">
              <Tag size={12} />
              {post.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {post.readTime}
            </span>
          </div>

          <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight text-ink leading-tight mb-6">
            {post.title}
          </h1>

          <p className="font-mono text-sm md:text-base text-ink-muted leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="flex items-center justify-between border-t border-line/60 pt-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-cobalt text-white flex items-center justify-center font-bold text-sm">
                AK
              </div>
              <div>
                <div className="font-sans font-bold text-sm text-ink">{post.author.name}</div>
                <div className="text-[0.6875rem] text-ink-muted uppercase tracking-wider">{post.author.role}</div>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas-raised px-4 py-2 text-xs uppercase tracking-wider text-ink hover:border-cobalt hover:text-cobalt transition-colors cursor-pointer"
            >
              {copied ? <Check size={14} className="text-acid" /> : <Share2 size={14} />}
              <span>{copied ? "Copied Link!" : "Share Article"}</span>
            </button>
          </div>
        </header>

        {/* Article Body */}
        <article className="prose prose-neutral max-w-none space-y-6 text-ink leading-relaxed font-sans">
          {post.content.split("\n\n").map((block, idx) => {
            if (block.startsWith("## ")) {
              return (
                <h2 key={idx} className="font-sans text-2xl font-bold text-ink mt-10 mb-4 tracking-tight border-b border-line pb-2">
                  {block.replace("## ", "")}
                </h2>
              );
            }
            if (block.startsWith("```")) {
              const lines = block.split("\n");
              const codeContent = lines.slice(1, -1).join("\n");
              return (
                <pre key={idx} className="rounded-xl border border-line bg-canvas-raised p-5 font-mono text-xs overflow-x-auto text-cobalt my-6">
                  <code>{codeContent}</code>
                </pre>
              );
            }
            if (block.startsWith("- ")) {
              return (
                <ul key={idx} className="space-y-2 font-mono text-sm text-ink-muted list-disc list-inside my-4">
                  {block.split("\n").map((item, iIdx) => (
                    <li key={iIdx}>{item.replace("- ", "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={idx} className="font-mono text-sm md:text-base text-ink-muted leading-relaxed">
                {block}
              </p>
            );
          })}
        </article>

        {/* Tags Footer */}
        <div className="mt-12 pt-6 border-t border-line flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-ink-muted mr-2">Tags:</span>
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-line bg-canvas-raised px-3 py-1 text-xs font-mono text-ink">
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Posts Section */}
        {related.length > 0 && (
          <div className="mt-16 pt-12 border-t border-line">
            <h3 className="font-sans text-xl font-bold text-ink mb-6">More Technical Deep Dives</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug}`}
                  className="group rounded-xl border border-line bg-canvas-raised p-6 transition-all hover:border-cobalt"
                >
                  <div className="text-[0.6875rem] uppercase tracking-wider text-cobalt font-semibold mb-2">
                    {rel.category}
                  </div>
                  <h4 className="font-sans font-bold text-base text-ink group-hover:text-cobalt transition-colors mb-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-ink-muted line-clamp-2">{rel.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
