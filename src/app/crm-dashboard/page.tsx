"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, ShieldCheck, Mail, ArrowLeft, LogOut, Trash2, Search, RefreshCw, MessageSquare } from "lucide-react";
import Link from "next/link";
import { audioEngine } from "@/lib/audioEngine";
import { getCrmLeads, updateCrmLeadStatus, deleteCrmLead, CrmLead } from "@/lib/crmStorage";
import { ActiveCursor } from "@/components/ActiveCursor";

export default function CrmDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<CrmLead[]>([]);

  // Read CRM_PASSWORD from .env file
  const expectedPassword =
    process.env.CRM_PASSWORD || process.env.NEXT_PUBLIC_CRM_PASSWORD || "admin123";

  useEffect(() => {
    const storedAuth = sessionStorage.getItem("crm_authenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
    setLeads(getCrmLeads());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playClick();

    if (passwordInput === expectedPassword) {
      setIsAuthenticated(true);
      setAuthError("");
      sessionStorage.setItem("crm_authenticated", "true");
      setLeads(getCrmLeads());
      audioEngine.playSuccess();
    } else {
      setAuthError("INVALID PASSWORD // CHECK .env FILE");
      audioEngine.playHover();
    }
  };

  const handleLogout = () => {
    audioEngine.playClick();
    setIsAuthenticated(false);
    sessionStorage.removeItem("crm_authenticated");
  };

  const handleStatusChange = (id: string, newStatus: CrmLead["status"]) => {
    audioEngine.playClick();
    const updated = updateCrmLeadStatus(id, newStatus);
    setLeads(updated);
  };

  const handleDelete = (id: string) => {
    audioEngine.playClick();
    const updated = deleteCrmLead(id);
    setLeads(updated);
  };

  const handleRefresh = () => {
    audioEngine.playClick();
    setLeads(getCrmLeads());
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newCount = leads.filter((l) => l.status === "NEW").length;
  const readCount = leads.filter((l) => l.status === "READ").length;

  return (
    <main className="min-h-screen bg-[#050508] text-oled-text font-mono select-none p-4 sm:p-8 relative">
      {/* Dynamic Cursor Pointer */}
      <ActiveCursor />

      <div className="max-w-5xl mx-auto space-y-6 relative z-10">
        
        {/* Simplified Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-oled-border pb-4">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              onClick={() => audioEngine.playNav()}
              className="px-3 py-1.5 bg-oled-surface border border-oled-border hover:border-signal-cyan rounded text-oled-muted hover:text-signal-cyan transition-colors flex items-center space-x-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>PORTFOLIO</span>
            </Link>

            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-signal-cyan animate-pulse rounded-full" />
              <h1 className="text-lg font-bold font-sans text-oled-text">INBOUND MESSAGES CRM</h1>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center space-x-3 text-xs">
              <button
                onClick={handleRefresh}
                className="px-3 py-1.5 rounded bg-oled-surface border border-oled-border hover:border-signal-cyan text-signal-cyan transition-colors flex items-center space-x-1.5 text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>REFRESH</span>
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded bg-oled-surface border border-oled-border hover:border-red-500 text-oled-muted hover:text-red-400 transition-colors flex items-center space-x-1.5 text-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            </div>
          )}
        </div>

        {/* NOT AUTHENTICATED: Clean Password Prompt */}
        {!isAuthenticated ? (
          <div className="py-20 flex items-center justify-center">
            <form
              onSubmit={handleLogin}
              className="w-full max-w-sm p-8 bg-oled-card border border-signal-cyan/40 rounded-xl space-y-5 text-center shadow-2xl"
            >
              <div className="w-14 h-14 rounded-full bg-signal-cyan/10 border border-signal-cyan text-signal-cyan flex items-center justify-center mx-auto shadow-glow-cyan">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h2 className="text-lg font-bold font-sans text-oled-text">CRM LOGIN</h2>
                <p className="text-xs text-oled-muted">
                  Enter password from your <code className="text-signal-cyan">.env</code> file (<code className="text-signal-green">CRM_PASSWORD</code>).
                </p>
              </div>

              {authError && (
                <div className="p-2.5 bg-red-500/10 border border-red-500/40 rounded text-red-400 text-xs">
                  {authError}
                </div>
              )}

              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-2.5 bg-oled-bg border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs text-center tracking-widest font-mono"
              />

              <button
                type="submit"
                onMouseEnter={() => audioEngine.playHover()}
                className="w-full py-2.5 bg-signal-cyan text-oled-bg font-bold rounded hover:bg-signal-cyan/90 transition-all flex items-center justify-center space-x-2 text-xs shadow-glow-cyan"
              >
                <Unlock className="w-4 h-4" />
                <span>UNLOCK DASHBOARD</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED: Simplified Clean Message Feed */
          <div className="space-y-6">
            
            {/* Clean Metrics Summary */}
            <div className="grid grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 bg-oled-card border border-oled-border rounded-lg text-center space-y-1">
                <div className="text-oled-muted text-[10px]">TOTAL MESSAGES</div>
                <div className="text-2xl font-bold text-signal-cyan">{leads.length}</div>
              </div>

              <div className="p-4 bg-oled-card border border-oled-border rounded-lg text-center space-y-1">
                <div className="text-oled-muted text-[10px]">NEW UNREAD</div>
                <div className="text-2xl font-bold text-signal-green">{newCount}</div>
              </div>

              <div className="p-4 bg-oled-card border border-oled-border rounded-lg text-center space-y-1">
                <div className="text-oled-muted text-[10px]">REVIEWED</div>
                <div className="text-2xl font-bold text-oled-text">{readCount}</div>
              </div>
            </div>

            {/* Search Input Bar */}
            {leads.length > 0 && (
              <div className="relative">
                <Search className="w-4 h-4 text-oled-muted absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter messages by name, email, or content..."
                  className="w-full pl-9 pr-3 py-2 bg-oled-card border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs"
                />
              </div>
            )}

            {/* Messages List / Clean Empty State */}
            <div className="space-y-4">
              {filteredLeads.length === 0 ? (
                <div className="p-12 text-center bg-oled-card border border-oled-border rounded-xl space-y-3">
                  <MessageSquare className="w-8 h-8 text-oled-muted mx-auto opacity-50" />
                  <h3 className="text-base font-bold font-sans text-oled-text">NO INBOUND MESSAGES YET</h3>
                  <p className="text-xs text-oled-muted font-sans max-w-md mx-auto leading-relaxed">
                    Real messages sent through the Contact Us message box or Hire Me modal on your portfolio will show up here directly.
                  </p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-5 bg-oled-card border border-oled-border hover:border-signal-cyan rounded-xl space-y-3 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-oled-border pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-signal-cyan font-bold text-xs">{lead.id}</span>
                        <h3 className="text-base font-bold font-sans text-oled-text">{lead.name}</h3>
                        <span className="text-oled-muted text-xs">&lt;{lead.email}&gt;</span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-oled-muted">{lead.timestamp}</span>

                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as CrmLead["status"])}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold border outline-none cursor-pointer ${
                            lead.status === "NEW"
                              ? "bg-signal-green/10 border-signal-green text-signal-green"
                              : lead.status === "READ"
                              ? "bg-signal-cyan/10 border-signal-cyan text-signal-cyan"
                              : "bg-oled-surface border-oled-border text-oled-muted"
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="READ">READ</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>

                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-1 rounded text-oled-muted hover:text-red-400 hover:bg-oled-surface transition-colors"
                          title="Delete Message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center space-x-4 text-xs">
                      <span className="px-2 py-0.5 rounded bg-oled-surface border border-oled-border text-signal-cyan text-[10px]">
                        {lead.category}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-oled-surface border border-oled-border text-signal-green text-[10px]">
                        Budget: {lead.budget}
                      </span>
                    </div>

                    <p className="text-xs text-oled-text font-sans leading-relaxed pt-1 whitespace-pre-wrap">
                      {lead.message}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-oled-border/60">
                      <a
                        href={`mailto:${lead.email}?subject=RE: ${lead.category} Inquiry`}
                        onClick={() => audioEngine.playClick()}
                        className="px-3 py-1.5 bg-signal-cyan text-oled-bg font-bold rounded flex items-center space-x-1.5 hover:bg-signal-cyan/90 transition-colors shadow-glow-cyan text-[11px]"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>REPLY VIA EMAIL</span>
                      </a>

                      <span className="text-[10px] text-oled-muted">ID: {lead.id}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
