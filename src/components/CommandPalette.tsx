"use client";

import React, { useEffect, useState } from "react";
import { Search, Terminal, ArrowUpRight, Copy, Check, Hash, Cpu, Mail, FolderGit2, Compass, X, Download } from "lucide-react";

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery("");
          setSelectedIndex(0);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands: CommandItem[] = [
    {
      id: "download-resume",
      label: "exec: download_resume_pdf() [Ayush_Kumar_Resume.pdf]",
      category: "Action",
      shortcut: "⌘ R",
      icon: <Download className="w-4 h-4 text-signal-green" />,
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
      icon: <Terminal className="w-4 h-4 text-signal-cyan" />,
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
      icon: <Cpu className="w-4 h-4 text-signal-green" />,
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
      icon: <FolderGit2 className="w-4 h-4 text-signal-cyan" />,
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
      icon: <Hash className="w-4 h-4 text-signal-amber" />,
      action: () => {
        onNavigate("infrastructure");
        onClose();
      },
    },
    {
      id: "education",
      label: "jump_to: credentials() [IIT Patna & IIIT Ranchi MCA / AKU MBA / PPU B.Sc]",
      category: "Navigation",
      icon: <Compass className="w-4 h-4 text-signal-cyan" />,
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
      icon: <Mail className="w-4 h-4 text-signal-green" />,
      action: () => {
        onNavigate("contact");
        onClose();
      },
    },
    {
      id: "copy-email",
      label: "exec: copy_email_to_clipboard() [ayushkumar93183@gmail.com]",
      category: "Action",
      shortcut: "⌘ C",
      icon: <Copy className="w-4 h-4 text-signal-cyan" />,
      action: () => {
        navigator.clipboard.writeText("ayushkumar93183@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
    },
    {
      id: "github",
      label: "open_external: github_profile() [ayush931]",
      category: "Action",
      icon: <ArrowUpRight className="w-4 h-4 text-signal-amber" />,
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
      className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 bg-black/80 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-oled-card border border-oled-border rounded-lg shadow-2xl overflow-hidden text-oled-text font-mono animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Command Input Header */}
        <div className="flex items-center px-4 py-3 border-b border-oled-border bg-oled-bg/80">
          <Terminal className="w-5 h-5 text-signal-cyan mr-3 shrink-0" />
          <span className="text-signal-cyan font-semibold mr-2">$</span>
          <input
            type="text"
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent text-sm text-oled-text placeholder-oled-muted focus:outline-none font-mono"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 hover:bg-oled-border rounded text-oled-muted hover:text-oled-text transition-colors ml-2"
            aria-label="Close Command Palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="max-h-[340px] overflow-y-auto p-2 divide-y divide-oled-border/30">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-xs text-oled-muted">
              No matching system commands found for <span className="text-signal-amber">&quot;{query}&quot;</span>
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs transition-colors ${
                    isSelected
                      ? "bg-oled-surface text-signal-cyan border-l-2 border-signal-cyan pl-2.5"
                      : "text-oled-muted hover:text-oled-text hover:bg-oled-surface/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="shrink-0">{cmd.icon}</span>
                    <span className="font-mono tracking-tight text-left">{cmd.label}</span>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0">
                    {cmd.id === "copy-email" && copied && (
                      <span className="text-[10px] text-signal-green flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>COPIED</span>
                      </span>
                    )}
                    {cmd.shortcut && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-oled-bg border border-oled-border text-oled-muted rounded">
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
        <div className="px-4 py-2 border-t border-oled-border bg-oled-bg flex items-center justify-between text-[11px] text-oled-muted">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1 py-0.5 bg-oled-surface border border-oled-border rounded text-[10px]">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-oled-surface border border-oled-border rounded text-[10px]">↵</kbd> select
            </span>
            <span>
              <kbd className="px-1 py-0.5 bg-oled-surface border border-oled-border rounded text-[10px]">esc</kbd> close
            </span>
          </div>
          <div className="text-signal-green text-[10px]">
            SYS_BUS: OK
          </div>
        </div>
      </div>
    </div>
  );
};
