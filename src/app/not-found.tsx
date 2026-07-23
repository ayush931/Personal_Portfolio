"use client";

import React from "react";
import { Terminal, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-oled-text flex flex-col items-center justify-center p-6 font-mono select-none">
      <div className="max-w-md w-full bg-oled-card border border-oled-border rounded-xl p-8 space-y-6 text-center shadow-2xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-bold">
          <Terminal className="w-4 h-4" />
          <span>ERROR 404 // SIGNAL LOST</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-signal-cyan font-sans">
            404 PAGE NOT FOUND
          </h1>
          <p className="text-xs text-oled-muted leading-relaxed">
            The requested vector route does not exist in the active telemetry matrix.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-signal-cyan text-oled-bg font-bold text-xs hover:bg-signal-cyan/90 transition-all shadow-glow-cyan"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO TELEMETRY MATRIX</span>
        </Link>
      </div>
    </div>
  );
}
