"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, CheckCircle, AlertCircle, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/constants";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters long."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Validate with Zod before submitting
    const parseResult = contactSchema.safeParse(data);
    if (!parseResult.success) return;

    setStatus("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        setServerMessage(result.message || "Message sent successfully!");
        reset();
      } else {
        setStatus("error");
        setServerMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section id="contact" className="relative isolate bg-canvas px-gutter py-section border-t border-line">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              06 / Contact & Inquiries
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Let's Build Something Intentional.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-ink-muted leading-relaxed">
            Open for high-impact full-stack roles, system architecture consulting, and WebGL/3D collaborations.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Direct Details */}
          <div className="flex flex-col justify-between rounded-panel border border-line bg-canvas-raised p-8 md:p-12">
            <div>
              <span className="font-mono text-kicker uppercase tracking-kicker text-cobalt block mb-4">Direct Contact</span>
              <p className="font-sans text-2xl md:text-3xl font-semibold text-ink leading-snug mb-6">
                Have a project or technical challenge in mind?
              </p>
              <p className="text-ink-muted leading-relaxed text-sm md:text-base mb-8">
                Whether discussing distributed PDF processing pipelines, real-time WebSockets, or fine-tuning 3D shader uniforms — drop a message.
              </p>

              <div className="space-y-4 font-mono text-xs text-ink border-t border-line pt-6">
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">GitHub Profile</span>
                  <a href={SITE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cobalt hover:underline">
                    github.com/ayush931 <ArrowUpRight size={12} />
                  </a>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">Availability</span>
                  <span className="text-ink">Selective Engineering Contracts / Full-Time Roles</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line font-mono text-[0.6875rem] text-ink-muted">
              <span>IST Timezone (UTC+5:30) • Response within 24 hours</span>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-panel border border-line bg-canvas-raised p-8 md:p-12 space-y-6">
            {status === "success" && (
              <div className="flex items-center gap-3 rounded-xl border border-cobalt/30 bg-cobalt/10 p-4 text-ink font-mono text-xs">
                <CheckCircle size={18} className="text-cobalt shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 rounded-xl border border-vermilion/30 bg-vermilion/10 p-4 text-ink font-mono text-xs">
                <AlertCircle size={18} className="text-vermilion shrink-0" />
                <span>{serverMessage}</span>
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-ink block mb-2">Your Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Ayush Sharma"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cobalt"
                />
                {errors.name && <p className="font-mono text-[0.6875rem] text-vermilion mt-1.5">{errors.name.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="font-mono text-xs uppercase tracking-wider text-ink block mb-2">Email Address</label>
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="ayush@example.com"
                  className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cobalt"
                />
                {errors.email && <p className="font-mono text-[0.6875rem] text-vermilion mt-1.5">{errors.email.message}</p>}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink block mb-2">Subject</label>
              <input
                {...register("subject", { required: "Subject is required" })}
                placeholder="Pipeline Engineering / Frontend Role"
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cobalt"
              />
              {errors.subject && <p className="font-mono text-[0.6875rem] text-vermilion mt-1.5">{errors.subject.message}</p>}
            </div>

            {/* Message */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-ink block mb-2">Message</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={5}
                placeholder="Tell me about your project scope, technical requirements, or role overview..."
                className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-cobalt resize-none"
              />
              {errors.message && <p className="font-mono text-[0.6875rem] text-vermilion mt-1.5">{errors.message.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-canvas transition-colors hover:bg-cobalt disabled:opacity-50 cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
