'use client';

import React, { useState, useEffect } from 'react';
import { 
  Inbox, 
  Lock, 
  Trash2, 
  LogOut, 
  Mail, 
  X,
  Sparkles,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';
import TiltCard from '@/components/TiltCard';

export default function CrmPage() {
  const [crmPassword, setCrmPassword] = useState('');
  const [crmAuthenticated, setCrmAuthenticated] = useState(false);
  const [crmMessages, setCrmMessages] = useState<any[]>([]);
  const [crmError, setCrmError] = useState('');

  // Load CRM messages from localStorage
  const loadCrmMessages = () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('crm_messages');
      if (data) {
        setCrmMessages(JSON.parse(data));
      } else {
        setCrmMessages([]);
      }
    }
  };

  useEffect(() => {
    loadCrmMessages();
  }, []);

  const handleCrmLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (crmPassword === 'ayush123') {
      setCrmAuthenticated(true);
      setCrmError('');
      loadCrmMessages();
    } else {
      setCrmError('Invalid passcode. (Hint: your first name + 123)');
    }
  };

  const handleCrmLogout = () => {
    setCrmAuthenticated(false);
    setCrmPassword('');
  };

  const handleDeleteMessage = (id: string) => {
    const existing = localStorage.getItem('crm_messages');
    if (existing) {
      const messages = JSON.parse(existing);
      const filtered = messages.filter((m: any) => m.id !== id);
      localStorage.setItem('crm_messages', JSON.stringify(filtered));
      setCrmMessages(filtered);
    }
  };

  const handleClearAllMessages = () => {
    if (window.confirm('Are you sure you want to clear all messages permanently?')) {
      localStorage.setItem('crm_messages', JSON.stringify([]));
      setCrmMessages([]);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* 3D Particle Canvas Background */}
      <ParticleCanvas />

      {/* Decorative Blur Spheres */}
      <div className="absolute top-[20%] left-[10%] w-80 h-80 rounded-full bg-accent/5 filter blur-[90px] pointer-events-none -z-20 animate-pulse-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-accent-secondary/5 filter blur-[90px] pointer-events-none -z-20 animate-pulse-slow" />

      {/* Main CRM Wrapper with Claymorphism */}
      <div className="w-full max-w-4xl clay-card rounded-[2rem] overflow-hidden flex flex-col bg-card-bg/85 min-h-[500px] animate-float z-10">
        
        {/* CRM Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-accent/5 to-accent-secondary/5 border-b border-card-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9.5 h-9.5 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold font-mono border border-white/20">
              AK
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-foreground">CRM Portal Dashboard</h1>
              <p className="text-[10px] font-mono text-text-muted">Inbound Message Center</p>
            </div>
          </div>
          
          <a
            href="/"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold clay-badge hover:bg-foreground/[0.01] transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Main Portfolio
          </a>
        </div>

        {/* CRM Body */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
          {!crmAuthenticated ? (
            /* Passcode Unlock Screen with clay components */
            <div className="max-w-sm mx-auto w-full py-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl clay-badge clay-badge-active text-accent flex items-center justify-center mx-auto animate-float">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold tracking-tight text-foreground">Secure Access Gateway</h2>
                <p className="text-xs text-text-muted">Enter passcode to authenticate and retrieve server messages.</p>
              </div>

              <form onSubmit={handleCrmLogin} className="space-y-4">
                <div className="space-y-1">
                  <input
                    type="password"
                    placeholder="Passcode"
                    value={crmPassword}
                    onChange={(e) => setCrmPassword(e.target.value)}
                    className="w-full px-4 py-3 text-center rounded-xl clay-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 text-sm font-semibold tracking-wider"
                    required
                    autoFocus
                  />
                  {crmError && (
                    <p className="text-xs text-red-500 font-bold mt-1.5 flex items-center justify-center gap-1">
                      {crmError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 font-bold rounded-xl clay-btn cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Authenticate
                </button>
              </form>
            </div>
          ) : (
            /* CRM Inbox Interface */
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              {/* Toolbar */}
              <div className="flex items-center justify-between border-b border-card-border/50 pb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="w-4.5 h-4.5 text-accent" />
                  <span className="text-xs font-bold text-foreground font-mono">
                    Inbox logs • {crmMessages.length} inquiries received
                  </span>
                </div>
                
                <button
                  onClick={handleCrmLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold clay-badge hover:text-red-500 transition-all duration-300 cursor-pointer bg-white"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Lock Portal
                </button>
              </div>

              {/* Message List */}
              <div className="flex-1 min-h-[300px]">
                {crmMessages.length === 0 ? (
                  <div className="py-24 text-center space-y-3 text-text-muted flex flex-col justify-center items-center">
                    <div className="w-12 h-12 rounded-full clay-badge flex items-center justify-center">
                      <Inbox className="w-5 h-5 opacity-55" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-foreground/80">Inbox is empty</p>
                      <p className="text-xs max-w-[240px] leading-relaxed">
                        Submissions from the main website contact form will appear here dynamically.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {crmMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-2xl clay-card bg-white hover:border-accent/30 transition-all duration-300 relative group shadow-sm hover:shadow-md"
                      >
                        {/* Action Delete */}
                        <button
                          onClick={() => handleDeleteMessage(msg.id)}
                          className="absolute top-4 right-4 p-1.5 rounded-lg text-text-muted hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all opacity-0 group-hover:opacity-100 cursor-pointer bg-white"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="space-y-2 pr-6">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-bold text-foreground text-sm">{msg.name}</span>
                            <a
                              href={`mailto:${msg.email}`}
                              className="text-xs text-accent hover:underline font-mono font-medium"
                            >
                              {msg.email}
                            </a>
                          </div>
                          
                          <p className="text-xs text-foreground/80 leading-relaxed font-sans whitespace-pre-wrap">
                            {msg.message}
                          </p>

                          <div className="text-[10px] font-mono text-text-muted pt-1">
                            Received: {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Danger Action Footer */}
              {crmMessages.length > 0 && (
                <div className="pt-4 border-t border-card-border/50 flex justify-end">
                  <button
                    onClick={handleClearAllMessages}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold clay-badge hover:text-red-500 transition-all cursor-pointer shadow-sm active:scale-95"
                  >
                    Clear All Inbox Logs
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
