import fs from "fs";
import path from "path";
import { revalidatePath, unstable_cache } from "next/cache";
import type { BlogPost as PrismaBlogPost } from "@prisma/client";
import { prisma } from "./prisma";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    readTime: string;
    publishedAt: string;
    status: "published" | "draft";
    coverColor: string;
    author: {
        name: string;
        role: string;
    };
}

const STORAGE_PATH = path.join(process.cwd(), "data", "blog_posts.json");

export const initialBlogPosts: BlogPost[] = [];

function readLocalJsonBlogPosts(): BlogPost[] {
    try {
        if (!fs.existsSync(STORAGE_PATH)) {
            const dirname = path.dirname(STORAGE_PATH);
            if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
            fs.writeFileSync(STORAGE_PATH, JSON.stringify(initialBlogPosts, null, 2), "utf-8");
            return initialBlogPosts;
        }
        const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
        return JSON.parse(raw) as BlogPost[];
    } catch {
        return initialBlogPosts;
    }
}

function writeLocalJsonBlogPosts(posts: BlogPost[]): void {
    try {
        const dirname = path.dirname(STORAGE_PATH);
        if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(posts, null, 2), "utf-8");
    } catch (err) {
        console.error("[Blog Store File Write Error]:", err);
    }
}

// Uncached DB reader — fetches strictly from PostgreSQL database
async function fetchBlogPostsFromDb(): Promise<BlogPost[]> {
    try {
        const dbPosts = await prisma.blogPost.findMany({
            orderBy: { publishedAt: "desc" },
        });

        return dbPosts.map((p: PrismaBlogPost) => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            excerpt: p.excerpt,
            content: p.content,
            category: p.category,
            tags: p.tags,
            readTime: p.readTime,
            publishedAt: p.publishedAt.toISOString(),
            status: p.status as "published" | "draft",
            coverColor: p.coverColor,
            author: {
                name: p.authorName,
                role: p.authorRole,
            },
        }));
    } catch {
        return readLocalJsonBlogPosts();
    }
}

// Next.js High-Performance Cached Query
export const getCachedBlogPosts = unstable_cache(
    async () => fetchBlogPostsFromDb(),
    ["all-blog-posts-cache"],
    {
        revalidate: 3600,
        tags: ["blog-posts"],
    }
);

export async function readBlogPosts(): Promise<BlogPost[]> {
    return getCachedBlogPosts();
}

