"use client";

import { motion } from "framer-motion";
import { Server, Layout, ShieldCheck, Wrench, CheckCircle2 } from "lucide-react";
import { useState } from "react";

type SkillCategory = {
  id: string;
  name: string;
  icon: any;
  description: string;
  skills: { name: string; level: string; tag: string }[];
};

const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend Architecture",
    icon: Server,
    description: "High-throughput APIs, distributed task queues, and real-time geospatial/caching engines.",
    skills: [
      { name: "Python / FastAPI", level: "Production", tag: "Primary" },
      { name: "Celery & RabbitMQ", level: "Production", tag: "Distributed Tasks" },
      { name: "PostgreSQL", level: "Production", tag: "Relational DB" },
      { name: "Redis", level: "Production", tag: "Caching & Geospatial" },
      { name: "Node.js & WebSockets", level: "Production", tag: "Real-time" },
    ],
  },
  {
    id: "frontend",
    name: "Frontend & 3D Engineering",
    icon: Layout,
    description: "Componentized React/Next.js apps with smooth GSAP timelines, R3F shaders & WebGL experiences.",
    skills: [
      { name: "React 19 & Next.js 15", level: "Production", tag: "App Router" },
      { name: "TypeScript", level: "Production", tag: "Strict Mode" },
      { name: "Three.js / R3F / Drei", level: "Advanced", tag: "3D & Shaders" },
      { name: "GSAP & ScrollTrigger", level: "Advanced", tag: "Timeline Motion" },
      { name: "Tailwind CSS", level: "Production", tag: "Design Systems" },
    ],
  },
  {
    id: "infra",
    name: "Infrastructure & DevOps",
    icon: ShieldCheck,
    description: "Containerized deployment pipelines, reverse proxy configs, and production monitoring.",
    skills: [
      { name: "Docker & Compose", level: "Production", tag: "Containerization" },
      { name: "GitHub Actions", level: "Production", tag: "CI/CD Automations" },
      { name: "Nginx", level: "Production", tag: "Reverse Proxy" },
      { name: "PM2 & Linux Sysadmin", level: "Production", tag: "Process Mgmt" },
    ],
  },
  {
    id: "tools",
    name: "Developer Tools & Workflow",
    icon: Wrench,
    description: "Modal editing setups, high-performance terminal environments, and version control.",
    skills: [
      { name: "Neovim & Zed", level: "Daily Driver", tag: "Modal Editors" },
      { name: "Ghostty / WezTerm", level: "Daily Driver", tag: "GPU Terminals" },
      { name: "Git & GitHub", level: "Daily Driver", tag: "Version Control" },
      { name: "Linux (Debian/Arch)", level: "Daily Driver", tag: "Environment" },
    ],
  },
];

export function Skills() {
  const [activeTab, setActiveTab] = useState<string>("backend");

  const currentCategory = skillCategories.find((c) => c.id === activeTab) || skillCategories[0];

  return (
    <section id="skills" className="relative isolate bg-canvas px-gutter py-section border-t border-line">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              05 / Technical Stack
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Core Technologies & Ecosystem.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
            Battle-tested technologies utilized across production systems at NexoGrafix, personal case studies, and engineering workflows.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group inline-flex items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
                  isActive
                    ? "border-cobalt bg-cobalt text-canvas shadow-sm"
                    : "border-line bg-canvas-raised text-ink-muted hover:border-ink hover:text-ink"
                }`}
              >
                <Icon size={16} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Content Grid */}
        <div className="rounded-panel border border-line bg-canvas-raised p-8 md:p-12">
          <div className="mb-8 border-b border-line pb-6">
            <h3 className="font-sans text-2xl font-semibold text-ink">{currentCategory.name}</h3>
            <p className="font-mono text-xs text-ink-muted mt-1">{currentCategory.description}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="flex items-center justify-between rounded-xl border border-line bg-canvas p-5 transition-colors hover:border-cobalt"
              >
                <div>
                  <h4 className="font-sans font-semibold text-ink">{skill.name}</h4>
                  <span className="font-mono text-[0.6875rem] text-cobalt block mt-1">{skill.tag}</span>
                </div>
                <div className="flex items-center gap-1 font-mono text-xs text-ink-muted">
                  <CheckCircle2 size={14} className="text-cobalt" />
                  <span>{skill.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
