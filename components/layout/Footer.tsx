'use client';

import React from 'react';
import { Mail } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { useCursor } from '../cursor/useCursor';

export const Footer: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'github', label: 'Activity' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="w-full bg-bg-void border-t border-border-subtle/80 py-12 px-6 md:px-12 relative z-10 select-none">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        
        {/* Top half */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-border-subtle/40">
          
          {/* Left: Brand Monogram */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-text-primary tracking-wider">AK</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-widest">
              Ayush Kumar
            </span>
          </div>

          {/* Center: Nav links */}
          <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[10px] uppercase font-mono tracking-widest text-text-secondary hover:text-text-primary transition-colors duration-250"
                onMouseEnter={() => {
                  setCursorType('hover');
                  setCursorText(item.label.toUpperCase());
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  setCursorText('');
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: Social icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ayush931"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle hover:border-accent-primary/40 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ayush-kumar-94310522a"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle hover:border-accent-primary/40 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:ayushkumar9315983@gmail.com"
              className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle hover:border-accent-primary/40 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95"
              onMouseEnter={() => setCursorType('hover')}
              onMouseLeave={() => setCursorType('default')}
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Bottom half */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-[10px] font-mono text-text-tertiary">
          <div>
            Designed &amp; engineered by Ayush Kumar &middot; Next.js &bull; Three.js &bull; Framer Motion
          </div>
          <div>
            &copy; 2026 &middot; Made with obsession in Patna, India
          </div>
        </div>

      </div>
    </footer>
  );
};
export default Footer;
