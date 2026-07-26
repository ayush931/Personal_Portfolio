"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/constants";

const navItems = [
  { label: "Experience", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Lab", href: "#craft" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-gutter pt-4 md:pt-6 pointer-events-none">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
        {/* Brand Logo / Tag */}
        <Link
          href="#"
          className="pointer-events-auto group flex items-center gap-2 rounded-full border border-line bg-canvas-raised/90 px-4 py-2 font-mono text-kicker uppercase tracking-kicker backdrop-blur-md transition-colors hover:border-cobalt"
        >
          <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse" />
          <span className="font-semibold text-ink">{SITE.name}</span>
          <span className="hidden sm:inline text-ink-muted">/ {SITE.role}</span>
        </Link>

        {/* Center Nav */}
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
              className="relative px-3.5 py-1.5 font-mono text-kicker uppercase tracking-kicker text-ink-muted transition-colors hover:text-ink"
            >
              {activeItem === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-full bg-line"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTAs */}
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
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-kicker uppercase tracking-kicker text-canvas transition-colors hover:bg-cobalt"
          >
            <span>Get in touch</span>
            <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
