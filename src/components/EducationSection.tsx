"use client";

import React from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const EducationSection: React.FC = () => {
  const degrees = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "IIT Patna and IIIT Ranchi",
      location: "Patna and Ranchi, India",
      period: "2026 – Present",
      type: "Postgraduate",
    },
    {
      degree: "Master of Business Administration (MBA) – Marketing",
      institution: "Impact College, Aryabhatta Knowledge University",
      location: "Patna, India",
      period: "2023 – 2025",
      type: "Postgraduate",
      cgpa: "8.61 / 10 CGPA",
    },
    {
      degree: "Bachelor of Science (Honours) – Chemistry",
      institution: "B.D. College, Patliputra University",
      location: "Patna, India",
      period: "2020 – 2023",
      type: "Undergraduate",
      score: "60.4%",
    },
  ];

  return (
    <section id="education" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-cyber-accent/3 blur-[150px]" />
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
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Education</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-cyber-text mt-2">
              Academic Background
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {degrees.map((d, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="solid-panel p-6 rounded-2xl border border-cyber-border/30 hover:border-cyber-accent/10 transition-all h-full space-y-4">
                <div className="flex items-center justify-between border-b border-cyber-border/20 pb-3 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyber-accent/8 border border-cyber-accent/15 text-cyber-accent-light text-[11px] font-medium">{d.type}</span>
                  <span className="text-cyber-muted flex items-center space-x-1 font-mono text-[11px]">
                    <Calendar className="w-3 h-3" />
                    <span>{d.period}</span>
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-cyber-text leading-snug">{d.degree}</h3>
                  <p className="text-sm text-cyber-accent-light">{d.institution}</p>
                </div>
                {(d.cgpa || d.score) && (
                  <div className="pt-2 border-t border-cyber-border/20">
                    <div className="text-xs text-cyber-muted">Achievement</div>
                    <div className="text-lg font-black text-gradient-warm mt-1 font-mono">{d.cgpa || d.score}</div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};