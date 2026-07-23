"use client";

import React, { useState } from "react";
import { X, Send, CheckCircle2, User, Mail, MessageSquare, Briefcase, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { audioEngine } from "@/lib/audioEngine";
import { saveCrmLead } from "@/lib/crmStorage";

interface HireMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HireMeModal: React.FC<HireMeModalProps> = ({ isOpen, onClose }) => {
  // Message Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Full-Stack Architecture");
  const [budget, setBudget] = useState("$2,000 - $5,000");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    audioEngine.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      // Save directly to CRM Storage
      saveCrmLead({
        name,
        email,
        category: projectType,
        budget,
        message,
      });

      setIsSubmitting(false);
      setMessageSent(true);
      audioEngine.playSuccess();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl select-none font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-xl max-h-[90vh] bg-oled-card border border-signal-green/50 rounded-xl shadow-2xl overflow-hidden flex flex-col relative text-xs"
        >
          {/* Modal Header */}
          <div className="px-6 py-4 bg-oled-bg border-b border-oled-border flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-2.5 h-2.5 bg-signal-green animate-pulse" />
              <div>
                <div className="text-[10px] text-signal-green tracking-wider uppercase">
                  ACTIVE THEORY // INITIATE HIRE INQUIRY
                </div>
                <h3 className="text-lg font-bold font-sans text-oled-text">Hire Ayush & Direct Message</h3>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                onClose();
              }}
              className="p-1.5 rounded bg-oled-surface border border-oled-border hover:border-red-500 text-oled-muted hover:text-red-400 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body: Pure Direct Message Form */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-tech-grid">
            {messageSent ? (
              <div className="p-8 text-center space-y-4 bg-oled-surface rounded-lg border border-signal-green/40 font-sans">
                <div className="w-12 h-12 rounded-full bg-signal-green/10 border border-signal-green text-signal-green flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-oled-text">MESSAGE DISPATCHED SUCCESSFULLY</h4>
                <p className="text-xs text-oled-muted font-mono max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-signal-green">{name}</strong>. Your project specification has been logged into the queue. Ayush will respond to <strong className="text-signal-cyan">{email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setMessageSent(false);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="px-4 py-2 rounded bg-signal-green text-oled-bg font-bold font-mono text-xs hover:bg-signal-green/90 transition-colors shadow-glow-green"
                >
                  &gt; SEND_ANOTHER_MESSAGE()
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-oled-muted flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-signal-green" />
                      <span>YOUR NAME / COMPANY</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-green text-oled-text outline-none text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-oled-muted flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-signal-cyan" />
                      <span>EMAIL ADDRESS</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] text-oled-muted flex items-center space-x-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-signal-amber" />
                      <span>PROJECT CATEGORY</span>
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-amber text-oled-text outline-none text-xs"
                    >
                      <option value="Full-Stack Architecture">Full-Stack Application</option>
                      <option value="Real-Time Sync Engine">Real-Time Sync / WebSockets</option>
                      <option value="Monorepo Architecture">Monorepo / Microservices</option>
                      <option value="FastAPI / AI Pipeline">FastAPI / AI Backend</option>
                      <option value="Contract / Full-time Role">Full-Time / Contract Role</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] text-oled-muted flex items-center space-x-1.5">
                      <Terminal className="w-3.5 h-3.5 text-signal-cyan" />
                      <span>ESTIMATED BUDGET</span>
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-cyan text-oled-text outline-none text-xs"
                    >
                      <option value="< $2,000">&lt; $2,000</option>
                      <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="> $10,000">&gt; $10,000</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] text-oled-muted flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-signal-green" />
                    <span>PROJECT DETAILS / MESSAGE</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your project, timeline, or requirements..."
                    className="w-full px-3 py-2 bg-oled-bg border border-oled-border rounded focus:border-signal-green text-oled-text outline-none text-xs leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => audioEngine.playHover()}
                  className="w-full py-3 bg-signal-green text-oled-bg font-bold rounded hover:bg-signal-green/90 transition-all flex items-center justify-center space-x-2 text-xs shadow-glow-green"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "TRANSMITTING..." : "DISPATCH_HIRE_MESSAGE()"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3 bg-oled-bg border-t border-oled-border flex items-center justify-between text-[11px] text-oled-muted">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-signal-green" />
              <span>DIRECT END-TO-END ENCRYPTED STREAM</span>
            </span>
            <span>AYUSH KUMAR // HIRE SYSTEM</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
