'use client';

import { useState } from 'react';
import { Sun, Moon, FileText, Laptop, Compass } from 'lucide-react';
import { links, stations, type StationId } from '@/lib/portfolio-data';

type HudProps = {
  activeStation: StationId;
  onStationChange: (station: StationId) => void;
  isInteractiveMode?: boolean;
  onInteractiveModeToggle?: () => void;
};

export function Hud({
  activeStation,
  onStationChange,
  isInteractiveMode = false,
  onInteractiveModeToggle,
}: HudProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-3xl border border-border-subtle bg-bg-surface/80 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300">
        
        {/* Left Logo / Branding */}
        <button
          className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-left transition-all duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-accent-primary"
          onClick={() => onStationChange('boot')}
        >
          <div className="flex flex-col">
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-accent-glow font-bold">anotherayush.in</span>
            <span className="font-display text-sm font-extrabold text-text-primary tracking-tight">
              Ayush <span className="text-accent-primary">Kumar</span>
            </span>
          </div>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </button>

        {/* Center Stations Nav Bar (Hidden in full interactive play mode to keep HUD clean) */}
        {!isInteractiveMode && (
          <div className="hidden lg:flex max-w-full gap-1 overflow-x-auto rounded-xl border border-border-subtle bg-bg-void/40 p-1 scrollbar-none">
            {stations.map((station) => (
              <button
                key={station.id}
                onClick={() => onStationChange(station.id)}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent-primary ${
                  activeStation === station.id
                    ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30 shadow-[0_0_12px_rgba(34,211,238,0.15)] font-bold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated/40 border border-transparent'
                }`}
              >
                {station.nav}
              </button>
            ))}
          </div>
        )}

        {/* Right Section Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* View Mode Toggle button (Interactive 3D Desk vs Scrolling Portfolio) */}
          {onInteractiveModeToggle && (
            <button
              onClick={onInteractiveModeToggle}
              className={`station-mini-btn flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono border transition-all duration-200 hover:-translate-y-0.5 shadow-md ${
                isInteractiveMode
                  ? 'border-accent-glow/50 bg-accent-glow/20 text-text-primary font-bold shadow-[0_0_12px_rgba(167,139,250,0.25)]'
                  : 'border-border-subtle bg-bg-elevated/80 text-text-secondary hover:border-accent-primary/40 hover:text-text-primary'
              }`}
              title={isInteractiveMode ? 'Switch to Standard Scroll Mode' : 'Switch to Immersive 3D Desk Mode'}
            >
              {isInteractiveMode ? (
                <>
                  <Compass className="w-3.5 h-3.5 text-accent-glow animate-spin-slow" />
                  <span>Scroll Portfolio</span>
                </>
              ) : (
                <>
                  <Laptop className="w-3.5 h-3.5 text-accent-primary" />
                  <span>Interactive Desk</span>
                </>
              )}
            </button>
          )}

          {/* Resume Download */}
          <a
            className="station-mini-btn flex items-center gap-1.5 px-3.5 py-1.5 text-[10px] font-mono border border-accent-primary/30 bg-accent-primary/10 text-accent-primary font-bold transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-primary/20 hover:border-accent-primary/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)]"
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Light/Dark Theme Switch */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-indigo-500" />
            )}
          </button>
        </div>
      </nav>
      
      {/* Mobile Horizontally Scrollable Navigation (Only visible when not in immersive interactive mode) */}
      {!isInteractiveMode && (
        <div className="mx-auto mt-2 flex max-w-sm justify-center lg:hidden px-4">
          <div className="flex gap-1 overflow-x-auto rounded-full border border-border-subtle bg-bg-surface/90 p-1 shadow-md max-w-full scrollbar-none">
            {stations.map((station) => (
              <button
                key={station.id}
                onClick={() => onStationChange(station.id)}
                className={`whitespace-nowrap rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest transition-all duration-200 ${
                  activeStation === station.id
                    ? 'bg-accent-primary/20 text-accent-primary font-bold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {station.nav}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
