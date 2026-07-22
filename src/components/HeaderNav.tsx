"use client";

import React, { useState, useEffect } from "react";
import { Wifi, Download, Menu, X, Terminal } from "lucide-react";

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [latency, setLatency] = useState<number>(14);
  const [time, setTime] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    // Update latency simulation
    const interval = setInterval(() => {
      setLatency(Math.floor(12 + Math.random() * 6));
    }, 3000);

    // Update clock
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Asia/Kolkata",
        }) + " IST"
      );
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  const navLinks = [
    { id: "hero", label: "00.SYSTEM" },
    { id: "experience", label: "01.METRICS" },
    { id: "projects", label: "02.ARCHITECTURES" },
    { id: "infrastructure", label: "03.STACK" },
    { id: "education", label: "04.CREDENTIALS" },
    { id: "contact", label: "05.INIT" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-oled-bg/95 backdrop-blur-md border-b border-oled-border text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        
        {/* Left: Identity & Live Telemetry Badge */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center space-x-2 text-oled-text hover:text-signal-cyan transition-colors"
          >
            <div className="w-2 h-2 rounded-full bg-signal-cyan animate-pulse" />
            <span className="font-bold tracking-wider text-xs sm:text-sm">AYUSH_KUMAR</span>
            <span className="hidden sm:inline text-oled-muted text-[10px] bg-oled-surface border border-oled-border px-1.5 py-0.5 rounded">
              v2.5.0
            </span>
          </button>

          <div className="hidden lg:flex items-center space-x-3 text-[11px] text-oled-muted pl-3 border-l border-oled-border">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
              <span className="text-oled-text">STATUS: ONLINE</span>
            </span>
            <span className="text-oled-border">|</span>
            <span className="flex items-center space-x-1 text-oled-muted">
              <Wifi className="w-3 h-3 text-signal-cyan" />
              <span>{latency}ms EDGE</span>
            </span>
            <span className="text-oled-border">|</span>
            <span className="text-oled-muted">{time || "12:00:00 IST"}</span>
          </div>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-1 relative text-[11px] lg:text-xs ${
                  isActive
                    ? "text-signal-cyan font-semibold"
                    : "text-oled-muted hover:text-oled-text"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-signal-cyan shadow-glow-cyan" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Download Resume & Mobile Menu Toggle) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a
            href="/Ayush_Full_Stack_Developer_Resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded border border-signal-green/40 bg-signal-green/10 text-signal-green hover:bg-signal-green hover:text-oled-bg font-bold transition-all text-xs shadow-glow-green"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded border border-oled-border bg-oled-card text-oled-muted hover:text-oled-text hover:border-signal-cyan"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-signal-cyan" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-oled-border bg-oled-card px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] text-oled-muted flex items-center justify-between pb-2 border-b border-oled-border">
            <span className="flex items-center space-x-1 text-signal-green">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              <span>STATUS: ONLINE // PATNA, IN</span>
            </span>
            <span>{time}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 px-3 py-2 rounded text-left text-xs transition-colors font-mono ${
                    isActive
                      ? "bg-oled-surface text-signal-cyan font-bold border-l-2 border-signal-cyan"
                      : "text-oled-muted hover:text-oled-text hover:bg-oled-surface/50"
                  }`}
                >
                  <Terminal className="w-3 h-3 text-signal-cyan" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
