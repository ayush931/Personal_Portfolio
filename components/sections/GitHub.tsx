'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, BookOpen, Layers } from 'lucide-react';
import { useCursor } from '../cursor/useCursor';

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface RepoData {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
}

interface RepoConfig {
  path: string;
  name: string;
  defaultDescription: string;
  defaultLanguage: string;
  defaultStars: number;
  defaultForks: number;
}

const PINNED_REPOS: RepoConfig[] = [
  {
    path: 'ShopU-private/ShopU',
    name: 'ShopU',
    defaultDescription: 'ShopU is a modern, high-performance, and feature-rich omni-channel e-commerce and online healthcare/pharmacy platform. Built as a TypeScript monorepo using Turborepo and pnpm workspaces, it scales seamlessly across web, mobile, admin panels, and backend APIs.',
    defaultLanguage: 'TypeScript',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/Aetheria',
    name: 'Aetheria',
    defaultDescription: 'A real-time 2D multiplayer sandbox world built using Socket.io and Phaser Arcade Physics (20Hz updates with client-side linear interpolation to 60 FPS), featuring WebRTC proximity voice feeds, wardrobe customizers, and interactive rooms.',
    defaultLanguage: 'TypeScript',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/Arohio_Another_Backend',
    name: 'Arohio_Another_Backend',
    defaultDescription: 'FastAPI backend service for generating, managing, and exporting WCAG-compliant Alt Text. Supports bulk document/media processing (PDFs, images, Excel), OCR, and includes an AI-powered accessibility assistant.',
    defaultLanguage: 'Python',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/Arohio_New_Frontend',
    name: 'Arohio_New_Frontend',
    defaultDescription: 'AI-powered document accessibility platform. Automatically extract figures, charts, and tables from PDFs & Excel files to generate high-quality, WCAG-compliant alt text. Built with React and Vite.',
    defaultLanguage: 'JavaScript',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/RideSync',
    name: 'RideSync',
    defaultDescription: 'Ryde is a full-featured, high-performance taxi-booking and ridesharing mobile application built on React Native and Expo. Styled with NativeWind (Tailwind CSS) and equipped with seamless maps integration, robust authentication, and serverless Postgres storage.',
    defaultLanguage: 'TypeScript',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/ms-word-addin',
    name: 'ms-word-addin',
    defaultDescription: 'A Microsoft Word task pane add-in for grammar and spelling review. Scans document paragraphs progressively, features high-performance batch scanning for large documents, and supports remote integration with LanguageTool or fallback local check.',
    defaultLanguage: 'TypeScript',
    defaultStars: 0,
    defaultForks: 0,
  },
  {
    path: 'ayush931/Personal_Portfolio',
    name: 'Personal_Portfolio',
    defaultDescription: 'A premium, fully interactive 3D developer portfolio showcasing high-performance web animations and modern UI designs. Built with Next.js, Three.js, Framer Motion, and GSAP.',
    defaultLanguage: 'TypeScript',
    defaultStars: 0,
    defaultForks: 0,
  },
];

