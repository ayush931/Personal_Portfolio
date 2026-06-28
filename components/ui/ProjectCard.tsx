'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { ExternalLink, Lock } from 'lucide-react';
import { useCursor } from '../cursor/useCursor';
import { Github } from '../icons';

interface ProjectCardProps {
  label: string;
  title: string;
  subtitle: string;
  description?: string;
  highlights?: string[];
  tech: string[];
  github?: string;
  isPrivate?: boolean;
  image?: string;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  label,
  title,
  subtitle,
  description,
  highlights,
  tech,
  github,
  isPrivate = false,
  image,
  className = '',
}) => {
  const { setCursorType, setCursorText, setProjectColor } = useCursor();
  const [isHovered, setIsHovered] = useState(false);

  // Stagger animation rules
  const containerVariants: Variants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const chipVariants: Variants = {
    initial: { y: 15, opacity: 0 },
    hover: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
  };

  const handleCardClick = () => {
    if (!isPrivate && github) {
      window.open(github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`glow-border-wrapper h-full ${!isPrivate && github ? 'cursor-pointer' : ''} ${className}`}
      onClick={handleCardClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursorType('project');
        setCursorText(isPrivate ? 'PRIVATE' : 'OPEN');
        setProjectColor(isPrivate ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)');
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCursorType('default');
        setCursorText('');
        setProjectColor('');
      }}
    >
      {/* Dynamic rotating border path */}
      <div className="glow-border-bg" />

      {/* Card Content Outer */}
      <div className="glow-border-content p-6 md:p-8 flex flex-col justify-between h-full bg-bg-surface overflow-hidden relative group">
        
        {/* Subtle mesh background on card hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.02] to-accent-glow/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Info Area */}
        <div className="space-y-4 relative z-10">
          
          {/* Label status */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] md:text-[10px] text-text-tertiary uppercase tracking-widest">
              {label}
            </span>
            {isPrivate ? (
              <Lock className="w-3.5 h-3.5 text-red-500/80" />
            ) : (
              <Github className="w-3.5 h-3.5 text-text-tertiary" />
            )}
          </div>

          {/* Project Preview Image Mockup */}
          {image && (
            <div className="relative w-full h-40 md:h-44 rounded-xl overflow-hidden bg-bg-elevated border border-border-subtle/60 group/img shadow-inner transition-colors duration-300">
              <img
                src={image}
                alt={`${title} preview`}
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover/img:grayscale-0 group-hover/img:scale-105 group-hover/img:brightness-100 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent pointer-events-none" />
            </div>
          )}

          {/* Heading */}
          <div className="space-y-1">
            <motion.h3
              animate={{ y: isHovered ? -2 : 0 }}
              transition={{ duration: 0.2 }}
              className="font-display text-xl md:text-2xl font-bold text-text-primary flex items-center gap-2"
            >
              {/* Title text */}
              <span>{title}</span>
              {/* Slide-in arrow */}
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                transition={{ duration: 0.2 }}
                className="text-accent-primary"
              >
                &rarr;
              </motion.span>
            </motion.h3>
            <p className="font-mono text-[10px] md:text-xs text-text-tertiary">
              {subtitle}
            </p>
          </div>

          {/* Description */}
          {description && (
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-sans">
              {description}
            </p>
          )}

          {/* Bullet points highlights (if any, like DocStream) */}
          {highlights && (
            <ul className="space-y-2 text-[11px] md:text-xs text-text-secondary pl-3 list-disc font-mono">
              {highlights.map((h, hIdx) => (
                <li key={hIdx}>{h}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Tech stacks chips */}
        <div className="mt-8 relative z-10 space-y-4">
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate={isHovered ? 'hover' : 'initial'}
            className="flex flex-wrap gap-1.5"
          >
            {tech.map((t) => (
              <motion.span
                key={t}
                variants={chipVariants}
                className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-bg-elevated border border-border-subtle text-text-tertiary"
              >
                {t}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Footer link */}
          <div className="flex items-center justify-between pt-3 border-t border-border-subtle/40">
            {isPrivate ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/20 border border-red-500/20 text-[10px] font-mono text-red-400">
                In Production
              </span>
            ) : (
              github && (
                <a
                  href={github}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  GitHub Link <ExternalLink className="w-3 h-3" />
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProjectCard;
