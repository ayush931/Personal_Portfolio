"use client";

import React, { useState } from "react";
import { Terminal, Hash, Search, Shield, Cpu, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { audioEngine } from "@/lib/audioEngine";

interface SkillCategory {
  permissions: string;
  links: number;
  owner: string;
  size: string;
  date: string;
  name: string;
  key: string;
  items: string[];
}

export const InfrastructureSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: SkillCategory[] = [
    {
      permissions: "drwxr-xr-x",
      links: 5,
      owner: "ayush",
      size: "4.0K",
      date: "DEC 2025",
      name: "01_LANGUAGES",
      key: "languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C++"],
    },
    {
      permissions: "drwxr-xr-x",
      links: 8,
      owner: "ayush",
      size: "4.0K",
      date: "DEC 2025",
      name: "02_FRONTEND_ARCHITECTURE",
      key: "frontend",
      items: [
        "React.js",
        "Next.js (App Router)",
        "React Native (Expo)",
        "Tailwind CSS",
        "Redux Toolkit",
        "GraphQL",
        "HTML5 / CSS3",
        "HTML5 Canvas API",
      ],
    },
    {
      permissions: "drwxr-xr-x",
      links: 7,
      owner: "ayush",
      size: "4.0K",
      date: "DEC 2025",
      name: "03_BACKEND_AND_SECURITY",
      key: "backend",
      items: [
        "Node.js",
        "Express.js",
        "FastAPI",
        "RESTful APIs",
        "WebSockets",
        "Event-Driven Architecture",
        "JWT / OAuth 2.0 / RBAC",
      ],
    },
    {
      permissions: "drwxr-xr-x",
      links: 8,
      owner: "ayush",
      size: "4.0K",
      date: "DEC 2025",
      name: "04_DATA_MESSAGING_ORMS",
      key: "data_state",
      items: [
        "PostgreSQL",
        "Neon Serverless PostgreSQL",
        "MongoDB",
        "MySQL",
        "Redis Caching",
        "Prisma ORM",
        "RabbitMQ",
        "Apache Kafka",
      ],
    },
    {
      permissions: "drwxr-xr-x",
      links: 8,
      owner: "ayush",
      size: "4.0K",
      date: "DEC 2025",
      name: "05_DEVOPS_AND_TOOLS",
      key: "infra_tooling",
      items: [
        "Docker",
        "Kubernetes",
        "AWS (EC2, S3)",
        "CI/CD (GitHub Actions)",
        "Vercel",
        "Turborepo Monorepos",
        "Git / Postman / Linux",
        "System Design",
      ],
    },
  ];

  const filteredCategories = categories
    .filter((cat) => activeCategory === "all" || cat.key === activeCategory)
    .map((cat) => {
      const filteredItems = cat.items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  const handleFilterClick = (key: string) => {
    audioEngine.playHover();
    setActiveCategory(key);
  };

  return (
    <section id="infrastructure" className="w-full py-16 md:py-24 border-b border-oled-border bg-tech-grid relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-oled-border/80 pb-6"
        >
          <div>
            <div className="text-xs font-mono text-signal-amber uppercase tracking-widest flex items-center space-x-2">
              <Hash className="w-4 h-4" />
              <span>03 // TECHNICAL INFRASTRUCTURE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-oled-text font-sans mt-2">
              Complete Stack & DevOps Matrix
            </h2>
          </div>
          <p className="text-xs font-mono text-oled-muted max-w-md">
            // POSIX terminal system output `ls -la /var/ayush/capabilities`.
          </p>
        </motion.div>

        {/* Terminal Controls Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-4 bg-oled-card border border-oled-border rounded-xl flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-oled-muted flex items-center space-x-1 mr-1">
              <Filter className="w-3.5 h-3.5 text-signal-cyan" />
              <span>FILTER:</span>
            </span>
            <button
              onClick={() => handleFilterClick("all")}
              onMouseEnter={() => audioEngine.playHover()}
              data-cursor-text="ALL"
              className={`px-3 py-1 rounded transition-colors ${
                activeCategory === "all"
                  ? "bg-signal-cyan text-oled-bg font-bold shadow-glow-cyan"
                  : "bg-oled-surface text-oled-muted hover:text-oled-text border border-oled-border"
              }`}
            >
              all_domains
            </button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => handleFilterClick(c.key)}
                onMouseEnter={() => audioEngine.playHover()}
                data-cursor-text="FILTER"
                className={`px-3 py-1 rounded transition-colors ${
                  activeCategory === c.key
                    ? "bg-signal-cyan text-oled-bg font-bold shadow-glow-cyan"
                    : "bg-oled-surface text-oled-muted hover:text-oled-text border border-oled-border"
                }`}
              >
                {c.key}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex items-center space-x-2 bg-oled-surface border border-oled-border rounded px-3 py-1.5 w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-oled-muted" />
            <input
              type="text"
              placeholder="grep capability..."
              className="bg-transparent text-xs text-oled-text placeholder-oled-muted focus:outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* POSIX Terminal output */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-oled-card border border-oled-border rounded-xl overflow-hidden font-mono text-xs shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="px-4 py-3 bg-oled-bg border-b border-oled-border flex items-center justify-between text-oled-muted text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="ml-2 font-bold text-oled-text">ayush@patna-edge:~ /var/sys/stack</span>
            </div>
            <div>TOTAL {filteredCategories.length} DIRECTORIES</div>
          </div>

          {/* Directory Content Listing */}
          <div className="p-4 sm:p-6 space-y-6">
            <div className="text-oled-muted text-[11px] border-b border-oled-border/40 pb-2 flex justify-between font-mono">
              <span>PERMISSIONS LINKS OWNER SIZE DATE DIRECTORY_NAME / STACK_ITEMS</span>
            </div>

            {filteredCategories.length === 0 ? (
              <div className="py-8 text-center text-oled-muted">
                No matching stack modules found for &quot;{searchQuery}&quot;
              </div>
            ) : (
              filteredCategories.map((cat, catIdx) => (
                <motion.div
                  key={cat.key}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.4, delay: catIdx * 0.1 }}
                  className="space-y-3"
                >
                  <div className="flex flex-wrap items-center space-x-3 text-oled-text">
                    <span className="text-signal-green">{cat.permissions}</span>
                    <span className="text-oled-muted">{cat.links}</span>
                    <span className="text-signal-amber">{cat.owner}</span>
                    <span className="text-oled-muted">{cat.size}</span>
                    <span className="text-oled-muted">{cat.date}</span>
                    <span className="text-signal-cyan font-bold flex items-center space-x-1">
                      <span>{cat.name}/</span>
                    </span>
                  </div>

                  {/* Items Grid */}
                  <div className="pl-4 sm:pl-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {cat.items.map((item) => (
                      <div
                        key={item}
                        onMouseEnter={() => audioEngine.playHover()}
                        className="flex items-center space-x-2 p-2.5 rounded bg-oled-surface/60 border border-oled-border/60 hover:border-signal-cyan hover:bg-oled-surface transition-colors cursor-pointer"
                        data-cursor-text="STACK"
                      >
                        <span className="w-2 h-2 rounded-full bg-signal-cyan animate-pulse" />
                        <span className="text-oled-text font-mono truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Terminal Footer */}
          <div className="px-4 py-2.5 border-t border-oled-border bg-oled-bg text-[10px] text-oled-muted flex items-center justify-between">
            <span className="text-signal-green">&gt; exit status 0 (system stack initialized)</span>
            <span>MEM_USAGE: 42MB</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