export const GitHub: React.FC = () => {
  const { setCursorType, setCursorText } = useCursor();
  const [userStats, setUserStats] = useState<GitHubUser>({ public_repos: 24, followers: 45 });
  const [repos, setRepos] = useState<RepoData[]>(
    PINNED_REPOS.map((r) => ({
      name: r.name,
      description: r.defaultDescription,
      stargazers_count: r.defaultStars,
      forks_count: r.defaultForks,
      language: r.defaultLanguage,
      html_url: `https://github.com/${r.path}`,
    }))
  );

  useEffect(() => {
    // Fetch user stats
    fetch('https://api.github.com/users/ayush931')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setUserStats({
            public_repos: data.public_repos,
            followers: data.followers || 42,
          });
        }
      })
      .catch(() => {});

    // Fetch details for all pinned repos
    Promise.all(
      PINNED_REPOS.map((r) =>
        fetch(`https://api.github.com/repos/${r.path}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.name) {
              return {
                name: data.name,
                description: data.description || r.defaultDescription,
                stargazers_count: data.stargazers_count || 0,
                forks_count: data.forks_count || 0,
                language: data.language || r.defaultLanguage,
                html_url: data.html_url || `https://github.com/${r.path}`,
              };
            }
            throw new Error('Invalid repo data');
          })
          .catch(() => ({
            name: r.name,
            description: r.defaultDescription,
            stargazers_count: r.defaultStars,
            forks_count: r.defaultForks,
            language: r.defaultLanguage,
            html_url: `https://github.com/${r.path}`,
          }))
      )
    )
      .then((fetchedRepos) => {
        setRepos(fetchedRepos);
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="github"
      className="py-24 px-6 md:px-12 border-t border-border-subtle/50 relative scroll-mt-16"
    >
      <div className="w-full max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-left space-y-2">
          <span className="font-mono text-xs text-accent-primary uppercase tracking-widest">&gt; 05. Open Source</span>
          <h2 className="text-h2 font-display text-text-primary">
            Open Source Activity
          </h2>
        </div>

        {/* Top Section: Contribution graph and stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* GitHub Contribution Graph Card */}
          <div className="lg:col-span-2 bg-bg-surface border border-border-subtle rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-xl">
            <div className="space-y-4">
              <span className="font-mono text-[10px] text-text-tertiary uppercase tracking-widest">
                Contributions Calendar
              </span>
              {/* Contribution chart embed image */}
              <div 
                className="w-full overflow-x-auto rounded-lg p-2 bg-bg-void border border-border-subtle/40 flex items-center justify-center min-h-[140px]"
                onMouseEnter={() => {
                  setCursorType('hover');
                  setCursorText('GRAPH');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  setCursorText('');
                }}
              >
                <img
                  src="https://ghchart.rshah.org/3b82f6/ayush931"
                  alt="Ayush Kumar GitHub Contribution Graph"
                  className="max-w-none md:max-w-full min-h-[120px]"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Public Repos */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">
                  Public Repos
                </span>
                <h4 className="font-display text-3xl font-bold text-text-primary">
                  {userStats.public_repos}
                </h4>
              </div>
              <BookOpen className="w-8 h-8 text-accent-primary opacity-25" />
            </div>

            {/* Total Contributions / Followers */}
            <div className="bg-bg-surface border border-border-subtle rounded-2xl p-6 flex items-center justify-between shadow-xl">
              <div className="space-y-1">
                <span className="font-mono text-[9px] text-text-tertiary uppercase tracking-widest">
                  Followers
                </span>
                <h4 className="font-display text-3xl font-bold text-text-primary">
                  {userStats.followers}
                </h4>
              </div>
              <Layers className="w-8 h-8 text-accent-glow opacity-25" />
            </div>
          </div>

        </div>

        {/* Pinned Repos (Grid of cards) */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-text-tertiary uppercase tracking-widest pl-1 block">
            Featured Repositories
          </span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <motion.div
                key={repo.name}
                whileHover={{ y: -3 }}
                onClick={() => window.open(repo.html_url, '_blank')}
                className="bg-bg-surface border border-border-subtle hover:border-accent-primary/40 rounded-2xl p-6 flex flex-col justify-between min-h-[12.5rem] h-full transition-all duration-300 shadow-xl cursor-pointer group relative overflow-hidden"
                onMouseEnter={() => {
                  setCursorType('hover');
                  setCursorText('CODE');
                }}
                onMouseLeave={() => {
                  setCursorType('default');
                  setCursorText('');
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/[0.005] to-accent-glow/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-display text-base font-bold text-text-primary break-all group-hover:text-accent-glow transition-colors duration-300">
                      {repo.name}
                    </h4>
                    {repo.language && (
                      <span className="font-mono text-[9px] text-accent-glow border border-accent-primary/20 bg-accent-primary/5 px-2 py-0.5 rounded-full shrink-0">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-sans line-clamp-3">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-border-subtle/50 text-text-tertiary text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" />
                    {repo.forks_count}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <a
            href="https://github.com/ayush931"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text-secondary hover:text-text-primary transition-colors duration-200 uppercase tracking-widest border-b border-border-subtle hover:border-text-primary pb-1"
            onMouseEnter={() => setCursorType('hover')}
            onMouseLeave={() => setCursorType('default')}
          >
            See all repositories &rarr;
          </a>
        </div>
      </div>
    </section>
  );
};
export default GitHub;
