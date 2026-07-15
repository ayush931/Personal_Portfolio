'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, X } from 'lucide-react';
import { useCursor } from '../cursor/useCursor';

export const FloatingContact: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('floating-contact-dismissed') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyOrMail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('ayushkumar9315983@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Open mailto in background
    window.location.href = 'mailto:ayushkumar9315983@gmail.com';
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('floating-contact-dismissed', 'true');
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-[45]"
        >
          <div
            className="relative flex items-center bg-bg-surface border border-border-subtle hover:border-accent-primary/50 shadow-2xl rounded-full p-2 pl-4 pr-3 overflow-hidden select-none transition-colors duration-300"
            onMouseEnter={() => {
              setIsHovered(true);
              setCursorType('hover');
              setCursorText(copied ? 'COPIED' : 'EMAIL');
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setCursorType('default');
              setCursorText('');
            }}
            onClick={handleCopyOrMail}
          >
            {/* Main content wrapper */}
            <div className="flex items-center gap-3">
              {/* Green status indicator */}
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>

              {/* Text area */}
              <div className="flex flex-col pr-2">
                <span className="text-[9px] font-mono tracking-wider text-emerald-400 font-bold uppercase">
                  Open to Work
                </span>
                
                <span className="hidden sm:inline text-xs font-mono text-text-primary">
                  {copied ? 'Copied to Clipboard!' : 'ayushkumar9315983@gmail.com'}
                </span>
                <span className="sm:hidden text-xs font-mono text-text-primary">
                  {copied ? 'Copied!' : 'Contact Me'}
                </span>
              </div>

              {/* Slide-out button icon on hover */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-bg-elevated border border-border-subtle text-accent-glow">
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4" />}
              </div>
            </div>

            {/* Hover visual highlight */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-accent-primary/[0.05] pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* Dismiss X button */}
            <button
              onClick={handleDismiss}
              className="absolute top-0 right-0 p-1 bg-bg-surface hover:bg-bg-elevated border border-border-subtle rounded-full transform translate-x-1 -translate-y-1 hover:text-text-primary"
              aria-label="Dismiss Badge"
            >
              <X className="w-2.5 h-2.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default FloatingContact;
