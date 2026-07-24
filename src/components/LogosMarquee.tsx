"use client";

import React from "react";
import { Building2, GraduationCap, Shield, Cpu, Code2, Server } from "lucide-react";
import { useVibe } from "./VibeEngine";

export const LogosMarquee: React.FC = () => {
  const { colors } = useVibe();

  const brands = [
    { name: "NexoGrafix", role: "Microservices", icon: Building2 },
    { name: "ShipU Logistics", role: "PERN & AWS", icon: Server },
    { name: "Shabra Softech", role: "MERN Monorepo", icon: Cpu },
    { name: "IIT Patna", role: "MCA Research", icon: GraduationCap },
    { name: "IIIT Ranchi", role: "Distributed Systems", icon: Code2 },
    { name: "AKU Patna", role: "MBA Management", icon: Shield },
  ];

  return (
    <div className="py-12 bg-transparent border-b border-white/10 overflow-hidden text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <p className="text-center font-mono text-[11px] text-cyan-300 uppercase tracking-widest font-semibold mb-8">
          ENGINEERING EXPERIENCE & ACADEMIC INSTITUTIONS
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-90">
          {brands.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-center space-x-2 text-white hover:opacity-100 transition-opacity group cursor-default"
              >
                <div className="p-2 rounded-lg bg-white/10 border border-white/15 shadow-sm group-hover:border-cyan-400 transition-colors">
                  <Icon style={{ color: colors.secondary }} className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-sans font-bold text-xs text-white">
                    {b.name}
                  </span>
                  <span className="font-mono text-[10px] text-slate-300">
                    {b.role}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
