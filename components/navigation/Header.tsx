"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

const navItems = [
  { label: "Experience", href: "#about", section: "about" },
  { label: "Projects", href: "#work", section: "work" },
  { label: "Education", href: "#education", section: "education" },
  { label: "Blogs", href: "#blogs", section: "blogs" },
  { label: "Skills", href: "#skills", section: "skills" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [activeSection, setActiveSection] = useState("hero");
  const [hoverItem, setHoverItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      if (pathname.startsWith("/blogs")) {
        setActiveSection("blogs");
      } else {
        setActiveSection("hero");
      }
      return;
    }

    const sectionIds = navItems.map((item) => item.section);
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, [isHome, pathname]);

  const currentPill = hoverItem || `#${activeSection}`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-gutter pt-4 md:pt-6 pointer-events-none">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          {/* Brand Logo / Home Button */}
          <Link
            href={isHome ? "#hero" : "/#hero"}
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
            {navItems.map((item) => {
              const href = isHome
                ? item.href
                : item.section === "blogs"
                ? "/blogs"
                : `/${item.href}`;
              return (
                <Link
                  key={item.href}
                  href={href}
                  onMouseEnter={() => setHoverItem(item.href)}
                  onMouseLeave={() => setHoverItem(null)}
                  className="relative px-3.5 py-1.5 font-mono text-kicker uppercase tracking-kicker text-ink-muted transition-colors hover:text-ink group"
                >
                  <span className="relative">
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-cobalt transition-all duration-300 ${
                        currentPill === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>
              );
            })}
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

            <Link
              href={isHome ? "#contact" : "/#contact"}
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-mono text-kicker uppercase tracking-kicker text-canvas transition-colors hover:bg-cobalt"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

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
               {navItems.map((item) => {
                const isActive = activeSection === item.section;
                const href = isHome
                  ? item.href
                  : item.section === "blogs"
                  ? "/blogs"
                  : `/${item.href}`;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm uppercase tracking-wider font-semibold transition-colors py-1 ${
                      isActive ? "text-cobalt" : "text-ink hover:text-cobalt"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
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
                <Link
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-cobalt py-2.5 text-xs uppercase tracking-wider text-white font-bold"
                >
                  <span>Get in touch</span>
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
