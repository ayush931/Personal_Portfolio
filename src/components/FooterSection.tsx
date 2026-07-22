"use client";

import React, { useState, useEffect } from "react";
import { Github, Linkedin, Mail, Phone, Lock, Unlock, Copy, Check, Terminal, ArrowUp } from "lucide-react";

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(1489200);

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
    navigator.clipboard.writeText("ayushkumar9315983@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <footer id="contact" className="w-full pt-16 pb-12 bg-oled-bg border-t border-oled-border font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Contact Stream Box */}
        <div className="p-8 bg-oled-card border border-oled-border rounded-lg space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-oled-border pb-6">
            <div>
              <div className="text-signal-green text-xs flex items-center space-x-2">
                <Terminal className="w-4 h-4" />
                <span>05 // INIT CONTACT STREAM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-sans text-oled-text mt-2">
                Let&apos;s Architect Real-Time Infrastructure Together.
              </h2>
            </div>
            
            <button
              onClick={() => onNavigate("hero")}
              className="px-4 py-2 bg-oled-surface border border-oled-border hover:border-signal-cyan rounded text-oled-muted hover:text-signal-cyan transition-colors flex items-center space-x-2 self-start md:self-auto"
            >
              <ArrowUp className="w-4 h-4" />
              <span>RETURN_TO_TOP</span>
            </button>
          </div>

          {/* Interactive Decryptable Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Decrypt Email Box */}
            <div className="p-5 bg-oled-surface rounded border border-oled-border space-y-3">
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
                  <span className="text-sm font-bold text-signal-cyan select-all">
                    ayushkumar9315983@gmail.com
                  </span>
                ) : (
                  <span className="text-sm text-oled-muted font-mono tracking-widest">
                    a••••••••••••83@gmail.com
                  </span>
                )}

                <div className="flex items-center space-x-2">
                  {!emailRevealed ? (
                    <button
                      onClick={() => setEmailRevealed(true)}
                      className="px-3 py-1 bg-signal-cyan text-oled-bg font-bold rounded flex items-center space-x-1.5 hover:bg-signal-cyan/90 transition-colors text-[11px]"
                    >
                      <Lock className="w-3 h-3" />
                      <span>&gt; decrypt()</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1 bg-oled-card border border-oled-border hover:border-signal-green text-oled-text rounded flex items-center space-x-1.5 text-[11px]"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-signal-green" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedEmail ? "COPIED" : "COPY"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Decrypt Phone / Location Box */}
            <div className="p-5 bg-oled-surface rounded border border-oled-border space-y-3">
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
                    className="text-sm font-bold text-signal-green select-all hover:underline"
                  >
                    +91 7070472634
                  </a>
                ) : (
                  <span className="text-sm text-oled-muted font-mono tracking-widest">
                    +91 70704 ••••••
                  </span>
                )}

                {!phoneRevealed && (
                  <button
                    onClick={() => setPhoneRevealed(true)}
                    className="px-3 py-1 bg-signal-green text-oled-bg font-bold rounded flex items-center space-x-1.5 hover:bg-signal-green/90 transition-colors text-[11px]"
                  >
                    <Lock className="w-3 h-3" />
                    <span>&gt; decrypt()</span>
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* Social Links Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-oled-border text-xs">
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/ayush931"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-oled-muted hover:text-signal-cyan transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>github.com/ayush931</span>
              </a>
              <span className="text-oled-border">|</span>
              <a
                href="https://www.linkedin.com/in/ayush-kumar-94310522a"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-oled-muted hover:text-signal-cyan transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>linkedin.com/in/ayush-kumar-94310522a</span>
              </a>
            </div>

            <div className="text-oled-muted text-[11px]">
              LOCATION: Patna, Bihar, India (UTC +5:30)
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
            <span>BUILT WITH NEXT.JS 15 & TAILWIND</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
