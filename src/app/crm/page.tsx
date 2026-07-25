"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Inbox,
  Mail,
  Star,
  Archive,
  Trash2,
  Search,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Send,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Filter,
  CheckSquare,
  Square,
  Copy,
  ExternalLink,
  MessageSquarePlus,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";
import Link from "next/link";

interface MessageItem {
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

export default function CRMDashboard() {
  const { playClickSound, playHoverSound } = useAudioFeedback();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // CRM Messages State
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);

  // Filters & Search
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "starred" | "archived">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Composer / Reply State
  const [replyText, setReplyText] = useState("");
  const [replySent, setReplySent] = useState(false);

  // New Test Message Modal State
  const [isNewMsgModalOpen, setIsNewMsgModalOpen] = useState(false);
  const [newMsgForm, setNewMsgForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sendingNewMsg, setSendingNewMsg] = useState(false);

  const defaultPassword = process.env.NEXT_PUBLIC_CRM_PASSWORD || "admin123";

  // Check auth session on load
  useEffect(() => {
    const savedAuth = localStorage.getItem("crm_auth_token");
    if (savedAuth === "authenticated") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch messages from API + merge localStorage
  const fetchMessages = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/messages");
      let apiMessages: MessageItem[] = [];
      if (res.ok) {
        const data = await res.json();
        apiMessages = data.messages || [];
      }

      // Merge offline/local messages if any
      let localMessages: MessageItem[] = [];
      try {
        const stored = localStorage.getItem("crm_local_messages");
        if (stored) {
          localMessages = JSON.parse(stored);
        }
      } catch (e) {
        console.warn("Error reading local messages:", e);
      }

      // Deduplicate by ID
      const map = new Map<string, MessageItem>();
      [...apiMessages, ...localMessages].forEach((m) => {
        if (!map.has(m.id)) {
          map.set(m.id, m);
        }
      });

      const combined = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setMessages(combined);
      if (combined.length > 0 && !selectedMsgId) {
        setSelectedMsgId(combined[0].id);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (passwordInput === defaultPassword) {
      setIsAuthenticated(true);
      localStorage.setItem("crm_auth_token", "authenticated");
      setAuthError("");
    } else {
      setAuthError("Invalid Security Password. Access Denied.");
    }
  };

  const handleLogout = () => {
    playClickSound();
    setIsAuthenticated(false);
    localStorage.removeItem("crm_auth_token");
  };

  // Toggle Read status
  const toggleReadStatus = async (id: string, currentRead: boolean) => {
    playClickSound();
    const newRead = !currentRead;
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: newRead } : m))
    );
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: newRead }),
      });
    } catch (e) {
      console.error("Failed to patch read state:", e);
    }
  };

  // Toggle Starred status
  const toggleStarredStatus = async (id: string, currentStarred: boolean) => {
    playClickSound();
    const newStarred = !currentStarred;
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: newStarred } : m))
    );
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, starred: newStarred }),
      });
    } catch (e) {
      console.error("Failed to patch star state:", e);
    }
  };

  // Toggle Archive status
  const toggleArchiveStatus = async (id: string, currentArchived: boolean) => {
    playClickSound();
    const newArchived = !currentArchived;
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, archived: newArchived } : m))
    );
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, archived: newArchived }),
      });
    } catch (e) {
      console.error("Failed to patch archive state:", e);
    }
  };

  // Delete Single Message
  const handleDeleteMessage = async (id: string) => {
    playClickSound();
    if (!confirm("Are you sure you want to delete this message permanently?")) return;

    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMsgId === id) {
      const remaining = messages.filter((m) => m.id !== id);
      setSelectedMsgId(remaining.length > 0 ? remaining[0].id : null);
    }
    try {
      await fetch(`/api/messages?id=${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Failed to delete message:", e);
    }
  };

  // Bulk Actions
  const handleBulkAction = async (action: "markRead" | "star" | "archive" | "delete") => {
    if (selectedIds.length === 0) return;
    playClickSound();

    if (action === "delete") {
      if (!confirm(`Delete ${selectedIds.length} selected message(s)?`)) return;
      setMessages((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
      try {
        await fetch("/api/messages", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: selectedIds }),
        });
      } catch (e) {
        console.error("Bulk delete failed", e);
      }
      setSelectedIds([]);
      return;
    }

    setMessages((prev) =>
      prev.map((m) => {
        if (selectedIds.includes(m.id)) {
          return {
            ...m,
            ...(action === "markRead" ? { read: true } : {}),
            ...(action === "star" ? { starred: true } : {}),
            ...(action === "archive" ? { archived: true } : {}),
          };
        }
        return m;
      })
    );

    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bulkAction: action, ids: selectedIds }),
      });
    } catch (e) {
      console.error("Bulk action failed", e);
    }
    setSelectedIds([]);
  };

  // Handle New Message Creation from CRM Modal
  const handleCreateTestMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setSendingNewMsg(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsgForm),
      });
      if (res.ok) {
        setIsNewMsgModalOpen(false);
        setNewMsgForm({ name: "", email: "", subject: "", message: "" });
        await fetchMessages();
      }
    } catch (e) {
      console.error("Failed to create message", e);
    } finally {
      setSendingNewMsg(false);
    }
  };

  // Export Messages to CSV
  const exportCSV = () => {
    playClickSound();
    const headers = ["ID", "Name", "Email", "Subject", "Message", "Date", "Read", "Starred", "Archived"];
    const rows = messages.map((m) => [
      m.id,
      `"${m.name.replace(/"/g, '""')}"`,
      `"${m.email.replace(/"/g, '""')}"`,
      `"${m.subject.replace(/"/g, '""')}"`,
      `"${m.message.replace(/"/g, '""')}"`,
      m.createdAt,
      m.read ? "Yes" : "No",
      m.starred ? "Yes" : "No",
      m.archived ? "Yes" : "No",
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CRM_Messages_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter messages logic
  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      // Tab filter
      if (activeTab === "unread" && msg.read) return false;
      if (activeTab === "starred" && !msg.starred) return false;
      if (activeTab === "archived" && !msg.archived) return false;
      if (activeTab !== "archived" && msg.archived) return false; // hide archived in non-archive tabs

      // Search query filter
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q)
      );
    });
  }, [messages, activeTab, searchQuery]);

  const selectedMessage = useMemo(() => {
    return messages.find((m) => m.id === selectedMsgId) || null;
  }, [messages, selectedMsgId]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = messages.length;
    const unread = messages.filter((m) => !m.read).length;
    const starred = messages.filter((m) => m.starred).length;
    const archived = messages.filter((m) => m.archived).length;
    return { total, unread, starred, archived };
  }, [messages]);

  // Auto-mark selected message as read after 1 second
  useEffect(() => {
    if (selectedMessage && !selectedMessage.read) {
      const timer = setTimeout(() => {
        toggleReadStatus(selectedMessage.id, false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [selectedMsgId]);

  // Helper formatting date
  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return isoString;
    }
  };

  // UNAUTHENTICATED LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-cyber-bg text-cyber-text font-sans flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.08)_0,transparent_70%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md glass-panel-3d rounded-3xl p-8 border border-cyber-accent/20 shadow-luxury space-y-6 z-10"
        >
          <div className="text-center space-y-3 font-mono">
            <div className="w-16 h-16 rounded-2xl bg-cyber-surface border border-cyber-accent/30 text-cyber-accent-light flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-cyber-text tracking-tight">CRM ACCESS GATEWAY</h1>
            <p className="text-xs text-cyber-muted font-sans max-w-xs mx-auto">
              Authorized personnel authentication required to access message inbox & client communications.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
            <div className="space-y-2">
              <label className="text-cyber-muted flex items-center justify-between">
                <span>SECURITY_PASSPHRASE</span>
                <span className="text-[10px] text-cyber-accent-light">DEFAULT: admin123</span>
              </label>
              <input
                type="password"
                required
                placeholder="Enter password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-cyber-surface/90 border border-cyber-border/60 text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-all shadow-inner"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-400 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              onMouseEnter={playHoverSound}
              className="w-full py-4 rounded-xl bg-cyber-accent text-cyber-bg font-bold text-xs hover:bg-cyber-accent-light transition-all flex items-center justify-center space-x-2 shadow-luxury"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICATE_SESSION()</span>
            </button>
          </form>

          <div className="pt-4 border-t border-cyber-border/30 flex items-center justify-between text-[11px] text-cyber-muted font-mono">
            <Link href="/" className="hover:text-cyber-accent-light transition-colors flex items-center space-x-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
            <span className="text-cyber-accent-light">SYS_STATUS: READY</span>
          </div>
        </motion.div>
      </main>
    );
  }

  // AUTHENTICATED CRM DASHBOARD
  return (
    <main className="min-h-screen bg-cyber-bg text-cyber-text font-sans flex flex-col relative overflow-hidden">
      {/* Background Accent Grids */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,242,254,0.04)_0,transparent_50%)] pointer-events-none" />

      {/* TOP HEADER CONTROL BAR */}
      <header className="sticky top-0 z-30 bg-cyber-bg/85 backdrop-blur-xl border-b border-cyber-border/40 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
          
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
              className="p-2 rounded-xl bg-cyber-surface border border-cyber-border/50 text-cyber-muted hover:text-cyber-accent-light hover:border-cyber-accent/30 transition-all flex items-center justify-center"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyber-accent/15 border border-cyber-accent/30 text-cyber-accent-light flex items-center justify-center font-bold font-mono">
                CRM
              </div>
              <div>
                <div className="text-sm font-bold text-cyber-text font-sans flex items-center space-x-2">
                  <span>Client Communications Hub</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyber-accent/15 border border-cyber-accent/30 text-cyber-accent-light font-mono">
                    LIVE
                  </span>
                </div>
                <div className="text-[11px] text-cyber-muted">ayush.kumar@personal-crm v2.5</div>
              </div>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={() => setIsNewMsgModalOpen(true)}
              onMouseEnter={playHoverSound}
              className="px-3.5 py-2 rounded-xl bg-cyber-accent text-cyber-bg font-bold hover:bg-cyber-accent-light transition-all flex items-center space-x-1.5 shadow-luxury"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>+ Simulate Message</span>
            </button>

            <button
              onClick={fetchMessages}
              disabled={refreshing}
              onMouseEnter={playHoverSound}
              className="px-3 py-2 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-muted hover:text-cyber-text transition-all flex items-center space-x-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin text-cyber-accent-light" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={exportCSV}
              onMouseEnter={playHoverSound}
              className="px-3 py-2 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-muted hover:text-cyber-text transition-all flex items-center space-x-1.5"
            >
              <Download className="w-3.5 h-3.5 text-cyber-accent-light" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleLogout}
              onMouseEnter={playHoverSound}
              className="px-3 py-2 rounded-xl bg-cyber-surface/80 border border-red-500/30 text-red-400 hover:bg-red-950/30 transition-all flex items-center space-x-1.5"
              title="Lock CRM Dashboard"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Lock</span>
            </button>
          </div>

        </div>
      </header>

      {/* METRICS & STATS BAR */}
      <section className="px-4 sm:px-8 py-5 border-b border-cyber-border/30 bg-cyber-surface/20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          
          <div className="glass-panel-3d p-4 rounded-2xl border border-cyber-border/40 space-y-1">
            <div className="flex items-center justify-between text-cyber-muted text-xs">
              <span>TOTAL_INBOX</span>
              <Inbox className="w-4 h-4 text-cyber-accent-light" />
            </div>
            <div className="text-2xl font-bold text-cyber-text">{stats.total}</div>
            <div className="text-[10px] text-cyber-muted font-sans">Received from portfolio form</div>
          </div>

          <div className="glass-panel-3d p-4 rounded-2xl border border-cyber-border/40 space-y-1">
            <div className="flex items-center justify-between text-cyber-muted text-xs">
              <span>UNREAD_MESSAGES</span>
              <Mail className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold text-amber-400">{stats.unread}</div>
            <div className="text-[10px] text-cyber-muted font-sans">Requires attention / reply</div>
          </div>

          <div className="glass-panel-3d p-4 rounded-2xl border border-cyber-border/40 space-y-1">
            <div className="flex items-center justify-between text-cyber-muted text-xs">
              <span>VIP_STARRED</span>
              <Star className="w-4 h-4 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-yellow-400">{stats.starred}</div>
            <div className="text-[10px] text-cyber-muted font-sans">Priority inquiries</div>
          </div>

          <div className="glass-panel-3d p-4 rounded-2xl border border-cyber-border/40 space-y-1">
            <div className="flex items-center justify-between text-cyber-muted text-xs">
              <span>ARCHIVED</span>
              <Archive className="w-4 h-4 text-cyber-muted" />
            </div>
            <div className="text-2xl font-bold text-cyber-text">{stats.archived}</div>
            <div className="text-[10px] text-cyber-muted font-sans">Processed items</div>
          </div>

        </div>
      </section>

      {/* MAIN INBOX WORKSPACE */}
      <section className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: INBOX LIST (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Search & Filter Header */}
          <div className="space-y-3 font-mono">
            <div className="relative">
              <Search className="w-4 h-4 text-cyber-muted absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search sender, email, content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cyber-surface/90 border border-cyber-border/60 text-xs text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-2.5 text-xs text-cyber-muted hover:text-cyber-text"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center space-x-1 p-1 bg-cyber-surface/60 rounded-xl border border-cyber-border/40 text-xs">
              <button
                onClick={() => { setActiveTab("all"); setSelectedIds([]); }}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  activeTab === "all"
                    ? "bg-cyber-accent/20 text-cyber-accent-light font-bold"
                    : "text-cyber-muted hover:text-cyber-text"
                }`}
              >
                All ({stats.total - stats.archived})
              </button>
              <button
                onClick={() => { setActiveTab("unread"); setSelectedIds([]); }}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  activeTab === "unread"
                    ? "bg-amber-500/20 text-amber-300 font-bold"
                    : "text-cyber-muted hover:text-cyber-text"
                }`}
              >
                Unread ({stats.unread})
              </button>
              <button
                onClick={() => { setActiveTab("starred"); setSelectedIds([]); }}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  activeTab === "starred"
                    ? "bg-yellow-500/20 text-yellow-300 font-bold"
                    : "text-cyber-muted hover:text-cyber-text"
                }`}
              >
                Starred ({stats.starred})
              </button>
              <button
                onClick={() => { setActiveTab("archived"); setSelectedIds([]); }}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  activeTab === "archived"
                    ? "bg-cyber-border text-cyber-text font-bold"
                    : "text-cyber-muted hover:text-cyber-text"
                }`}
              >
                Archived ({stats.archived})
              </button>
            </div>

            {/* Bulk Toolbar if items selected */}
            {selectedIds.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-2 bg-cyber-accent/10 border border-cyber-accent/30 rounded-xl flex items-center justify-between text-xs font-mono text-cyber-accent-light"
              >
                <span>{selectedIds.length} selected</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleBulkAction("markRead")}
                    className="hover:underline text-[11px]"
                  >
                    Mark Read
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => handleBulkAction("star")}
                    className="hover:underline text-[11px]"
                  >
                    Star
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => handleBulkAction("archive")}
                    className="hover:underline text-[11px]"
                  >
                    Archive
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => handleBulkAction("delete")}
                    className="hover:underline text-red-400 text-[11px]"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Messages Item List */}
          <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
            {loading ? (
              <div className="py-16 text-center text-cyber-muted font-mono text-xs space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-cyber-accent-light" />
                <div>FETCHING_MESSAGES_STREAM()</div>
              </div>
            ) : filteredMessages.length === 0 ? (
              <div className="py-16 text-center text-cyber-muted font-mono text-xs space-y-3 glass-panel-3d rounded-2xl border border-cyber-border/40">
                <Inbox className="w-10 h-10 mx-auto text-cyber-muted/50" />
                <div>NO_MESSAGES_FOUND</div>
                <p className="text-[11px] text-cyber-muted max-w-xs mx-auto font-sans">
                  {searchQuery
                    ? `No messages matching "${searchQuery}"`
                    : "No messages in this view tab yet. Send a test message to preview!"}
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMsgId === msg.id;
                const isChecked = selectedIds.includes(msg.id);

                return (
                  <div
                    key={msg.id}
                    onClick={() => {
                      setSelectedMsgId(msg.id);
                      playClickSound();
                    }}
                    className={`relative p-4 rounded-2xl border transition-all cursor-pointer font-sans space-y-2 ${
                      isSelected
                        ? "bg-cyber-surface border-cyber-accent/50 shadow-luxury"
                        : msg.read
                        ? "bg-cyber-surface/30 border-cyber-border/40 hover:bg-cyber-surface/60"
                        : "bg-cyber-surface/80 border-cyber-accent/30 shadow-sm"
                    }`}
                  >
                    {/* Top Row: Sender & Star */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center space-x-2.5 truncate">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedIds((prev) =>
                              isChecked ? prev.filter((id) => id !== msg.id) : [...prev, msg.id]
                            );
                          }}
                          className="text-cyber-muted hover:text-cyber-text shrink-0"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-cyber-accent-light" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>

                        <div className="w-7 h-7 rounded-lg bg-cyber-bg border border-cyber-border/60 text-cyber-accent-light font-mono text-xs font-bold flex items-center justify-center shrink-0">
                          {msg.name.slice(0, 2).toUpperCase()}
                        </div>

                        <span className={`text-xs truncate ${!msg.read ? "font-bold text-cyber-text" : "text-cyber-muted"}`}>
                          {msg.name}
                        </span>

                        {!msg.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 text-xs font-mono shrink-0">
                        <span className="text-[10px] text-cyber-muted">{formatDate(msg.createdAt)}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStarredStatus(msg.id, msg.starred);
                          }}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              msg.starred ? "text-yellow-400 fill-yellow-400" : "text-cyber-muted hover:text-yellow-400"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Subject line */}
                    <div className={`text-xs font-medium truncate ${!msg.read ? "text-cyber-text font-semibold" : "text-cyber-muted"}`}>
                      {msg.subject}
                    </div>

                    {/* Message Preview Snippet */}
                    <p className="text-[11px] text-cyber-muted/80 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: DETAILED MESSAGE READER (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel-3d rounded-3xl p-6 sm:p-8 border border-cyber-accent/20 shadow-luxury space-y-6"
            >
              {/* Message Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyber-border/40 pb-5">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-cyber-surface border border-cyber-accent/30 text-cyber-accent-light font-mono text-lg font-bold flex items-center justify-center shadow-inner">
                    {selectedMessage.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-cyber-text font-sans flex items-center space-x-2">
                      <span>{selectedMessage.name}</span>
                      {selectedMessage.starred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 inline" />
                      )}
                    </h2>
                    <a
                      href={`mailto:${selectedMessage.email}`}
                      className="text-xs font-mono text-cyber-accent-light hover:underline flex items-center space-x-1"
                    >
                      <Mail className="w-3 h-3" />
                      <span>{selectedMessage.email}</span>
                    </a>
                  </div>
                </div>

                {/* Quick Actions Toolbar */}
                <div className="flex items-center space-x-2 font-mono text-xs">
                  <button
                    onClick={() => toggleStarredStatus(selectedMessage.id, selectedMessage.starred)}
                    onMouseEnter={playHoverSound}
                    className={`p-2.5 rounded-xl border transition-all ${
                      selectedMessage.starred
                        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        : "bg-cyber-surface border-cyber-border/50 text-cyber-muted hover:text-cyber-text"
                    }`}
                    title="Star Message"
                  >
                    <Star className={`w-4 h-4 ${selectedMessage.starred ? "fill-yellow-400" : ""}`} />
                  </button>

                  <button
                    onClick={() => toggleArchiveStatus(selectedMessage.id, selectedMessage.archived)}
                    onMouseEnter={playHoverSound}
                    className={`p-2.5 rounded-xl border transition-all ${
                      selectedMessage.archived
                        ? "bg-cyber-accent/15 border-cyber-accent/40 text-cyber-accent-light"
                        : "bg-cyber-surface border-cyber-border/50 text-cyber-muted hover:text-cyber-text"
                    }`}
                    title={selectedMessage.archived ? "Unarchive Message" : "Archive Message"}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    onMouseEnter={playHoverSound}
                    className="p-2.5 rounded-xl bg-cyber-surface border border-red-500/30 text-red-400 hover:bg-red-950/40 transition-all"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Subject & Timestamp Info */}
              <div className="space-y-1.5 font-mono">
                <div className="text-xs text-cyber-muted flex items-center justify-between">
                  <span className="text-cyber-accent-light font-bold">SUBJECT_HEADER</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-cyber-muted" />
                    <span>{new Date(selectedMessage.createdAt).toLocaleString()}</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-cyber-text font-sans">
                  {selectedMessage.subject}
                </h3>
              </div>

              {/* Message Body Content Card */}
              <div className="p-6 rounded-2xl bg-cyber-surface/70 border border-cyber-border/50 space-y-4 text-sm text-cyber-text leading-relaxed font-sans shadow-inner whitespace-pre-wrap">
                {selectedMessage.message}
              </div>

              {/* Action Links & Quick Reply Composer */}
              <div className="space-y-4 pt-2 border-t border-cyber-border/30">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="px-4 py-2.5 rounded-xl bg-cyber-accent text-cyber-bg font-bold hover:bg-cyber-accent-light transition-all flex items-center space-x-2 shadow-luxury"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email Client</span>
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `From: ${selectedMessage.name} <${selectedMessage.email}>\nSubject: ${selectedMessage.subject}\nDate: ${selectedMessage.createdAt}\n\n${selectedMessage.message}`
                      );
                      playClickSound();
                      alert("Message copied to clipboard!");
                    }}
                    onMouseEnter={playHoverSound}
                    className="px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border/50 text-cyber-muted hover:text-cyber-text transition-all flex items-center space-x-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Raw Text</span>
                  </button>
                </div>

                {/* Quick Interactive Reply Composer */}
                <div className="p-5 rounded-2xl bg-cyber-surface/40 border border-cyber-border/40 space-y-3 font-mono text-xs">
                  <div className="text-cyber-accent-light font-bold flex items-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>QUICK_REPLY_COMPOSER</span>
                  </div>

                  {replySent ? (
                    <div className="py-4 text-center text-cyber-accent-light font-semibold flex items-center justify-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>REPLY_DISPATCHED (MAILTO INITIATED)</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <textarea
                        rows={3}
                        placeholder={`Hi ${selectedMessage.name.split(" ")[0]}, thank you for reaching out...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-border/60 text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-colors text-xs resize-none"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            if (!replyText.trim()) return;
                            playClickSound();
                            const mailtoUrl = `mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                              selectedMessage.subject
                            )}&body=${encodeURIComponent(replyText)}`;
                            window.open(mailtoUrl, "_blank");
                            setReplySent(true);
                            setTimeout(() => {
                              setReplySent(false);
                              setReplyText("");
                            }, 3000);
                          }}
                          onMouseEnter={playHoverSound}
                          className="px-4 py-2 rounded-xl bg-cyber-surface border border-cyber-accent/40 text-cyber-accent-light font-bold hover:bg-cyber-accent/20 transition-all flex items-center space-x-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>SEND_REPLY()</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ) : (
            <div className="glass-panel-3d rounded-3xl p-16 text-center border border-cyber-border/40 font-mono space-y-4">
              <Inbox className="w-12 h-12 mx-auto text-cyber-muted/50" />
              <div className="text-sm font-bold text-cyber-text">NO MESSAGE SELECTED</div>
              <p className="text-xs text-cyber-muted max-w-sm mx-auto font-sans">
                Select a message from the left inbox stream to view detailed sender information, message body, and dispatch replies.
              </p>
            </div>
          )}
        </div>

      </section>

      {/* NEW SIMULATED MESSAGE MODAL */}
      <AnimatePresence>
        {isNewMsgModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-md glass-panel-3d rounded-3xl p-7 border border-cyber-accent/30 shadow-luxury space-y-5 font-mono text-xs"
            >
              <div className="flex items-center justify-between border-b border-cyber-border/30 pb-3">
                <span className="text-cyber-accent-light font-bold text-sm">SIMULATE_INCOMING_MESSAGE</span>
                <button
                  onClick={() => setIsNewMsgModalOpen(false)}
                  className="text-cyber-muted hover:text-cyber-text"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateTestMessage} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-cyber-muted">SENDER_NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Rivera"
                    value={newMsgForm.name}
                    onChange={(e) => setNewMsgForm({ ...newMsgForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border/60 text-cyber-text focus:border-cyber-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cyber-muted">SENDER_EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@techcorp.com"
                    value={newMsgForm.email}
                    onChange={(e) => setNewMsgForm({ ...newMsgForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border/60 text-cyber-text focus:border-cyber-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cyber-muted">SUBJECT</label>
                  <input
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    value={newMsgForm.subject}
                    onChange={(e) => setNewMsgForm({ ...newMsgForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border/60 text-cyber-text focus:border-cyber-accent focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-cyber-muted">MESSAGE_BODY *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write test message body..."
                    value={newMsgForm.message}
                    onChange={(e) => setNewMsgForm({ ...newMsgForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cyber-surface border border-cyber-border/60 text-cyber-text focus:border-cyber-accent focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsNewMsgModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-cyber-surface text-cyber-muted hover:text-cyber-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingNewMsg}
                    className="px-5 py-2 rounded-xl bg-cyber-accent text-cyber-bg font-bold hover:bg-cyber-accent-light transition-all flex items-center space-x-1.5"
                  >
                    {sendingNewMsg ? "POSTING..." : "DISPATCH_MESSAGE()"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
