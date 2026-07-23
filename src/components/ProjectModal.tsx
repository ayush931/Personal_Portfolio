"use client";

import React, { useState } from "react";
import { X, ExternalLink, Code2, Layers, Cpu, Check, Activity, Terminal, Shield, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { audioEngine } from "@/lib/audioEngine";
import { GithubIcon } from "./BrandIcons";

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  metric: string;
  metricLabel: string;
  description: string;
  keyFeatures: string[];
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  codeSnippet: string;
  architectureDiagram: string;
}

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"simulator" | "code" | "arch">("simulator");

  if (!project) return null;

  const handleClose = () => {
    audioEngine.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full max-w-5xl max-h-[90vh] bg-oled-card border border-signal-cyan/50 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs relative"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-oled-bg border-b border-oled-border flex flex-wrap items-center justify-between gap-4 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 rounded-none bg-signal-cyan animate-pulse" />
              <div>
                <div className="text-[10px] text-signal-cyan tracking-wider">PROJECT DEEP DIVE // HUD INSPECTOR</div>
                <h3 className="text-xl font-bold font-sans text-oled-text">{project.title}</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-signal-green/10 border border-signal-green/40 text-signal-green text-[10px]">
                {project.badge}
              </span>
            </div>

            {/* Navigation Tabs inside modal */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-oled-surface p-1 rounded border border-oled-border">
                <button
                  onClick={() => {
                    audioEngine.playHover();
                    setActiveTab("simulator");
                  }}
                  className={`px-3 py-1.5 rounded text-[11px] transition-colors flex items-center space-x-1 ${
                    activeTab === "simulator"
                      ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border shadow-glow-cyan"
                      : "text-oled-muted hover:text-oled-text"
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>SIMULATOR</span>
                </button>
                <button
                  onClick={() => {
                    audioEngine.playHover();
                    setActiveTab("code");
                  }}
                  className={`px-3 py-1.5 rounded text-[11px] transition-colors flex items-center space-x-1 ${
                    activeTab === "code"
                      ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border shadow-glow-cyan"
                      : "text-oled-muted hover:text-oled-text"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>CODE_DIFF</span>
                </button>
                <button
                  onClick={() => {
                    audioEngine.playHover();
                    setActiveTab("arch");
                  }}
                  className={`px-3 py-1.5 rounded text-[11px] transition-colors flex items-center space-x-1 ${
                    activeTab === "arch"
                      ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border shadow-glow-cyan"
                      : "text-oled-muted hover:text-oled-text"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>ARCHITECTURE</span>
                </button>
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded bg-oled-surface border border-oled-border hover:border-red-500 text-oled-muted hover:text-red-400 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-tech-grid">
            {/* Tab 1: Interactive Canvas Simulator */}
            {activeTab === "simulator" && (
              <div className="space-y-6">
                <div className="p-6 bg-oled-surface rounded-lg border border-oled-border space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs text-oled-muted border-b border-oled-border pb-3">
                    <span className="text-signal-green font-bold flex items-center space-x-2">
                      <Terminal className="w-4 h-4" />
                      <span>LIVE SYSTEM SIMULATION // {project.title.toUpperCase()}</span>
                    </span>
                    <span>STATE: STABLE (60 FPS)</span>
                  </div>

                  {/* Dynamic Graphic Simulation Box */}
                  <div className="h-64 rounded bg-oled-bg border border-oled-border/80 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-dot-grid opacity-40" />

                    {/* Animated Pulse Beam */}
                    <div className="w-32 h-32 rounded-full border border-signal-cyan/40 animate-ping absolute" />
                    <div className="w-48 h-48 rounded-full border border-signal-green/20 animate-pulse absolute" />

                    <div className="relative z-10 space-y-3 max-w-md">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-signal-cyan/10 border border-signal-cyan text-signal-cyan text-xs font-bold rounded-full">
                        <Activity className="w-3.5 h-3.5 animate-spin" />
                        <span>SUB-100MS STREAM ACTIVE</span>
                      </div>
                      <h4 className="text-lg font-bold font-sans text-oled-text">{project.subtitle}</h4>
                      <p className="text-xs text-oled-muted leading-relaxed font-sans">{project.description}</p>
                    </div>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 bg-oled-bg rounded border border-oled-border text-center">
                      <div className="text-[10px] text-oled-muted uppercase">{project.metricLabel}</div>
                      <div className="text-3xl font-extrabold text-signal-cyan mt-1">{project.metric}</div>
                    </div>
                    <div className="p-4 bg-oled-bg rounded border border-oled-border text-center">
                      <div className="text-[10px] text-oled-muted uppercase">PROTOCOL</div>
                      <div className="text-2xl font-bold text-signal-green mt-1">WEBSOCKET / P2P</div>
                    </div>
                    <div className="p-4 bg-oled-bg rounded border border-oled-border text-center">
                      <div className="text-[10px] text-oled-muted uppercase">PERSISTENCE</div>
                      <div className="text-2xl font-bold text-signal-amber mt-1">NEON DB</div>
                    </div>
                  </div>
                </div>

                {/* Key Technical Highlights */}
                <div className="p-6 bg-oled-card rounded-lg border border-oled-border space-y-3 font-sans">
                  <h4 className="text-xs font-mono font-bold text-signal-cyan uppercase tracking-wider">
                    TECHNICAL ARCHITECTURE HIGHLIGHTS:
                  </h4>
                  <div className="space-y-2 text-sm text-oled-muted">
                    {project.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-signal-green shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Code Diff */}
            {activeTab === "code" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-oled-muted">
                  <span className="text-signal-green font-bold">&gt; src/engine/core_implementation.ts</span>
                  <span>TYPESCRIPT // STRICT MODE</span>
                </div>
                <pre className="p-6 rounded-lg bg-oled-bg border border-oled-border text-xs text-oled-text overflow-x-auto leading-relaxed font-mono">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            )}

            {/* Tab 3: Architecture Flow */}
            {activeTab === "arch" && (
              <div className="space-y-4">
                <div className="text-xs text-oled-muted">&gt; DECOUPLED PIPELINE ARCHITECTURE</div>
                <div className="p-8 rounded-lg bg-oled-bg border border-oled-border text-center space-y-6">
                  <div className="text-lg font-bold text-signal-cyan">
                    {project.architectureDiagram}
                  </div>
                  <div className="p-4 bg-oled-surface rounded border border-oled-border max-w-xl mx-auto text-xs text-oled-muted leading-relaxed font-sans">
                    Designed for sub-100ms state synchronization across distributed clients. State diffs are evaluated deterministically with instant fallback and zero blocking operations.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer Bar */}
          <div className="px-6 py-4 bg-oled-bg border-t border-oled-border flex flex-wrap items-center justify-between gap-4 shrink-0 font-mono text-xs">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded bg-oled-surface border border-oled-border text-oled-muted">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playClick()}
                className="px-4 py-2 rounded bg-signal-cyan text-oled-bg font-bold flex items-center space-x-2 hover:bg-signal-cyan/90 transition-colors shadow-glow-cyan"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW_ON_GITHUB</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
