'use client';

import React, { useEffect, useRef } from 'react';
import ProjectCard from '../ui/ProjectCard';
import { Github } from '../icons';
import { ArrowRight } from 'lucide-react';
import { useCursor } from '../cursor/useCursor';
import { gsap } from '@/lib/gsap';

export const Projects: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card-reveal',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">&gt; 04. Projects</span>
          <h2 className="text-h2 font-display text-text-primary">
            Featured Systems
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 grid-rows-auto md:grid-rows-[minmax(320px,_auto)_minmax(280px,_auto)]"
        >
          
          {/* Project 1 — DocStream (colspan: 2, rowspan: 1) */}
          <ProjectCard
            label="Currently Building · Private"
            title="DocStream"
            subtitle="Document Conversion Platform"
            description="A 4-microservice pipeline converting PDFs and scanned images into structured XML and EPUB — used in production at NexoGrafix."
            highlights={[
              'OCR engine: PaddleOCR + Tesseract via Celery workers + RabbitMQ',
              'FastAPI backend, React frontend, PostgreSQL + Redis for job state',
              'EPUB 3 output with automated TOC, JATS/DocBook XML schema support',
            ]}
            tech={['FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'PostgreSQL', 'React', 'Docker']}
            isPrivate={true}
            image="/projects/docstream_mockup.png"
            className="md:col-span-2 row-span-1 project-card-reveal opacity-0"
          />

          {/* Project 3 — RideSync (colspan: 1, rowspan: 2) */}
          <ProjectCard
            label="Open Source"
            title="RideSync"
            subtitle="Real-Time Ride Booking App"
            description="A full-stack mobile application featuring live tracking, interactive routes, and instant notifications. Optimized for cellular performance."
            highlights={[
              'Real-time GPS tracking and live directions using Mapbox APIs',
              'Clerk secure authentication, Neon PostgreSQL integration',
              'Zustand global state and optimized Expo builds',
            ]}
            tech={['React Native', 'Expo', 'Clerk', 'Neon PostgreSQL', 'Zustand']}
            github="https://github.com/ayush931/RideSync"
            image="/projects/ridesync_mockup.png"
            className="md:col-span-1 md:row-span-2 project-card-reveal opacity-0"
          />

          {/* Project 2 — Excalidraw Clone (colspan: 1, rowspan: 1) */}
          <ProjectCard
            label="Open Source"
            title="Excalidraw Clone"
            subtitle="Real-Time Collaborative Whiteboard"
            description="A real-time whiteboard for collaborative design. Handles concurrent connections smoothly."
            tech={['Next.js', 'WebSockets', 'PostgreSQL', 'Turborepo', 'TypeScript']}
            github="https://github.com/ayush931/excalidraw"
            image="/projects/excalidraw_mockup.png"
            className="md:col-span-1 row-span-1 project-card-reveal opacity-0"
          />

          {/* GitHub CTA card (colspan: 1, rowspan: 1) */}
          <div
            className="glow-border-wrapper h-full md:col-span-1 row-span-1 project-card-reveal opacity-0"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText('GITHUB');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
          >
            <div className="glow-border-bg" />
            <a
              href="https://github.com/ayush931"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-border-content p-8 flex flex-col justify-between h-full bg-bg-surface group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.02] to-accent-glow/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <span className="font-mono text-[9px] md:text-[10px] text-text-tertiary uppercase tracking-widest">
                  Explore More
                </span>
                <div className="space-y-1">
                  <h3 className="font-display text-xl font-bold text-text-primary flex items-center gap-2 group-hover:text-accent-primary transition-colors duration-300">
                    <span>GitHub Activity</span>
                    <ArrowRight className="w-4 h-4 text-text-tertiary group-hover:text-accent-primary group-hover:translate-x-1 transition-all duration-300" />
                  </h3>
                  <p className="font-mono text-[10px] md:text-xs text-text-tertiary">
                    ayush931
                  </p>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-sans">
                  Checkout my other open-source templates, libraries, and microservices in Patna and beyond.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-6 border-t border-border-subtle/40 relative z-10">
                <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center text-text-secondary group-hover:text-text-primary group-hover:border-accent-primary/40 transition-colors duration-300">
                  <Github className="w-4 h-4" />
                </div>
                <span className="font-mono text-[10px] uppercase text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  View all repositories
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
export default Projects;
