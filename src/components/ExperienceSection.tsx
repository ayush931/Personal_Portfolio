"use client";

import React, { useState } from "react";
import { Briefcase, GitBranch, CheckCircle2, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  metricHero: string;
  metricLabel: string;
  description: string[];
  techStack: string[];
  architectureDetail: string;
}

export const ExperienceSection: React.FC = () => {
  const { playHoverSound, playClickSound } = useAudioFeedback();
  const [activeTab, setActiveTab] = useState<string>("nexografix");

  const experiences: ExperienceItem[] = [
    {
      id: "nexografix",
      role: "Junior Software Engineer",
      company: "NexoGrafix Private Limited",
      period: "Apr 2026 – Present",
      location: "Patna, India",
      metricHero: "45%",
      metricLabel: "Processing turnaround reduction via FastAPI microservices",
      description: [
        "Built a Word add-in (TypeScript, Office.js) to automate style enforcement – cut manual formatting effort 60% for a 15-person editorial team.",
        "Architected a 4-microservice document conversion platform (FastAPI, React), reducing processing turnaround 45%.",
        "Automated TOC generation for XML/EPUB pipelines (JATS, DocBook schemas), cutting QA review time 35%.",
      ],
      techStack: ["TypeScript", "React.js", "FastAPI", "Python", "Office.js", "XML/EPUB", "REST APIs"],
      architectureDetail: "4-Microservice Document Engine with Office.js Add-in & Automated TOC Parsing",
    },
    {
      id: "shipu",
      role: "Software Engineer Intern",
      company: "ShipU Logistics Private Limited",
      period: "Sep 2025 – Mar 2026",
      location: "Patna, India",
      metricHero: "25%",
      metricLabel: "Database query performance improvement",
      description: [
        "Built a real-time logistics platform (PERN) with shipment tracking, delivery workflows, and RBAC – improved database query performance 25%.",
        "Deployed event-driven microservices (RabbitMQ, Docker) across 3 AWS environments, accelerating deployment velocity 30%.",
        "Migrated the codebase to a Turborepo monorepo, sharing utility packages across 6 services – cut duplicate code 35%.",
      ],
      techStack: ["PERN Stack", "PostgreSQL", "Express.js", "React.js", "Node.js", "RabbitMQ", "Docker", "AWS", "Turborepo"],
      architectureDetail: "Event-Driven Microservices on AWS with RabbitMQ & Turborepo Monorepo",
    },
    {
      id: "shabra",
      role: "Software Engineer Intern",
      company: "Shabra Softech Solution Pvt. Ltd.",
      period: "Feb 2025 – Aug 2025",
      location: "Patna, India",
      metricHero: "40%",
      metricLabel: "Code reuse increase via monorepo migration",
      description: [
        "Migrated a legacy MERN monolith to a Turborepo monorepo, boosting code reuse across platforms 40%.",
        "Shipped Next.js web apps and React Native mobile apps for 1,000+ active users, built on shared component libraries.",
        "Secured access with JWT, OAuth 2.0, and RBAC – cut login-related support tickets 50%.",
      ],
      techStack: ["MERN Stack", "Next.js", "React Native", "Expo", "Turborepo", "JWT", "OAuth 2.0", "RBAC"],
      architectureDetail: "MERN to Turborepo Monorepo Migration with Shared UI & OAuth2/RBAC Security",
    },
  ];

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-cyber-accent/3 blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full space-y-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-cyber-border/40 pb-5"
        >
          <div>
            <div className="text-xs font-medium text-cyber-accent-light uppercase tracking-wider flex items-center space-x-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Experience</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-cyber-text mt-2">
              Engineering Impact
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => {
            const isSelected = activeTab === exp.id;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  onClick={() => { playClickSound(); setActiveTab(exp.id); }}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer overflow-hidden group ${
                    isSelected
                      ? "solid-panel border-cyber-accent/20"
                      : "solid-panel border-cyber-border/30 hover:border-cyber-accent/10"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs text-cyber-muted mb-3">
                    <span className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-cyber-accent" : "bg-cyber-muted"}`} />
                      <span className="text-cyber-text font-bold truncate max-w-[150px]">{exp.company}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyber-surface border border-cyber-border/30 text-[10px] font-mono">{exp.period}</span>
                  </div>
                  <div className="space-y-1 my-4">
                    <div className="text-3xl sm:text-4xl font-black text-gradient-warm font-mono tracking-tight">{exp.metricHero}</div>
                    <div className="text-[11px] text-cyber-accent-light tracking-tight font-medium line-clamp-2">{exp.metricLabel}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-cyber-border/20 text-xs">
                    <span className="text-cyber-text font-semibold truncate">{exp.role}</span>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? "rotate-90 text-cyber-accent" : "text-cyber-muted"}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {experiences.filter((e) => e.id === activeTab).map((exp) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="solid-panel p-7 sm:p-8 rounded-2xl border border-cyber-accent/10 space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cyber-border/20 pb-4">
              <div>
                <h3 className="text-lg font-bold text-cyber-text">{exp.role} @ <span className="text-cyber-accent-light">{exp.company}</span></h3>
                <div className="text-xs font-mono text-cyber-muted mt-1 flex items-center space-x-2">
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Architecture: {exp.architectureDetail}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-cyber-muted">
                <span>{exp.location}</span>
                <span className="px-3 py-1 bg-cyber-surface border border-cyber-border/30 text-cyber-accent-light rounded-full text-[11px]">{exp.period}</span>
              </div>
            </div>
            <div className="space-y-3 text-sm text-cyber-muted leading-relaxed">
              {exp.description.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-4 h-4 text-cyber-accent-light shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-cyber-border/20">
              <div className="text-[11px] font-mono text-cyber-muted mb-3 uppercase font-medium">Technologies</div>
              <div className="flex flex-wrap gap-2">
                {exp.techStack.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-cyber-surface border border-cyber-border/30 rounded-full text-xs font-mono text-cyber-text hover:border-cyber-accent/20 transition-colors">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};