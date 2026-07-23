"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, Lock, Copy, Check, Terminal, ArrowUp, Send, User, MessageSquare, Briefcase, CheckCircle2, ShieldCheck } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { saveCrmLead } from "@/lib/crmStorage";

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenHireModal?: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate, onOpenHireModal }) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(1489200);

  // Contact Us Message Box Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Full-Stack Architecture");
  const [budget, setBudget] = useState("$2,000 - $5,000");
  const [message, setMessage] = useState("");
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUptime = (totalSec: number) => {
    const days = Math.floor(totalSec / (3600 * 24));
    const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${days}d ${hours}h ${mins}m ${secs}s`;
  };

  const handleCopyEmail = () => {
    audioEngine.playSuccess();
    navigator.clipboard.writeText("ayushkumar93183@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleDecryptEmail = () => {
    audioEngine.playClick();
    setEmailRevealed(true);
  };

  const handleDecryptPhone = () => {
    audioEngine.playClick();
    setPhoneRevealed(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    audioEngine.playClick();
    setIsTransmitting(true);

    setTimeout(() => {
      // Save directly to CRM Storage
      saveCrmLead({
        name,
        email,
        category,
        budget,
        message,
      });

      setIsTransmitting(false);
      setMessageSent(true);
      audioEngine.playSuccess();
    }, 600);
  };

  return (
    <footer id="contact" className="relative z-10 w-full pt-16 pb-24 bg-oled-bg border-t border-oled-border font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Contact Stream & Message Box Container */}
        <div className="p-8 bg-oled-card border border-oled-border rounded-xl space-y-8 shadow-2xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-oled-border pb-6">
            <div>
              <div className="text-signal-green text-xs flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>05 // INIT CONTACT & DIRECT CRM STREAM</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold font-sans text-oled-text mt-2">
                Send Message Directly To My CRM
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenHireModal?.();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="px-4 py-2 bg-signal-green text-oled-bg font-bold rounded-lg hover:bg-signal-green/90 transition-all flex items-center space-x-2 shadow-glow-green text-xs"
              >
                <Briefcase className="w-4 h-4" />
                <span>&gt; OPEN_CRM_MODAL()</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playNav();
                  onNavigate("hero");
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="px-4 py-2 bg-oled-surface border border-oled-border hover:border-signal-cyan rounded-lg text-oled-muted hover:text-signal-cyan transition-colors flex items-center space-x-2"
              >
                <ArrowUp className="w-4 h-4" />
                <span>TOP</span>
              </button>
            </div>
          </div>

          {/* Grid: Left - Direct Message Box to CRM, Right - Decrypt Contacts & Socials */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Direct Message Box */}
            <div className="lg:col-span-7 p-6 bg-oled-surface rounded-xl border border-oled-border space-y-4">
              <div className="flex items-center justify-between border-b border-oled-border pb-3">
                <div className="flex items-center space-x-2 text-signal-cyan font-bold">
                  <MessageSquare className="w-4 h-4 text-signal-green" />
                  <span>DIRECT CRM MESSAGE BOX</span>
                </div>
                <span className="text-[10px] text-signal-green flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-ping" />
                  <span>CRM ROUTE READY</span>
                </span>
              </div>

              {messageSent ? (
                <div className="p-6 text-center space-y-3 bg-oled-bg rounded-lg border border-signal-green/40 font-sans">
                  <CheckCircle2 className="w-8 h-8 text-signal-green mx-auto" />
                  <h4 className="text-lg font-bold text-oled-text">MESSAGE DISPATCHED TO CRM</h4>
                  <p className="text-xs text-oled-muted font-mono leading-relaxed max-w-sm mx-auto">
                    Your inquiry from <strong className="text-signal-cyan">{name}</strong> was saved to the CRM pipeline. View it live at <code className="text-signal-green">/crm-dashboard</code>.
                  </p>
                  <button
                    onClick={() => {
                      setMessageSent(false);
                      setName("");
                      setEmail("");
                      setMessage("");
                    }}
                    className="px-4 py-2 rounded bg-signal-green text-oled-bg font-bold font-mono text-xs hover:bg-signal-green/90 transition-colors shadow-glow-green"
                  >
                    &gt; SEND_ANOTHER_MESSAGE()
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-oled-muted flex items-center space-x-1">
                        <User className="w-3 h-3 text-signal-green" />
                        <span>YOUR NAME / ENTITY</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Mercer"
                        className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-green text-oled-text outline-none text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-oled-muted flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-signal-cyan" />
                        <span>EMAIL ADDRESS</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] text-oled-muted">PROJECT CATEGORY</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-amber text-oled-text outline-none text-xs"
                      >
                        <option value="Full-Stack Architecture">Full-Stack Application</option>
                        <option value="Real-Time Sync Engine">Real-Time Sync / WebSockets</option>
                        <option value="Monorepo Architecture">Monorepo / Microservices</option>
                        <option value="FastAPI / AI Pipeline">FastAPI / AI Backend</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-oled-muted">BUDGET RANGE</label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs"
                      >
                        <option value="< $2,000">&lt; $2,000</option>
                        <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="> $10,000">&gt; $10,000</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-oled-muted">MESSAGE</label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message here... It will go directly to Ayush's CRM pipeline."
                      className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-green text-oled-text outline-none text-xs leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    onMouseEnter={() => audioEngine.playHover()}
                    className="w-full py-2.5 bg-signal-cyan text-oled-bg font-bold rounded hover:bg-signal-cyan/90 transition-all flex items-center justify-center space-x-2 text-xs shadow-glow-cyan"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isTransmitting ? "SENDING TO CRM..." : "SEND_MESSAGE_TO_CRM()"}</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Decryptable Direct Contacts */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Decrypt Email Box */}
              <div className="p-5 bg-oled-surface rounded-xl border border-oled-border space-y-3">
                <div className="flex items-center justify-between text-oled-muted text-[11px]">
                  <span className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-signal-cyan" />
                    <span>PRIMARY_EMAIL</span>
                  </span>
                  <span className="text-signal-amber font-semibold">
                    {emailRevealed ? "DECRYPTED" : "ENCRYPTED_BOT_SAFE"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {emailRevealed ? (
                    <span className="text-xs font-bold text-signal-cyan select-all">
                      ayushkumar93183@gmail.com
                    </span>
                  ) : (
                    <span className="text-xs text-oled-muted font-mono tracking-widest">
                      a••••••••••••83@gmail.com
                    </span>
                  )}

                  {!emailRevealed ? (
                    <button
                      onClick={handleDecryptEmail}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="px-3 py-1 bg-signal-cyan text-oled-bg font-bold rounded flex items-center space-x-1 hover:bg-signal-cyan/90 transition-colors text-[10px] shadow-glow-cyan"
                    >
                      <Lock className="w-3 h-3" />
                      <span>&gt; decrypt()</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCopyEmail}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="px-3 py-1 bg-oled-card border border-oled-border hover:border-signal-green text-oled-text rounded flex items-center space-x-1 text-[10px]"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-signal-green" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Decrypt Phone Box */}
              <div className="p-5 bg-oled-surface rounded-xl border border-oled-border space-y-3">
                <div className="flex items-center justify-between text-oled-muted text-[11px]">
                  <span className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-signal-green" />
                    <span>VOICE / DIRECT_LINE</span>
                  </span>
                  <span className="text-signal-green font-semibold">
                    {phoneRevealed ? "DECRYPTED" : "ENCRYPTED_BOT_SAFE"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  {phoneRevealed ? (
                    <a
                      href="tel:+917070472634"
                      onClick={() => audioEngine.playClick()}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="text-xs font-bold text-signal-green select-all hover:underline"
                    >
                      +91 7070472634
                    </a>
                  ) : (
                    <span className="text-xs text-oled-muted font-mono tracking-widest">
                      +91 70704 ••••••
                    </span>
                  )}

                  {!phoneRevealed && (
                    <button
                      onClick={handleDecryptPhone}
                      onMouseEnter={() => audioEngine.playHover()}
                      className="px-3 py-1 bg-signal-green text-oled-bg font-bold rounded flex items-center space-x-1 hover:bg-signal-green/90 transition-colors text-[10px] shadow-glow-green"
                    >
                      <Lock className="w-3 h-3" />
                      <span>&gt; decrypt()</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Social Links Row */}
              <div className="p-4 bg-oled-surface rounded-xl border border-oled-border flex items-center justify-between gap-2 text-xs">
                <a
                  href="https://github.com/ayush931"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="flex items-center space-x-1.5 text-oled-muted hover:text-signal-cyan transition-colors text-[11px]"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>github.com/ayush931</span>
                </a>
                <span className="text-oled-border">|</span>
                <a
                  href="https://www.linkedin.com/in/ayush-kumar-94310522a"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => audioEngine.playClick()}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="flex items-center space-x-1.5 text-oled-muted hover:text-signal-cyan transition-colors text-[11px]"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>

            </div>

          </div>

        </div>

        {/* Closing Telemetry & Exit Code 0 */}
        <div className="pt-6 border-t border-oled-border flex flex-col sm:flex-row items-center justify-between gap-4 text-oled-muted text-[11px]">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
            <span className="text-signal-green font-bold">&gt; Process exited with code 0.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>UPTIME: <strong className="text-oled-text">{formatUptime(uptimeSeconds)}</strong></span>
            <span className="text-oled-border">|</span>
            <span>BUILT WITH NEXT.JS 15, THREE.JS & TAILWIND</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
