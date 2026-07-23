"use client";

import React from "react";
import { Terminal, ShieldCheck, Play, Download, Activity, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { HeroTelemetryCanvas } from "./HeroTelemetryCanvas";
import { audioEngine } from "@/lib/audioEngine";
import { GithubIcon } from "./BrandIcons";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenHireModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenHireModal }) => {
  return (
    <section id="hero" className="w-full pt-2 pb-6 md:pt-4 md:pb-10 border-b border-oled-border relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4 sm:space-y-6">
        
        {/* Top Diagnostic System Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] border-b border-oled-border/60 pb-2"
        >
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-2 px-2 py-0.5 rounded bg-oled-surface border border-oled-border text-signal-green">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green animate-pulse" />
              <span>STATUS: ONLINE // AVAILABLE FOR HIRE</span>
            </span>
            <span className="text-oled-muted text-[10px]">LOCATION: PATNA, IN (UTC +5:30)</span>
          </div>
          <div className="flex items-center space-x-2 text-oled-muted text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-signal-cyan" />
            <span>FULL-STACK SOFTWARE ENGINEER & SYSTEMS ARCHITECT</span>
          </div>
        </motion.div>

        {/* Hero Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Main Kinetic Headline Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="space-y-2.5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-oled-surface border border-signal-cyan/40 text-[11px] font-mono text-signal-cyan font-bold shadow-glow-cyan">
                <Terminal className="w-3.5 h-3.5 text-signal-green" />
                <span>AYUSH KUMAR // HIGH-PERFORMANCE SYSTEM ARCHITECT</span>
              </div>

              {/* Compact High-Impact Typography */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-oled-text font-sans leading-[1.12]">
                I build systems underneath{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-signal-green to-signal-amber animate-pulse">
                  real-time products
                </span>
                —sync engines & architectures that refuse to lag.
              </h1>
            </div>

            <p className="text-sm sm:text-base text-oled-muted leading-relaxed font-sans max-w-xl">
              Specialized in PERN/MERN microservices, sub-100ms multi-user WebSocket state engines, Turborepo monorepos, and FastAPI document pipelines. Cutting turnaround time by 45% and boosting query speed by 25%.
            </p>

            {/* Compact Action CTAs */}
            <div className="pt-1 flex flex-wrap gap-3 font-mono text-xs">
              {/* Hire Me / Direct Message CTA */}
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenHireModal?.();
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded bg-signal-green text-oled-bg font-bold hover:bg-signal-green/90 transition-all hover:scale-[1.02] shadow-glow-green text-xs"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>&gt; hire_me_message()</span>
              </button>

              <a
                href="/Ayush_Full_Stack_Developer_Resume.pdf"
                download="Ayush_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded border border-oled-border bg-oled-card hover:bg-oled-surface hover:border-signal-green text-oled-text hover:text-signal-green transition-all text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>&gt; download_resume.pdf()</span>
              </a>

              <button
                onClick={() => {
                  audioEngine.playNav();
                  onNavigate("experience");
                }}
                onMouseEnter={() => audioEngine.playHover()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded bg-signal-cyan text-oled-bg font-bold hover:bg-signal-cyan/90 transition-all hover:scale-[1.02] shadow-glow-cyan text-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>&gt; view_metrics()</span>
              </button>

              <a
                href="https://github.com/ayush931"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick()}
                onMouseEnter={() => audioEngine.playHover()}
                className="flex items-center space-x-2 px-4 py-2.5 rounded border border-oled-border bg-oled-card hover:bg-oled-surface hover:border-signal-cyan text-oled-text hover:text-signal-cyan transition-all text-xs"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>&gt; github_repos()</span>
              </a>
            </div>

            {/* Quick Diagnostic Metrics Bar */}
            <div className="pt-3 grid grid-cols-3 gap-3 border-t border-oled-border/60 text-xs font-mono">
              <div className="p-2.5 bg-oled-card/40 rounded border border-oled-border/40">
                <div className="text-oled-muted text-[9px]">SYNC_LATENCY</div>
                <div className="text-base sm:text-lg font-bold text-signal-cyan mt-0.5">&lt; 100ms</div>
              </div>
              <div className="p-2.5 bg-oled-card/40 rounded border border-oled-border/40">
                <div className="text-oled-muted text-[9px]">WEBSOCKET_FPS</div>
                <div className="text-base sm:text-lg font-bold text-signal-green mt-0.5">60 FPS</div>
              </div>
              <div className="p-2.5 bg-oled-card/40 rounded border border-oled-border/40">
                <div className="text-oled-muted text-[9px]">ARCH_TYPE</div>
                <div className="text-base sm:text-lg font-bold text-signal-amber mt-0.5">MONOREPO</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Hero Telemetry Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-2"
          >
            <div className="flex items-center justify-between text-xs font-mono text-oled-muted px-1">
              <span className="flex items-center space-x-1.5 text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan animate-ping" />
                <span className="text-signal-cyan font-bold">MULTI-PEER VECTOR TELEMETRY</span>
              </span>
              <span className="text-[10px] text-signal-green">&gt; REALTIME_CANVAS</span>
            </div>

            <HeroTelemetryCanvas />

            <div className="p-2.5 bg-oled-card border border-oled-border rounded text-[10px] font-mono text-oled-muted leading-relaxed flex items-center space-x-2">
              <Activity className="w-3.5 h-3.5 text-signal-green shrink-0" />
              <span>
                <strong className="text-signal-green">&gt; SYSTEM NOTE:</strong> Hover over the canvas to register your vector in real-time.
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
