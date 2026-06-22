'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Calendar, Check, Copy } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { useCursor } from '../cursor/useCursor';
import { gsap } from '@/lib/gsap';

export const Contact: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word heading reveal
      gsap.fromTo('.contact-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Subtext fade in
      gsap.fromTo('.contact-subtext',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-subtext',
            start: 'top 85%',
          }
        }
      );

      // Cards stagger up
      gsap.fromTo('.contact-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-cards-grid',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayushkumar9315983@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactCards = [
    {
      id: 'email',
      icon: copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Mail className="w-5 h-5 text-accent-glow" />,
      label: 'Email Address',
      value: 'ayushkumar9315983@gmail.com',
      actionText: copied ? 'Copied ✓' : 'Copy Email',
      onClick: handleCopyEmail,
      cursorText: 'COPY',
    },
    {
      id: 'linkedin',
      icon: <Linkedin className="w-5 h-5 text-accent-glow" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ayush-kumar-94310522a',
      actionText: 'Connect ↗',
      onClick: () => window.open('https://www.linkedin.com/in/ayush-kumar-94310522a', '_blank'),
      cursorText: 'OPEN',
    },
    {
      id: 'github',
      icon: <Github className="w-5 h-5 text-accent-glow" />,
      label: 'GitHub',
      value: 'github.com/ayush931',
      actionText: 'Follow ↗',
      onClick: () => window.open('https://github.com/ayush931', '_blank'),
      cursorText: 'OPEN',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16 flex flex-col justify-center items-center text-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/[0.005] to-accent-glow/[0.01] pointer-events-none" />

      <div className="w-full max-w-4xl space-y-12 relative z-10">
        
        {/* Header eyebrow */}
        <div className="font-mono text-xs text-accent-primary uppercase tracking-widest">
          &gt; 06. Contact
        </div>

        {/* Large display header (Word-by-word reveal) */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight select-none leading-none">
          {["Let's", 'build', 'something.'].map((word, wIdx) => (
            <span key={wIdx} className="contact-word inline-block mr-3 opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* Subtext */}
        <p className="contact-subtext opacity-0 max-w-xl mx-auto text-sm md:text-base text-text-secondary leading-relaxed font-sans">
          Open to full-time engineering roles, remote opportunities, and interesting codebase challenges.
        </p>

        {/* Three contact cards in a row */}
        <div className="contact-cards-grid grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-6">
          {contactCards.map((card) => (
            <div
              key={card.id}
              onClick={card.onClick}
              className="contact-card opacity-0 bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1 group relative overflow-hidden"
              onMouseEnter={() => {
                setCursorType('hover');
                setCursorText(card.cursorText);
              }}
              onMouseLeave={() => {
                setCursorType('default');
                setCursorText('');
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.01] to-accent-glow/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon container */}
              <div className="w-12 h-12 rounded-full bg-bg-elevated border border-border-subtle flex items-center justify-center transition-colors duration-300 group-hover:border-accent-primary/30">
                {card.icon}
              </div>

              {/* Labels */}
              <div className="space-y-1 text-center">
                <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-wider block">
                  {card.label}
                </span>
                <span className="text-xs text-text-secondary font-mono block truncate max-w-[200px]">
                  {card.value}
                </span>
              </div>

              {/* Action text */}
              <span className="mt-2 font-mono text-[10px] uppercase text-accent-primary group-hover:text-accent-glow transition-colors duration-300">
                {card.actionText}
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Book Card */}
        <div className="pt-8">
          <a
            href="https://cal.com/ayushkumar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border-subtle bg-bg-surface hover:bg-bg-elevated text-xs font-mono text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95 magnetic-pull"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText('CALENDAR');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
          >
            <Calendar className="w-3.5 h-3.5 text-accent-primary" />
            <span>Or book a 15-min call &rarr;</span>
          </a>
        </div>

      </div>
    </section>
  );
};
export default Contact;
