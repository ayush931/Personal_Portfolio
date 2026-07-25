"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { LenisScrollProvider } from "@/components/LenisScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { HeaderNav } from "@/components/HeaderNav";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { EducationSection } from "@/components/EducationSection";
import { FooterSection } from "@/components/FooterSection";
import { ContactModal } from "@/components/ContactModal";
import { CommandPalette } from "@/components/CommandPalette";

const Interactive3DWaveScene = dynamic(
    () => import("@/components/Interactive3DWaveScene").then((mod) => mod.Interactive3DWaveScene),
    { ssr: false, loading: () => <div className="fixed inset-0 pointer-events-none z-0 bg-[#050607]" /> }
);

export default function Home() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    const { scrollYProgress } = useScroll();
    const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);

    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsCommandPaletteOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sections = ["hero", "experience", "projects", "infrastructure", "education", "contact"];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.1 }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const handleNavigate = (sectionId: string) => {
        setActiveSection(sectionId);
        const el = document.getElementById(sectionId);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <LenisScrollProvider>
            <ScrollProgressBar />
            <main className="min-h-screen bg-cyber-bg text-cyber-text font-sans relative flex flex-col overflow-hidden">
                <CustomCursor />
                <Interactive3DWaveScene mousePos={mousePos} activeSection={activeSection} />
                <HeaderNav
                    activeSection={activeSection}
                    onNavigate={handleNavigate}
                    onOpenContact={() => setIsContactOpen(true)}
                    onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
                />

                <div className="relative z-10 flex-1">
                    <div ref={contentRef}>
                        <motion.div
                            style={{ opacity: heroOpacity }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 2 }}
                        >
                            <HeroSection onNavigate={handleNavigate} onOpenContact={() => setIsContactOpen(true)} />
                        </motion.div>

                        <section id="experience">
                            <ExperienceSection />
                        </section>

                        <section id="projects">
                            <ProjectsSection />
                        </section>

                        <section id="infrastructure">
                            <InfrastructureSection />
                        </section>

                        <section id="education">
                            <EducationSection />
                        </section>

                        <section id="contact">
                            <FooterSection onNavigate={handleNavigate} onOpenContact={() => setIsContactOpen(true)} />
                        </section>
                    </div>
                </div>

                <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
                <CommandPalette
                    isOpen={isCommandPaletteOpen}
                    onClose={() => setIsCommandPaletteOpen(false)}
                    onNavigate={handleNavigate}
                />
            </main>
        </LenisScrollProvider>
    );
}