export async function saveBlogPost(
    postData: Partial<BlogPost> & { title: string; content: string }
): Promise<BlogPost> {
    const slug =
        postData.slug ||
        postData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    let savedPost: BlogPost;

    try {
        const publishedAtDate = postData.publishedAt
            ? new Date(postData.publishedAt)
            : new Date();

        if (postData.id) {
            const updated = await prisma.blogPost.update({
                where: { id: postData.id },
                data: {
                    title: postData.title,
                    slug,
                    excerpt: postData.excerpt || postData.content.slice(0, 160) + "...",
                    content: postData.content,
                    category: postData.category || "Uncategorized",
                    tags: postData.tags || [],
                    readTime:
                        postData.readTime ||
                        `${Math.max(2, Math.ceil(postData.content.split(" ").length / 180))} min read`,
                    publishedAt: publishedAtDate,
                    status: postData.status || "published",
                    coverColor: postData.coverColor || "#2563eb",
                    authorName: postData.author?.name || "Ayush Kumar",
                    authorRole: postData.author?.role || "Full-Stack & Systems Engineer",
                },
            });

            savedPost = {
                id: updated.id,
                title: updated.title,
                slug: updated.slug,
                excerpt: updated.excerpt,
                content: updated.content,
                category: updated.category,
                tags: updated.tags,
                readTime: updated.readTime,
                publishedAt: updated.publishedAt.toISOString(),
                status: updated.status as "published" | "draft",
                coverColor: updated.coverColor,
                author: { name: updated.authorName, role: updated.authorRole },
            };
        } else {
            const created = await prisma.blogPost.create({
                data: {
                    title: postData.title,
                    slug,
                    excerpt: postData.excerpt || postData.content.slice(0, 160) + "...",
                    content: postData.content,
                    category: postData.category || "Uncategorized",
                    tags: postData.tags || [],
                    readTime:
                        postData.readTime ||
                        `${Math.max(2, Math.ceil(postData.content.split(" ").length / 180))} min read`,
                    publishedAt: publishedAtDate,
                    status: postData.status || "published",
                    coverColor: postData.coverColor || "#2563eb",
                    authorName: postData.author?.name || "Ayush Kumar",
                    authorRole: postData.author?.role || "Full-Stack & Systems Engineer",
                },
            });

            savedPost = {
                id: created.id,
                title: created.title,
                slug: created.slug,
                excerpt: created.excerpt,
                content: created.content,
                category: created.category,
                tags: created.tags,
                readTime: created.readTime,
                publishedAt: created.publishedAt.toISOString(),
                status: created.status as "published" | "draft",
                coverColor: created.coverColor,
                author: { name: created.authorName, role: created.authorRole },
            };
        }
    } catch {
        // Local JSON fallback if DB connection is unavailable
        const localPosts = readLocalJsonBlogPosts();
        if (postData.id) {
            const idx = localPosts.findIndex((p) => p.id === postData.id);
            if (idx !== -1) {
                localPosts[idx] = { ...localPosts[idx], ...postData, slug, title: postData.title, content: postData.content };
                savedPost = localPosts[idx];
            } else {
                savedPost = {
                    id: `blog-${Date.now()}`,
                    title: postData.title,
                    slug,
                    excerpt: postData.excerpt || postData.content.slice(0, 160) + "...",
                    content: postData.content,
                    category: postData.category || "Uncategorized",
                    tags: postData.tags || [],
                    readTime: `${Math.max(2, Math.ceil(postData.content.split(" ").length / 180))} min read`,
                    publishedAt: new Date().toISOString(),
                    status: postData.status || "published",
                    coverColor: postData.coverColor || "#2563eb",
                    author: { name: "Ayush Kumar", role: "Full-Stack & Systems Engineer" },
                };
                localPosts.unshift(savedPost);
            }
        } else {
            savedPost = {
                id: `blog-${Date.now()}`,
                title: postData.title,
                slug,
                excerpt: postData.excerpt || postData.content.slice(0, 160) + "...",
                content: postData.content,
                category: postData.category || "Uncategorized",
                tags: postData.tags || [],
                readTime: `${Math.max(2, Math.ceil(postData.content.split(" ").length / 180))} min read`,
                publishedAt: new Date().toISOString(),
                status: postData.status || "published",
                coverColor: postData.coverColor || "#2563eb",
                author: { name: "Ayush Kumar", role: "Full-Stack & Systems Engineer" },
            };
            localPosts.unshift(savedPost);
        }
        writeLocalJsonBlogPosts(localPosts);
    }

    // Frontend Cache Revalidation
    try {
        revalidatePath("/blogs");
        revalidatePath(`/blogs/${slug}`);
        revalidatePath("/");
    } catch (e) {
        // Ignore in non-server action contexts
    }

    return savedPost;
}

export async function deleteBlogPost(id: string): Promise<boolean> {
    let ok = false;
    try {
        await prisma.blogPost.delete({ where: { id } });
        ok = true;
    } catch {
        const localPosts = readLocalJsonBlogPosts();
        const len = localPosts.length;
        const filtered = localPosts.filter((p) => p.id !== id);
        if (filtered.length !== len) {
            writeLocalJsonBlogPosts(filtered);
            ok = true;
        }
    }

    try {
        revalidatePath("/blogs");
        revalidatePath("/");
    } catch (e) {
        // Ignore in non-server action contexts
    }

    return ok;
}
