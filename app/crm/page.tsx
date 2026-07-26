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
} from "lucide-react";
import Link from "next/link";
import { CrmMessage, VisitorLog } from "@/lib/crm-store";

export default function CrmDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"messages" | "visitors">("messages");
  const [messages, setMessages] = useState<CrmMessage[]>([]);
  const [visitors, setVisitors] = useState<VisitorLog[]>([]);
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
      const res = await fetch("/api/crm");
      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setVisitors(data.visitors || []);
        setStats(
          data.stats || {
            totalMessages: 0,
            unreadMessages: 0,
            totalVisits: 0,
            uniqueVisitors: 0,
          }
        );
      }
    } catch (err) {
      console.error("Failed to fetch CRM data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/crm")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setMessages(data.messages || []);
          setVisitors(data.visitors || []);
          setStats(data.stats || { totalMessages: 0, unreadMessages: 0, totalVisits: 0, uniqueVisitors: 0 });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch CRM data:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-xl border border-line bg-canvas-raised p-8 shadow-md">
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

            {authError && (
              <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-semibold">
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full rounded-md bg-ink py-3 text-xs uppercase tracking-wider font-bold text-canvas hover:bg-cobalt transition-colors shadow-xs disabled:opacity-50"
            >
              {authLoading ? "Verifying..." : "UNLOCK CRM DASHBOARD →"}
            </button>

            <p className="text-[0.7rem] text-ink-muted text-center pt-2 leading-relaxed">
              * Password configured in <code className="text-cobalt">.env</code> (<code className="text-cobalt">CRM_PASSWORD</code>). No session token is stored. Closing or refreshing re-locks the dashboard.
            </p>
          </form>

          <div className="mt-6 border-t border-line pt-4 text-center">
            <Link href="/" className="text-xs text-cobalt hover:underline inline-flex items-center gap-1">
              <ArrowLeft size={13} /> Return to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-canvas blueprint-grid text-ink font-mono px-4 md:px-8 py-6">
      <div className="mx-auto max-w-[1500px]">
        
        {/* Top Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas-raised px-3 py-1.5 text-xs text-ink hover:border-cobalt hover:text-cobalt transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </Link>
            <div className="h-4 w-px bg-line" />
            <div className="flex items-center gap-2">
              <Terminal size={16} className="text-cobalt" />
              <h1 className="text-sm md:text-base font-bold tracking-wider uppercase">
                SYSTEM CRM &amp; ANALYTICS DASHBOARD
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-cobalt/30 bg-cobalt/10 px-3 py-1 text-cobalt font-semibold">
              <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
              LIVE TELEMETRY
            </span>
            <button
              onClick={fetchCrmData}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas-raised px-3 py-1.5 text-ink hover:border-cobalt hover:text-cobalt transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
              <span>Refresh</span>
            </button>
          </div>
        </header>

        {/* Executive Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border border-line bg-canvas-raised p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Inquiries</span>
              <Inbox size={16} className="text-cobalt" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl md:text-3xl font-bold">{stats.totalMessages}</span>
              {stats.unreadMessages > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-cobalt text-white font-bold">
                  {stats.unreadMessages} New
                </span>
              )}
            </div>
            <p className="text-[0.7rem] text-ink-muted mt-2">Contact Form Submissions</p>
          </div>

          <div className="rounded-lg border border-line bg-canvas-raised p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Site Visits</span>
              <Users size={16} className="text-cobalt" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl md:text-3xl font-bold">{stats.totalVisits}</span>
              <span className="text-xs text-ink-muted">{stats.uniqueVisitors} Unique IPs</span>
            </div>
            <p className="text-[0.7rem] text-ink-muted mt-2">Tracked Page Sessions</p>
          </div>

          <div className="rounded-lg border border-line bg-canvas-raised p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Conversion Rate</span>
              <Globe size={16} className="text-cobalt" />
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              {stats.totalVisits > 0
                ? `${((stats.totalMessages / stats.totalVisits) * 100).toFixed(1)}%`
                : "0.0%"}
            </div>
            <p className="text-[0.7rem] text-ink-muted mt-2">Inquiry per Visit ratio</p>
          </div>

          <div className="rounded-lg border border-line bg-canvas-raised p-5 shadow-xs">
            <div className="flex items-center justify-between text-ink-muted mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">Storage Mode</span>
              <CheckCircle size={16} className="text-emerald-600" />
            </div>
            <div className="text-base font-bold text-ink">JSON File Persistence</div>
            <p className="text-[0.7rem] text-ink-muted mt-2">Auto-synced at /data/crm_data.json</p>
          </div>
        </div>

        {/* Tab Navigation & Search Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("messages")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-colors ${
                activeTab === "messages"
                  ? "bg-ink text-canvas shadow-xs"
                  : "bg-canvas-raised border border-line text-ink hover:border-cobalt"
              }`}
            >
              Inquiries ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab("visitors")}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-md transition-colors ${
                activeTab === "visitors"
                  ? "bg-ink text-canvas shadow-xs"
                  : "bg-canvas-raised border border-line text-ink hover:border-cobalt"
              }`}
            >
              Visitor Logs ({visitors.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab === "messages" && (
              <div className="flex items-center gap-1 bg-canvas-raised border border-line rounded-md px-2 py-1 text-xs">
                <Filter size={13} className="text-ink-muted" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-mono focus:outline-none cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>
            )}

            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                type="text"
                placeholder={activeTab === "messages" ? "Search inquiries..." : "Search IP / agent / path..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-canvas-raised border border-line rounded-md pl-9 pr-3 py-1.5 text-xs font-mono focus:border-cobalt focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Tab 1: Messages / Inquiries List */}
        {activeTab === "messages" && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            
            {/* Messages List Column */}
            <div className="space-y-3">
              {filteredMessages.length === 0 ? (
                <div className="rounded-lg border border-line bg-canvas-raised p-8 text-center text-ink-muted text-xs">
                  No inquiries found matching your filters.
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isSelected = selectedMessage?.id === msg.id;
                  return (
                    <div
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        isSelected
                          ? "border-cobalt bg-cobalt/5 shadow-xs"
                          : "border-line bg-canvas-raised hover:border-cobalt/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-bold text-sm text-ink truncate">{msg.name}</span>
                        <span
                          className={`text-[0.65rem] px-2 py-0.5 rounded-full font-bold uppercase ${
                            msg.status === "unread"
                              ? "bg-cobalt text-white"
                              : msg.status === "replied"
                              ? "bg-emerald-600 text-white"
                              : "bg-line text-ink-muted"
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-cobalt truncate mb-1">{msg.subject}</p>
                      <p className="text-xs text-ink-muted line-clamp-2 leading-relaxed mb-3">
                        {msg.message}
                      </p>
                      <div className="flex items-center justify-between text-[0.7rem] text-ink-muted border-t border-line/50 pt-2">
                        <span className="flex items-center gap-1">
                          <Mail size={11} /> {msg.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} /> {new Date(msg.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Detailed View Panel */}
            <div>
              {selectedMessage ? (
                <div className="sticky top-6 rounded-lg border border-line bg-canvas-raised p-6 shadow-xs space-y-6">
                  <div className="flex items-start justify-between border-b border-line pb-4">
                    <div>
                      <span className="text-[0.65rem] uppercase tracking-wider text-cobalt font-bold">
                        Inquiry Detail #{selectedMessage.id}
                      </span>
                      <h2 className="text-lg font-bold text-ink mt-1">{selectedMessage.subject}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeleteMessage(selectedMessage.id)}
                        className="rounded-md border border-red-300 bg-red-50 p-2 text-red-600 hover:bg-red-100 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Sender Metadata */}
                  <div className="grid grid-cols-2 gap-4 rounded-md border border-line/60 bg-canvas p-4 text-xs">
                    <div>
                      <span className="text-[0.65rem] text-ink-muted uppercase block">Sender Name</span>
                      <span className="font-bold text-ink">{selectedMessage.name}</span>
                    </div>
                    <div>
                      <span className="text-[0.65rem] text-ink-muted uppercase block">Sender Email</span>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="font-bold text-cobalt hover:underline inline-flex items-center gap-1"
                      >
                        {selectedMessage.email} <ExternalLink size={11} />
                      </a>
                    </div>
                    <div>
                      <span className="text-[0.65rem] text-ink-muted uppercase block">Date &amp; Time</span>
                      <span className="text-ink">{new Date(selectedMessage.timestamp).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[0.65rem] text-ink-muted uppercase block">Client IP Address</span>
                      <span className="text-ink font-mono">{selectedMessage.ip || "127.0.0.1"}</span>
                    </div>
                  </div>

                  {/* Full Message Body */}
                  <div>
                    <span className="text-[0.6875rem] uppercase tracking-wider text-ink-muted font-bold block mb-2">
                      Full Message Content:
                    </span>
                    <div className="rounded-md border border-line bg-canvas p-4 text-xs leading-relaxed text-ink whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Status Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-muted">Set Status:</span>
                      <button
                        onClick={() => handleUpdateStatus(selectedMessage.id, "unread")}
                        className={`px-3 py-1 text-xs rounded-md border ${
                          selectedMessage.status === "unread"
                            ? "bg-cobalt text-white border-cobalt"
                            : "border-line bg-canvas hover:border-cobalt"
                        }`}
                      >
                        Unread
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedMessage.id, "read")}
                        className={`px-3 py-1 text-xs rounded-md border ${
                          selectedMessage.status === "read"
                            ? "bg-ink text-canvas border-ink"
                            : "border-line bg-canvas hover:border-cobalt"
                        }`}
                      >
                        Read
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(selectedMessage.id, "replied")}
                        className={`px-3 py-1 text-xs rounded-md border ${
                          selectedMessage.status === "replied"
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "border-line bg-canvas hover:border-cobalt"
                        }`}
                      >
                        Replied
                      </button>
                    </div>

                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                        selectedMessage.subject
                      )}`}
                      className="inline-flex items-center gap-2 rounded-md bg-cobalt px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors shadow-xs"
                    >
                      <Mail size={13} />
                      <span>Reply Email</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-line bg-canvas-raised/50 p-12 text-center text-ink-muted text-xs">
                  Select an inquiry from the list to inspect full details and reply.
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Visitor Analytics Log */}
        {activeTab === "visitors" && (
          <div className="rounded-lg border border-line bg-canvas-raised overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line bg-canvas/80 text-ink-muted font-bold uppercase tracking-wider text-[0.6875rem]">
                    <th className="p-3.5">Timestamp</th>
                    <th className="p-3.5">Visitor IP</th>
                    <th className="p-3.5">Target Path</th>
                    <th className="p-3.5">Device</th>
                    <th className="p-3.5">User Agent</th>
                    <th className="p-3.5">Referrer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60">
                  {filteredVisitors.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-ink-muted">
                        No visitor telemetry logs recorded yet.
                      </td>
                    </tr>
                  ) : (
                    filteredVisitors.map((vis) => (
                      <tr key={vis.id} className="hover:bg-cobalt/5 transition-colors">
                        <td className="p-3.5 whitespace-nowrap text-ink-muted">
                          {new Date(vis.timestamp).toLocaleString()}
                        </td>
                        <td className="p-3.5 font-bold font-mono text-cobalt">{vis.ip}</td>
                        <td className="p-3.5 font-semibold text-ink">{vis.path}</td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-line bg-canvas text-ink-muted">
                            {vis.device === "Mobile" ? <Smartphone size={12} /> : <Monitor size={12} />}
                            {vis.device}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-ink-muted" title={vis.userAgent}>
                          {vis.userAgent}
                        </td>
                        <td className="p-3.5 text-ink-muted truncate max-w-[150px]" title={vis.referrer}>
                          {vis.referrer}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
