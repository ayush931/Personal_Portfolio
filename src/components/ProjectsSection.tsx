"use client";

import React, { useState } from "react";
import { FolderGit2, ExternalLink, Github, Terminal, Code2, Layers, Cpu, Check, Activity, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

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
  demoUrl?: string;
  codeSnippet: string;
  architectureDiagram: string;
}

export const ProjectsSection: React.FC = () => {
  const [activeTabMap, setActiveTabMap] = useState<Record<string, "overview" | "code" | "arch">>({
    aetheria: "overview",
    excalidraw: "overview",
    ridesync: "overview",
  });

  const projects: Project[] = [
    {
      id: "aetheria",
      title: "Aetheria",
      subtitle: "Real-Time 2D Multiplayer Sandbox World Engine",
      badge: "60 FPS FOR 50+ PLAYERS",
      metric: "60 FPS",
      metricLabel: "REAL-TIME SYNC & WEBRTC VOICE PIPELINE",
      description:
        "Engineered a real-time multiplayer 2D sandbox environment sustaining high-framerate entity synchronization and peer-to-peer proximity voice communication across 50+ concurrent players.",
      keyFeatures: [
        "Built a real-time sync pipeline using Socket.io and Phaser.js to process 60 FPS spatial entity vectors.",
        "Integrated WebRTC spatial proximity voice chat, multiplayer canvas interactions, and drag-and-drop world customization.",
        "Architected a zero-config Neon Serverless PostgreSQL database layer with automated local fallback, cutting developer onboarding time by 90%.",
      ],
      tags: ["Phaser.js", "Socket.io", "WebRTC", "Neon PostgreSQL", "TypeScript", "HTML5 Canvas", "Node.js"],
      githubUrl: "https://github.com/ayush931/aetheria-sandbox",
      codeSnippet: `// WebRTC Proximity Voice Mesh & Socket.io Spatial Broadcast
export function calculateSpatialProximity(player1: Player, player2: Player, maxRadius: number = 300) {
  const dx = player1.x - player2.x;
  const dy = player1.y - player2.y;
  const distance = Math.hypot(dx, dy);
  
  if (distance <= maxRadius) {
    const volumeGain = 1 - (distance / maxRadius);
    setPeerAudioVolume(player2.peerId, volumeGain);
  } else {
    mutePeerAudio(player2.peerId);
  }
}`,
      architectureDiagram: "Phaser.js Client ↔ Socket.io State Loop ↔ WebRTC P2P Voice ↔ Neon Serverless DB",
    },
    {
      id: "excalidraw",
      title: "Excalidraw Clone",
      subtitle: "Real-Time Collaborative Whiteboard Sync Engine",
      badge: "SUB-100MS MULTI-USER SYNC",
      metric: "< 100ms",
      metricLabel: "CRDT STATE DIFF & MEMOIZATION SPEEDUP",
      description:
        "Engineered a high-performance, real-time collaborative canvas application capable of broadcasting spatial vector operations across multiple simultaneous users with sub-100ms sync.",
      keyFeatures: [
        "Optimized canvas rendering via React memoization and selective state diffing – reducing re-renders by 60% and latency by 40%.",
        "WebSocket broadcast architecture with state reconciliation algorithms for concurrent draw conflict resolution.",
        "Built inside a Turborepo monorepo setup powered by Bun and Next.js for zero-lag module bundling.",
      ],
      tags: ["Next.js", "WebSockets", "Turborepo", "Bun", "TypeScript", "React Memoization"],
      githubUrl: "https://github.com/ayush931/excalidraw-clone",
      codeSnippet: `// WebSocket CRDT State Diff Handler & Memoized Render
export function applyVectorDiff(prevState: CanvasState, delta: VectorDelta): CanvasState {
  if (delta.timestamp < prevState.lastACK) {
    return prevState; // Drop stale out-of-order packet
  }
  const nextElements = new Map(prevState.elements);
  nextElements.set(delta.elementId, {
    ...nextElements.get(delta.elementId),
    ...delta.patch,
  });
  return {
    ...prevState,
    elements: nextElements,
    lastACK: performance.now(),
  };
}`,
      architectureDiagram: "Client Canvas → WebSocket Server → Redis Pub/Sub → Broadcast Delta to Peers",
    },
    {
      id: "ridesync",
      title: "RideSync",
      subtitle: "Real-Time Ride Booking & Dispatch Engine",
      badge: "SUB-200MS ROUTING TIME",
      metric: "< 200ms",
      metricLabel: "ROUND-TRIP DRIVER MATCH & NEON DB ROUTING",
      description:
        "Built a cross-platform ride-hailing mobile application with real-time GPS position tracking, Clerk authentication, and bidirectional driver-passenger socket telemetry.",
      keyFeatures: [
        "Bidirectional WebSocket messaging layer for continuous high-frequency location streaming.",
        "Optimized Neon PostgreSQL spatial queries delivering sub-200ms driver proximity searches.",
        "Cross-platform mobile architecture built with React Native, Expo, and Clerk Auth.",
      ],
      tags: ["React Native", "Expo", "WebSockets", "Neon PostgreSQL", "Clerk Auth", "Express.js"],
      githubUrl: "https://github.com/ayush931/ridesync",
      codeSnippet: `// Spatial Driver Match Query Pipeline (Neon Serverless PostgreSQL)
SELECT id, driver_name, 
       ST_Distance(location, ST_MakePoint($1, $2)::geography) AS distance_meters
FROM driver_telemetry
WHERE is_available = true 
  AND ST_DWithin(location, ST_MakePoint($1, $2)::geography, 5000)
ORDER BY distance_meters ASC
LIMIT 5;`,
      architectureDiagram: "Expo App (GPS) ↔ Clerk Auth ↔ WebSocket Gateway ↔ Neon PostgreSQL Query",
    },
  ];

  const setTab = (projectId: string, tab: "overview" | "code" | "arch") => {
    setActiveTabMap((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="w-full py-16 md:py-24 border-b border-oled-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-oled-border/80 pb-6"
        >
          <div>
            <div className="text-xs font-mono text-signal-cyan uppercase tracking-widest flex items-center space-x-2">
              <FolderGit2 className="w-4 h-4" />
              <span>02 // FEATURED PROJECTS & SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-oled-text font-sans mt-2">
              Production Architecture Deep Dives
            </h2>
          </div>
          <p className="text-xs font-mono text-oled-muted max-w-md">
            // Multiplayer 2D engines, CRDT whiteboard sync, and low-latency dispatch systems.
          </p>
        </motion.div>

        {/* Vertical Breathing Room Project Cards */}
        <div className="space-y-12">
          {projects.map((proj, idx) => {
            const currentTab = activeTabMap[proj.id] || "overview";

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard depth={10} className="bg-oled-card border border-oled-border rounded-lg overflow-hidden transition-all hover:border-oled-hover">
                  {/* Card Header & Controls Bar */}
                  <div className="px-6 py-4 border-b border-oled-border bg-oled-bg flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                    <div className="flex items-center space-x-3">
                      <span className="text-signal-cyan font-bold">0{idx + 1}.</span>
                      <h3 className="text-base font-bold text-oled-text font-sans">{proj.title}</h3>
                      <span className="px-2 py-0.5 rounded bg-oled-surface border border-oled-border text-signal-green text-[10px]">
                        {proj.badge}
                      </span>
                    </div>

                    {/* Inspector View Mode Tabs */}
                    <div className="flex items-center space-x-1 bg-oled-surface p-1 rounded border border-oled-border">
                      <button
                        onClick={() => setTab(proj.id, "overview")}
                        className={`px-3 py-1 rounded text-[11px] transition-colors ${
                          currentTab === "overview"
                            ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border"
                            : "text-oled-muted hover:text-oled-text"
                        }`}
                      >
                        SPECIFICATION
                      </button>
                      <button
                        onClick={() => setTab(proj.id, "code")}
                        className={`px-3 py-1 rounded text-[11px] transition-colors flex items-center space-x-1 ${
                          currentTab === "code"
                            ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border"
                            : "text-oled-muted hover:text-oled-text"
                        }`}
                      >
                        <Code2 className="w-3 h-3" />
                        <span>CODE_DIFF</span>
                      </button>
                      <button
                        onClick={() => setTab(proj.id, "arch")}
                        className={`px-3 py-1 rounded text-[11px] transition-colors flex items-center space-x-1 ${
                          currentTab === "arch"
                            ? "bg-oled-bg text-signal-cyan font-bold border border-oled-border"
                            : "text-oled-muted hover:text-oled-text"
                        }`}
                      >
                        <Layers className="w-3 h-3" />
                        <span>PIPELINE</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content Body based on Tab */}
                  <div className="p-6 sm:p-8">
                    {currentTab === "overview" && (
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        <div className="lg:col-span-8 space-y-4">
                          <div className="text-sm font-mono text-signal-cyan">{proj.subtitle}</div>
                          <p className="text-base text-oled-muted font-sans leading-relaxed">
                            {proj.description}
                          </p>

                          <div className="space-y-2 pt-2">
                            <div className="text-xs font-mono text-oled-text font-bold">KEY TECHNICAL HIGHLIGHTS:</div>
                            <div className="space-y-2 font-sans text-sm text-oled-muted">
                              {proj.keyFeatures.map((feat, fIdx) => (
                                <div key={fIdx} className="flex items-start space-x-2">
                                  <span className="text-signal-green font-mono font-bold">&gt;</span>
                                  <span>{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right side metric box & links */}
                        <div className="lg:col-span-4 p-6 bg-oled-surface rounded border border-oled-border space-y-6 text-center font-mono">
                          <div>
                            <div className="text-xs text-oled-muted">{proj.metricLabel}</div>
                            <div className="text-4xl font-extrabold text-signal-cyan mt-1">{proj.metric}</div>
                          </div>

                          <div className="flex flex-col space-y-2 pt-4 border-t border-oled-border text-xs">
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded bg-oled-bg border border-oled-border hover:border-signal-cyan text-oled-text hover:text-signal-cyan transition-all"
                            >
                              <Github className="w-4 h-4" />
                              <span>VIEW_SOURCE_CODE</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentTab === "code" && (
                      <div className="space-y-4 font-mono">
                        <div className="flex items-center justify-between text-xs text-oled-muted">
                          <span className="text-signal-green">&gt; core_implementation.ts</span>
                          <span>LANG: TYPESCRIPT // STRICT</span>
                        </div>
                        <pre className="p-4 rounded bg-oled-bg border border-oled-border text-xs text-oled-text overflow-x-auto leading-relaxed">
                          <code>{proj.codeSnippet}</code>
                        </pre>
                      </div>
                    )}

                    {currentTab === "arch" && (
                      <div className="space-y-4 font-mono">
                        <div className="text-xs text-oled-muted">&gt; PIPELINE_FLOW_DIAGRAM</div>
                        <div className="p-6 rounded bg-oled-bg border border-oled-border text-center space-y-4">
                          <div className="text-sm text-signal-cyan font-bold">
                            {proj.architectureDiagram}
                          </div>
                          <div className="text-xs text-oled-muted max-w-lg mx-auto">
                            Decoupled architecture optimized for state determinism, low latency event loops, and horizontal scaling.
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tags Footer */}
                    <div className="mt-6 pt-4 border-t border-oled-border flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
                      <div className="flex flex-wrap gap-2">
                        {proj.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded bg-oled-bg border border-oled-border text-oled-muted hover:text-signal-cyan transition-colors"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <div className="text-oled-muted text-[11px]">
                        STATUS: PRODUCTION_READY
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
