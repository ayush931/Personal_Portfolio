"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState } from "react";
import { useExperienceStore } from "@/store/experience-store";
import { Terminal, Sparkles, CornerDownLeft, Copy, Check, Trash2 } from "lucide-react";
import { SITE } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COMMANDS: Record<string, string[]> = {
  help: [
    "Available terminal commands:",
    "  whoami       - Display developer identity & background",
    "  cat about.md - Read origin story & career pivot path",
    "  ls projects  - List featured production repositories",
    "  skills       - View full-stack tech stack & tools",
    "  experience   - View career history & company impact",
    "  contact      - Display direct phone, email & location",
    "  open resume  - Launch resume PDF in a new tab",
    "  clear        - Clear console buffer logs",
  ],
  whoami: [
    `User: ${SITE.name}`,
    `Role: ${SITE.role}`,
    `Location: ${SITE.location}`,
    "Degree: MCA (IIIT Ranchi / IIT Patna Joint Advanced Program)",
    "Experience: 3 Verified Engineering Roles (NexoGrafix, ShipU Logistics, Shabra Softech)",
    "Focus: Event-driven microservices, document automation, real-time WebSockets.",
  ],
  "cat about.md": [
    "# ABOUT AYUSH KUMAR — FULL-STACK ENGINEER & SYSTEMS BUILDER",
    "─────────────────────────────────────────────────────────────",
    "• Origin: B.Sc Chemistry (Patliputra Univ) → First-principles analytical problem solving.",
    "• Business: MBA Marketing (AKU, CGPA 8.61/10) → Product strategy, user empathy & business ROI.",
    "• Engineering: MCA (IIIT Ranchi / IIT Patna Joint Advanced Program) → High-performance backend & web apps.",
    "",
    "Current Role: Junior Software Engineer at NexoGrafix Pvt Ltd (Patna)",
    "Key Impact: Built Word add-in (TypeScript/Office.js) + FastAPI microservices pipeline cutting formatting turnaround by 60%.",
    "",
    "Core Technical Focus:",
    "  - Microservices & Document Automation (FastAPI, Python, React, TypeScript)",
    "  - Real-Time Synchronization Engines (WebSockets, Socket.IO, Phaser.js)",
    "  - High-Throughput Event Architecture (RabbitMQ, Node.js, Express, Docker)",
    "  - Database Performance Optimization (PostgreSQL, Prisma ORM, Turborepo)",
    "─────────────────────────────────────────────────────────────",
  ],
  "ls projects": [
    "drwxr-xr-x  aetheria          Phaser.js 60FPS multiplayer 2D sandbox world",
    "drwxr-xr-x  infinite-canvas   Next.js sub-100ms real-time collaborative whiteboard",
    "drwxr-xr-x  ridesync          React Native Expo live GPS ride booking platform",
    "drwxr-xr-x  trackflow         RabbitMQ Node.js event-driven logistics architecture",
  ],
  skills: [
    "Languages:           TypeScript, Python, SQL, C++, JavaScript (ES6+)",
    "Backend Architecture: Node.js, Express, FastAPI, WebSockets, REST APIs",
    "Message Brokers:     RabbitMQ, Apache Kafka",
    "Databases & ORMs:    PostgreSQL, Neon DB, MongoDB, Redis, Prisma ORM",
    "DevOps & Cloud:      Docker, Kubernetes, AWS (EC2, S3), GitHub Actions",
  ],
  experience: [
    "1. NexoGrafix Pvt Ltd (Apr 2026 - Present) — Junior Software Engineer",
    "   - Built Word add-in (TypeScript, Office.js) cutting editorial effort 60%",
    "   - Architected 4-microservice document conversion platform (FastAPI, React)",
    "2. ShipU Logistics (Sep 2025 - Mar 2026) — Software Engineer Intern",
    "   - Built real-time PERN logistics engine (+25% query speedup)",
    "3. Shabra Softech (Feb 2025 - Aug 2025) — Software Engineer Intern",
    "   - Migrated legacy MERN monolith to Turborepo monorepo (40% code reuse)",
  ],
  contact: [
    `Email:    ${SITE.email}`,
    `Phone:    ${SITE.phone}`,
    `Location: ${SITE.location}`,
    `GitHub:   ${SITE.github}`,
    `LinkedIn: ${SITE.linkedin}`,
  ],
};

