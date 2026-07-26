"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { MOTION } from "@/lib/constants";
import { Project, WorkCard } from "./WorkCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects: Project[] = [
  {
    id: "aetheria",
    title: "Aetheria",
    subtitle: "Real-time 2D Multiplayer Sandbox Engine",
    category: "Game Engine & Networking",
    problem: "Existing browser multiplayer sandboxes suffered from high latency, packet jitter, and server sync lag when rendering hundreds of active entity state updates simultaneously.",
    role: "Architected WebRTC peer data channels with Socket.io fallback for low-latency state synchronization, integrated Phaser 3 rendering pipeline, and designed custom spatial hashing for client prediction.",
    stack: ["Phaser 3", "Socket.io", "WebRTC", "TypeScript", "Node.js", "Canvas API"],
    outcome: "Achieved sub-40ms peer-to-peer state sync for 60 concurrent entity connections per room with smooth 60 FPS canvas rendering.",
    githubUrl: "https://github.com/ayush931",
    accentColor: "#2146f3",
    stats: [
      { label: "Sync Latency", value: "< 40ms" },
      { label: "Frame Rate", value: "60 FPS" },
    ],
  },
  {
    id: "excalidraw-canvas",
    title: "Collaborative Whiteboard",
    subtitle: "Real-time Infinite Canvas Vector Studio",
    category: "Collaborative Tooling",
    problem: "Real-time infinite canvas apps often experience cursor drift, stroke distortion during concurrent editing, and memory leaks when rendering complex vector shapes.",
    role: "Built custom vector drawing engine with freehand stroke smoothing (Chaikin's algorithm), CRDT-inspired operation ordering via WebSockets, and spatial tree viewport culling.",
    stack: ["React", "HTML5 Canvas", "WebSockets", "TypeScript", "Zustand", "Tailwind CSS"],
    outcome: "Zero-lag multi-user collaborative editing with seamless undo/redo stacks and viewport rendering optimized for 10,000+ vector paths.",
    githubUrl: "https://github.com/ayush931",
    accentColor: "#ef4d2f",
    stats: [
      { label: "Vector Capacity", value: "10,000+" },
      { label: "Collab Sync", value: "Realtime" },
    ],
  },
  {
    id: "ridesync",
    title: "RideSync",
    subtitle: "Real-time Ride-Hailing & Dispatch Management",
    category: "Full Stack & Geospatial",
    problem: "Legacy dispatch engines failed to handle rapid driver location updates and high-concurrency route match queries during peak traffic demand hours.",
    role: "Engineered geospatial indexing service using Redis GEO commands and FastAPI, built WebSocket-based live driver tracking, and designed interactive trip telemetry dashboard.",
    stack: ["FastAPI", "Python", "Redis Geospatial", "React", "WebSockets", "PostgreSQL", "Docker"],
    outcome: "Handled 5,000+ concurrent spatial queries/sec with sub-second driver-rider matching and live map telemetry.",
    githubUrl: "https://github.com/ayush931",
    accentColor: "#d9ff45",
    stats: [
      { label: "Query Rate", value: "5k qps" },
      { label: "Match Speed", value: "< 800ms" },
    ],
  },
  {
    id: "docstream",
    title: "DocStream Tooling",
    subtitle: "PDF Accessibility Remediation & Struct-Tree Tagging Pipeline",
    category: "Document Processing & Accessibility",
    problem: "Converting legacy PDF documents into accessible XML/EPUB structures required manual tagging, link repair, and OCR validation — creating massive production bottlenecks.",
    role: "Architected distributed pipeline leveraging Celery, RabbitMQ, and FastAPI to parse PDF DOMs, infer structural heading trees via OCR models, and automatically repair broken intra-document links.",
    stack: ["FastAPI", "Celery", "RabbitMQ", "Redis", "Tesseract OCR", "PostgreSQL", "React", "Next.js"],
    outcome: "Reduced manual document remediation time by 75% and processed over 100,000 structural document pages in production at NexoGrafix.",
    githubUrl: "https://github.com/ayush931",
    accentColor: "#2146f3",
    stats: [
      { label: "Time Saved", value: "75%" },
      { label: "Pages Tagged", value: "100k+" },
    ],
  },
];

export function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set("[data-work-card]", { autoAlpha: 1, y: 0 });
      return;
    }

    const cards = gsap.utils.toArray<HTMLElement>("[data-work-card]");
    cards.forEach((card, idx) => {
      gsap.fromTo(
        card,
        { autoAlpha: 0, y: 40, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: MOTION.duration.enter,
          ease: MOTION.ease.chrome,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section id="work" ref={sectionRef} className="relative isolate bg-canvas px-gutter py-section border-t border-line">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              03 / Selected Work
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Featured Case Studies & Systems.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
            Engineered with emphasis on low latency, clean API architecture, real-time sync, and precise UX execution.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <WorkCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
