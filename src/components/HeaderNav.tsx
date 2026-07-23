"use client";

import React, { useState } from "react";
import { Download, Menu, X, Terminal, Briefcase } from "lucide-react";
import { audioEngine } from "@/lib/audioEngine";

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCommandPalette: () => void;
  onOpenHireModal: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
  onOpenCommandPalette,
  onOpenHireModal,
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

  const handleNavClick = (id: string) => {
    audioEngine.playNav();
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-oled-bg/90 backdrop-blur-md border-b border-oled-border text-xs font-mono select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Active Theory Cyber Brand Logo */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => handleNavClick("hero")}
            onMouseEnter={() => audioEngine.playHover()}
            className="flex items-center space-x-2 text-oled-text hover:text-signal-cyan transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-none bg-signal-cyan animate-pulse shadow-glow-cyan" />
            <span className="font-bold tracking-wider text-xs sm:text-sm font-sans">AYUSH_KUMAR</span>
            <span className="hidden sm:inline text-oled-muted text-[10px] bg-oled-surface border border-oled-border px-1.5 py-0.5 rounded-none font-mono">
              SYS_v2.5
            </span>
          </button>
        </div>

        {/* Center: Active Theory Kinetic Nav Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                onMouseEnter={() => audioEngine.playHover()}
                className={`transition-all py-2 relative text-[11px] lg:text-xs font-mono tracking-wider ${
                  isActive
                    ? "text-signal-cyan font-bold text-shadow-cyan"
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

        {/* Right Actions Cluster */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {/* Hire Me / Direct Message Button */}
          <button
            onClick={() => {
              audioEngine.playClick();
              onOpenHireModal();
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-none border border-signal-cyan/40 bg-signal-cyan/10 text-signal-cyan hover:bg-signal-cyan hover:text-oled-bg font-bold transition-all text-xs shadow-glow-cyan"
            title="Open Direct Message & CRM Portal"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>HIRE ME</span>
          </button>

          {/* Download Resume Button */}
          <a
            href="/Ayush_Full_Stack_Developer_Resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-none border border-signal-green/40 bg-signal-green/10 text-signal-green hover:bg-signal-green hover:text-oled-bg font-bold transition-all text-xs shadow-glow-green"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              audioEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="md:hidden p-1.5 border border-oled-border bg-oled-card text-oled-muted hover:text-oled-text"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-signal-cyan" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-oled-border bg-oled-card px-4 py-3 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    handleNavClick(link.id);
                    setMobileMenuOpen(false);
                  }}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`flex items-center space-x-2 px-3 py-2 text-left text-xs transition-colors font-mono ${
                    isActive
                      ? "bg-oled-surface text-signal-cyan font-bold border-l-2 border-signal-cyan"
                      : "text-oled-muted hover:text-oled-text hover:bg-oled-surface/50"
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-signal-cyan" />
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
