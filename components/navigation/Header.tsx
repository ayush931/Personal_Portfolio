"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/constants";

const navItems = [
  { label: "Experience", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Education", href: "#education" },
  { label: "Blogs", href: "#blogs" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-gutter pt-4 md:pt-6 pointer-events-none">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          {/* Brand Logo / Home Button */}
          <Link
            href="#hero"
            title="Return to Home"
            className="pointer-events-auto group flex items-center gap-2 rounded-full border border-line bg-canvas-raised/90 px-4 py-2 font-mono text-kicker uppercase tracking-kicker backdrop-blur-md transition-all hover:border-cobalt hover:shadow-sm"
          >
            <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
            <span className="font-semibold text-ink group-hover:text-cobalt transition-colors">{SITE.name}</span>
            <span className="hidden sm:inline text-ink-muted">/ {SITE.role}</span>
          </Link>

          {/* Desktop Center Nav */}
          <nav
            className="pointer-events-auto hidden md:flex items-center gap-1 rounded-full border border-line bg-canvas-raised/90 px-3 py-1.5 backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onMouseEnter={() => setActiveItem(item.href)}
                onMouseLeave={() => setActiveItem(null)}
                className="relative px-3.5 py-1.5 font-mono text-kicker uppercase tracking-kicker text-ink-muted transition-colors hover:text-ink group"
              >
                {activeItem === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 z-[-1] rounded-full bg-line"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-cobalt transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </nav>

          {/* Desktop & Mobile CTAs */}
          <div className="pointer-events-auto flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              download="Ayush_Full_Stack_Developer_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas-raised/90 px-3.5 py-2 font-mono text-kicker uppercase tracking-kicker text-ink backdrop-blur-md transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <Download size={13} />
              <span>Resume PDF</span>
            </a>

            <a
              href="#contact"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-kicker uppercase tracking-kicker text-canvas transition-colors hover:bg-cobalt"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center rounded-full border border-line bg-canvas-raised/90 p-2.5 text-ink backdrop-blur-md hover:border-cobalt transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 rounded-2xl border border-line bg-canvas-raised p-6 shadow-2xl backdrop-blur-xl md:hidden font-mono"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-[0.65rem] uppercase tracking-widest text-ink-muted border-b border-line pb-2 font-bold">
                NAVIGATION MENU
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-wider text-ink font-semibold hover:text-cobalt transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 border-t border-line flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  download="Ayush_Full_Stack_Developer_Resume.pdf"
                  className="flex items-center justify-center gap-2 rounded-full border border-line py-2.5 text-xs uppercase tracking-wider text-ink font-bold"
                >
                  <Download size={14} />
                  <span>Download Resume PDF</span>
                </a>
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-cobalt py-2.5 text-xs uppercase tracking-wider text-white font-bold"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
