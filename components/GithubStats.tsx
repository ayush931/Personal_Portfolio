'use client';

import React, { useState, useEffect } from 'react';
import { Folder, Star, Users, BookOpen, ExternalLink, GitBranch } from 'lucide-react';
import { Github } from '@/components/icons';

interface GithubUserData {
  login: string;
  name: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

interface Repository {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
}

export default function GithubStats() {
  const [userData, setUserData] = useState<GithubUserData | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // Fetch User Info
        const userRes = await fetch('https://api.github.com/users/ayush931');
        if (!userRes.ok) throw new Error('API Rate Limit or Network Error');
        const userJson = await userRes.json();
        setUserData(userJson);

        // Fetch Repos
        const reposRes = await fetch('https://api.github.com/users/ayush931/repos?sort=updated&per_page=6');
        if (!reposRes.ok) throw new Error('API Rate Limit or Network Error');
        const reposJson = await reposRes.json();
        setRepos(reposJson);
        setError(false);
      } catch (err) {
        console.warn('Using static fallback for GitHub data due to API limits/offline status:', err);
        setError(true);
        // Fallback static data based on actual user profile
        setUserData({
          login: 'ayush931',
          name: 'Ayush Kumar',
          avatar_url: 'https://avatars.githubusercontent.com/u/159576275?v=4',
          html_url: 'https://github.com/ayush931',
          public_repos: 48,
          followers: 8,
          following: 18,
          bio: 'Full Stack Software Engineer | Next.js, React Native, TypeScript & Node.js Developer'
        });
        
        setRepos([
          {
            name: 'excalidraw',
            html_url: 'https://github.com/ayush931/excalidraw',
            description: 'Real-time collaborative whiteboard built using Next.js, WebSockets, and Turborepo with low-latency sync.',
            language: 'TypeScript',
            stargazers_count: 3,
            forks_count: 1
          },
          {
            name: 'ms-word-addin',
            html_url: 'https://github.com/ayush931/ms-word-addin',
            description: 'Microsoft Word Add-in in TypeScript using Office.js API, automating document formatting and style enforcement.',
            language: 'TypeScript',
            stargazers_count: 1,
            forks_count: 0
          },
          {
            name: 'Interview-lift-project',
            html_url: 'https://github.com/ayush931/Interview-lift-project',
            description: 'Full-stack platform designed to practice coding interviews and system design queries dynamically.',
            language: 'TypeScript',
            stargazers_count: 2,
            forks_count: 0
          },
          {
            name: 'Fast-API',
            html_url: 'https://github.com/ayush931/Fast-API',
            description: 'Template and implementation scripts for FastAPI microservices backend connecting to PostgreSQL database.',
            language: 'Python',
            stargazers_count: 0,
            forks_count: 0
          },
          {
            name: 'C-Plus-and-DSA',
            html_url: 'https://github.com/ayush931/C-Plus-and-DSA',
            description: 'C++ implementations of core data structures, algorithms, and complex coding interview problem sets.',
            language: 'C++',
            stargazers_count: 1,
            forks_count: 0
          },
          {
            name: 'Arohio_New_Fr',
            html_url: 'https://github.com/ayush931/Arohio_New_Fr',
            description: 'Modern and optimized frontend module built with React and Tailwind CSS.',
            language: 'JavaScript',
            stargazers_count: 0,
            forks_count: 0
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const getLanguageColor = (lang: string | null) => {
    switch (lang) {
      case 'TypeScript': return 'bg-blue-500';
      case 'JavaScript': return 'bg-yellow-500';
      case 'Python': return 'bg-sky-500';
      case 'C++': return 'bg-pink-500';
      case 'HTML': return 'bg-orange-500';
      case 'CSS': return 'bg-purple-500';
      case 'Shell': return 'bg-green-500';
      default: return 'bg-zinc-400';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-5xl mx-auto px-4 py-8 animate-pulse">
        <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8 border border-card-border">
          <div className="w-24 h-24 rounded-full bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="glass-panel h-40 rounded-2xl p-6 border border-card-border bg-card-bg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4" id="github-stats">
      {/* Profile Overview Card */}
      {userData && (
        <div className="glass-panel rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 mb-10 border border-card-border neon-glow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors duration-500" />
          
          <a 
            href={userData.html_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-accent/40 hover:border-accent hover:scale-105 transition-all duration-300 shadow-md flex-shrink-0"
          >
            <img 
              src={userData.avatar_url} 
              alt={userData.name || userData.login} 
              className="w-full h-full object-cover"
            />
          </a>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 justify-center md:justify-start">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{userData.name || userData.login}</h3>
                <a 
                  href={userData.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-glow text-accent border border-accent/20 hover:bg-accent hover:text-white transition-all duration-300 self-center"
                >
                  <Github className="w-3.5 h-3.5" />
                  @{userData.login}
                </a>
              </div>
              <p className="text-sm text-text-muted mt-1 font-mono">Full Stack Software Engineer</p>
            </div>
            
            <p className="text-sm md:text-base text-foreground/80 max-w-2xl leading-relaxed">
              {userData.bio || "Full Stack Software Engineer passionate about React, Node.js, and high performance cloud architectures."}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.03] border border-card-border">
                <BookOpen className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">{userData.public_repos}</span>
                <span className="text-xs text-text-muted">Repositories</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.03] border border-card-border">
                <Users className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-semibold text-foreground">{userData.followers}</span>
                <span className="text-xs text-text-muted">Followers</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-foreground/[0.03] border border-card-border">
                <GitBranch className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-semibold text-foreground">{userData.following}</span>
                <span className="text-xs text-text-muted">Following</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Repositories Sub-Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Folder className="w-5 h-5 text-accent" />
            <h4 className="text-lg font-bold tracking-tight text-foreground">Featured GitHub Repositories</h4>
          </div>
          {userData && (
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-accent hover:text-accent-secondary flex items-center gap-1 transition-colors group cursor-pointer"
            >
              View All Repositories
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a 
              href={repo.html_url}
              key={repo.name}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-6 rounded-2xl border border-card-border flex flex-col justify-between hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300 group shadow-sm bg-card-bg tilt-card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-foreground font-semibold group-hover:text-accent transition-colors duration-300">
                    <Folder className="w-4 h-4 text-accent/80 flex-shrink-0" />
                    <span className="truncate max-w-[160px] font-mono text-sm tracking-tight">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 group-hover:text-accent transition-all duration-300" />
                </div>
                
                <p className="text-xs text-text-muted line-clamp-3 leading-relaxed font-sans min-h-[54px]">
                  {repo.description || "No description provided. Click to view repository details on GitHub."}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-2 border-t border-card-border/50 text-xs">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                    <span className="text-text-muted font-medium">{repo.language}</span>
                  </div>
                )}
                
                {repo.stargazers_count > 0 && (
                  <div className="flex items-center gap-1 text-text-muted">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
