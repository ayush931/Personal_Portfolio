"use client";

import React from "react";
import { Terminal, Github, Mail, ShieldCheck, Play, Download } from "lucide-react";
import { motion } from "framer-motion";
import { HeroTelemetryCanvas } from "./HeroTelemetryCanvas";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="w-full pt-3 pb-12 md:pt-5 md:pb-16 border-b border-oled-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Top Status & System Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs border-b border-oled-border/60 pb-3"
        >
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-2 px-2.5 py-1 rounded bg-oled-surface border border-oled-border text-signal-green">
              <span className="w-2 h-2 rounded-full bg-signal-green animate-pulse" />
              <span>STATUS: ONLINE</span>
            </span>
            <span className="text-oled-muted">DATE: DEC 2025</span>
          </div>
          <div className="flex items-center space-x-2 text-oled-muted text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-signal-cyan" />
            <span>FULL-STACK SOFTWARE ENGINEER // PATNA, IN</span>
          </div>
        </motion.div>

        {/* Hero Headline & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Headline (Fluid Typographic Drama) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-oled-surface border border-signal-cyan/40 text-xs font-mono text-signal-cyan font-bold shadow-glow-cyan">
                <Terminal className="w-3.5 h-3.5 text-signal-green" />
                <span>AYUSH KUMAR // FULL-STACK ENGINEER & SYSTEMS ARCHITECT</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-oled-text font-sans leading-[1.08]">
                I build the systems underneath <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-signal-green to-signal-amber">real-time products</span>—sync engines, event pipelines, and architectures that refuse to lag.
              </h1>
            </div>

            <p className="text-base sm:text-lg text-oled-muted leading-relaxed font-sans max-w-2xl">
              Specialized in PERN/MERN microservices, sub-100ms multi-user WebSocket state engines, Turborepo monorepos, and FastAPI document pipelines. Cutting processing time by 45% and boosting query speed by 25%.
            </p>

            {/* Terminal Action CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-xs">
              <a
                href="/Ayush_Full_Stack_Developer_Resume.pdf"
                download="Ayush_Kumar_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-3 rounded bg-signal-green text-oled-bg font-bold hover:bg-signal-green/90 transition-all hover:scale-[1.02] shadow-glow-green"
              >
                <Download className="w-4 h-4" />
                <span>&gt; download_resume.pdf()</span>
              </a>

              <button
                onClick={() => onNavigate("experience")}
                className="flex items-center space-x-2 px-5 py-3 rounded bg-signal-cyan text-oled-bg font-bold hover:bg-signal-cyan/90 transition-all hover:scale-[1.02] shadow-glow-cyan"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>&gt; view_system_metrics()</span>
              </button>

              <a
                href="https://github.com/ayush931"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-3 rounded border border-oled-border bg-oled-card hover:bg-oled-surface hover:border-signal-cyan text-oled-text hover:text-signal-cyan transition-all"
              >
                <Github className="w-4 h-4" />
                <span>&gt; github_repos()</span>
              </a>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-oled-border/60 text-xs font-mono">
              <div>
                <div className="text-oled-muted text-[10px]">SYNC_LATENCY</div>
                <div className="text-lg font-bold text-signal-cyan">&lt; 100ms</div>
              </div>
              <div>
                <div className="text-oled-muted text-[10px]">WEBSOCKET_FPS</div>
                <div className="text-lg font-bold text-signal-green">60 FPS</div>
              </div>
              <div>
                <div className="text-oled-muted text-[10px]">ARCH_TYPE</div>
                <div className="text-lg font-bold text-signal-amber">MONOREPO / PERN</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Signature Wow Moment (Telemetry Canvas) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono text-oled-muted px-1">
              <span className="flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-cyan" />
                <span>LIVE TELEMETRY CANVAS</span>
              </span>
              <span className="text-[10px] text-signal-cyan">&gt; INTERACTIVE_CANVAS</span>
            </div>

            <HeroTelemetryCanvas />

            <div className="p-3 bg-oled-card border border-oled-border rounded text-[11px] font-mono text-oled-muted leading-relaxed">
              <span className="text-signal-green font-semibold">&gt; SYSTEM NOTE:</span> Hover over the canvas to register your local cursor into the multi-peer vector sync loop in real-time.
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
