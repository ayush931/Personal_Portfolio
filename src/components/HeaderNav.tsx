"use client";

import React, { useState } from "react";
import { Download, Menu, X, Terminal } from "lucide-react";

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
    { id: "hero", label: "00.SYSTEM" },
    { id: "experience", label: "01.METRICS" },
    { id: "projects", label: "02.ARCHITECTURES" },
    { id: "infrastructure", label: "03.STACK" },
    { id: "education", label: "04.CREDENTIALS" },
    { id: "contact", label: "05.INIT" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-oled-bg/95 backdrop-blur-md border-b border-oled-border text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Square Terminal Brand Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center space-x-2 text-oled-text hover:text-signal-cyan transition-colors"
          >
            <div className="w-2 h-2 rounded-none bg-signal-cyan animate-pulse" />
            <span className="font-bold tracking-wider text-xs sm:text-sm">AYUSH_KUMAR</span>
            <span className="hidden sm:inline text-oled-muted text-[10px] bg-oled-surface border border-oled-border px-1.5 py-0.5 rounded-none font-mono">
              v2.5.0
            </span>
          </button>
        </div>

        {/* Center: Desktop Nav Links with Square Bottom Line */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors py-2 relative text-[11px] lg:text-xs font-mono ${
                  isActive
                    ? "text-signal-cyan font-bold"
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

        {/* Right: Actions (Square Download Resume & Mobile Menu Toggle) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <a
            href="/Ayush_Full_Stack_Developer_Resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-none border border-signal-green/40 bg-signal-green/10 text-signal-green hover:bg-signal-green hover:text-oled-bg font-bold transition-all text-xs shadow-glow-green"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-none border border-oled-border bg-oled-card text-oled-muted hover:text-oled-text hover:border-signal-cyan"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-signal-cyan" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-oled-border bg-oled-card px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
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
                  className={`flex items-center space-x-2 px-3 py-2 rounded-none text-left text-xs transition-colors font-mono ${
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
