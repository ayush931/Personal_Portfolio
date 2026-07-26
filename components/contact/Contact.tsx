"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { ArrowUpRight, AlertCircle, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/constants";
import { useToast } from "@/components/common/ToastProvider";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(1, "Message is required."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const parseResult = contactSchema.safeParse(data);
    if (!parseResult.success) {
      const err = parseResult.error.issues[0]?.message || "Please check your form inputs.";
      setStatus("error");
      setServerMessage(err);
      toast.error(err, "Validation Error");
      return;
    }

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
        const msg = result.message || "Message sent successfully!";
        setServerMessage(msg);
        toast.success(msg, "Message Sent");
        reset();
      } else {
        setStatus("error");
        const msg = result.message || "Something went wrong. Please try again.";
        setServerMessage(msg);
        toast.error(msg, "Transmission Error");
      }
    } catch {
      setStatus("error");
      const msg = "Network error. Please check your connection and try again.";
      setServerMessage(msg);
      toast.error(msg, "Network Error");
    }
  };

  return (
    <div className="relative isolate bg-canvas blueprint-grid px-gutter py-12 md:py-20 border-t border-line min-h-full flex flex-col justify-center">
      <div className="mx-auto max-w-[1600px] w-full">
        {/* Header */}
        <div data-reveal className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end border-b border-line pb-8">
          <div>
            <div className="mb-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted">
              07 / Contact &amp; Inquiries
            </div>
            <h2 className="font-sans text-title font-medium leading-[0.92] tracking-display text-ink">
              Let&apos;s Build Something Intentional.
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
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">Phone Contact</span>
                  <a href={`tel:${SITE.phone}`} className="text-ink font-medium hover:text-cobalt transition-colors">
                    {SITE.phone}
                  </a>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">Location</span>
                  <span className="text-ink font-medium">{SITE.location}</span>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">GitHub Profile</span>
                  <a href={SITE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cobalt hover:underline font-medium">
                    github.com/ayush931 <ArrowUpRight size={12} />
                  </a>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">LinkedIn Profile</span>
                  <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cobalt hover:underline font-medium">
                    linkedin.com/in/ayush-kumar-94310522a <ArrowUpRight size={12} />
                  </a>
                </div>
                <div>
                  <span className="text-ink-muted block uppercase tracking-wider mb-1">Resume File</span>
                  <a href="/resume.pdf" target="_blank" download="Ayush_Full_Stack_Developer_Resume.pdf" className="inline-flex items-center gap-1 text-cobalt hover:underline font-semibold">
                    Ayush_Full_Stack_Developer_Resume.pdf <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line font-mono text-[0.6875rem] text-ink-muted flex items-center justify-between">
              <span>IST Timezone (UTC+5:30) • Patna, Bihar</span>
              <span>Available 2026</span>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="rounded-panel border border-line bg-canvas-raised p-8 md:p-12 space-y-6">
            {status === "success" && (
              <div className="flex items-center gap-3 rounded-xl border border-cobalt/30 bg-cobalt/10 p-4 text-ink font-mono text-xs">
                <svg className="h-5 w-5 stroke-cobalt" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                  <path
                    d="M 5 12 L 10 17 L 19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[drawCheck_0.4s_ease-out_forwards]"
                    style={{ strokeDasharray: 30, strokeDashoffset: 0 }}
                  />
                </svg>
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
              {/* Name with Focus Underline */}
              <div className="group relative border-b border-line pb-2 focus-within:border-cobalt">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors group-focus-within:text-cobalt mb-1">
                  Your Name
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters." },
                  })}
                  placeholder="Ayush Kumar"
                  className="w-full bg-transparent font-mono text-sm text-ink outline-none"
                />
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-cobalt transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
                {errors.name && <p className="font-mono text-[0.6875rem] text-vermilion mt-1">{errors.name.message}</p>}
              </div>

              {/* Email with Focus Underline */}
              <div className="group relative border-b border-line pb-2 focus-within:border-cobalt">
                <label className="block font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors group-focus-within:text-cobalt mb-1">
                  Email Address
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  type="email"
                  placeholder="ayush@example.com"
                  className="w-full bg-transparent font-mono text-sm text-ink outline-none"
                />
                <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-cobalt transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
                {errors.email && <p className="font-mono text-[0.6875rem] text-vermilion mt-1">{errors.email.message}</p>}
              </div>
            </div>

            {/* Subject with Focus Underline */}
            <div className="group relative border-b border-line pb-2 focus-within:border-cobalt">
              <label className="block font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors group-focus-within:text-cobalt mb-1">
                Subject
              </label>
              <input
                {...register("subject", {
                  required: "Subject is required",
                  minLength: { value: 3, message: "Subject must be at least 3 characters." },
                })}
                placeholder="Pipeline Engineering / Frontend Role"
                className="w-full bg-transparent font-mono text-sm text-ink outline-none"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-cobalt transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
              {errors.subject && <p className="font-mono text-[0.6875rem] text-vermilion mt-1">{errors.subject.message}</p>}
            </div>

            {/* Message with Focus Underline */}
            <div className="group relative border-b border-line pb-2 focus-within:border-cobalt">
              <label className="block font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors group-focus-within:text-cobalt mb-1">
                Message
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                })}
                rows={4}
                placeholder="Tell me about your project scope, technical requirements, or role overview..."
                className="w-full bg-transparent font-mono text-sm text-ink outline-none resize-none"
              />
              <span className="absolute bottom-0 left-0 h-[2px] w-full origin-center scale-x-0 bg-cobalt transition-transform duration-300 ease-out group-focus-within:scale-x-100" />
              {errors.message && <p className="font-mono text-[0.6875rem] text-vermilion mt-1">{errors.message.message}</p>}
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
              ) : status === "success" ? (
                <span className="flex items-center gap-2 text-acid">
                  <svg className="h-5 w-5 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2.5">
                    <path
                      d="M 5 12 L 10 17 L 19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Message Sent
                </span>
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
    </div>
  );
}
