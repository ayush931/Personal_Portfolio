'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../cursor/useCursor';

interface TimelineItemProps {
  role: string;
  company: string;
  period: string;
  points: string[];
  tech: string[];
  index: number;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  role,
  company,
  period,
  points,
  tech,
  index,
}) => {
  const { setCursorType, setCursorText } = useCursor();

  return (
    <div className="relative flex md:gap-8 group pl-8 md:pl-0">
      
      {/* Connector line (desktop only) */}
      <div className="hidden md:block absolute left-[30px] top-[31px] w-[18px] h-[1.5px] bg-border-subtle group-hover:bg-accent-primary/40 transition-colors duration-300 pointer-events-none" />
      
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-[30px] top-6 flex items-center justify-center -translate-x-1/2 z-10">
        
        {/* Pulser Dot */}
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: [1, 1.4, 1] }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="w-3.5 h-3.5 rounded-full bg-accent-primary border-2 border-bg-void shadow-[0_0_10px_var(--accent-glow-shadow)] relative"
        >
          <span className="absolute inset-0 rounded-full bg-accent-primary/30 animate-ping" />
        </motion.div>
      </div>

      {/* Experience Card */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
        className="w-full md:ml-12 bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-2xl p-6 md:p-8 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_10px_30px_var(--card-shadow-hover)]"
        onMouseEnter={() => {
          setCursorType('hover');
          setCursorText('VIEW');
        }}
        onMouseLeave={() => {
          setCursorType('default');
          setCursorText('');
        }}
      >
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <h3 className="font-display text-lg md:text-xl font-bold text-text-primary">
            {company}
          </h3>
          <span className="font-mono text-[10px] md:text-xs text-text-tertiary uppercase tracking-wider bg-bg-elevated px-3 py-1 rounded-full border border-border-subtle/55 self-start sm:self-auto">
            {period}
          </span>
        </div>

        {/* Second Row: Role Title */}
        <div className="font-mono text-xs md:text-sm font-semibold text-accent-primary mb-4">
          {role}
        </div>

        {/* Bullet Points (Action + Outcome format) */}
        <ul className="space-y-3 mb-6 text-xs md:text-sm leading-relaxed text-text-secondary list-disc pl-4 font-sans">
          {points.map((pt, pIdx) => (
            <li key={pIdx} className="hover:text-text-primary transition-colors duration-200">
              {pt}
            </li>
          ))}
        </ul>

        {/* Bottom Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-border-subtle/50">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-bg-elevated border border-border-subtle text-text-tertiary hover:border-accent-glow/50 hover:text-text-primary transition-all duration-300"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
export default TimelineItem;
