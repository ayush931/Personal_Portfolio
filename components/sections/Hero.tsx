'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Github } from '../icons';
import { useCursor } from '../cursor/useCursor';
import { gsap } from '@/lib/gsap';
import StatCounter from '../ui/StatCounter';

// Typewriter cycling list
const roles = [
  'Full Stack Engineer',
  'Microservices Architect',
  'React Native Developer',
  'Backend Systems Builder'
];

const Typewriter: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1800);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index]);

  useEffect(() => {
    setText(roles[index].substring(0, subIndex));
  }, [subIndex, index]);

  return <span className="typewriter-cursor text-accent-primary">{text}</span>;
};

export const Hero: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 0.0s — "Hi, I'm" / Eyebrow fades up
      tl.fromTo('.hero-eyebrow',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      // 0.3s — "Ayush Kumar" letters slide in from left
      tl.fromTo('.name-char',
        { x: -15, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.03 },
        0.2
      );

      // 0.7s — Role typewriter displays
      tl.fromTo('.hero-role',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4 },
        0.5
      );

      // 1.0s — Subtext fades in
      tl.fromTo('.hero-subtext',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.8
      );

      // 1.3s — CTAs staggered slide up
      tl.fromTo('.hero-cta-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.1 },
        1.1
      );

      // 1.5s — Stats row fades in
      tl.fromTo('.hero-stats',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.3
      );

      // 1.6s — Profile image clip-path reveal (left -> right)
      tl.fromTo('.hero-profile-container',
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power3.inOut' },
        1.4
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const name = "Ayush Kumar.";

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center py-20 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        
        {/* Left Side Info */}
        <div className="flex-1 space-y-6 text-left max-w-2xl">
          {/* Eyebrow */}
          <div className="hero-eyebrow text-xs font-mono text-text-tertiary tracking-widest uppercase">
            &gt; ayush.kumar ~ portfolio
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h1 className="text-hero font-display text-text-primary select-none leading-none">
              Hi, I'm <br />
              <span className="inline-block">
                {name.split('').map((char, index) => (
                  <span key={index} className="name-char inline-block">
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h1>
            
            {/* Typewriter role cycling */}
            <div className="hero-role text-xl sm:text-2xl font-mono h-8 flex items-center">
              <Typewriter />
            </div>
          </div>

          {/* Subtext */}
          <p className="hero-subtext text-text-secondary text-sm md:text-base leading-relaxed max-w-xl font-sans">
            I build production systems that scale — from OCR microservices and event-driven pipelines to real-time mobile apps. Currently at NexoGrafix. Open to my next challenge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Explore Work */}
            <a
              href="#projects"
              className="hero-cta-btn relative overflow-hidden rounded-full p-[1px] font-mono text-xs font-bold text-text-primary hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 magnetic-pull"
              onMouseEnter={() => {
                setCursorType('hover');
                setCursorText('WORK');
              }}
              onMouseLeave={() => {
                setCursorType('default');
                setCursorText('');
              }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600" />
              <span className="relative flex items-center gap-1.5 px-6 py-3 bg-bg-void rounded-full hover:bg-transparent transition-colors duration-300">
                Explore Work <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            {/* Download Resume */}
            <a
              href="/Ayush_Full_Stack_Developer_Resume.pdf"
              download
              className="hero-cta-btn rounded-full border border-border-subtle bg-bg-surface hover:bg-bg-elevated hover:border-accent-primary/40 font-mono text-xs font-bold text-text-primary px-6 py-3.5 flex items-center gap-1.5 transition-all duration-300 hover:scale-105 active:scale-95 magnetic-pull"
              onMouseEnter={() => {
                setCursorType('hover');
                setCursorText('RESUME');
              }}
              onMouseLeave={() => {
                setCursorType('default');
                setCursorText('');
              }}
            >
              Download Resume <Download className="w-3.5 h-3.5" />
            </a>

            {/* GitHub Profile */}
            <a
              href="https://github.com/ayush931"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-btn w-11 h-11 rounded-full border border-border-subtle bg-bg-surface hover:bg-bg-elevated hover:border-accent-primary/40 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95 magnetic-pull"
              onMouseEnter={() => {
                setCursorType('hover');
                setCursorText('GITHUB');
              }}
              onMouseLeave={() => {
                setCursorType('default');
                setCursorText('');
              }}
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>

          {/* Stats Row */}
          <div className="hero-stats grid grid-cols-3 divide-x divide-border-subtle/60 border-t border-b border-border-subtle/50 py-4 max-w-xl">
            <StatCounter value="3" label="Companies Shipped" />
            <StatCounter value="1,000+" label="Users in Prod" />
            <StatCounter value="6" label="Production Systems Built" />
          </div>
        </div>

        {/* Right Side Image (Profile photo) */}
        <div 
          className="hero-profile-container relative w-64 h-64 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] rounded-full overflow-hidden border border-border-subtle p-3 flex items-center justify-center bg-bg-surface"
          style={{ clipPath: 'inset(0 100% 0 0)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-primary to-accent-glow opacity-[0.03] pointer-events-none" />
          
          <img
            src="/avatar.png"
            alt="Ayush Kumar avatar"
            className="w-full h-full rounded-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500 hover:scale-105"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText('AYUSH');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        onClick={handleScrollDown}
        className="absolute bottom-6 flex flex-col items-center gap-1.5 cursor-pointer text-text-tertiary hover:text-text-primary transition-colors duration-300"
        onMouseEnter={() => setCursorType('hover')}
        onMouseLeave={() => setCursorType('default')}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
};
export default Hero;
