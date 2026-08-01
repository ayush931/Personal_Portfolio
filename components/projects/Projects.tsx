"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useExperienceStore } from "@/store/experience-store";
import { ArrowUpRight } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectsList = [
  {
    id: "aetheria",
    title: "Aetheria",
    subtitle: "Real-Time 2D Multiplayer Sandbox World",
    desc: "A multiplayer game engine syncing voice, sandbox interactions, and assets at 60 FPS. Built with Socket.io, Phaser.js, WebRTC, and Neon PostgreSQL.",
    stack: ["Socket.io", "Phaser.js", "WebRTC", "PostgreSQL", "Node.js"],
    github: "https://github.com/ayush931",
  },
  {
    id: "whiteboard",
    title: "Infinite Canvas",
    subtitle: "Real-Time Collaborative Whiteboard",
    desc: "A sub-100ms multi-user collaborative infinite drawing canvas optimizing frame updates and minimizing UI state re-renders by 60%.",
    stack: ["Next.js", "WebSockets", "Turborepo", "HTML Canvas", "TypeScript"],
    github: "https://github.com/ayush931",
  },
  {
    id: "ridesync",
    title: "RideSync",
    subtitle: "Real-Time GPS Ride Booking Application",
    desc: "Cross-platform mobile application utilizing secure Clerk authentication, WebSocket communication, and sub-200ms DB round-trip queries.",
    stack: ["React Native", "Expo", "WebSockets", "Clerk Auth", "Neon Postgres"],
    github: "https://github.com/ayush931",
  },
  {
    id: "trackflow",
    title: "TrackFlow",
    subtitle: "Event-Driven Logistics Architecture",
    desc: "A complex event-driven messaging microservices pipeline managing real-time logistics packages, Redis caching, and RabbitMQ message brokerage.",
    stack: ["Turborepo", "Node.js", "RabbitMQ", "Redis", "Docker", "AWS"],
    github: "https://github.com/ayush931",
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setActiveSection = useExperienceStore((state) => state.setActiveSection);
  const setActiveProject = useExperienceStore((state) => state.setActiveProject);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Track when entering the projects section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setActiveSection("projects"),
      onEnterBack: () => setActiveSection("projects"),
    });

    // Pinning the viewport panels
    const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
        end: () => `+=${window.innerHeight}`,
      });

      // Swap active project model in WebGL Canvas as panel centers
      ScrollTrigger.create({
        trigger: panel,
        start: "top 45%",
        end: "bottom 55%",
        onEnter: () => setActiveProject(projectsList[i].id),
        onEnterBack: () => setActiveProject(projectsList[i].id),
        onLeave: () => {
          if (i === panels.length - 1) setActiveProject(null);
        },
        onLeaveBack: () => {
          if (i === 0) setActiveProject(null);
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} id="projects" className="relative w-full bg-transparent">
      {projectsList.map((proj, i) => (
        <section
          key={proj.id}
          className="project-panel relative flex h-svh w-full flex-col justify-center px-gutter text-ink"
          style={{ zIndex: 10 + i }}
        >
          <div className="mx-auto max-w-2xl w-full bg-canvas-raised/85 border border-line p-5 sm:p-8 md:p-10 rounded-panel backdrop-blur-md shadow-xl flex flex-col justify-between min-h-[50vh] sm:min-h-[45vh] h-auto">
            
            <div>
              <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-6">
                <span className="font-mono text-xs text-cobalt tracking-widest block">
                  04 / PROJECT 0{i + 1}
                </span>
                <span className="font-mono text-[0.6rem] uppercase bg-canvas border border-line px-2.5 py-0.5 rounded-full text-ink-muted">
                  STAGE OBJECT REVOLVE
                </span>
              </div>
              
              <h2 className="font-sans text-2xl md:text-3xl font-bold uppercase text-ink">
                {proj.title}
              </h2>
              <span className="font-mono text-[0.7rem] font-semibold text-ink-muted block mt-1 mb-4 italic">
                {proj.subtitle}
              </span>
              
              <p className="font-mono text-xs md:text-sm text-ink-muted leading-relaxed mb-6">
                {proj.desc}
              </p>
            </div>

            <div>
              {/* Technology tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {proj.stack.map((tag) => (
                  <span key={tag} className="font-mono text-[0.625rem] px-2 py-0.5 rounded bg-canvas border border-line text-ink-muted">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-line/60 pt-4">
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-ink hover:text-cobalt transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>github repo</span>
                </a>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs text-cobalt hover:underline font-bold"
                >
                  <span>explore code</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

          </div>
        </section>
      ))}
    </div>
  );
}
