'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useReducedMotion, motion, useScroll, useSpring } from 'framer-motion';

// Layout & Core
import Navbar from '@/components/layout/Navbar';
import FloatingContact from '@/components/layout/FloatingContact';
import Footer from '@/components/layout/Footer';
import { useSmoothScroll } from '@/lib/lenis';

// Sections
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import GitHub from '@/components/sections/GitHub';
import Contact from '@/components/sections/Contact';

// Lazy-loaded Three.js canvas background
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [loadCanvas, setLoadCanvas] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Scroll Progress logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 1. Initialize Lenis smooth scroll
  useSmoothScroll();

  // 2. Delay loading the Three.js Canvas to prioritize initial LCP painting
  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = setTimeout(() => {
      setLoadCanvas(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  // 3. Track active section based on scroll offset
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'github', 'contact'];
      const threshold = 160; // top-of-viewport offset

      let currentSection = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-bg-void text-text-secondary overflow-x-hidden">
      
      {/* Scroll Progress Indicator Bar */}
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {/* Decorative ambient glowing gradient blobs */}
      <div className="absolute top-[10%] left-[-15%] w-[45rem] h-[45rem] rounded-full bg-accent-primary/5 filter blur-[120px] pointer-events-none animate-blob -z-20" />
      <div className="absolute top-[45%] right-[-15%] w-[45rem] h-[45rem] rounded-full bg-accent-glow/5 filter blur-[130px] pointer-events-none animate-blob -z-20" />
      <div className="absolute bottom-[10%] left-[-20%] w-[50rem] h-[50rem] rounded-full bg-accent-primary/4 filter blur-[140px] pointer-events-none animate-blob -z-20" />

      {/* ThreeJS Background Canvas */}
      {!prefersReducedMotion && loadCanvas && <ParticleCanvas />}

      {/* Floating UI Elements */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <FloatingContact />

      {/* Page Sections */}
      <main className="flex-1 w-full relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHub />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
