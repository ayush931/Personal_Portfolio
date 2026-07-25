"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  onOpenCommandPalette?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  activeSection,
  onNavigate,
}) => {
  const { playHoverSound, playClickSound } = useAudioFeedback();
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
    <header className="fixed top-4 left-0 right-0 z-50 w-full border-t border-b border-cyber-border/40 bg-cyber-bg/75 backdrop-blur-2xl py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-8 relative font-sans text-xs">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick("hero")}
          onMouseEnter={playHoverSound}
          className="flex items-center space-x-2.5 text-left group focus:outline-none shrink-0"
        >
          <div className="relative w-8 h-8 rounded-xl border border-cyber-accent/25 bg-cyber-surface text-cyber-accent-light font-mono text-xs font-bold flex items-center justify-center">
            ak
          </div>
          <span className="text-sm font-bold text-cyber-text tracking-tight group-hover:text-cyber-accent-light transition-colors">
            ayush<span className="text-cyber-accent-light"> kumar</span>
          </span>
        </button>

        {/* Navigation Items (Perfectly Centered) */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium absolute left-1/2 -translate-x-1/2">
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center text-xs shrink-0">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto mt-3 px-4 sm:px-8">
          <div className="glass-panel-3d rounded-2xl p-3 space-y-1.5 text-xs font-medium shadow-luxury">
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
          </div>
        </div>
      )}
    </header>
  );
};
