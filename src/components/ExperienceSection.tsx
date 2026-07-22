"use client";

import React, { useState } from "react";
import { Cpu, Server, GitBranch, ArrowRight, Zap, CheckCircle2, ChevronRight, Download } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

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
  const [activeTab, setActiveTab] = useState<string>("nexografix");

  const experiences: ExperienceItem[] = [
    {
      id: "nexografix",
      role: "Junior Software Engineer",
      company: "NexoGrafix Private Limited",
      period: "APR 2026 – PRESENT",
      location: "Patna, India",
      metricHero: "45%",
      metricLabel: "PROCESSING TURNAROUND REDUCTION VIA FASTAPI MICROSERVICES",
      description: [
        "Architected a 4-microservice document conversion platform using FastAPI and React, cutting processing turnaround by 45%.",
        "Built a custom Word add-in in TypeScript (Office.js) to automate style enforcement, saving 60% manual formatting effort for a 15-person editorial team.",
        "Automated Table of Contents (TOC) generation for XML/EPUB publishing pipelines (JATS, DocBook schemas), cutting QA review time by 35%.",
      ],
      techStack: ["TypeScript", "React.js", "FastAPI", "Python", "Office.js", "XML/EPUB", "REST APIs"],
      architectureDetail: "4-Microservice Document Engine with Office.js Add-in & Automated TOC Parsing",
    },
    {
      id: "shipu",
      role: "Software Engineer Intern",
      company: "ShipU Logistics Private Limited",
      period: "SEP 2025 – MAR 2026",
      location: "Patna, India",
      metricHero: "25%",
      metricLabel: "QUERY PERFORMANCE IMPROVEMENT & 30% FASTER AWS DEPLOYMENT",
      description: [
        "Built a real-time logistics platform (PERN) featuring shipment tracking, delivery workflows, and RBAC – boosting DB query performance by 25%.",
        "Deployed event-driven microservices across 3 AWS cloud environments using RabbitMQ and Docker, accelerating deployment velocity by 30%.",
        "Migrated codebase to a Turborepo monorepo, sharing utility packages across 6 microservices to reduce duplicate code by 35%.",
      ],
      techStack: ["PERN Stack", "PostgreSQL", "Express.js", "React.js", "Node.js", "RabbitMQ", "Docker", "AWS", "Turborepo"],
      architectureDetail: "Event-Driven Microservices on AWS with RabbitMQ Message Queues & Turborepo Monorepo",
    },
    {
      id: "shabra",
      role: "Software Engineer Intern",
      company: "Shabra Softech Solution Pvt. Ltd.",
      period: "FEB 2025 – AUG 2025",
      location: "Patna, India",
      metricHero: "40%",
      metricLabel: "CODE REUSE INCREASE & 50% REDUCTION IN SUPPORT TICKETS",
      description: [
        "Migrated a legacy MERN monolith to a Turborepo monorepo architecture, boosting platform-wide code reuse by 40%.",
        "Shipped Next.js web applications and React Native mobile apps serving 1,000+ active users from shared component libraries.",
        "Secured access control with JWT, OAuth 2.0, and RBAC, cutting auth and login-related support tickets by 50%.",
      ],
      techStack: ["MERN Stack", "Next.js", "React Native", "Expo", "Turborepo", "JWT", "OAuth 2.0", "RBAC"],
      architectureDetail: "MERN to Turborepo Monorepo Migration with Shared UI & OAuth2/RBAC Security",
    },
  ];

  return (
    <section id="experience" className="w-full py-16 md:py-24 border-b border-oled-border bg-tech-grid overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-oled-border/80 pb-6"
        >
          <div>
            <div className="text-xs font-mono text-signal-green uppercase tracking-widest flex items-center space-x-2">
              <Cpu className="w-4 h-4" />
              <span>01 // METRICS-DRIVEN TIMELINE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-oled-text font-sans mt-2">
              Production Engineering & Microservices Experience
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href="/Ayush_Full_Stack_Developer_Resume.pdf"
              download="Ayush_Kumar_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded bg-signal-green text-oled-bg font-mono font-bold text-xs hover:bg-signal-green/90 transition-all flex items-center space-x-2 shadow-glow-green"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD_RESUME.PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Massive Typographic Metrics Overview Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TiltCard
                onClick={() => setActiveTab(exp.id)}
                depth={12}
                className={`p-6 rounded-lg border transition-all cursor-pointer relative overflow-hidden group ${
                  activeTab === exp.id
                    ? "bg-oled-card border-signal-cyan shadow-glow-cyan"
                    : "bg-oled-card/50 border-oled-border hover:border-oled-hover"
                }`}
              >
                {/* Top Meta */}
                <div className="flex items-center justify-between text-xs font-mono text-oled-muted mb-3">
                  <span className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-signal-cyan" />
                    <span className="text-oled-text font-bold truncate max-w-[140px]">{exp.company}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded bg-oled-surface border border-oled-border text-[10px]">
                    {exp.period}
                  </span>
                </div>

                {/* Massive Metric Display */}
                <div className="space-y-1 my-3">
                  <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-signal-cyan via-signal-green to-oled-text font-mono tracking-tighter">
                    {exp.metricHero}
                  </div>
                  <div className="text-[11px] font-mono text-signal-cyan tracking-tight font-semibold line-clamp-2">
                    {exp.metricLabel}
                  </div>
                </div>

                {/* Role Title */}
                <div className="flex items-center justify-between pt-3 border-t border-oled-border text-xs font-mono">
                  <span className="text-oled-text font-bold truncate">{exp.role}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${activeTab === exp.id ? "rotate-90 text-signal-cyan" : "text-oled-muted"}`} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Detailed Breakdown Panel for Active Experience */}
        {experiences
          .filter((e) => e.id === activeTab)
          .map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-lg border border-oled-border bg-oled-card space-y-6"
            >
              {/* Panel Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-oled-border pb-4">
                <div>
                  <h3 className="text-xl font-bold text-oled-text font-sans">
                    {exp.role} @ <span className="text-signal-cyan">{exp.company}</span>
                  </h3>
                  <div className="text-xs font-mono text-signal-amber mt-1 flex items-center space-x-2">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>ARCH: {exp.architectureDetail}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <span className="text-oled-muted">{exp.location}</span>
                  <span className="px-3 py-1 bg-oled-surface border border-oled-border text-signal-green rounded">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 font-sans text-sm text-oled-muted leading-relaxed">
                {exp.description.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-4 h-4 text-signal-cyan shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-4 border-t border-oled-border">
                <div className="text-xs font-mono text-oled-muted mb-3 uppercase tracking-wider">
                  TECHNOLOGY STACK & MICROSERVICES INFRASTRUCTURE
                </div>
                <div className="flex flex-wrap gap-2">
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-oled-surface border border-oled-border rounded text-xs font-mono text-oled-text hover:border-signal-cyan transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

      </div>
    </section>
  );
};