const QUICK_COMMANDS = ["help", "whoami", "cat about.md", "ls projects", "skills", "experience", "open resume", "clear"];

interface TerminalSectionProps {
  isInline?: boolean;
}

export function TerminalSection({ isInline = false }: TerminalSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalCardRef = useRef<HTMLDivElement>(null);
  const setActiveSection = useExperienceStore((state) => state.setActiveSection);

  const [history, setHistory] = useState<string[]>([
    "ayush-shell v2026.4 (wezterm-zsh)",
    "Type 'help' or click any command shortcut below.",
    "",
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdIndex, setCmdIndex] = useState<number>(-1);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useGSAP(() => {
    if (isInline) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setActiveSection("terminal"),
      onEnterBack: () => setActiveSection("terminal"),
    });
  }, { scope: containerRef });

  const executeCommand = (cmdInput: string) => {
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [...prev, cmdInput]);
    setCmdIndex(-1);

    let response: string[] = [];

    if (cmd === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    } else if (cmd === "open resume") {
      response = ["Opening resume PDF in new tab...", "Transmitting CV document..."];
      if (typeof window !== "undefined") {
        window.open("/resume.pdf", "_blank");
      }
    } else if (cmd in COMMANDS) {
      response = COMMANDS[cmd];
    } else {
      response = [`bash: command not found: ${cmdInput}`, "Type 'help' to view available console commands."];
    }

    setHistory((prev) => [...prev, `$ ${cmdInput}`, ...response, ""]);
    setInputVal("");

    setTimeout(() => {
      const body = document.getElementById("terminal-body");
      if (body) {
        body.scrollTop = body.scrollHeight;
      }
    }, 20);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = cmdIndex === -1 ? cmdHistory.length - 1 : Math.max(0, cmdIndex - 1);
      setCmdIndex(nextIdx);
      setInputVal(cmdHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cmdIndex === -1) return;
      const nextIdx = cmdIndex + 1;
      if (nextIdx >= cmdHistory.length) {
        setCmdIndex(-1);
        setInputVal("");
      } else {
        setCmdIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleCopyHistory = (e: React.MouseEvent) => {
    e.stopPropagation();
    const plainText = history.join("\n");
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearLogs = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHistory([]);
  };

  const handleCardClick = () => {
    const selection = window.getSelection();
    if (!selection || selection.toString().trim().length === 0) {
      inputRef.current?.focus();
    }
  };

  const terminalCard = (
    <div
      ref={terminalCardRef}
      onClick={handleCardClick}
      className="w-full max-w-3xl rounded-2xl border border-line bg-canvas-raised p-4 sm:p-6 backdrop-blur-xl cursor-text transition-all duration-300 hover:border-cobalt/40 font-mono text-ink select-text"
    >
      {/* Mac-style Window Header Bar */}
      <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4 select-none">
        {/* Window Dots & Hostname */}
        <div className="flex items-center gap-2">
          <div className="group/dot relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ff5f56] cursor-pointer">
            <span className="opacity-0 group-hover/dot:opacity-100 text-[8px] text-black font-bold">×</span>
          </div>
          <div className="group/dot relative flex h-3 w-3 items-center justify-center rounded-full bg-[#ffbd2e] cursor-pointer">
            <span className="opacity-0 group-hover/dot:opacity-100 text-[8px] text-black font-bold">–</span>
          </div>
          <div className="group/dot relative flex h-3 w-3 items-center justify-center rounded-full bg-[#27c93f] cursor-pointer">
            <span className="opacity-0 group-hover/dot:opacity-100 text-[8px] text-black font-bold">+</span>
          </div>
          <div className="flex items-center gap-2 ml-2 text-xs text-ink-muted font-semibold">
            <Terminal size={13} className="text-cobalt" />
            <span className="truncate max-w-[150px] sm:max-w-none">ayush@portfolio:~ (zsh)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyHistory}
            className="flex items-center gap-1 text-[0.7rem] text-ink-muted hover:text-cobalt transition-colors p-1 rounded hover:bg-canvas border border-transparent hover:border-line"
            title="Copy Terminal Logs"
          >
            {copied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
            <span className="hidden sm:inline font-medium">{copied ? "Copied" : "Copy"}</span>
          </button>
          
          <button
            type="button"
            onClick={handleClearLogs}
            className="flex items-center gap-1 text-[0.7rem] text-ink-muted hover:text-vermilion transition-colors p-1 rounded hover:bg-canvas border border-transparent hover:border-line"
            title="Clear Console Buffer"
          >
            <Trash2 size={13} />
            <span className="hidden sm:inline font-medium">Clear</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-cobalt/20 bg-cobalt/5 px-2.5 py-0.5 text-[0.65rem] text-cobalt font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-cobalt animate-pulse" />
            <span>TTY ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Output Stream */}
      <div
        id="terminal-body"
        className="font-mono text-xs md:text-sm text-ink-muted space-y-2 h-[220px] sm:h-[260px] md:h-[280px] overflow-y-auto pr-2 scrollbar-none select-text cursor-text"
      >
        {history.map((line, idx) => {
          if (line.startsWith("$ ")) {
            return (
              <div key={idx} className="text-cobalt font-bold flex items-center gap-2 pt-1">
                <span className="text-cobalt font-extrabold select-none">➜</span>
                <span className="text-ink-muted/70 text-xs font-normal">~/portfolio</span>
                <span className="text-ink font-semibold">{line}</span>
              </div>
            );
          }
          if (line.startsWith("# ")) {
            return (
              <div key={idx} className="text-cobalt font-bold text-sm border-b border-line/40 pb-1 pt-1.5">
                {line}
              </div>
            );
          }
          if (line.includes("command not found")) {
            return (
              <div key={idx} className="text-vermilion font-medium bg-vermilion/5 px-2 py-1 rounded border border-vermilion/20 inline-block">
                {line}
              </div>
            );
          }
          if (line.startsWith("drwxr-xr-x")) {
            return (
              <div key={idx} className="font-mono text-xs flex items-center gap-3 text-ink-muted">
                <span className="text-cobalt font-medium">{line.substring(0, 10)}</span>
                <span className="text-ink font-bold">{line.substring(12, 30).trim()}</span>
                <span className="text-ink-muted">{line.substring(30)}</span>
              </div>
            );
          }
          return <div key={idx} className="leading-relaxed text-ink-muted">{line}</div>;
        })}

        {/* Input Line Form */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-3 border-t border-line/40">
          <span className="text-cobalt font-extrabold select-none">➜</span>
          <span className="text-ink-muted/70 text-xs font-normal select-none hidden sm:inline">~/portfolio</span>
          <span className="text-cobalt font-bold select-none">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or click shortcut..."
            className="bg-transparent border-none outline-none flex-1 font-mono text-ink font-semibold text-xs md:text-sm placeholder:text-ink-muted/40"
            autoFocus
          />
          <button type="submit" className="text-ink-muted hover:text-cobalt transition-colors p-1" title="Execute Command">
            <CornerDownLeft size={14} />
          </button>
        </form>
      </div>

      {/* Quick Interactive Command Pills */}
      <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap items-center gap-1.5 text-[0.6875rem]">
        <span className="text-ink-muted uppercase tracking-wider font-semibold mr-1 select-none flex items-center gap-1">
          <Sparkles size={11} className="text-cobalt" />
          <span>Quick:</span>
        </span>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              executeCommand(cmd);
            }}
            className="rounded-md border border-line bg-canvas px-2.5 py-1 text-ink-muted hover:border-cobalt hover:text-cobalt hover:bg-cobalt/5 transition-all font-mono font-medium cursor-pointer active:scale-95 shadow-xs"
          >
            ${cmd}
          </button>
        ))}
      </div>
    </div>
  );

  if (isInline) {
    return terminalCard;
  }

  return (
    <div
      ref={containerRef}
      id="terminal"
      className="relative flex h-svh w-full flex-col justify-center bg-transparent px-gutter text-ink"
    >
      <div className="mx-auto max-w-[1600px] w-full flex flex-col justify-center items-center h-full">
        {/* Section Title Header for scroll section */}
        <div className="w-full max-w-3xl mb-6 flex items-center justify-between border-b border-line pb-3">
          <div className="font-mono text-xs uppercase tracking-wider text-cobalt font-bold flex items-center gap-2">
            <Terminal size={14} />
            <span>05 / Interactive Command Line</span>
          </div>
          <span className="font-mono text-xs text-ink-muted">ayush-shell v2026.4</span>
        </div>
        {terminalCard}
      </div>
    </div>
  );
}
