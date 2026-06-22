'use client';

import React, { useEffect, useRef } from 'react';
import { useCursor } from '../cursor/useCursor';
import TerminalCard from '../ui/TerminalCard';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export const About: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient or visual accent animation
      gsap.fromTo('.about-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: aboutRef.current,
            start: 'top 85%',
          }
        }
      );

      // Line-by-line wipe animation using clipPath mask
      gsap.fromTo('.about-p',
        { clipPath: 'inset(0 100% 0 0)', opacity: 0.2 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          stagger: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-p-container',
            start: 'top 80%',
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-24 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="about-title opacity-0 text-left space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">&gt; 01. About Me</span>
          <h2 className="text-h2 font-display text-text-primary">
            Engineering &amp; Strategy
          </h2>
        </div>

        {/* Layout Split */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          {/* Left: Bio (60% width) */}
          <div className="md:col-span-3 space-y-6 about-p-container">
            <p 
              className="about-p text-sm md:text-base text-text-secondary leading-relaxed font-sans"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              I'm a Full Stack Engineer based in Patna, India, currently building <span className="text-text-primary font-semibold">DocStream</span> at NexoGrafix — a document conversion platform (OCR &rarr; XML &rarr; EPUB) in a microservices architecture using FastAPI, React, and RabbitMQ. I specialize in data structures, API design, and performance tuning.
            </p>
            <p 
              className="about-p text-sm md:text-base text-text-secondary leading-relaxed font-sans"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              I hold an <span className="text-text-primary font-semibold">MBA in Marketing</span> alongside my engineering background. That unique combination means I can architect a Celery worker queue AND write the PRD for why it needs to exist.
            </p>
            <p 
              className="about-p text-sm md:text-base text-text-secondary leading-relaxed font-sans"
              style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
              Previously at ShipU Logistics and Shabra Softech, where I shipped production systems, migrated a legacy monolith to a Turborepo monorepo, and helped serve 1,000+ monthly active users.
            </p>
          </div>

          {/* Right: Terminal (40% width) */}
          <div 
            className="md:col-span-2 w-full"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText('SHELL');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
          >
            <TerminalCard />
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
