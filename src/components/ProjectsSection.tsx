"use client";

import React, { useState } from "react";
import { FolderGit2, Github, Code2, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface Project {
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
  codeSnippet: string;
  architectureDiagram: string;
}

export const ProjectsSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudioFeedback();
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "overview" | "code" | "arch">>({
    aetheria: "overview",
    excalidraw: "overview",
    ridesync: "overview",
  });

  const projects: Project[] = [
    {
      id: "aetheria",
      title: "Aetheria – Real-Time 2D Multiplayer Sandbox World",
      subtitle: "Real-Time 2D Multiplayer World Engine & WebRTC Voice Mesh",
      badge: "60 FPS FOR 500+ PLAYERS",
      metric: "60 FPS",
      metricLabel: "Spatial vector sync & WebRTC voice mesh",
      description: "Built a real-time sync pipeline (Socket.io, Phaser.js) sustaining 60 FPS for 500+ concurrent players with WebRTC proximity voice chat, multiplayer canvas interactions, and drag-and-drop customization.",
      keyFeatures: [
        "Built a real-time sync pipeline (Socket.io, Phaser.js) sustaining 60 FPS for 500+ concurrent players.",
        "Added WebRTC proximity voice chat, multiplayer canvas interactions, and drag-and-drop customization.",
        "Built a zero-config Neon PostgreSQL layer with automated local fallback – cut developer onboarding time 90%.",
      ],
      tags: ["Phaser.js", "Socket.io", "WebRTC", "Neon PostgreSQL", "TypeScript", "HTML5 Canvas", "Node.js"],
      githubUrl: "https://github.com/ayush931/aetheria-sandbox",
      codeSnippet: `export function calculateSpatialProximity(
  player1: Player, player2: Player, maxRadius = 300
) {
  const dx = player1.x - player2.x;
  const dy = player1.y - player2.y;
  const distance = Math.hypot(dx, dy);
  if (distance <= maxRadius) {
    const volumeGain = Math.max(0, 1 - (distance / maxRadius));
    setPeerAudioVolume(player2.peerId, volumeGain);
  } else {
    mutePeerAudio(player2.peerId);
  }
}`,
      architectureDiagram: "Phaser.js Canvas ↔ Socket.io State Loop ↔ WebRTC P2P Voice ↔ Neon Serverless DB",
    },
    {
      id: "excalidraw",
      title: "Excalidraw Clone – Real-Time Collaborative Whiteboard",
      subtitle: "Sub-100ms Collaborative Whiteboard & State Reconciliation",
      badge: "SUB-100MS MULTI-USER SYNC",
      metric: "< 100ms",
      metricLabel: "CRDT vector diff & memoization speedup",
      description: "Built a collaborative whiteboard (Next.js, WebSockets, Turborepo) with sub-100ms multi-user sync, optimized rendering via React memoization and state diffing, reducing re-renders by 60% and latency by 40%.",
      keyFeatures: [
        "Built a collaborative whiteboard (Next.js, WebSockets, Turborepo) with sub-100ms multi-user sync.",
        "Optimized rendering via React memoization and state diffing – cut re-renders 60%, latency 40%.",
        "Monorepo infrastructure powered by Turborepo & Bun for instant incremental builds.",
      ],
      tags: ["Next.js", "WebSockets", "Turborepo", "Bun", "TypeScript", "React Memoization", "CRDT"],
      githubUrl: "https://github.com/ayush931/excalidraw-clone",
      codeSnippet: `export function applyVectorDiff(
  prevState: CanvasState, delta: VectorDelta
): CanvasState {
  if (delta.timestamp < prevState.lastACK) {
    return prevState;
  }
  const nextElements = new Map(prevState.elements);
  nextElements.set(delta.elementId, {
    ...nextElements.get(delta.elementId),
    ...delta.patch,
  });
  return { ...prevState, elements: nextElements, lastACK: performance.now() };
}`,
      architectureDiagram: "Client Canvas → WebSocket Gateway → Redis Pub/Sub → Broadcast Delta to Peers",
    },
    {
      id: "ridesync",
      title: "RideSync – Real-Time Ride Booking Application",
      subtitle: "Real-Time GPS Location Telemetry & Ride Dispatch Engine",
      badge: "SUB-200MS ROUTING TIME",
      metric: "< 200ms",
      metricLabel: "Driver proximity search & spatial DB routing",
      description: "Built a cross-platform ride-hailing app (React Native, Expo) with live GPS tracking, WebSocket messaging, and sub-200ms driver proximity spatial queries via Neon PostgreSQL.",
      keyFeatures: [
        "Built a cross-platform ride-hailing app (React Native, Expo) with live GPS tracking and WebSocket messaging.",
        "Added secure auth via Clerk and optimized Neon PostgreSQL queries – sub-200ms round-trip times.",
        "Bidirectional WebSocket messaging layer for high-frequency GPS position streaming.",
      ],
      tags: ["React Native", "Expo", "WebSockets", "Neon PostgreSQL", "Clerk Auth", "Express.js"],
      githubUrl: "https://github.com/ayush931/ridesync",
      codeSnippet: `SELECT id, driver_name,
  ST_Distance(location, ST_MakePoint($1, $2)::geography) AS dist
FROM driver_telemetry
WHERE is_available = true
  AND ST_DWithin(location, ST_MakePoint($1, $2)::geography, 5000)
ORDER BY dist ASC LIMIT 5;`,
      architectureDiagram: "Expo Mobile (GPS) ↔ Clerk Auth ↔ WebSocket Gateway ↔ Neon PostgreSQL Query",
    },
  ];

  const setTab = (projectId: string, tab: "overview" | "code" | "arch") => {
    playClickSound();
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full bg-cyber-accent/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cyber-border/40 pb-5"
        >
          <div>
            <div className="text-xs font-medium text-cyber-accent-light uppercase tracking-wider flex items-center space-x-2">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Projects</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-cyber-text mt-2">
              Systems Architecture
            </h2>
          </div>
        </motion.div>

        <div className="space-y-8">
          {projects.map((proj, idx) => {
            const currentTab = activeTabMap[proj.id] || "overview";
            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="solid-panel rounded-2xl border border-cyber-border/20 hover:border-cyber-accent/10 transition-all overflow-hidden">
                  <div className="px-6 py-4 border-b border-cyber-border/20 bg-cyber-card/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="text-cyber-accent-light font-mono font-bold text-sm">0{idx + 1}.</span>
                      <h3 className="text-sm font-bold text-cyber-text">{proj.title}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-emerald-400 text-[10px] font-medium">{proj.badge}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-cyber-surface/40 p-1 rounded-xl border border-cyber-border/20 text-[11px]">
                      {[
                        { id: "overview" as const, label: "Overview" },
                        { id: "code" as const, label: "Code", icon: Code2 },
                        { id: "arch" as const, label: "Pipeline", icon: Layers },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setTab(proj.id, tab.id)}
                          onMouseEnter={playHoverSound}
                          className={`px-3 py-1 rounded-lg transition-colors flex items-center space-x-1 ${
                            currentTab === tab.id ? "bg-cyber-accent text-cyber-bg font-bold" : "text-cyber-muted hover:text-cyber-text"
                          }`}
                        >
                          {tab.icon && <tab.icon className="w-3 h-3" />}
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7">
                    {currentTab === "overview" && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                        <div className="lg:col-span-8 space-y-4">
                          <div className="text-xs font-mono text-cyber-accent-light font-medium">{proj.subtitle}</div>
                          <p className="text-sm text-cyber-muted leading-relaxed">{proj.description}</p>
                          <div className="space-y-2 pt-1">
                            <div className="text-xs font-bold text-cyber-text">Key Highlights:</div>
                            <div className="space-y-1.5 text-sm text-cyber-muted">
                              {proj.keyFeatures.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start space-x-2">
                                  <span className="text-cyber-accent-light font-bold">&bull;</span>
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="lg:col-span-4 p-5 solid-panel rounded-2xl border border-cyber-border/20 space-y-5 text-center">
                          <div>
                            <div className="text-[11px] text-cyber-muted font-medium">{proj.metricLabel}</div>
                            <div className="text-3xl sm:text-4xl font-black text-gradient-warm mt-2 font-mono">{proj.metric}</div>
                          </div>
                          <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-cyber-surface border border-cyber-border/30 hover:border-cyber-accent/20 text-cyber-text font-semibold transition-all text-xs">
                            <Github className="w-4 h-4" />
                            <span>Source Code</span>
                          </a>
                        </div>
                      </div>
                    )}

                    {currentTab === "code" && (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="text-cyber-muted text-[11px]">&gt; implementation.ts</div>
                        <pre className="p-4 rounded-xl bg-cyber-card border border-cyber-border/20 text-[11px] text-cyber-text overflow-x-auto leading-relaxed"><code>{proj.codeSnippet}</code></pre>
                      </div>
                    )}

                    {currentTab === "arch" && (
                      <div className="space-y-2 font-mono text-xs">
                        <div className="text-cyber-muted text-[11px]">&gt; Pipeline Diagram</div>
                        <div className="p-5 rounded-xl bg-cyber-card border border-cyber-border/20 text-center space-y-2">
                          <div className="text-sm text-cyber-accent-light font-bold">{proj.architectureDiagram}</div>
                          <div className="text-[10px] text-cyber-muted max-w-md mx-auto">Decoupled architecture optimized for event loop determinism and horizontal scaling.</div>
                        </div>
                      </div>
                    )}

                    <div className="mt-5 pt-4 border-t border-cyber-border/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tags.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-full bg-cyber-surface border border-cyber-border/20 text-cyber-muted hover:text-cyber-accent-light transition-colors text-[11px]">#{t}</span>
                        ))}
                      </div>
                      <div className="text-cyber-muted text-[10px] font-mono">PRODUCTION_STABLE</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};