'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Calendar, Check, Send } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import { useCursor } from '../cursor/useCursor';
import { gsap } from '@/lib/gsap';

export const Contact: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word-by-word heading reveal
      gsap.fromTo('.contact-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Subtext fade in
      gsap.fromTo('.contact-subtext',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-subtext',
            start: 'top 85%',
          }
        }
      );

      // Left Cards stagger up
      gsap.fromTo('.contact-card-anim',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid-container',
            start: 'top 85%',
          }
        }
      );

      // Right form slide-in
      gsap.fromTo('.contact-form-container',
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-grid-container',
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ayushkumar9315983@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookCall = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // CRM Log Call Booking Attempt
    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('crm_messages');
      const messages = existing ? JSON.parse(existing) : [];
      const newLog = {
        id: 'booking-' + Date.now(),
        name: 'Call Booking Initiated',
        email: 'cal-booking@ayush.in',
        message: 'A visitor clicked the booking scheduler link to book a 15-minute call on Cal.com.',
        timestamp: new Date().toLocaleString(),
      };
      messages.unshift(newLog);
      localStorage.setItem('crm_messages', JSON.stringify(messages));
    }

    // Open Cal.com schedule link
    window.open('https://cal.com/ayushkumar', '_blank');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormStatus('submitting');

    setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          const existing = localStorage.getItem('crm_messages');
          const messages = existing ? JSON.parse(existing) : [];
          const newMsg = {
            id: 'msg-' + Date.now(),
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toLocaleString(),
          };
          messages.unshift(newMsg);
          localStorage.setItem('crm_messages', JSON.stringify(messages));
        }
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });

        // Auto reset state
        setTimeout(() => setFormStatus('idle'), 4000);
      } catch (err) {
        setFormStatus('error');
      }
    }, 1000);
  };

  const contactCards = [
    {
      id: 'email',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-accent-glow" />,
      label: 'Email Address',
      value: 'ayushkumar9315983@gmail.com',
      actionText: copied ? 'Copied ✓' : 'Copy Email',
      onClick: handleCopyEmail,
      cursorText: 'COPY',
    },
    {
      id: 'linkedin',
      icon: <Linkedin className="w-4.5 h-4.5 text-accent-glow" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ayush-kumar-94310522a',
      actionText: 'Connect ↗',
      onClick: () => window.open('https://www.linkedin.com/in/ayush-kumar-94310522a', '_blank'),
      cursorText: 'OPEN',
    },
    {
      id: 'github',
      icon: <Github className="w-4.5 h-4.5 text-accent-glow" />,
      label: 'GitHub',
      value: 'github.com/ayush931',
      actionText: 'Follow ↗',
      onClick: () => window.open('https://github.com/ayush931', '_blank'),
      cursorText: 'OPEN',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16 flex flex-col justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-primary/[0.005] to-accent-glow/[0.01] pointer-events-none" />

      <div className="w-full max-w-6xl space-y-12 relative z-10 text-center">
        
        {/* Header eyebrow */}
        <div className="font-mono text-xs text-accent-primary uppercase tracking-widest">
          &gt; 06. Contact
        </div>

        {/* Large display header (Word-by-word reveal) */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-text-primary tracking-tight select-none leading-none">
          {["Let's", 'build', 'something.'].map((word, wIdx) => (
            <span key={wIdx} className="contact-word inline-block mr-3 opacity-0">
              {word}
            </span>
          ))}
        </h2>

        {/* Subtext */}
        <p className="contact-subtext opacity-0 max-w-xl mx-auto text-sm md:text-base text-text-secondary leading-relaxed font-sans">
          Open to full-time engineering roles, remote opportunities, and interesting codebase challenges.
        </p>

        {/* Responsive Layout Grid Split */}
        <div className="contact-grid-container grid grid-cols-1 lg:grid-cols-5 gap-8 text-left pt-6 max-w-5xl mx-auto">
          
          {/* Left Column: Socials and Calendar Booking (Col span: 2) */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest pl-1">
                Reach Out Directly
              </span>
              
              <div className="space-y-4">
                {contactCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={card.onClick}
                    className="contact-card-anim opacity-0 bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 shadow-lg cursor-pointer hover:-translate-y-0.5 group relative overflow-hidden"
                    onMouseEnter={() => {
                      setCursorType('hover');
                      setCursorText(card.cursorText);
                    }}
                    onMouseLeave={() => {
                      setCursorType('default');
                      setCursorText('');
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.01] to-accent-glow/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-bg-elevated border border-border-subtle flex items-center justify-center transition-colors duration-300 group-hover:border-accent-primary/30 shrink-0">
                      {card.icon}
                    </div>

                    {/* Labels */}
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider block">
                        {card.label}
                      </span>
                      <span className="text-xs text-text-secondary font-mono block truncate max-w-[220px]">
                        {card.value}
                      </span>
                    </div>

                    {/* Action text */}
                    <span className="ml-auto font-mono text-[9px] uppercase text-accent-primary group-hover:text-accent-glow transition-colors duration-300 shrink-0">
                      {card.actionText}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Booking Card */}
            <div className="contact-card-anim opacity-0 pt-4">
              <div className="bg-bg-surface/60 border border-border-subtle rounded-2xl p-5 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full filter blur-xl pointer-events-none" />
                
                <div className="space-y-1">
                  <h4 className="font-display text-sm font-bold text-text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent-primary" />
                    <span>Instant Call Scheduler</span>
                  </h4>
                  <p className="text-[11px] leading-normal text-text-secondary">
                    Prefer direct audio or video discussion? Sync calendar events directly using Cal.com.
                  </p>
                </div>

                <a
                  href="https://cal.com/ayushkumar"
                  onClick={handleBookCall}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-accent-primary/20 bg-bg-surface hover:bg-bg-elevated font-mono text-xs text-text-primary hover:text-accent-primary hover:border-accent-primary/40 transition-all duration-300 cursor-pointer shadow-md text-center"
                  onMouseEnter={() => {
                    setCursorType('hover');
                    setCursorText('CALENDAR');
                  }}
                  onMouseLeave={() => {
                    setCursorType('default');
                    setCursorText('');
                  }}
                >
                  Book a 15-min call &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: CRM Message Box (Col span: 3) */}
          <div className="lg:col-span-3 contact-form-container opacity-0">
            <div className="clay-card rounded-[2rem] p-6 md:p-8 space-y-6 relative h-full flex flex-col justify-between">
              
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-glow animate-pulse" />
                  <span className="font-mono text-[10px] text-accent-primary font-bold uppercase tracking-widest">
                    Secure Inbound Gateway
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">
                  Transmit CRM Message
                </h3>
                <p className="text-xs text-text-secondary">
                  Your transmission gets logged to the local CRM dashboard for review.
                </p>
              </div>

              {formStatus === 'success' ? (
                /* Success screen card */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-4 animate-float">
                  <div className="w-14 h-14 rounded-2xl clay-badge clay-badge-active text-emerald-400 flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-text-primary">Transmission Succeeded</h4>
                    <p className="text-xs text-text-secondary max-w-[280px] leading-relaxed mx-auto">
                      Log entry saved. Enter the CRM dashboard using passcode credentials to verify.
                    </p>
                  </div>
                </div>
              ) : (
                /* Main message form */
                <form onSubmit={handleFormSubmit} className="flex-1 flex flex-col justify-between gap-5 pt-2">
                  <div className="space-y-4">
                    {/* Name input */}
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider block pl-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 clay-input text-text-primary text-xs font-medium"
                        required
                        disabled={formStatus === 'submitting'}
                        onMouseEnter={() => setCursorType('text')}
                        onMouseLeave={() => setCursorType('default')}
                      />
                    </div>

                    {/* Email input */}
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider block pl-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 clay-input text-text-primary text-xs font-medium"
                        required
                        disabled={formStatus === 'submitting'}
                        onMouseEnter={() => setCursorType('text')}
                        onMouseLeave={() => setCursorType('default')}
                      />
                    </div>

                    {/* Message body input */}
                    <div className="space-y-1">
                      <label className="font-mono text-[9px] text-text-tertiary uppercase tracking-wider block pl-1">
                        Transmission Payload (Message)
                      </label>
                      <textarea
                        placeholder="Detail your system requirements or proposal..."
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 clay-input text-text-primary text-xs font-medium resize-none"
                        required
                        disabled={formStatus === 'submitting'}
                        onMouseEnter={() => setCursorType('text')}
                        onMouseLeave={() => setCursorType('default')}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full py-3 px-6 rounded-xl font-bold clay-btn flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed text-xs uppercase font-mono tracking-wider mt-2 shrink-0"
                    onMouseEnter={() => {
                      if (formStatus !== 'submitting') {
                        setCursorType('hover');
                        setCursorText('TRANSMIT');
                      }
                    }}
                    onMouseLeave={() => {
                      setCursorType('default');
                      setCursorText('');
                    }}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-text-primary border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Payload...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Transmit Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Contact;
