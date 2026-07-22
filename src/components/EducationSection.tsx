"use client";

import React from "react";
import { GraduationCap, ShieldCheck, CheckCircle2, Building2, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "./TiltCard";

export const EducationSection: React.FC = () => {
  const credentials = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "IIT Patna & IIIT Ranchi",
      location: "Patna and Ranchi, India",
      period: "2026 – PRESENT",
      type: "Post-Graduate Master's Program",
      highlights: [
        "Advanced studies in computer systems, distributed algorithms, and software engineering.",
        "Collaborative academic program under IIT Patna & IIIT Ranchi focusing on system design and scalable architectures.",
      ],
      status: "CURRENTLY_ENROLLED",
      highlightColor: "border-signal-cyan text-signal-cyan bg-signal-cyan/10",
    },
    {
      degree: "Master of Business Administration (MBA)",
      institution: "Impact College, Aryabhatta Knowledge University",
      location: "Patna, India",
      period: "2023 – 2025",
      type: "MBA – Marketing (CGPA: 8.61 / 10)",
      highlights: [
        "Specialization in Strategic Marketing & Data-Driven Product Management.",
        "Quantitative market modeling, customer acquisition metrics, and product lifecycle analysis.",
      ],
      status: "COMPLETED_DEGREE",
      highlightColor: "border-signal-green text-signal-green bg-signal-green/10",
    },
    {
      degree: "Bachelor of Science (B.Sc. Hons)",
      institution: "B.D. College, Patliputra University",
      location: "Patna, India",
      period: "2020 – 2023",
      type: "B.Sc (Hons) Chemistry (60.4%)",
      highlights: [
        "Rigorous analytical training in molecular thermodynamics, chemistry, and physical modeling.",
        "Built core analytical reasoning skills applied directly to software algorithms and data structures.",
      ],
      status: "COMPLETED_DEGREE",
      highlightColor: "border-signal-amber text-signal-amber bg-signal-amber/10",
    },
  ];

  return (
    <section id="education" className="w-full py-16 md:py-24 border-b border-oled-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-oled-border/80 pb-6"
        >
          <div>
            <div className="text-xs font-mono text-signal-cyan uppercase tracking-widest flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>04 // ACADEMIC CREDENTIALS & INSTITUTIONS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-oled-text font-sans mt-2">
              Institutions & Degrees
            </h2>
          </div>
          <p className="text-xs font-mono text-oled-muted max-w-md">
            // Highlighting university credentials at IIT Patna / IIIT Ranchi, AKU, and Patliputra University.
          </p>
        </motion.div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {credentials.map((cred, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40, scale: 0.96, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            >
              <TiltCard depth={12} className="h-full">
                <div className="p-6 bg-oled-card border border-oled-border rounded-lg space-y-6 flex flex-col justify-between hover:border-signal-cyan transition-all group shadow-sm hover:shadow-glow-cyan h-full">
                  <div className="space-y-4">
                    {/* Header Status Badge */}
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={`px-2.5 py-1 rounded border font-semibold flex items-center space-x-1.5 ${cred.highlightColor}`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{cred.status}</span>
                      </span>
                      <span className="text-oled-muted">{cred.period}</span>
                    </div>

                    {/* Highlighted Institution Box */}
                    <div className="p-3.5 rounded bg-oled-surface border border-oled-border/80 group-hover:border-signal-cyan/60 transition-colors space-y-1.5">
                      <div className="text-[10px] font-mono text-oled-muted uppercase tracking-wider flex items-center space-x-1">
                        <Building2 className="w-3 h-3 text-signal-cyan" />
                        <span>INSTITUTION / UNIVERSITY</span>
                      </div>
                      <h3 className="text-lg font-extrabold text-signal-cyan font-sans tracking-tight leading-snug">
                        {cred.institution}
                      </h3>
                      <div className="text-[11px] font-mono text-oled-muted flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-signal-green" />
                        <span>{cred.location}</span>
                      </div>
                    </div>

                    {/* Degree & Program Info */}
                    <div className="space-y-1 pt-1">
                      <div className="text-base font-bold text-oled-text font-sans">
                        {cred.degree}
                      </div>
                      <div className="text-xs font-mono text-signal-amber">
                        {cred.type}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2 pt-3 border-t border-oled-border text-xs font-sans text-oled-muted leading-relaxed">
                      {cred.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-signal-cyan shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
