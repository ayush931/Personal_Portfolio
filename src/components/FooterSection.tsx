"use client";

import Link from "next/link";
import { Mail, Phone, Github, Linkedin, ArrowUp, Sparkles, Send, MapPin, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate, onOpenContact }) => {
  const { playHoverSound, playClickSound } = useAudioFeedback();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
  };

  return (
    <footer id="contact" className="relative overflow-hidden">
      <div className="relative py-32 sm:py-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-cyber-accent/3 blur-[180px]" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} className="text-center space-y-10">
            <motion.div custom={0} variants={fadeUp} className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-5 py-1.5 rounded-full bg-cyber-accent/8 border border-cyber-accent/15 text-cyber-accent-light text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open to Opportunities</span>
              </div>
              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-cyber-text leading-[1.02] tracking-tight">
                Let&apos;s Build Something{" "}
                <span className="text-gradient-warm">Extraordinary</span>
              </h2>
            </motion.div>

            <motion.p custom={1} variants={fadeUp} className="text-base sm:text-lg text-cyber-muted max-w-2xl mx-auto leading-relaxed">
              Currently seeking Full-Stack Software Engineer and Systems Architecture roles. Open to remote work globally or on-site in India.
            </motion.p>

            <motion.div custom={2} variants={fadeUp} className="flex flex-wrap items-center justify-center gap-5 pt-4">
              <button
                onClick={() => { playClickSound(); onOpenContact(); }}
                onMouseEnter={playHoverSound}
                className="group flex items-center space-x-3 px-10 py-4 rounded-2xl bg-cyber-accent text-cyber-bg font-semibold text-sm hover:bg-cyber-accent-light transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </button>
              <a
                href="mailto:ayushkumar9315983@gmail.com"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="flex items-center space-x-3 px-8 py-4 rounded-2xl glass-panel-3d text-cyber-text font-medium text-sm"
              >
                <Mail className="w-4 h-4 text-cyber-accent-light" />
                <span>ayushkumar9315983@gmail.com</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-cyber-accent/15 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-cyber-accent text-cyber-bg font-mono text-sm font-bold flex items-center justify-center">ak</div>
              <div>
                <div className="text-cyber-text font-bold text-base">AYUSH KUMAR</div>
                <div className="text-xs text-cyber-muted">Full-Stack & Systems Engineer</div>
              </div>
            </div>
            <p className="text-sm text-cyber-muted leading-relaxed max-w-sm">
              Specialized in low-latency real-time systems, event-driven microservices, WebSocket architectures, and high-throughput sync engines. Building software that scales.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: Github, href: "https://github.com/ayush931", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/ayush-kumar-94310522a", label: "LinkedIn" },
                { icon: Mail, href: "mailto:ayushkumar9315983@gmail.com", label: "Email" },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} onClick={playClickSound} className="w-10 h-10 rounded-xl bg-cyber-surface/60 border border-cyber-border/20 flex items-center justify-center text-cyber-muted hover:text-cyber-accent-light hover:border-cyber-accent/15 transition-all" aria-label={social.label}>
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 space-y-5">
            <div className="text-cyber-text font-bold uppercase text-[11px] tracking-wider">Navigation</div>
            <div className="space-y-2.5 flex flex-col text-sm">
              {[
                { id: "hero", label: "Overview" },
                { id: "experience", label: "Experience" },
                { id: "projects", label: "Projects" },
                { id: "infrastructure", label: "Tech Stack" },
                { id: "education", label: "Education" },
              ].map((item) => (
                <button key={item.id} onClick={() => { playClickSound(); onNavigate(item.id); }} onMouseEnter={playHoverSound} className="text-left text-cyber-muted hover:text-cyber-accent-light transition-colors flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-border group-hover:bg-cyber-accent-light transition-colors" />
                  <span>{item.label}</span>
                </button>
              ))}
              <Link
                href="/crm"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="text-left text-cyber-accent-light font-medium hover:underline transition-colors flex items-center space-x-2.5 group font-mono text-xs pt-1"
              >
                <Inbox className="w-3.5 h-3.5" />
                <span>CRM Dashboard</span>
              </Link>
            </div>
          </div>

          <div className="md:col-span-4 space-y-5">
            <div className="text-cyber-text font-bold uppercase text-[11px] tracking-wider">Get in Touch</div>
            <div className="space-y-3.5 flex flex-col text-sm">
              <a href="mailto:ayushkumar9315983@gmail.com" onMouseEnter={playHoverSound} className="flex items-center space-x-3 text-cyber-muted hover:text-cyber-accent-light transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-cyber-surface/60 border border-cyber-border/20 flex items-center justify-center group-hover:border-cyber-accent/15 transition-colors">
                  <Mail className="w-4 h-4 text-cyber-accent-light" />
                </div>
                <span>ayushkumar9315983@gmail.com</span>
              </a>
              <a href="tel:+917070472634" onMouseEnter={playHoverSound} className="flex items-center space-x-3 text-cyber-muted hover:text-cyber-accent-light transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-cyber-surface/60 border border-cyber-border/20 flex items-center justify-center group-hover:border-cyber-accent/15 transition-colors">
                  <Phone className="w-4 h-4 text-cyber-accent-light" />
                </div>
                <span>+91 70704 72634</span>
              </a>
              <a href="https://github.com/ayush931" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="flex items-center space-x-3 text-cyber-muted hover:text-cyber-accent-light transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-cyber-surface/60 border border-cyber-border/20 flex items-center justify-center group-hover:border-cyber-accent/15 transition-colors">
                  <Github className="w-4 h-4 text-cyber-text" />
                </div>
                <span>github.com/ayush931</span>
              </a>
              <a href="https://linkedin.com/in/ayush-kumar-94310522a" target="_blank" rel="noopener noreferrer" onMouseEnter={playHoverSound} className="flex items-center space-x-3 text-cyber-muted hover:text-cyber-accent-light transition-colors group">
                <div className="w-8 h-8 rounded-xl bg-cyber-surface/60 border border-cyber-border/20 flex items-center justify-center group-hover:border-cyber-accent/15 transition-colors">
                  <Linkedin className="w-4 h-4 text-cyber-accent" />
                </div>
                <span>linkedin.com/in/ayush-kumar-94310522a</span>
              </a>
            </div>
            <div className="flex items-center space-x-2 text-xs text-cyber-muted mt-4">
              <MapPin className="w-3.5 h-3.5 text-cyber-accent-light" />
              <span>Patna, Bihar &bull; Open to Remote</span>
            </div>
            <button onClick={() => { playClickSound(); window.scrollTo({ top: 0, behavior: "smooth" }); }} onMouseEnter={playHoverSound} className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-cyber-surface/60 border border-cyber-border/20 hover:border-cyber-accent/15 text-cyber-text font-bold transition-all text-sm mt-5 group">
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-cyber-accent-light group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-cyber-border/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-wrap items-center justify-between text-[11px] text-cyber-muted">
          <span>&copy; {new Date().getFullYear()} Ayush Kumar.</span>
          <div className="flex items-center space-x-3">
            <span className="font-mono text-[10px] text-cyber-accent-light px-2.5 py-0.5 rounded-lg bg-cyber-accent/8 border border-cyber-accent/15">v2.0.0</span>
            <span className="font-mono text-[10px] text-cyber-accent-dim px-2.5 py-0.5 rounded-lg bg-cyber-accent-dim/8 border border-cyber-accent-dim/15">STATUS: 200 OK</span>
          </div>
        </div>
      </div>
    </footer>
  );
};