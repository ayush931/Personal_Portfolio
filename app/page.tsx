'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, startTransition, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BootLoader } from '@/components/terminal-station/BootLoader';
import { Hud } from '@/components/terminal-station/Hud';
import { StationPanel } from '@/components/terminal-station/StationPanel';
import { stations, type StationId } from '@/lib/portfolio-data';

// Import the full sections for standard scroll portfolio mode
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHub from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';

const TerminalScene = dynamic(() => import('@/components/terminal-station/TerminalScene'), {
  ssr: false,
  loading: () => <BootLoader />,
});

export default function Home() {
  const prefersReducedMotion = useReducedMotion();
  const [activeStation, setActiveStation] = useState<StationId>('boot');
  const [booted, setBooted] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  
  // Custom states for view modes
  // isInteractiveMode: false = Scrolling Portfolio (default), true = Fullscreen Interactive Desk
  const [isInteractiveMode, setIsInteractiveMode] = useState(false);
  
  // Ref to track scroll state to prevent trigger conflicts
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 850);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'd' && event.shiftKey) setEasterEgg((value) => !value);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Intersection Observer to synchronize scroll position with the 3D Workstation background camera focus
  useEffect(() => {
    if (isInteractiveMode || !booted) return;

    const sections = [
      { id: 'hero', station: 'boot' },
      { id: 'about', station: 'about' },
      { id: 'skills', station: 'skills' },
      { id: 'experience', station: 'experience' },
      { id: 'projects', station: 'projects' },
      { id: 'github', station: 'github' },
      { id: 'contact', station: 'contact' }
    ];

    const observers = sections.map((sec) => {
      const el = document.getElementById(sec.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only update station if we're intersecting and not actively scrolling from a manual nav click
            if (entry.isIntersecting && !isScrollingRef.current) {
              startTransition(() => {
                setActiveStation(sec.station as StationId);
              });
            }
          });
        },
        { rootMargin: '-45% 0px -45% 0px' } // Focuses on the center area of the screen
      );
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [isInteractiveMode, booted]);

  // Smooth scroll handler for manual clicks
  const changeStation = (station: StationId) => {
    startTransition(() => setActiveStation(station));

    if (isInteractiveMode) {
      // In interactive mode, we just update the active station focus in the 3D scene
      return;
    }

    // Map the station ID back to the section ID
    const sectionMap: Record<StationId, string> = {
      boot: 'hero',
      about: 'about',
      skills: 'skills',
      experience: 'experience',
      projects: 'projects',
      github: 'github',
      contact: 'contact'
    };

    const targetId = sectionMap[station];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      isScrollingRef.current = true;
      targetElement.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'center'
      });

      // Clear scrolling flag after transition completes
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  };

  const handleInteractiveModeToggle = () => {
    setIsInteractiveMode((prev) => {
      const next = !prev;
      if (!next) {
        // Scrolling back to top or the active section when returning to scroll mode
        setTimeout(() => {
          changeStation(activeStation);
        }, 100);
      }
      return next;
    });
  };

  return (
    <main className="relative min-h-screen bg-bg-void text-text-secondary overflow-x-hidden transition-colors duration-300">
      
      {/* Scroll Progress Bar (Only in scroll mode) */}
      {!isInteractiveMode && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-accent-glow to-accent-primary z-50 origin-left" />
      )}

      {/* Global Navigation HUD */}
      <Hud
        activeStation={activeStation}
        onStationChange={changeStation}
        isInteractiveMode={isInteractiveMode}
        onInteractiveModeToggle={handleInteractiveModeToggle}
      />

      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. IMMERSIVE INTERACTIVE 3D WORKSTATION (GAME MODE)      */}
      {/* ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isInteractiveMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-10 flex flex-col lg:flex-row w-screen h-screen bg-bg-void pt-20 pb-4 px-4 lg:pt-24 lg:pb-6 lg:px-6 gap-4 overflow-hidden"
          >
            {/* Left/Top: 3D Scene Viewport */}
            <div className="relative flex-1 h-[42vh] lg:h-full w-full rounded-[2rem] overflow-hidden border border-border-subtle bg-bg-surface/30">
              {!booted && <BootLoader />}
              {booted && (
                <TerminalScene
                  activeStation={activeStation}
                  onStationChange={changeStation}
                  isInteractiveMode={true}
                />
              )}
              
              {/* Controls Info Overlay inside Canvas frame */}
              <div className="absolute bottom-4 left-6 z-20 pointer-events-none select-none font-mono text-[9px] uppercase tracking-[0.18em] text-text-tertiary hidden md:block">
                <span>drag/orbit or click desk items to focus</span>
                <span className="mx-3 border-l border-border-subtle h-3" />
                <span>Shift + D toggles DocStream easter egg</span>
              </div>
            </div>

            {/* Right/Bottom: Overlaid floating StationPanel */}
            <div className="relative w-full h-[46vh] lg:h-full lg:w-[440px] shrink-0 flex flex-col justify-center pointer-events-auto">
              <StationPanel activeStation={activeStation} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. NARRATIVE SCROLL PORTFOLIO MODE (DEFAULT VIEW)        */}
      {/* ──────────────────────────────────────────────────────── */}
      {!isInteractiveMode && (
        <div className="relative w-full">
          
          {/* Spatial 3D Scene Background layer (Moves camera based on section) */}
          <div className="fixed inset-0 w-screen h-screen z-0 opacity-60 md:opacity-80 lg:opacity-100 pointer-events-none select-none transition-opacity duration-500">
            {!booted && <BootLoader />}
            {booted && (
              <TerminalScene
                activeStation={activeStation}
                onStationChange={changeStation}
                isInteractiveMode={false}
              />
            )}
            {/* Ambient vignette shadow overlay to make text highly readable without covering the 3D scene */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,color-mix(in_srgb,var(--bg-void)_35%,transparent)_100%)]" />
          </div>

          {/* Scrolling Content Sections overlay */}
          <div className="relative z-10 w-full flex flex-col items-center">
            
            {/* 1. Hero Section */}
            <div id="hero" className="w-full flex justify-center min-h-screen">
              <Hero />
            </div>

            {/* Premium Section Dividers */}
            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 2. About Section */}
            <div id="about" className="w-full flex justify-center scroll-mt-20">
              <About />
            </div>

            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 3. Skills Section */}
            <div id="skills" className="w-full flex justify-center scroll-mt-20">
              <Skills />
            </div>

            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 4. Experience Section */}
            <div id="experience" className="w-full flex justify-center scroll-mt-20">
              <Experience />
            </div>

            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 5. Projects Section */}
            <div id="projects" className="w-full flex justify-center scroll-mt-20">
              <Projects />
            </div>

            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 6. GitHub Activity */}
            <div id="github" className="w-full flex justify-center scroll-mt-20">
              <GitHub />
            </div>

            <div className="w-full max-w-5xl px-6"><div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent opacity-60" /></div>

            {/* 7. Contact Section */}
            <div id="contact" className="w-full flex justify-center scroll-mt-20">
              <Contact />
            </div>

            {/* Recruiter fast-jump quickbar footer (Replaces the classic list) */}
            <footer className="w-full py-16 px-6 border-t border-border-subtle/30 bg-bg-surface/30 backdrop-blur-md relative z-10 flex flex-col items-center gap-6">
              <div className="text-center space-y-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent-glow font-bold">Quick Navigation Matrix</span>
                <h3 className="font-display text-lg font-bold text-text-primary">Recruiter Quick-Jump console</h3>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl">
                {stations.map((station) => (
                  <button
                    key={station.id}
                    onClick={() => changeStation(station.id)}
                    className="px-4 py-2.5 rounded-2xl border border-border-subtle bg-bg-surface/50 hover:bg-bg-elevated text-xs font-mono tracking-wider transition-all duration-300 hover:border-accent-primary/40 hover:-translate-y-0.5 hover:text-text-primary"
                  >
                    {station.nav}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-text-tertiary font-mono uppercase mt-4">
                &copy; {new Date().getFullYear()} Ayush Kumar &bull; Made with Next.js &amp; Three.js
              </p>
            </footer>
          </div>

          {/* DocStream Easter Egg status display */}
          {easterEgg && (
            <div className="fixed bottom-6 left-6 z-40 max-w-sm rounded-2xl border border-accent-glow bg-bg-surface/95 p-4 font-mono text-[10px] leading-5 text-text-primary shadow-2xl backdrop-blur-md animate-float">
              <div className="flex items-center gap-2 text-accent-glow font-bold mb-1.5">
                <span className="w-2 h-2 rounded-full bg-accent-glow animate-ping" />
                <span>DocStream Debugger</span>
              </div>
              hidden command accepted: `docstream --route OCR XML EPUB` Packet path stable. No unlocks, no gimmicks, just the pipeline Ayush is building.
            </div>
          )}
        </div>
      )}
    </main>
  );
}
