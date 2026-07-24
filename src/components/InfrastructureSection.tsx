"use client";

import React, { useState } from "react";
import { Hash, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface SkillCategory {
  name: string;
  key: string;
  items: string[];
}

export const InfrastructureSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudioFeedback();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories: SkillCategory[] = [
    {
      name: "Languages",
      key: "languages",
      items: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C++"],
    },
    {
      name: "Frontend Architecture",
      key: "frontend",
      items: ["React.js", "Next.js", "React Native (Expo)", "HTML5 / CSS3", "Tailwind CSS", "Redux Toolkit", "GraphQL"],
    },
    {
      name: "Backend & Microservices",
      key: "backend",
      items: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "WebSockets", "Event-Driven Architecture"],
    },
    {
      name: "Auth & Security",
      key: "security",
      items: ["JWT", "OAuth 2.0", "RBAC"],
    },
    {
      name: "Databases & ORMs",
      key: "databases",
      items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma ORM", "Neon Serverless PostgreSQL"],
    },
    {
      name: "DevOps & Cloud",
      key: "devops",
      items: ["Docker", "Kubernetes", "AWS (EC2, S3)", "CI/CD (GitHub Actions)", "Vercel"],
    },
    {
      name: "Message Brokers",
      key: "messaging",
      items: ["RabbitMQ", "Apache Kafka"],
    },
    {
      name: "Tools & Practices",
      key: "tools",
      items: ["Git / GitHub", "Postman", "Turborepo (Monorepos)", "Linux", "Agile / Scrum", "System Design"],
    },
  ];

  const filteredCategories = categories
    .filter((cat) => activeCategory === "all" || cat.key === activeCategory)
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase())),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <section id="infrastructure" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/3 w-[500px] h-[500px] rounded-full bg-cyber-accent/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cyber-border/40 pb-5"
        >
          <div>
            <div className="text-xs font-medium text-cyber-accent-light uppercase tracking-wider flex items-center space-x-2">
              <Hash className="w-3.5 h-3.5" />
              <span>Technical Skills</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-cyber-text mt-2">
              Stack & Infrastructure
            </h2>
          </div>
        </motion.div>

        <div className="p-4 solid-panel rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-cyber-muted flex items-center space-x-1 mr-1 text-[11px] font-medium">
              <Filter className="w-3 h-3 text-cyber-accent-light" />
              <span>Filter:</span>
            </span>
            <button
              onClick={() => { playClickSound(); setActiveCategory("all"); }}
              onMouseEnter={playHoverSound}
              className={`px-3 py-1 rounded-full text-xs transition-colors ${
                activeCategory === "all" ? "bg-cyber-accent text-cyber-bg font-bold" : "bg-cyber-surface text-cyber-muted hover:text-cyber-text border border-cyber-border/30"
              }`}
            >All</button>
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => { playClickSound(); setActiveCategory(c.key); }}
                onMouseEnter={playHoverSound}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  activeCategory === c.key ? "bg-cyber-accent text-cyber-bg font-bold" : "bg-cyber-surface text-cyber-muted hover:text-cyber-text border border-cyber-border/30"
                }`}
              >{c.name}</button>
            ))}
          </div>
          <div className="flex items-center space-x-2 bg-cyber-surface/60 border border-cyber-border/30 rounded-full px-3 py-1.5 w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-cyber-muted" />
            <input type="text" placeholder="Search..." className="bg-transparent text-xs text-cyber-text placeholder-cyber-muted focus:outline-none w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="solid-panel rounded-2xl border border-cyber-border/20 overflow-hidden">
          <div className="px-5 py-3 bg-cyber-card/60 border-b border-cyber-border/20 flex items-center justify-between text-cyber-muted text-[11px]">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 inline-block" />
              <span className="ml-2 font-bold text-cyber-text">Capability Matrix</span>
            </div>
            <div>{filteredCategories.length} Categories</div>
          </div>

          <div className="p-6 space-y-6">
            {filteredCategories.length === 0 ? (
              <div className="py-8 text-center text-cyber-muted text-xs">No results for &quot;{searchQuery}&quot;</div>
            ) : (
              filteredCategories.map((cat) => (
                <div key={cat.key} className="space-y-3">
                  <div className="flex items-center space-x-2 text-cyber-text text-xs">
                    <span className="text-cyber-accent-light font-bold">{cat.name}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {cat.items.map((item) => (
                      <div key={item} className="flex items-center space-x-2 p-2.5 rounded-xl bg-cyber-surface/30 border border-cyber-border/20 hover:border-cyber-accent/15 transition-all text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyber-accent-light" />
                        <span className="text-cyber-text font-medium truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};