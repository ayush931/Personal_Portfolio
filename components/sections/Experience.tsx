'use client';

import React, { useEffect, useRef } from 'react';
import TimelineItem from '../ui/TimelineItem';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const experiences = [
  {
    role: 'Junior Software Engineer',
    company: 'NexoGrafix Private Limited',
    period: 'Apr 2026 – Present',
    points: [
      'Built a TypeScript Word Add-in (Office.js) that enforced client style guides automatically — eliminating 60% of manual document review effort',
      'Architected DocStream: a 4-service OCR → XML → EPUB pipeline (FastAPI + React) with independent scaling per microservice',
      'Shipped XML + EPUB generation engines supporting JATS/DocBook schemas with automated TOC, chapter splitting, and a validation report engine',
    ],
    tech: ['TypeScript', 'Office.js API', 'FastAPI', 'React.js', 'Microservices', 'JATS/DocBook'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'ShipU Logistics Private Limited',
    period: 'Sept 2025 – Jan 2026',
    points: [
      'Designed a full logistics platform (MERN + Next.js) with shipment tracking, delivery workflows, and RBAC — serving real operational data',
      'Cut backend response time 25% via PostgreSQL query optimisation + Prisma ORM connection pooling',
      'Reduced code duplication 35% by structuring services in a Turborepo monorepo with shared modules across Docker-deployed AWS environments',
    ],
    tech: ['Next.js', 'MERN Stack', 'PostgreSQL', 'Prisma ORM', 'RabbitMQ', 'Docker', 'AWS', 'Turborepo'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Shabra Softech Solution Pvt. Ltd.',
    period: 'Feb 2025 – Jul 2025',
    points: [
      'Migrated a MERN monolith → Turborepo monorepo — boosting code reuse 40% and delivering features 30% faster across teams',
      'Shipped Next.js + React Native apps serving 1,000+ monthly active users with shared UI packages and Redux Toolkit state',
      'Secured auth layer with JWT + OAuth 2.0 + RBAC, cutting auth incidents 50% while hitting 95%+ on-time sprint delivery',
    ],
    tech: ['React Native', 'Next.js', 'Zustand', 'Turborepo', 'JWT', 'OAuth 2.0', 'RBAC'],
  },
];

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (fillLineRef.current) {
        gsap.fromTo(fillLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 50%',
              end: 'bottom 75%',
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">&gt; 03. Experience</span>
          <h2 className="text-h2 font-display text-text-primary">
            Career Timeline
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative mt-12 space-y-12">
          
          {/* Vertical spine */}
          <div className="absolute left-[6px] md:left-[30px] top-6 bottom-6 w-[2px] bg-border-subtle pointer-events-none">
            {/* Scroll Fill Indicator */}
            <div
              ref={fillLineRef}
              className="w-full h-full bg-accent-primary origin-top transform scale-y-0 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            />
          </div>

          {/* Experience items */}
          {experiences.map((exp, idx) => (
            <TimelineItem
              key={exp.company}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              points={exp.points}
              tech={exp.tech}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
