"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Menu, X, ChevronRight } from "lucide-react";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeSection, onNavigate, onOpenContact }) => {
  const { isMuted, toggleMute, playHoverSound, playClickSound } = useAudioFeedback();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "hero", label: "Index" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Work" },
    { id: "infrastructure", label: "Stack" },
    { id: "education", label: "Education" },
  ];

  const handleNavClick = (id: string) => {
    playClickSound();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4">
      <div className="absolute inset-x-4 sm:inset-x-8 top-3 h-[52px] rounded-2xl border border-cyber-border/45 bg-cyber-bg/65 backdrop-blur-2xl shadow-luxury" />
      <div className="max-w-6xl mx-auto flex items-center justify-between font-sans text-xs">
        
        <button
          onClick={() => handleNavClick("hero")}
          onMouseEnter={playHoverSound}
          className="flex items-center space-x-2.5 text-left group focus:outline-none"
        >
          <div className="relative w-8 h-8 rounded-xl border border-cyber-accent/25 bg-cyber-surface text-cyber-accent-light font-mono text-xs font-bold flex items-center justify-center">
            ak
          </div>
          <span className="text-sm font-bold text-cyber-text tracking-tight group-hover:text-cyber-accent-light transition-colors">
            ayush<span className="text-cyber-accent-light"> kumar</span>
          </span>
        </button>

        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={playHoverSound}
                className={`transition-all py-1 relative ${
                  isActive
                    ? "text-cyber-accent-light font-bold"
                    : "text-cyber-muted hover:text-cyber-text"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-cyber-accent-light rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center space-x-2.5 text-xs">
          <button onClick={() => { toggleMute(); playClickSound(); }} onMouseEnter={playHoverSound} title={isMuted ? "Unmute Audio" : "Mute Audio"} className="p-2 rounded-xl border border-cyber-border/45 bg-cyber-surface/70 text-cyber-muted hover:text-cyber-text transition-all">
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 text-cyber-accent-light" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => { playClickSound(); onOpenContact(); }}
            onMouseEnter={playHoverSound}
            className="hidden sm:inline-flex items-center text-cyber-text font-semibold hover:text-cyber-accent-light transition-colors px-4 py-2 rounded-xl border border-cyber-border/45 bg-cyber-surface/70 text-xs"
          >
            Contact
          </button>

          <a
            href="/Ayush_Full_Stack_Developer_Resume.pdf"
            download="Ayush_Kumar_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHoverSound}
            onClick={playClickSound}
            className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-cyber-text text-cyber-bg font-semibold hover:bg-cyber-accent-light transition-all text-xs"
          >
            <span>Resume</span>
            <ChevronRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel-3d rounded-2xl p-3 space-y-1.5 text-xs font-medium shadow-luxury">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                activeSection === item.id
                  ? "bg-cyber-accent/15 text-cyber-accent-light font-bold"
                  : "text-cyber-muted hover:bg-cyber-surface/50"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-cyber-border/30 flex flex-col space-y-1.5">
            <button
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 text-center text-cyber-text font-bold bg-cyber-accent rounded-xl"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
