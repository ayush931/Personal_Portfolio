"use client";

import React, { useState } from "react";
import { Download, Menu, X, Terminal, Code2 } from "lucide-react";

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { id: "hero", label: "SYSTEM" },
    { id: "experience", label: "METRICS" },
    { id: "projects", label: "ARCHITECTURES" },
    { id: "infrastructure", label: "STACK" },
    { id: "education", label: "CREDENTIALS" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-oled-bg/95 backdrop-blur-md border-b border-oled-border/80 text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-2">
        
        {/* Left: Premium Brand Logo for Ayush Kumar */}
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center space-x-2.5 text-oled-text hover:text-signal-cyan transition-colors py-0.5 group shrink-0"
        >
          <div className="flex items-center justify-center w-6 h-6 rounded bg-oled-surface border border-signal-cyan/50 text-signal-cyan shadow-glow-cyan group-hover:scale-110 transition-transform">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center space-x-1 font-mono tracking-tight text-xs sm:text-sm">
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-signal-green to-oled-text">
              AYUSH
            </span>
            <span className="text-oled-text font-bold">KUMAR</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse hidden sm:inline-block" />
        </button>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-2.5 py-1 rounded transition-all text-[11px] font-mono ${
                  isActive
                    ? "bg-oled-surface text-signal-cyan font-bold border border-signal-cyan/40"
                    : "text-oled-muted hover:text-oled-text hover:bg-oled-surface/40"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Compact Action Button */}
        <div className="flex items-center space-x-2 shrink-0">
          <a
            href="/Ayush_Full_Stack_Developer_Resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-2.5 py-1 rounded border border-signal-green/40 bg-signal-green/10 text-signal-green hover:bg-signal-green hover:text-oled-bg font-bold transition-all text-[11px] shadow-glow-green"
            title="Download PDF Resume"
          >
            <Download className="w-3 h-3" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 rounded border border-oled-border bg-oled-card text-oled-muted hover:text-oled-text hover:border-signal-cyan"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-signal-cyan" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-oled-border bg-oled-card px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2">
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
