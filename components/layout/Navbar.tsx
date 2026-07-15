'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useCursor } from '../cursor/useCursor';
import { gsap } from '@/lib/gsap';

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, setActiveSection }) => {
  const { setCursorType, setCursorText } = useCursor();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const hireBtnRef = useRef<HTMLAnchorElement>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    }
    return 'dark';
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    if (nextTheme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP animation for the Hire Me button
  useEffect(() => {
    if (hireBtnRef.current) {
      const btn = hireBtnRef.current;
      
      const onMouseEnter = () => {
        gsap.to(btn.querySelector('.btn-gradient-bg'), {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(btn, {
          scale: 1.05,
          boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
          duration: 0.3,
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn.querySelector('.btn-gradient-bg'), {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.to(btn, {
          scale: 1,
          boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
          duration: 0.3,
        });
      };

      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);

      return () => {
        btn.removeEventListener('mouseenter', onMouseEnter);
        btn.removeEventListener('mouseleave', onMouseLeave);
      };
    }
  }, []);

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
    <>
      <motion.header
        className="fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 md:px-8 w-[92%] max-w-5xl rounded-full border border-border-subtle/55 shadow-2xl transition-colors duration-300"
        style={{
          backgroundColor: 'var(--navbar-bg, rgba(4, 4, 9, 0.75))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        animate={{
          height: isScrolled ? 52 : 64,
          top: isScrolled ? 12 : 16,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Left Logo */}
        <a
          href="#hero"
          onClick={() => setActiveSection('hero')}
          className="flex items-center gap-2 group magnetic-pull"
          onMouseEnter={() => {
            setCursorType('hover');
            setCursorText('HOME');
          }}
          onMouseLeave={() => {
            setCursorType('default');
            setCursorText('');
          }}
        >
          <span className="font-display text-xl font-bold tracking-wider text-text-primary group-hover:text-accent-glow transition-colors duration-300">
            AK
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 relative h-full">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`relative px-4 py-2 text-xs uppercase tracking-widest font-mono transition-colors duration-300 ${
                activeSection === item.id ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`}
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
              {activeSection === item.id && (
                <motion.div
                  layoutId="active-nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-primary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Open to Work Badge */}
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-medium transition-colors duration-300 ${
            theme === 'light'
              ? 'bg-emerald-100/60 border-emerald-500/30 text-emerald-700'
              : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                theme === 'light' ? 'bg-emerald-500' : 'bg-emerald-400'
              }`}></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            OPEN TO WORK
          </div>


          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 rounded-full bg-bg-surface border border-border-subtle hover:border-accent-primary/50 flex items-center justify-center text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-110 active:scale-90 relative overflow-hidden group magnetic-pull"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText(theme === 'dark' ? 'LIGHT' : 'DARK');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
            aria-label="Toggle Theme"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 0 : 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:text-amber-300 transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
              )}
            </motion.div>
          </button>

          {/* Hire Me Button */}
          <a
            ref={hireBtnRef}
            href="#contact"
            onClick={() => setActiveSection('contact')}
            className="relative overflow-hidden rounded-full p-[1px] font-mono text-xs font-bold text-text-primary transition-transform duration-300 hover:scale-105 magnetic-pull"
            onMouseEnter={() => {
              setCursorType('hover');
              setCursorText('HIRE');
            }}
            onMouseLeave={() => {
              setCursorType('default');
              setCursorText('');
            }}
          >
            {/* Gradient border ring */}
            <span className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-glow rounded-full" />
            {/* Gradient background fill on hover */}
            <span className="btn-gradient-bg absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-glow rounded-full opacity-0" />
            {/* Inner background block (to make outline card) */}
            <span className="absolute inset-[1px] bg-bg-void rounded-full group-hover:opacity-0 transition-opacity duration-300" />
            {/* Button label */}
            <span className="relative block px-4 py-2 bg-transparent z-10">
              HIRE ME
            </span>
          </a>

          {/* Mobile Hamburguer Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 rounded bg-bg-surface border border-border-subtle p-1 z-[60] magnetic-pull"
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
            aria-label="Toggle Menu"
          >
            <div className="w-5 h-5 flex flex-col justify-between items-center relative">
              <motion.span
                className="w-5 h-[2px] bg-text-primary rounded"
                animate={isMobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', top: 0 }}
              />
              <motion.span
                className="w-5 h-[2px] bg-text-primary rounded"
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', top: 8 }}
              />
              <motion.span
                className="w-5 h-[2px] bg-text-primary rounded"
                animate={isMobileOpen ? { rotate: -45, y: 9 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'absolute', bottom: 0 }}
              />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg-void flex flex-col justify-center items-center px-6"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`font-display text-2xl uppercase tracking-wider ${
                      activeSection === item.id ? 'text-accent-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-3"
            >
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-mono font-medium transition-colors duration-300 ${
                theme === 'light'
                  ? 'bg-emerald-100/60 border-emerald-500/30 text-emerald-700'
                  : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    theme === 'light' ? 'bg-emerald-500' : 'bg-emerald-400'
                  }`}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                OPEN TO WORK
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default Navbar;
