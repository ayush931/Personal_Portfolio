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
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-gutter pt-3 sm:pt-4 md:pt-6 pointer-events-none">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo / Home Button (Leftmost - h-10 sm:h-11) */}
          <Link
            href={isHome ? "#hero" : "/#hero"}
            title="Return to Home"
            className="pointer-events-auto shrink-0 group h-10 sm:h-11 px-3.5 sm:px-4 flex items-center gap-2 rounded-full border border-line bg-canvas-raised/90 font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all hover:border-cobalt hover:shadow-xs whitespace-nowrap"
          >
            <span className="h-2 w-2 rounded-full bg-cobalt animate-pulse shrink-0" />
            <span className="font-semibold text-ink group-hover:text-cobalt transition-colors whitespace-nowrap">{SITE.name}</span>
            <span className="hidden xl:inline text-ink-muted whitespace-nowrap">/ {SITE.role}</span>
          </Link>

          {/* Center Navbar (Desktop - h-10 sm:h-11) */}
          <nav
            className="pointer-events-auto hidden lg:flex h-10 sm:h-11 items-center gap-1 rounded-full border border-line bg-canvas-raised/90 px-2 sm:px-3 backdrop-blur-md shrink-0"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const href = isHome
                ? item.href
                : item.section === "blogs"
                ? "/blogs"
                : `/${item.href}`;
              const isActive = activeSection === item.section;
              return (
                <Link
                  key={item.href}
                  href={href}
                  onMouseEnter={() => setHoverItem(item.href)}
                  onMouseLeave={() => setHoverItem(null)}
                  className="relative px-3 py-1 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-ink group whitespace-nowrap flex items-center"
                >
                  <span className="relative font-medium">
                    {item.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 bg-cobalt rounded-full transition-all duration-300 ${
                        currentPill === item.href || isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop & Mobile CTAs (Rightmost - h-10 sm:h-11) */}
          <div className="pointer-events-auto flex items-center gap-2 shrink-0">
            {/* Resume PDF Download Button (h-10 sm:h-11) */}
            <a
              href="/resume.pdf"
              target="_blank"
              download="Ayush_Full_Stack_Developer_Resume.pdf"
              className="hidden sm:flex h-10 sm:h-11 px-3.5 sm:px-4 items-center gap-1.5 rounded-full border border-line bg-canvas-raised/90 font-mono text-xs uppercase tracking-wider text-ink backdrop-blur-md transition-colors hover:border-cobalt hover:text-cobalt shrink-0 whitespace-nowrap font-medium"
            >
              <Download size={14} className="shrink-0" />
              <span className="hidden md:inline">Resume PDF</span>
              <span className="md:hidden">CV</span>
            </a>

            {/* Get in Touch Button (h-10 sm:h-11) */}
            <Link
              href={isHome ? "#contact" : "/#contact"}
              className="group flex h-10 sm:h-11 px-3.5 sm:px-4 items-center gap-1.5 sm:gap-2 rounded-full bg-ink font-mono text-xs uppercase tracking-wider text-canvas transition-colors hover:bg-cobalt shrink-0 whitespace-nowrap font-semibold"
            >
              <span>Get in touch</span>
              <ArrowUpRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </Link>

            {/* Mobile / Tablet Hamburger Toggle (Square Capsule h-10 w-10 sm:h-11 sm:w-11) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-line bg-canvas-raised/90 text-ink backdrop-blur-md hover:border-cobalt transition-colors shrink-0 cursor-pointer"
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
            className="fixed inset-x-3 sm:inset-x-4 top-16 sm:top-20 z-50 rounded-2xl border border-line bg-canvas-raised p-5 sm:p-6 shadow-2xl backdrop-blur-xl lg:hidden font-mono max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              <div className="text-[0.65rem] uppercase tracking-widest text-ink-muted border-b border-line pb-2 font-bold flex items-center justify-between">
                <span>NAVIGATION MENU</span>
                <span className="text-cobalt font-semibold">06 SECTIONS</span>
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
                    className={`text-sm uppercase tracking-wider font-semibold transition-colors py-1 flex items-center justify-between ${
                      isActive ? "text-cobalt" : "text-ink hover:text-cobalt"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="h-1.5 w-1.5 rounded-full bg-cobalt" />}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-line flex flex-col gap-3">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  download="Ayush_Full_Stack_Developer_Resume.pdf"
                  className="flex items-center justify-center gap-2 rounded-full border border-line py-2.5 text-xs uppercase tracking-wider text-ink font-bold hover:border-cobalt hover:text-cobalt transition-colors"
                >
                  <Download size={14} />
                  <span>Download Resume PDF</span>
                </a>
                <Link
                  href={isHome ? "#contact" : "/#contact"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full bg-cobalt py-2.5 text-xs uppercase tracking-wider text-white font-bold hover:bg-ink transition-colors"
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
