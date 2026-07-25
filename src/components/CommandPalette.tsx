"use client";

import React, { useEffect, useState } from "react";
import { Terminal, ArrowUpRight, Copy, Check, Hash, Cpu, Mail, FolderGit2, Compass, X, Download, Inbox } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Action" | "System";
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    {
      id: "crm-dashboard",
      label: "jump_to: crm_dashboard() [Inbox & Client Communications]",
      category: "Navigation",
      shortcut: "G M",
      icon: <Inbox className="w-4 h-4 text-cyber-accent-light" />,
      action: () => {
        window.location.href = "/crm";
        onClose();
      },
    },
    {
      id: "download-resume",
      label: "exec: download_resume_pdf() [Ayush_Kumar_Resume.pdf]",
      category: "Action",
      shortcut: "⌘ R",
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/Ayush_Full_Stack_Developer_Resume.pdf";
        link.download = "Ayush_Kumar_Resume.pdf";
        link.click();
        onClose();
      },
    },
    {
      id: "hero",
      label: "jump_to: hero_positioning()",
      category: "Navigation",
      shortcut: "G H",
      icon: <Terminal className="w-4 h-4 text-cyber-accent-light" />,
      action: () => {
        onNavigate("hero");
        onClose();
      },
    },
    {
      id: "experience",
      label: "jump_to: metrics_timeline() [NexoGrafix / ShipU / Shabra]",
      category: "Navigation",
      shortcut: "G E",
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onNavigate("experience");
        onClose();
      },
    },
    {
      id: "projects",
      label: "jump_to: architecture_deep_dives() [Aetheria / Excalidraw / RideSync]",
      category: "Navigation",
      shortcut: "G P",
      icon: <FolderGit2 className="w-4 h-4 text-cyber-accent-light" />,
      action: () => {
        onNavigate("projects");
        onClose();
      },
    },
    {
      id: "infrastructure",
      label: "jump_to: system_capabilities() [ls -la]",
      category: "Navigation",
      shortcut: "G I",
      icon: <Hash className="w-4 h-4 text-amber-400" />,
      action: () => {
        onNavigate("infrastructure");
        onClose();
      },
    },
    {
      id: "education",
      label: "jump_to: credentials() [IIT Patna & IIIT Ranchi MCA / AKU MBA / PPU B.Sc]",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-cyber-accent-light" />,
      action: () => {
        onNavigate("education");
        onClose();
      },
    },
    {
      id: "contact",
      label: "jump_to: init_contact()",
      category: "Navigation",
      shortcut: "G C",
      icon: <Mail className="w-4 h-4 text-emerald-400" />,
      action: () => {
        onNavigate("contact");
        onClose();
      },
    },
    {
      id: "copy-email",
      label: "exec: copy_email_to_clipboard() [ayushkumar9315983@gmail.com]",
      category: "Action",
      shortcut: "⌘ C",
      icon: <Copy className="w-4 h-4 text-cyber-accent-light" />,
      action: () => {
        navigator.clipboard.writeText("ayushkumar9315983@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "github",
      label: "open_external: github_profile() [ayush931]",
      category: "Action",
      icon: <ArrowUpRight className="w-4 h-4 text-amber-400" />,
      action: () => {
        window.open("https://github.com/ayush931", "_blank");
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredCommands.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? Math.max(0, filteredCommands.length - 1) : prev - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center pt-16 sm:pt-24 bg-black/80 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-cyber-card border border-cyber-border rounded-2xl shadow-luxury overflow-hidden text-cyber-text font-mono animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Command Input Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-cyber-border/40 bg-cyber-surface/80">
          <Terminal className="w-5 h-5 text-cyber-accent-light mr-3 shrink-0" />
          <span className="text-cyber-accent-light font-semibold mr-2">$</span>
          <input
            type="text"
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-cyber-text placeholder-cyber-muted focus:outline-none font-mono"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-cyber-surface rounded text-cyber-muted hover:text-cyber-text transition-colors ml-2"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[340px] overflow-y-auto p-2 divide-y divide-cyber-border/20">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-cyber-muted">
              No matching system commands found for <span className="text-amber-400">&quot;{query}&quot;</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-colors ${
                    isSelected
                      ? "bg-cyber-surface text-cyber-accent-light border-l-2 border-cyber-accent-light pl-2.5"
                      : "text-cyber-muted hover:text-cyber-text hover:bg-cyber-surface/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="font-mono tracking-tight text-left">{cmd.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    {cmd.id === "copy-email" && copied && (
                      <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>COPIED</span>
                      </span>
                    )}
                    {cmd.shortcut && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-cyber-bg border border-cyber-border/40 text-cyber-muted rounded-md">
                        {cmd.shortcut}
                      </span>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 border-t border-cyber-border/30 bg-cyber-bg/80 flex items-center justify-between text-[11px] text-cyber-muted">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1 py-0.5 bg-cyber-surface border border-cyber-border/40 rounded text-[10px]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-cyber-surface border border-cyber-border/40 rounded text-[10px]">↵</kbd> select
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-cyber-surface border border-cyber-border/40 rounded text-[10px]">esc</kbd> close
            </span>
          </div>
          <div className="text-emerald-400 text-[10px]">
            SYS_BUS: OK
          </div>
        </div>
      </div>
    </div>
  );
};
