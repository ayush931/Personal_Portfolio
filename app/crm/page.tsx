"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Inbox,
  Users,
  Terminal,
  ArrowLeft,
  RefreshCw,
  Search,
  CheckCircle,
  Mail,
  Trash2,
  Clock,
  Globe,
  Monitor,
  Smartphone,
  ExternalLink,
  Filter,
  FileText,
  Plus,
  Edit,
  Eye,
  Check,
  X,
  Tag,
  FolderGit2,
} from "lucide-react";
import Link from "next/link";
import { CrmMessage, VisitorLog } from "@/lib/crm-store";
import { BlogPost } from "@/lib/blog-store";
import { ProjectData } from "@/lib/projects-store";

export default function CrmDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"messages" | "visitors" | "blogs" | "projects">("messages");
  const [messages, setMessages] = useState<CrmMessage[]>([]);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const [stats, setStats] = useState({
    totalMessages: 0,
    unreadMessages: 0,
    totalVisits: 0,
    uniqueVisitors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedMessage, setSelectedMessage] = useState<CrmMessage | null>(null);

  // Blog Editor State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);
  const [blogFormTab, setBlogFormTab] = useState<"edit" | "preview">("edit");
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogNotice, setBlogNotice] = useState("");

  // Project Editor State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<ProjectData> | null>(null);
  const [projectSaving, setProjectSaving] = useState(false);
  const [projectNotice, setProjectNotice] = useState("");

  const handleAuthenticate = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      const res = await fetch("/api/crm/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || "Invalid password.");
      }
    } catch {
      setAuthError("Network error. Please try again.");
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchCrmData = useCallback(async () => {
    setLoading(true);
    try {
      const [resCrm, resBlogs, resProjects] = await Promise.all([
        fetch("/api/crm"),
        fetch("/api/crm/blogs"),
        fetch("/api/crm/projects"),
      ]);

      const dataCrm = await resCrm.json();
      const dataBlogs = await resBlogs.json();
      const dataProjects = await resProjects.json();

      if (dataCrm.success) {
        setMessages(dataCrm.messages || []);
        setVisitors(dataCrm.visitors || []);
        setStats(
          dataCrm.stats || {
            totalMessages: 0,
            unreadMessages: 0,
            totalVisits: 0,
            uniqueVisitors: 0,
          }
        );
      }

      if (dataBlogs.success) setBlogPosts(dataBlogs.posts || []);
      if (dataProjects.success) setProjects(dataProjects.projects || []);
    } catch (err) {
      console.error("Failed to fetch CRM data from database:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCrmData();
  }, [fetchCrmData]);

  const handleUpdateStatus = async (id: string, newStatus: "unread" | "read" | "replied") => {
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_status", id, status: newStatus }),
      });
      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage({ ...selectedMessage, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update message status:", err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch("/api/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_message", id }),
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage && selectedMessage.id === id) {
          setSelectedMessage(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  // Blog CRUD Actions
  const handleOpenNewBlog = () => {
    setEditingPost({
      title: "",
      slug: "",
      category: "System Design",
      excerpt: "",
      content: "",
      tags: ["Engineering", "FastAPI"],
      readTime: "5 min read",
      status: "published",
      coverColor: "#2563eb",
    });
    setBlogFormTab("edit");
    setIsBlogModalOpen(true);
    setBlogNotice("");
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingPost(post);
    setBlogFormTab("edit");
    setIsBlogModalOpen(true);
    setBlogNotice("");
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await fetch("/api/crm/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      if (res.ok) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete blog post:", err);
    }
  };

  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editingPost.title || !editingPost.content) {
      setBlogNotice("Title and Content are required.");
      return;
    }

    setBlogSaving(true);
    setBlogNotice("");

    try {
      const res = await fetch("/api/crm/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", post: editingPost }),
      });
      const data = await res.json();

      if (data.success && data.post) {
        setBlogNotice("Blog post saved successfully!");
        setBlogPosts((prev) => {
          const idx = prev.findIndex((p) => p.id === data.post.id);
          if (idx !== -1) {
            const next = [...prev];
            next[idx] = data.post;
            return next;
          }
          return [data.post, ...prev];
        });
        setTimeout(() => setIsBlogModalOpen(false), 800);
      } else {
        setBlogNotice(data.message || "Failed to save post.");
      }
    } catch {
      setBlogNotice("Server error saving blog post.");
    } finally {
      setBlogSaving(false);
    }
  };

  // Project CRUD Actions
  const handleOpenNewProject = () => {
    setEditingProject({
      title: "",
      slug: "",
      tagline: "",
      description: "",
      category: "Full-Stack",
      impact: "",
      tech: ["FastAPI", "Next.js", "PostgreSQL"],
      featured: true,
      year: "2026",
      github: "",
      demo: "",
      accentColor: "#2563eb",
      order: projects.length,
    });
    setIsProjectModalOpen(true);
    setProjectNotice("");
  };

  const handleEditProject = (proj: ProjectData) => {
    setEditingProject(proj);
    setIsProjectModalOpen(true);
    setProjectNotice("");
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch("/api/crm/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.description) {
      setProjectNotice("Title and Description are required.");
      return;
    }

    setProjectSaving(true);
    setProjectNotice("");

    try {
      const res = await fetch("/api/crm/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "save", project: editingProject }),
      });
      const data = await res.json();

      if (data.success && data.project) {
        setProjectNotice("Project saved successfully!");
        setProjects((prev) => {
          const idx = prev.findIndex((p) => p.id === data.project.id);
          if (idx !== -1) {
            const next = [...prev];
            next[idx] = data.project;
            return next;
          }
          return [...prev, data.project];
        });
        setTimeout(() => setIsProjectModalOpen(false), 800);
      } else {
        setProjectNotice(data.message || "Failed to save project.");
      }
    } catch {
      setProjectNotice("Server error saving project.");
    } finally {
      setProjectSaving(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = statusFilter === "all" || m.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredVisitors = visitors.filter((v) => {
    return (
      v.ip.includes(searchQuery) ||
      v.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.userAgent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.referrer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredBlogs = blogPosts.filter((b) => {
    return (
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const filteredProjects = projects.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-line bg-canvas-raised p-6 md:p-8 shadow-md">
          <div className="flex items-center gap-3 border-b border-line pb-4 mb-6">
            <div className="rounded-lg bg-cobalt/10 p-2.5 text-cobalt">
              <Terminal size={20} />
            </div>
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-cobalt font-bold block">RESTRICTED ACCESS</span>
              <h1 className="text-base font-bold text-ink">CRM TELEMETRY GATEWAY</h1>
            </div>
          </div>

          <form onSubmit={handleAuthenticate} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-ink-muted mb-2 font-bold">
                Enter CRM Access Password:
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full rounded-md border border-line bg-canvas px-4 py-2.5 text-sm font-mono focus:border-cobalt focus:outline-none"
              />
            </div>

            {authError && <p className="text-xs text-vermilion">{authError}</p>}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-full bg-ink py-3 text-xs uppercase tracking-wider text-canvas hover:bg-cobalt transition-colors font-bold cursor-pointer"
            >
              {authLoading ? "Authenticating..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="border-b border-line bg-canvas-raised/90 backdrop-blur-md sticky top-0 z-40 px-4 md:px-gutter py-4">
        <div className="mx-auto max-w-[1600px] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-cobalt transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back to Site</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
              <span className="font-bold text-ink text-xs sm:text-sm">AYUSH // CRM TELEMETRY</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchCrmData}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-xs text-ink-muted hover:text-ink hover:border-cobalt transition-colors cursor-pointer"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Sync DB Telemetry</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="mx-auto max-w-[1600px] w-full px-4 md:px-gutter py-6 md:py-8 flex-1 space-y-6 md:space-y-8">
        {/* Top Metric Cards Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-line bg-canvas-raised p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-ink-muted font-bold block">Inbound Inquiries</span>
              <span className="text-xl sm:text-2xl font-bold text-ink">{stats.totalMessages}</span>
            </div>
            <div className="rounded-lg bg-cobalt/10 p-2.5 sm:p-3 text-cobalt">
              <Inbox size={18} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-canvas-raised p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-ink-muted font-bold block">Unique Visitors</span>
              <span className="text-xl sm:text-2xl font-bold text-ink">{stats.uniqueVisitors}</span>
            </div>
            <div className="rounded-lg bg-acid/10 p-2.5 sm:p-3 text-acid">
              <Users size={18} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-canvas-raised p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-ink-muted font-bold block">DB Projects</span>
              <span className="text-xl sm:text-2xl font-bold text-ink">{projects.length}</span>
            </div>
            <div className="rounded-lg bg-cobalt/10 p-2.5 sm:p-3 text-cobalt">
              <FolderGit2 size={18} />
            </div>
          </div>

          <div className="rounded-xl border border-line bg-canvas-raised p-4 sm:p-5 flex items-center justify-between">
            <div>
              <span className="text-[0.65rem] uppercase tracking-wider text-ink-muted font-bold block">Published Articles</span>
              <span className="text-xl sm:text-2xl font-bold text-cobalt">{blogPosts.length}</span>
            </div>
            <div className="rounded-lg bg-cobalt/10 p-2.5 sm:p-3 text-cobalt">
              <FileText size={18} />
            </div>
          </div>
        </div>

        {/* Tab Controls & Search Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setActiveTab("messages");
                setSelectedMessage(null);
              }}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "messages"
                  ? "bg-cobalt text-white shadow-sm"
                  : "border border-line bg-canvas-raised text-ink-muted hover:border-cobalt hover:text-ink"
              }`}
            >
              <Inbox size={14} />
              <span>Inquiries ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("visitors")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "visitors"
                  ? "bg-cobalt text-white shadow-sm"
                  : "border border-line bg-canvas-raised text-ink-muted hover:border-cobalt hover:text-ink"
              }`}
            >
              <Users size={14} />
              <span>Visitor Telemetry ({visitors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "projects"
                  ? "bg-cobalt text-white shadow-sm"
                  : "border border-line bg-canvas-raised text-ink-muted hover:border-cobalt hover:text-ink"
              }`}
            >
              <FolderGit2 size={14} />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("blogs")}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "blogs"
                  ? "bg-cobalt text-white shadow-sm"
                  : "border border-line bg-canvas-raised text-ink-muted hover:border-cobalt hover:text-ink"
              }`}
            >
              <FileText size={14} />
              <span>Blog Manager ({blogPosts.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "projects" && (
              <button
                onClick={handleOpenNewProject}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 sm:py-2 text-xs font-bold text-canvas hover:bg-cobalt transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus size={14} />
                <span>New Project</span>
              </button>
            )}

            {activeTab === "blogs" && (
              <button
                onClick={handleOpenNewBlog}
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-1.5 sm:py-2 text-xs font-bold text-canvas hover:bg-cobalt transition-colors cursor-pointer whitespace-nowrap"
              >
                <Plus size={14} />
                <span>New Article</span>
              </button>
            )}

            <div className="relative w-full sm:w-auto sm:min-w-[240px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-line bg-canvas-raised pl-9 pr-4 py-1.5 text-xs text-ink outline-none focus:border-cobalt"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Messages / Inquiries */}
        {activeTab === "messages" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <div className={`rounded-xl border border-line bg-canvas-raised p-4 space-y-3 ${
              selectedMessage ? "hidden lg:block" : "block"
            }`}>
              <h2 className="text-xs uppercase tracking-wider text-ink-muted font-bold px-2">Inbound Messages</h2>
              {filteredMessages.length === 0 ? (
                <p className="p-4 text-xs text-ink-muted">No messages in database.</p>
              ) : (
                filteredMessages.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMessage(m);
                      if (m.status === "unread") handleUpdateStatus(m.id, "read");
                    }}
                    className={`rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedMessage?.id === m.id
                        ? "border-cobalt bg-cobalt/5"
                        : m.status === "unread"
                        ? "border-cobalt/40 bg-canvas font-bold"
                        : "border-line bg-canvas/40 opacity-80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-ink font-semibold">{m.name}</span>
                      <span className="text-[0.65rem] text-ink-muted">
                        {new Date(m.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-cobalt font-medium truncate mb-1">{m.subject}</p>
                    <p className="text-[0.75rem] text-ink-muted truncate">{m.message}</p>
                  </div>
                ))
              )}
            </div>

            <div className={`rounded-xl border border-line bg-canvas-raised p-4 sm:p-6 ${
              selectedMessage ? "block" : "hidden lg:block"
            }`}>
              {selectedMessage ? (
                <div className="space-y-6">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="lg:hidden inline-flex items-center gap-1.5 text-xs text-cobalt font-bold mb-2"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Inquiries</span>
                  </button>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 gap-3">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-ink">{selectedMessage.subject}</h2>
                      <p className="text-xs text-ink-muted">From: {selectedMessage.name} ({selectedMessage.email})</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="rounded-full border border-line p-2 text-vermilion hover:bg-vermilion/10 transition-colors cursor-pointer"
                        title="Delete Message"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="rounded-lg border border-line bg-canvas p-4 text-xs text-ink leading-relaxed whitespace-pre-wrap font-sans">
                    {selectedMessage.message}
                  </div>

                  <div className="pt-4 border-t border-line text-[0.7rem] text-ink-muted space-y-1">
                    <div>Received: {new Date(selectedMessage.timestamp).toLocaleString()}</div>
                    <div>IP Address: {selectedMessage.ip}</div>
                  </div>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-ink-muted text-xs text-center p-4">
                  <Inbox size={32} className="mb-2 text-cobalt" />
                  <span>Select an inquiry from the left to view details</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Visitors */}
        {activeTab === "visitors" && (
          <div className="rounded-xl border border-line bg-canvas-raised overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[650px]">
                <thead className="bg-canvas border-b border-line text-ink-muted uppercase text-[0.65rem] tracking-wider">
                  <tr>
                    <th className="p-3 sm:p-4">Timestamp</th>
                    <th className="p-3 sm:p-4">IP Address</th>
                    <th className="p-3 sm:p-4">Target Path</th>
                    <th className="p-3 sm:p-4">Device</th>
                    <th className="p-3 sm:p-4">Referrer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-ink-muted text-xs">
                        No visitor telemetry logged in database yet.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((v) => (
                      <tr key={v.id} className="hover:bg-canvas/50">
                        <td className="p-3 sm:p-4 text-ink-muted">{new Date(v.timestamp).toLocaleString()}</td>
                        <td className="p-3 sm:p-4 text-cobalt font-semibold">{v.ip}</td>
                        <td className="p-3 sm:p-4 font-bold text-ink">{v.path}</td>
                        <td className="p-3 sm:p-4 text-ink-muted">{v.device}</td>
                        <td className="p-3 sm:p-4 text-ink-muted truncate max-w-[200px]">{v.referrer}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Projects Manager */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-line bg-canvas-raised overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-canvas border-b border-line text-ink-muted uppercase text-[0.65rem] tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Project Title</th>
                      <th className="p-3 sm:p-4">Tagline</th>
                      <th className="p-3 sm:p-4">Category</th>
                      <th className="p-3 sm:p-4">Year</th>
                      <th className="p-3 sm:p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredProjects.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-ink-muted text-xs">
                          No projects in database. Click "New Project" to add your featured engineering case studies!
                        </td>
                      </tr>
                    ) : (
                      filteredProjects.map((p) => (
                        <tr key={p.id} className="hover:bg-canvas/50">
                          <td className="p-3 sm:p-4 font-bold text-ink max-w-[200px] truncate">{p.title}</td>
                          <td className="p-3 sm:p-4 text-ink-muted truncate max-w-[250px]">{p.tagline}</td>
                          <td className="p-3 sm:p-4">
                            <span className="inline-flex items-center gap-1 rounded bg-cobalt/10 px-2 py-0.5 text-cobalt font-semibold whitespace-nowrap">
                              {p.category}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4 text-ink-muted whitespace-nowrap">{p.year}</td>
                          <td className="p-3 sm:p-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => handleEditProject(p)}
                              className="inline-flex items-center justify-center p-1.5 rounded border border-line text-ink-muted hover:text-cobalt hover:border-cobalt cursor-pointer"
                              title="Edit Project"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="inline-flex items-center justify-center p-1.5 rounded border border-line text-vermilion hover:bg-vermilion/10 cursor-pointer"
                              title="Delete Project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Blog Manager */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-line bg-canvas-raised overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[700px]">
                  <thead className="bg-canvas border-b border-line text-ink-muted uppercase text-[0.65rem] tracking-wider">
                    <tr>
                      <th className="p-3 sm:p-4">Article Title</th>
                      <th className="p-3 sm:p-4">Category</th>
                      <th className="p-3 sm:p-4">Slug</th>
                      <th className="p-3 sm:p-4">Status</th>
                      <th className="p-3 sm:p-4">Date</th>
                      <th className="p-3 sm:p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredBlogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-6 text-center text-ink-muted text-xs">
                          No blog posts in database. Click "New Article" to publish one.
                        </td>
                      </tr>
                    ) : (
                      filteredBlogs.map((b) => (
                        <tr key={b.id} className="hover:bg-canvas/50">
                          <td className="p-3 sm:p-4 font-bold text-ink max-w-[250px] truncate">{b.title}</td>
                          <td className="p-3 sm:p-4">
                            <span className="inline-flex items-center gap-1 rounded bg-cobalt/10 px-2 py-0.5 text-cobalt font-semibold whitespace-nowrap">
                              <Tag size={10} />
                              {b.category}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4 text-ink-muted truncate max-w-[180px]">{b.slug}</td>
                          <td className="p-3 sm:p-4">
                            <span className={`rounded-full px-2.5 py-0.5 text-[0.65rem] font-bold uppercase whitespace-nowrap ${
                              b.status === "published" ? "bg-acid/15 text-acid" : "bg-vermilion/15 text-vermilion"
                            }`}>
                              {b.status}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4 text-ink-muted whitespace-nowrap">{new Date(b.publishedAt).toLocaleDateString()}</td>
                          <td className="p-3 sm:p-4 text-right space-x-2 whitespace-nowrap">
                            <Link
                              href={`/blogs/${b.slug}`}
                              target="_blank"
                              className="inline-flex items-center justify-center p-1.5 rounded border border-line text-ink-muted hover:text-cobalt hover:border-cobalt"
                              title="Preview Article"
                            >
                              <Eye size={14} />
                            </Link>
                            <button
                              onClick={() => handleEditBlog(b)}
                              className="inline-flex items-center justify-center p-1.5 rounded border border-line text-ink-muted hover:text-cobalt hover:border-cobalt cursor-pointer"
                              title="Edit Article"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(b.id)}
                              className="inline-flex items-center justify-center p-1.5 rounded border border-line text-vermilion hover:bg-vermilion/10 cursor-pointer"
                              title="Delete Article"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Project Edit/Create Modal */}
      {isProjectModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-line bg-canvas-raised p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 my-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <FolderGit2 size={20} className="text-cobalt" />
                <h2 className="font-sans font-bold text-base sm:text-lg text-ink">
                  {editingProject.id ? "Edit Portfolio Project" : "Create New Portfolio Project"}
                </h2>
              </div>
              <button
                onClick={() => setIsProjectModalOpen(false)}
                className="rounded-full border border-line p-1.5 text-ink-muted hover:text-ink cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {projectNotice && (
              <div className="rounded-lg border border-cobalt/30 bg-cobalt/10 p-3 text-xs text-ink font-mono flex items-center gap-2">
                <CheckCircle size={16} className="text-cobalt" />
                <span>{projectNotice}</span>
              </div>
            )}

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. DocStream XML Pipeline"
                    value={editingProject.title || ""}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                      setEditingProject({ ...editingProject, title, slug });
                    }}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="docstream-xml-pipeline"
                    value={editingProject.slug || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Tagline / Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="High-Throughput JATS Document Service"
                    value={editingProject.tagline || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    placeholder="Full-Stack / Microservices"
                    value={editingProject.category || "Full-Stack"}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={editingProject.year || "2026"}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                  Key Impact Outcome (Odometer Metric)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 45% Faster Turnaround Time"
                  value={editingProject.impact || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="FastAPI, Python, Celery, Redis, Docker"
                  value={editingProject.tech ? editingProject.tech.join(", ") : ""}
                  onChange={(e) => setEditingProject({ ...editingProject, tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/ayush931/docstream"
                    value={editingProject.github || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Live Demo / Site URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://docstream.example.com"
                    value={editingProject.demo || ""}
                    onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                  Detailed Project Description (Bullets supported via newlines) *
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Describe system architecture, key features, and engineering decisions..."
                  value={editingProject.description || ""}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-xs text-ink outline-none focus:border-cobalt font-mono resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-line pt-4">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="w-full sm:w-auto rounded-full border border-line px-5 py-2 text-xs font-bold text-ink-muted hover:text-ink cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={projectSaving}
                  className="w-full sm:w-auto rounded-full bg-cobalt px-6 py-2 text-xs font-bold text-white hover:bg-ink transition-colors cursor-pointer shadow-sm"
                >
                  {projectSaving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Blog Post Edit/Create Modal */}
      {isBlogModalOpen && editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-line bg-canvas-raised p-4 sm:p-6 md:p-8 shadow-2xl space-y-5 my-6 max-h-[90vh] overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between border-b border-line pb-4 gap-3">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-cobalt" />
                <h2 className="font-sans font-bold text-base sm:text-lg text-ink">
                  {editingPost.id ? "Edit Technical Article" : "Create New Technical Article"}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex rounded-lg border border-line p-1 bg-canvas">
                  <button
                    type="button"
                    onClick={() => setBlogFormTab("edit")}
                    className={`px-3 py-1 text-xs font-bold rounded ${blogFormTab === "edit" ? "bg-cobalt text-white" : "text-ink-muted"}`}
                  >
                    Editor
                  </button>
                  <button
                    type="button"
                    onClick={() => setBlogFormTab("preview")}
                    className={`px-3 py-1 text-xs font-bold rounded ${blogFormTab === "preview" ? "bg-cobalt text-white" : "text-ink-muted"}`}
                  >
                    Preview
                  </button>
                </div>

                <button
                  onClick={() => setIsBlogModalOpen(false)}
                  className="rounded-full border border-line p-1.5 text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {blogNotice && (
              <div className="rounded-lg border border-cobalt/30 bg-cobalt/10 p-3 text-xs text-ink font-mono flex items-center gap-2">
                <CheckCircle size={16} className="text-cobalt" />
                <span>{blogNotice}</span>
              </div>
            )}

            {blogFormTab === "edit" ? (
              <form onSubmit={handleSaveBlog} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architecting 4-Microservice Document Pipelines"
                      value={editingPost.title || ""}
                      onChange={(e) => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                        setEditingPost({ ...editingPost, title, slug });
                      }}
                      className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="architecting-microservice-document-pipelines"
                      value={editingPost.slug || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, slug: e.target.value })}
                      className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                      Category
                    </label>
                    <select
                      value={editingPost.category || "System Design"}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                    >
                      <option value="Microservices">Microservices</option>
                      <option value="Game Engine & Networking">Game Engine &amp; Networking</option>
                      <option value="WebGL & 3D">WebGL &amp; 3D</option>
                      <option value="System Design">System Design</option>
                      <option value="Full Stack">Full Stack</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                      Estimated Read Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 6 min read"
                      value={editingPost.readTime || ""}
                      onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })}
                      className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                      Publication Status
                    </label>
                    <select
                      value={editingPost.status || "published"}
                      onChange={(e) => setEditingPost({ ...editingPost, status: e.target.value as "published" | "draft" })}
                      className="w-full rounded-lg border border-line bg-canvas px-3 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Short Excerpt (Summary)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Brief 1-2 sentence summary for article cards..."
                    value={editingPost.excerpt || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="FastAPI, Python, Celery, Docker"
                    value={editingPost.tags ? editingPost.tags.join(", ") : ""}
                    onChange={(e) => setEditingPost({ ...editingPost, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-2 text-xs text-ink outline-none focus:border-cobalt font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-ink-muted font-bold mb-1">
                    Article Body (Markdown Supported) *
                  </label>
                  <textarea
                    rows={10}
                    required
                    placeholder="Write article content using Markdown formatting..."
                    value={editingPost.content || ""}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full rounded-lg border border-line bg-canvas px-4 py-3 text-xs text-ink outline-none focus:border-cobalt font-mono resize-y"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-line pt-4">
                  <button
                    type="button"
                    onClick={() => setIsBlogModalOpen(false)}
                    className="w-full sm:w-auto rounded-full border border-line px-5 py-2 text-xs font-bold text-ink-muted hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={blogSaving}
                    className="w-full sm:w-auto rounded-full bg-cobalt px-6 py-2 text-xs font-bold text-white hover:bg-ink transition-colors cursor-pointer shadow-sm"
                  >
                    {blogSaving ? "Saving Post..." : "Save & Publish Article"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 max-h-[50vh] overflow-y-auto p-4 border border-line rounded-lg bg-canvas">
                <h1 className="font-sans text-xl sm:text-2xl font-bold text-ink">{editingPost.title || "Untitled Article"}</h1>
                <p className="text-xs text-ink-muted italic">{editingPost.excerpt}</p>
                <hr className="border-line" />
                <div className="prose prose-neutral text-xs space-y-3 font-mono text-ink">
                  {editingPost.content ? (
                    editingPost.content.split("\n\n").map((block, idx) => (
                      <p key={idx}>{block}</p>
                    ))
                  ) : (
                    <p className="text-ink-muted">No content written yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
