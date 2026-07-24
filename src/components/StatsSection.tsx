"use client";

import React from "react";
import { Zap, TrendingUp, Activity, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { useVibe } from "./VibeEngine";

export const StatsSection: React.FC = () => {
  const { colors } = useVibe();

  const stats = [
    {
      metric: "45%",
      label: "Turnaround Time Reduction",
      detail: "FastAPI microservices & automated TOC parsing pipelines at NexoGrafix",
      icon: Zap,
    },
    {
      metric: "25%",
      label: "Query Speed Improvement",
      detail: "Optimized PERN stack PostgreSQL database indexing & RabbitMQ queues",
      icon: TrendingUp,
    },
    {
      metric: "< 100ms",
      label: "CRDT State Sync Latency",
      detail: "Real-time vector state diffing & memoized WebSocket broadcast",
      icon: Activity,
    },
    {
      metric: "40%",
      label: "Code Reuse Increase",
      detail: "MERN to Turborepo monorepo migration with shared component libraries",
      icon: Layers,
    },
  ];

  return (
    <section className="py-28 lg:py-36 relative bg-transparent border-b border-white/10 text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-16"
        >
          <span
            style={{ color: colors.secondary }}
            className="font-mono text-xs uppercase tracking-widest font-semibold"
          >
            GLOBAL SCALE & RELIABILITY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Designed for scale, built for speed.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Empirical metrics delivered across production microservice pipelines, multi-user WebSockets, and monorepos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard depth={0} className="h-full">
                  <div className="p-7 rounded-3xl bg-[#0a2540]/80 backdrop-blur-xl border border-white/15 h-full flex flex-col justify-between group hover:border-cyan-400/40 transition-all shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div
                          style={{ backgroundColor: colors.primary }}
                          className="p-2.5 rounded-2xl text-white shadow-md transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-mono text-[10px] text-cyan-300 bg-white/10 px-2 py-0.5 rounded-full border border-white/15 font-bold shadow-sm">
                          VERIFIED
                        </span>
                      </div>

                      <div>
                        <div className="text-3xl font-extrabold text-white tracking-tight font-sans group-hover:scale-105 transition-transform origin-left">
                          {item.metric}
                        </div>
                        <div className="text-xs font-bold text-slate-200 mt-1">
                          {item.label}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-slate-300 leading-relaxed font-sans">
                      {item.detail}
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
