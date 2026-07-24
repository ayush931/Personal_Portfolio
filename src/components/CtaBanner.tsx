"use client";

import React from "react";
import { ChevronRight, Download } from "lucide-react";
import { useVibe } from "./VibeEngine";

interface CtaBannerProps {
  onOpenHireModal: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenHireModal }) => {
  const { colors, playClickSound } = useVibe();

  return (
    <section className="py-28 bg-transparent border-b border-white/10 relative overflow-hidden text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <div
          style={{
            background: `linear-gradient(135deg, rgba(10, 37, 64, 0.9) 0%, ${colors.primary}99 100%)`,
          }}
          className="rounded-3xl p-8 sm:p-14 text-white relative shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-xl border border-white/15 transition-all duration-500"
        >
          
          <div
            style={{ backgroundColor: colors.secondary }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-25 blur-3xl pointer-events-none transition-all duration-500"
          />

          <div className="space-y-3 max-w-2xl relative z-10">
            <span
              style={{ color: colors.secondary }}
              className="font-mono text-xs uppercase tracking-widest font-bold"
            >
              GET IN TOUCH & START COLLABORATION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              Ready to build high-performance systems together?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              Available for full-time software engineering roles, microservice consulting, and contract engineering.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0 relative z-10">
            <button
              onClick={() => {
                playClickSound();
                onOpenHireModal();
              }}
              className="px-6 py-3 rounded-full text-xs font-bold bg-white text-[#0a2540] hover:bg-white/90 shadow-xl transition-all flex items-center space-x-2 group hover:scale-105"
            >
              <span>Get in touch</span>
              <ChevronRight
                style={{ color: colors.primary }}
                className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
              />
            </button>

            <a
              href="/Ayush_Full_Stack_Developer_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              onClick={playClickSound}
              className="px-5 py-3 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-white/80" />
              <span>Resume PDF</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
