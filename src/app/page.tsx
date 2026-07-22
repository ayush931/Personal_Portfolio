"use client";

import React, { useState, useEffect } from "react";
import { HeaderNav } from "@/components/HeaderNav";
import { HeroSection } from "@/components/HeroSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { InfrastructureSection } from "@/components/InfrastructureSection";
import { EducationSection } from "@/components/EducationSection";
import { FooterSection } from "@/components/FooterSection";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { TechBackground } from "@/components/TechBackground";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "experience", "projects", "infrastructure", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="min-h-screen bg-oled-bg text-oled-text flex flex-col font-sans selection:bg-signal-cyan/20 selection:text-signal-cyan relative">
      
      {/* Ambient Tech Background Matrix & Cursor Spotlight */}
      <TechBackground />

      {/* Dynamic Telemetry Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Header Diagnostic Bar */}
      <HeaderNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Sections Stream */}
      <div className="flex-1 relative z-10">
        <HeroSection onNavigate={handleNavigate} />
        <ExperienceSection />
        <ProjectsSection />
        <InfrastructureSection />
        <EducationSection />
        <FooterSection onNavigate={handleNavigate} />
      </div>

    </main>
  );
}
