"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef, useState, useEffect } from "react";
import { useExperienceStore } from "@/store/experience-store";
import { Terminal, Sparkles, CornerDownLeft, Copy, Check, Trash2, ArrowUp, ArrowDown } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const COMMANDS = {
  help: [
    "Available terminal commands:",
    "  whoami       - Display developer identity & background",
    "  cat about.md - Read origin story & career pivot path",
    "  ls projects  - List featured production repositories",
    "  skills       - View full-stack tech stack & tools",
    "  open resume  - Launch resume PDF in a new tab",
    "  clear        - Clear console buffer logs",
  ],
  whoami: [
    "User: Ayush Kumar",
    "Identity: Full-Stack & Systems Engineer",
    "Origin: Chemistry Honours -> MBA Marketing -> Software Engineering",
    "Current: Junior Software Engineer at NexoGrafix",
    "Degree: MCA (IIIT Ranchi / IIT Patna Joint Advanced Program)",
    "Focus: Event-driven microservices, document pipelines, real-time WebSockets.",
  ],
  "cat about.md": [
    "# Origin & Career Pivot Path",
    "Chemistry taught me first-principles scientific debugging.",
    "MBA Marketing gave me customer empathy and business alignment.",
    "MCA & NexoGrafix is where I build production document automation and scalable microservices.",
  ],
  "ls projects": [
    "drwxr-xr-x  aetheria          Phaser.js multiplayer 2D sandbox engine",
    "drwxr-xr-x  infinite-canvas   Next.js whiteboard WebSockets sync",
    "drwxr-xr-x  ridesync          React Native real-time GPS ride booking app",
    "drwxr-xr-x  trackflow         RabbitMQ Node.js event-driven logistics pipeline",
  ],
  skills: [
    "Languages:           TypeScript, Python, SQL, C++, Go",
    "Backend & Services:  Node.js, Express, FastAPI, WebSockets, REST APIs",
    "Pipelines/Brokers:   RabbitMQ, Celery, Redis, Docker, AWS",
    "Frontend Frameworks: React, Next.js (App Router), React Native (Expo)",
    "Databases:           PostgreSQL, MongoDB, Prisma ORM, Neon DB",
  ],
};

const QUICK_COMMANDS = ["help", "whoami", "cat about.md", "ls projects", "skills", "open resume", "clear"];

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = terminalCardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const tiltX = (y / (rect.height / 2)) * -4;
    const tiltY = (x / (rect.width / 2)) * 4;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4,
    });
  };

  const handleMouseLeave = () => {
    const card = terminalCardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6,
    });
  };

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
      response = COMMANDS[cmd as keyof typeof COMMANDS];
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

  const terminalCard = (
    <div
      ref={terminalCardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => inputRef.current?.focus()}
      className="w-full max-w-3xl rounded-2xl border border-line/80 bg-canvas-raised p-4 sm:p-6 backdrop-blur-xl cursor-text transition-all duration-300 hover:border-cobalt/40 font-mono text-ink"
    >
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4 select-none">
        {/* Left Mac Window Dots */}
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
            <span className="truncate max-w-[140px] sm:max-w-none">ayush@portfolio:~ (zsh)</span>
          </div>
        </div>

        {/* Right Action Tools & Badge */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleCopyHistory}
            className="flex items-center gap-1 text-[0.7rem] text-ink-muted hover:text-cobalt transition-colors p-1 rounded hover:bg-canvas border border-transparent hover:border-line"
            title="Copy Terminal Logs"
          >
            {copied ? <Check size={13} className="text-acid" /> : <Copy size={13} />}
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
            <span>TTY READY</span>
          </div>
        </div>
      </div>

      {/* Terminal Output Logs */}
      <div
        id="terminal-body"
        className="font-mono text-xs md:text-sm text-ink-muted space-y-2 h-[220px] sm:h-[260px] md:h-[280px] overflow-y-auto pr-2 scrollbar-none"
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

        {/* Input Form Prompt */}
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

