"use client";

import React, { useState } from "react";
import { X, Mail, Phone, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioFeedback } from "@/lib/useAudioFeedback";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const { playClickSound, playHoverSound } = useAudioFeedback();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Role Inquiry / Software Engineering",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-xl glass-panel-3d rounded-3xl p-7 sm:p-9 border border-cyber-accent/15 shadow-luxury z-10 space-y-7"
          >
            <button
              onClick={onClose}
              onMouseEnter={playHoverSound}
              className="absolute top-5 right-5 p-2.5 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-muted hover:text-cyber-text hover:border-cyber-accent/30 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 border-b border-cyber-border/30 pb-5 font-mono">
              <div className="text-xs text-cyber-accent-light flex items-center space-x-2 font-bold">
                <Mail className="w-4 h-4" />
                <span>INITIALIZE DIRECT COMMUNICATION</span>
              </div>
              <h3 className="text-2xl font-bold text-cyber-text font-sans">
                Let&apos;s Build Something Extraordinary Together
              </h3>
            </div>

            {submitted ? (
              <div className="py-14 text-center space-y-5 font-mono">
                <CheckCircle2 className="w-16 h-16 text-cyber-accent-light mx-auto animate-bounce" />
                <div className="text-xl font-bold text-cyber-text">MESSAGE DISPATCHED SUCCESSFULLY</div>
                <p className="text-sm text-cyber-muted max-w-md mx-auto font-sans">
                  Thank you for reaching out! Ayush will respond to your message within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-cyber-muted">YOUR_NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-cyber-muted">EMAIL_ADDRESS *</label>
                    <input
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-cyber-muted">SUBJECT / INQUIRY TYPE</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text focus:border-cyber-accent focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-cyber-muted">MESSAGE_BODY *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your role, project, or system requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-cyber-surface/80 border border-cyber-border/50 text-cyber-text placeholder-cyber-muted focus:border-cyber-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[11px] text-cyber-muted border-t border-cyber-border/30 font-mono">
                  <a href="mailto:ayushkumar9315983@gmail.com" className="hover:text-cyber-accent-light transition-colors flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyber-accent-light" />
                    <span>ayushkumar9315983@gmail.com</span>
                  </a>
                  <a href="tel:+917070472634" className="hover:text-cyber-accent-light transition-colors flex items-center space-x-1.5">
                    <Phone className="w-3.5 h-3.5 text-cyber-accent-light" />
                    <span>+91 70704 72634</span>
                  </a>
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="w-full py-4 rounded-2xl bg-cyber-accent text-cyber-bg font-bold text-xs hover:bg-cyber-accent-light transition-all flex items-center justify-center space-x-2 shadow-luxury"
                >
                  <Send className="w-4 h-4" />
                  <span>DISPATCH_MESSAGE()</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
