"use client";

import { motion } from "framer-motion";
import { Server, Layout, ShieldCheck, Wrench, CheckCircle2, Code2, Database, Cloud, MessageSquare } from "lucide-react";
import { useState } from "react";
import { RESUME_SKILLS } from "@/lib/constants";

const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "Languages": Code2,
  "Frontend Architecture": Layout,
  "Backend & Microservices": Server,
  "Authentication & Security": ShieldCheck,
  "Databases & ORMs": Database,
  "DevOps & Cloud Operations": Cloud,
  "Message Brokers": MessageSquare,
  "Developer Tools": Wrench,
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredSkills = activeCategory === "All"
    ? RESUME_SKILLS
    : RESUME_SKILLS.filter((cat) => cat.category === activeCategory);

  return (
    <div className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              06 / Technical Skills & Architecture
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Core Technical Competencies.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
            Every technical skill, library, database, and cloud tool directly extracted from professional experience and production systems.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          <button
            onClick={() => setActiveCategory("All")}
            className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeCategory === "All"
                ? "border-cobalt bg-cobalt text-canvas shadow-sm font-semibold"
                : "border-line bg-canvas-raised text-ink-muted hover:border-ink hover:text-ink"
            }`}
          >
            <span>All Categories ({RESUME_SKILLS.length})</span>
          </button>
          {RESUME_SKILLS.map((cat) => {
            const Icon = categoryIcons[cat.category] || Code2;
            const isActive = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "border-cobalt bg-cobalt text-canvas shadow-sm font-semibold"
                    : "border-line bg-canvas-raised text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                <Icon size={14} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredSkills.map((cat, catIdx) => {
            const Icon = categoryIcons[cat.category] || Code2;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: catIdx * 0.05 }}
                className="flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-6 transition-all duration-300 hover:border-cobalt hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-4">
                    <div className="flex items-center gap-2 text-cobalt font-medium">
                      <Icon size={18} />
                      <h3 className="font-sans text-base font-semibold text-ink">{cat.category}</h3>
                    </div>
                    <span className="font-mono text-xs px-2 py-0.5 rounded-full border border-line bg-canvas text-ink-muted">
                      {cat.skills.length}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas px-3 py-1.5 font-mono text-xs text-ink font-medium hover:border-cobalt/40 transition-colors"
                      >
                        <CheckCircle2 size={12} className="text-cobalt shrink-0" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
