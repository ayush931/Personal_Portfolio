"use client";

import React, { useState } from "react";
import { ArrowUpRight, Download, Github, Mail, MapPin, Play, ShieldCheck, Terminal } from "lucide-react";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface HeroSectionProps {
    onNavigate: (sectionId: string) => void;
    onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenContact }) => {
    const { playHoverSound, playClickSound } = useAudioFeedback();
    const [activeTab, setActiveTab] = useState<"profile" | "systems" | "contact">("profile");

    return (
        <section id="hero" className="relative min-h-screen pt-[68px] pb-16 overflow-hidden flex items-center">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 right-[10%] h-[560px] w-[560px] rounded-full bg-cyber-accent/10 blur-[180px]" />
                <div className="absolute bottom-16 left-[8%] h-[420px] w-[420px] rounded-full bg-cyber-accent-dim/10 blur-[160px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    <div className="lg:col-span-7 space-y-9">
                        <div className="flex flex-wrap items-center gap-2.5 text-[10px] uppercase tracking-[0.22em] text-cyber-muted">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-cyber-border/60 bg-cyber-bg/45 px-3 py-1.5 backdrop-blur-xl">
                                <span className="h-1 w-1 rounded-full bg-cyber-accent-light" />
                                Available for engineering roles
                            </span>
                            <span className="hidden sm:inline-flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-cyber-accent-light" />
                                Patna, Bihar
                            </span>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs uppercase tracking-[0.3em] text-cyber-accent-light">Ayush Kumar</p>
                            <h1 className="max-w-4xl text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.1] tracking-[-0.04em] text-cyber-text">
                                Building real-time systems with cinematic depth.
                            </h1>
                            <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-cyber-muted">
                                Full-Stack Engineer building scalable logistics and SaaS platforms with React.js, Next.js, Node.js, secure authentication, event-driven microservices, and CI/CD delivery.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 max-w-xl">
                            {[
                                ["45%", "Processing cut"],
                                ["25%", "Query gain"],
                                ["500+", "Realtime users"],
                            ].map(([value, label]) => (
                                <div key={label} className="rounded-xl border border-cyber-border/45 bg-cyber-bg/45 p-3 backdrop-blur-xl">
                                    <div className="font-mono text-xl sm:text-2xl font-black text-gradient-warm">{value}</div>
                                    <div className="mt-1 text-[10px] uppercase tracking-wider text-cyber-muted">{label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs">
                            <button onClick={() => { playClickSound(); onOpenContact(); }} onMouseEnter={playHoverSound} className="group inline-flex items-center gap-2 rounded-full bg-cyber-text px-5 py-2.5 font-semibold text-cyber-bg transition hover:bg-cyber-accent-light">
                                <Mail className="h-3.5 w-3.5" />
                                Contact Me
                            </button>
                            <a href="/Ayush_Full_Stack_Developer_Resume.pdf" download="Ayush_Kumar_Resume.pdf" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="inline-flex items-center gap-2 rounded-full border border-cyber-border/60 bg-cyber-bg/50 px-5 py-2.5 font-semibold text-cyber-text backdrop-blur-xl transition hover:border-cyber-accent/35">
                                <Download className="h-3.5 w-3.5 text-cyber-accent-light" />
                                Resume
                            </a>
                            <a href="https://github.com/ayush931" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="inline-flex items-center gap-2 rounded-full border border-cyber-border/60 bg-cyber-bg/35 px-4 py-2.5 font-semibold text-cyber-muted backdrop-blur-xl transition hover:text-cyber-text">
                                <Github className="h-3.5 w-3.5" />
                                GitHub
                                <ArrowUpRight className="h-3 w-3" />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="glass-panel-3d rounded-2xl border border-cyber-border/50 p-5">
                            <div className="relative z-10 space-y-5">
                                <div className="flex items-center justify-between border-b border-cyber-border/35 pb-3">
                                    <div className="flex items-center gap-2 text-xs font-bold text-cyber-text">
                                        <Terminal className="h-3.5 w-3.5 text-cyber-accent-light" />
                                        Systems Console
                                    </div>
                                    <span className="rounded-full border border-cyber-accent/20 bg-cyber-accent/10 px-2.5 py-0.5 text-[9px] uppercase tracking-wider text-cyber-accent-light">online</span>
                                </div>

                                <div className="grid grid-cols-3 gap-1 rounded-xl border border-cyber-border/35 bg-cyber-bg/40 p-1 text-[10px]">
                                    {[
                                        ["profile", "Profile"],
                                        ["systems", "Systems"],
                                        ["contact", "Contact"],
                                    ].map(([id, label]) => (
                                        <button key={id} onClick={() => setActiveTab(id as typeof activeTab)} className={`rounded-lg px-2 py-1.5 transition ${activeTab === id ? "bg-cyber-text text-cyber-bg font-bold" : "text-cyber-muted hover:text-cyber-text"}`}>
                                            {label}
                                        </button>
                                    ))}
                                </div>

                                {activeTab === "profile" && (
                                    <div className="rounded-xl border border-cyber-border/35 bg-cyber-bg/45 p-4 font-mono text-[11px] leading-5 text-cyber-muted">
                                        <div className="text-cyber-accent-light">const profile = &#123;</div>
                                        <div className="pl-4">role: <span className="text-cyber-text">&quot;Full-Stack Software Engineer&quot;</span>,</div>
                                        <div className="pl-4">focus: <span className="text-cyber-text">&quot;PERN / MERN / Microservices&quot;</span>,</div>
                                        <div className="pl-4">education: <span className="text-cyber-text">&quot;MCA + MBA&quot;</span>,</div>
                                        <div className="text-cyber-accent-light">&#125;</div>
                                    </div>
                                )}

                                {activeTab === "systems" && (
                                    <div className="space-y-2 text-xs text-cyber-muted">
                                        {[
                                            "Event-driven services with RabbitMQ and Docker",
                                            "Sub-100ms collaborative WebSocket state sync",
                                            "CI/CD delivery across AWS and Vercel platforms",
                                        ].map((item) => (
                                            <div key={item} className="flex items-start gap-2.5 rounded-xl border border-cyber-border/30 bg-cyber-bg/35 p-2.5">
                                                <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyber-accent-light" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "contact" && (
                                    <div className="rounded-xl border border-cyber-border/35 bg-cyber-bg/45 p-4 text-xs text-cyber-muted space-y-2">
                                        <a className="block hover:text-cyber-accent-light" href="mailto:ayushkumar9315983@gmail.com">ayushkumar9315983@gmail.com</a>
                                        <a className="block hover:text-cyber-accent-light" href="tel:+917070472634">+91 70704 72634</a>
                                        <a className="block hover:text-cyber-accent-light" href="https://www.linkedin.com/in/ayush-kumar-94310522a/" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                                    </div>
                                )}

                                <button onClick={() => { playClickSound(); onNavigate("experience"); }} onMouseEnter={playHoverSound} className="flex w-full items-center justify-center gap-2 rounded-full border border-cyber-border/45 bg-cyber-surface/70 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyber-text transition hover:border-cyber-accent/35">
                                    <Play className="h-3 w-3 fill-current" />
                                    View Experience
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
