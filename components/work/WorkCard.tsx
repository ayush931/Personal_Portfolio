"use client";

import { CheckCircle2 } from "lucide-react";

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

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  bullets: readonly string[];
  stack: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
  accentColor: string;
  stats: readonly { label: string; value: string }[];
};

export function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      data-work-card
      className="group relative rounded-panel border border-line bg-canvas-raised p-8 md:p-12 transition-all duration-300 hover:border-cobalt shadow-sm"
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Left Info Column */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 font-mono text-kicker uppercase tracking-kicker text-ink-muted mb-4">
              <span className="text-cobalt font-semibold">0{index + 1}</span>
              <span>/</span>
              <span>{project.category}</span>
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-semibold text-ink tracking-tight mb-2">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-cobalt mb-6 font-medium">{project.subtitle}</p>

            {/* Resume Bullet Points */}
            <div className="border-t border-b border-line py-6 my-6 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold block mb-3">
                Key Accomplishments & Architecture
              </span>
              <ul className="space-y-3 text-sm text-ink-muted leading-relaxed">
                {project.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-cobalt shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links & Footer */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
              >
                <GithubIcon size={14} />
                <span>GitHub Repository</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Stack & Metrics Column */}
        <div className="flex flex-col justify-between rounded-panel border border-line bg-canvas p-6 md:p-8 space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">Technologies & Libraries</span>
              <span className="font-mono text-xs text-cobalt font-semibold">{project.stack.length} Modules</span>
            </div>

            {/* Stack Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-line bg-canvas-raised px-3 py-1 font-mono text-xs text-ink font-medium transition-colors group-hover:border-cobalt/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Metrics / Highlights */}
          <div className={`grid grid-cols-${project.stats.length > 2 ? '3' : '2'} gap-3 rounded-xl border border-line bg-canvas-raised p-5`}>
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-sans text-xl font-bold text-cobalt">{stat.value}</p>
                <p className="font-mono text-[0.65rem] uppercase tracking-wider text-ink-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
