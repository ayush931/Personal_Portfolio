"use client";

import React, { useState } from "react";
import { Search, Cpu, Code2, Server, Database, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";
import { useVibe } from "./VibeEngine";

interface SkillGroup {
  id: string;
  name: string;
  description: string;
  icon: any;
  items: string[];
}

export const SkillsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const { colors, playClickSound } = useVibe();

  const skillGroups: SkillGroup[] = [
    {
      id: "languages",
      name: "Core Languages",
      description: "High-performance compiled & dynamic systems programming languages.",
      icon: Code2,
      items: ["TypeScript", "Python", "JavaScript (ES6+)", "C++", "SQL"],
    },
    {
      id: "frontend",
      name: "Frontend Architecture",
      description: "Scalable SSR/SPA frameworks, cross-platform mobile, and 2D canvas engines.",
      icon: Globe,
      items: [
        "React.js",
        "Next.js (App Router)",
        "React Native (Expo)",
        "Tailwind CSS",
        "Redux Toolkit",
        "HTML5 Canvas API",
      ],
    },
    {
      id: "backend",
      name: "Backend & Microservices",
      description: "Event-driven microservice backends, sub-100ms WebSockets, and OAuth2 security.",
      icon: Server,
      items: [
        "Node.js",
        "Express.js",
        "FastAPI (Python)",
        "WebSockets (Socket.io)",
        "RESTful APIs",
        "JWT / OAuth 2.0 / RBAC",
      ],
    },
    {
      id: "data",
      name: "Data, Messaging & ORMs",
      description: "High-throughput relational databases, serverless PostgreSQL, and message queues.",
      icon: Database,
      items: [
        "PostgreSQL",
        "Neon Serverless DB",
        "MongoDB",
        "Redis Caching",
        "RabbitMQ",
        "Apache Kafka",
        "Prisma ORM",
      ],
    },
    {
      id: "devops",
      name: "DevOps, Monorepos & Cloud",
      description: "Containerization, cloud deployments on AWS, and Turborepo build optimization.",
      icon: Cpu,
      items: [
        "Docker",
        "Kubernetes",
        "AWS (EC2, S3, RDS)",
        "Turborepo Monorepos",
        "Bun Runtime",
        "Git & CI/CD Pipelines",
      ],
    },
  ];

  const filteredGroups = skillGroups
    .map((group) => {
      if (activeCategory !== "all" && group.id !== activeCategory) return null;
      const matchingItems = group.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (searchQuery && matchingItems.length === 0) return null;
      return { ...group, items: searchQuery ? matchingItems : group.items };
    })
    .filter(Boolean) as SkillGroup[];

  return (
    <section id="infrastructure" className="py-32 lg:py-44 relative border-b border-white/10 bg-transparent text-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8"
        >
          <div className="space-y-3">
            <span
              style={{ color: colors.secondary }}
              className="font-mono text-xs uppercase tracking-widest font-semibold flex items-center gap-2"
            >
              <Cpu className="w-4 h-4" />
              <span>DEVELOPER PLATFORM INFRASTRUCTURE</span>
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
              Designed for engineers, built for scale.
            </h2>
          </div>
          <p className="text-sm text-slate-300 max-w-md font-sans leading-relaxed">
            Curated set of production-proven frameworks, real-time message brokers, and cloud orchestration tools.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setActiveCategory("all");
              }}
              style={
                activeCategory === "all"
                  ? { backgroundColor: colors.primary, color: "#ffffff" }
                  : {}
              }
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "all"
                  ? "shadow-md"
                  : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15"
              }`}
            >
              All Categories
            </button>
            {skillGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  playClickSound();
                  setActiveCategory(g.id);
                }}
                style={
                  activeCategory === g.id
                    ? { backgroundColor: colors.primary, color: "#ffffff" }
                    : {}
                }
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === g.id
                    ? "shadow-md"
                    : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a2540]/80 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-sm transition-colors font-medium backdrop-blur-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <TiltCard depth={0} className="h-full">
                  <div className="p-7 rounded-3xl bg-[#0a2540]/80 backdrop-blur-xl border border-white/15 h-full flex flex-col justify-between group hover:border-cyan-400/40 transition-all shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div
                          style={{ backgroundColor: colors.primary }}
                          className="p-2.5 rounded-2xl text-white shadow-md transition-colors"
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white font-sans">
                            {group.name}
                          </h3>
                          <span className="text-[10px] font-mono text-cyan-300 font-medium">
                            {group.items.length} Production Technologies
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        {group.description}
                      </p>

                      <div className="pt-2 flex flex-wrap gap-1.5">
                        {group.items.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-white/10 border border-white/15 text-[11px] font-mono text-cyan-300 font-semibold shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
