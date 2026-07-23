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
import { ActiveTheoryCanvas } from "@/components/ActiveTheoryCanvas";
import { ActiveCursor } from "@/components/ActiveCursor";
import { ActiveTheoryHUD } from "@/components/ActiveTheoryHUD";
import { SmoothKineticScroll } from "@/components/SmoothKineticScroll";
import { CommandPalette } from "@/components/CommandPalette";
import { HireMeModal } from "@/components/HireMeModal";

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [hireModalOpen, setHireModalOpen] = useState(false);

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
    <main className="min-h-screen bg-[#050508] text-oled-text flex flex-col font-sans selection:bg-signal-cyan/30 selection:text-signal-cyan relative overflow-x-hidden">
      
      {/* 1. Active Theory Trailing Dynamic Pointer Cursor */}
      <ActiveCursor />

      {/* 2. WebGL 3D Cyber Particle Background Canvas */}
      <ActiveTheoryCanvas />

      {/* 3. Diagnostic Scroll Progress Telemetry Bar */}
      <ScrollProgressBar />

      {/* 4. Active Theory Navigation Header */}
      <HeaderNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenHireModal={() => setHireModalOpen(true)}
      />

      {/* 5. Smooth Kinetic Inertia & Velocity Skew Content Wrapper */}
      <SmoothKineticScroll>
        <div className="flex-1 relative z-10">
          <HeroSection onNavigate={handleNavigate} onOpenHireModal={() => setHireModalOpen(true)} />
          <ExperienceSection />
          <ProjectsSection />
          <InfrastructureSection />
          <EducationSection />
          <FooterSection onNavigate={handleNavigate} onOpenHireModal={() => setHireModalOpen(true)} />
        </div>
      </SmoothKineticScroll>

      {/* 6. Active Theory Floating Telemetry HUD Status Dock */}
      <ActiveTheoryHUD
        activeSection={activeSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* 7. Command Palette Shortcut Dialog (Ctrl + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* 8. Direct Message & Authenticated CRM Hire Modal */}
      <HireMeModal
        isOpen={hireModalOpen}
        onClose={() => setHireModalOpen(false)}
      />

    </main>
  );
}
