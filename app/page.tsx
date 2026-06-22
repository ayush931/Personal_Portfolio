'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Terminal, 
  Code, 
  Briefcase, 
  Cpu, 
  Database, 
  Cloud, 
  LineChart, 
  Award, 
  Send,
  Sparkles,
  Menu,
  X,
  FileText,
  Folder,
  Star
} from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';
import ParticleCanvas from '@/components/ParticleCanvas';
import GithubStats from '@/components/GithubStats';
import TiltCard from '@/components/TiltCard';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0); // Default expand first job
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'experience', 'projects', 'github', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skill categorization
  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'languages', name: 'Languages', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Terminal },
    { id: 'backend', name: 'Backend', icon: Cpu },
    { id: 'databases', name: 'Databases', icon: Database },
    { id: 'devops', name: 'DevOps & Cloud', icon: Cloud },
    { id: 'engineering', name: 'Engineering Principles', icon: LineChart }
  ];

  const skillsData = [
    // Languages
    { name: 'TypeScript', category: 'languages', level: 90 },
    { name: 'JavaScript (ES6+)', category: 'languages', level: 95 },
    { name: 'SQL', category: 'languages', level: 85 },
    { name: 'C++', category: 'languages', level: 75 },
    { name: 'Python', category: 'languages', level: 80 },
    
    // Frontend
    { name: 'Next.js', category: 'frontend', level: 92 },
    { name: 'React.js', category: 'frontend', level: 95 },
    { name: 'React Native (Expo)', category: 'frontend', level: 88 },
    { name: 'Tailwind CSS', category: 'frontend', level: 90 },
    { name: 'Redux Toolkit', category: 'frontend', level: 85 },
    { name: 'Expo Router', category: 'frontend', level: 85 },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 90 },
    { name: 'Express.js', category: 'backend', level: 92 },
    { name: 'RESTful APIs', category: 'backend', level: 95 },
    { name: 'FastAPI', category: 'backend', level: 80 },
    { name: 'WebSockets', category: 'backend', level: 85 },
    { name: 'Microservices', category: 'backend', level: 82 },
    { name: 'JWT & OAuth 2.0', category: 'backend', level: 90 },
    { name: 'RBAC (Auth)', category: 'backend', level: 88 },

    // Databases
    { name: 'PostgreSQL', category: 'databases', level: 88 },
    { name: 'MongoDB', category: 'databases', level: 90 },
    { name: 'Redis', category: 'databases', level: 80 },
    { name: 'Prisma ORM', category: 'databases', level: 90 },
    { name: 'Neon Serverless', category: 'databases', level: 85 },
    { name: 'Query Optimization', category: 'databases', level: 82 },

    // DevOps
    { name: 'Docker', category: 'devops', level: 80 },
    { name: 'AWS (EC2/S3)', category: 'devops', level: 78 },
    { name: 'CI/CD (Actions)', category: 'devops', level: 82 },
    { name: 'RabbitMQ', category: 'devops', level: 85 },
    { name: 'Turborepo', category: 'devops', level: 88 },
    
    // Engineering
    { name: 'Data Structures', category: 'engineering', level: 85 },
    { name: 'System Design', category: 'engineering', level: 80 },
    { name: 'API Design', category: 'engineering', level: 90 },
    { name: 'Performance Tuning', category: 'engineering', level: 85 },
  ];

  const filteredSkills = selectedSkillCategory === 'all'
    ? skillsData
    : skillsData.filter(s => s.category === selectedSkillCategory);

  // Experience Data
  const experiences = [
    {
      role: 'Junior Software Engineer',
      company: 'NexoGrafix Private Limited',
      period: 'Apr 2026 – Present',
      points: [
        'Developed a Microsoft Word Add-in in TypeScript using the Office.js API, automating document formatting and style enforcement against client-defined custom style guides, which reduced manual effort by 60%.',
        'Architected a full-stack document conversion platform (OCR + XML + EPUB pipeline) using FastAPI and React, decomposed into independent microservices.',
        'Built XML and EPUB microservices supporting JATS/DocBook schemas, configurable templates, and automated EPUB 3 generation with automated table of contents, chapters, and validation.'
      ],
      tech: ['TypeScript', 'Office.js API', 'FastAPI', 'React.js', 'Microservices', 'JATS/DocBook']
    },
    {
      role: 'Software Engineer Intern',
      company: 'ShipU Logistics Private Limited',
      period: 'Sept 2025 – Jan 2026',
      points: [
        'Designed a logistics management platform using MERN stack and Next.js with shipment tracking, delivery workflows, and RBAC security.',
        'Boosted backend database query performance by 25% via optimized PostgreSQL queries and Prisma ORM connection pooling.',
        'Architected event-driven microservices using RabbitMQ and containerized applications with Docker, deploying to AWS stages.',
        'Organized the multi-package project in a Turborepo monorepo, enabling shared modules across services and cutting duplicates by 35%.'
      ],
      tech: ['Next.js', 'MERN Stack', 'PostgreSQL', 'Prisma ORM', 'RabbitMQ', 'Docker', 'AWS', 'Turborepo']
    },
    {
      role: 'Software Engineer Intern',
      company: 'Shabra Softech Solution Pvt. Ltd.',
      period: 'Feb 2025 – Jul 2025',
      points: [
        'Migrated a legacy MERN monolith codebase to a Turborepo monorepo structure, increasing developer velocity and boosting code reusability by 40%.',
        'Built production-grade Next.js and React Native mobile applications serving 1,000+ monthly active users, designing shared UI packages.',
        'Implemented secure JWT, OAuth 2.0, and Role-Based Access Control (RBAC), reducing auth issues by 50% while maintaining 95%+ sprint delivery.'
      ],
      tech: ['React Native', 'Next.js', 'Zustand', 'Turborepo', 'JWT', 'OAuth 2.0', 'RBAC']
    }
  ];

  // Projects Data
  const projects = [
    {
      title: 'Excalidraw Clone',
      subtitle: 'Real-Time Collaborative Whiteboard',
      description: 'A performance-oriented collaborative whiteboard application allowing multiple users to draw together simultaneously in rooms. Built with a focus on real-time canvas synchronisation, React rendering speed, and complex data models.',
      highlights: [
        'Real-time drawing sync using WebSockets',
        'PostgreSQL persistence layer with queries optimized to reduce canvas load times by 40%',
        'Applied React memoisation and state diffing to reduce unnecessary layout re-renders by 60%'
      ],
      tech: ['Next.js', 'WebSockets', 'Turborepo', 'PostgreSQL', 'TypeScript'],
      github: 'https://github.com/ayush931/excalidraw'
    },
    {
      title: 'RideSync',
      subtitle: 'Real-Time Ride Booking App',
      description: 'A complete full-stack ride-hailing application featuring live geolocation tracking, interactive navigation, and instant messaging between riders and drivers.',
      highlights: [
        'Real-time GPS tracking and WebSockets',
        'Neon serverless PostgreSQL achieving <200ms database response times',
        'Implemented global state with Zustand, Expo Router, and 15% smaller bundle size via code splitting'
      ],
      tech: ['React Native', 'Expo Router', 'Clerk Auth', 'Neon PostgreSQL', 'Zustand'],
      github: 'https://github.com/ayush931/RideSync'
    }
  ];

  // Form handle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    // Create message object
    const newMsg = {
      id: Date.now().toString(),
      name: formState.name,
      email: formState.email,
      message: formState.message,
      timestamp: new Date().toLocaleString()
    };

    // Save to localStorage CRM
    const existing = localStorage.getItem('crm_messages');
    const messages = existing ? JSON.parse(existing) : [];
    messages.unshift(newMsg);
    localStorage.setItem('crm_messages', JSON.stringify(messages));
    
    setFormSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* 3D Canvas Background */}
      <ParticleCanvas />

      {/* Fixed Sticky Header with Claymorphism */}
      <header className="fixed top-0 left-0 right-0 z-40 w-full bg-white/70 backdrop-blur-md border-b border-card-border/30 transition-all duration-300 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 cursor-pointer group">
            <span className="w-9.5 h-9.5 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-mono font-bold shadow-md shadow-accent/25 group-hover:scale-105 transition-transform duration-300 border border-white/20">
              AK
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-foreground">Ayush Kumar</span>
              <span className="text-[10px] font-mono text-text-muted">Full Stack Dev</span>
            </div>
          </a>

          {/* Desktop Navigation using clay tags */}
          <nav className="hidden md:flex items-center gap-2">
            {['hero', 'skills', 'experience', 'projects', 'github', 'contact'].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                className={`px-4.5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeSection === sec
                    ? 'clay-btn font-extrabold scale-105 shadow-md shadow-accent/25 border border-white/20'
                    : 'clay-badge text-foreground/75 hover:scale-105 hover:-translate-y-0.5'
                }`}
              >
                {sec === 'hero' ? 'home' : sec}
              </a>
            ))}
          </nav>

          {/* Contact Action */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:ayushkumar9315983@gmail.com"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold rounded-full clay-btn cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              Hire Me
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-lg text-foreground hover:bg-foreground/[0.05] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-30 bg-white/95 backdrop-blur-md md:hidden transition-all duration-300 border-t border-card-border">
          <nav className="flex flex-col p-6 gap-4">
            {['hero', 'skills', 'experience', 'projects', 'github', 'contact'].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all text-center ${
                  activeSection === sec
                    ? 'clay-btn font-extrabold shadow-md border border-white/20'
                    : 'clay-badge text-foreground/80 hover:bg-foreground/[0.04]'
                }`}
              >
                {sec === 'hero' ? 'home' : sec}
              </a>
            ))}
            <a
              href="mailto:ayushkumar9315983@gmail.com"
              className="mt-4 flex items-center justify-center gap-2 p-3 text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-secondary rounded-xl hover:opacity-90 shadow-md"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </nav>
        </div>
      )}

      {/* Main Sections Wrapper */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-24 pb-8 relative">
        {/* Decorative dynamic glows behind sections */}
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-accent/5 filter blur-[100px] animate-pulse-slow pointer-events-none -z-20" />
        <div className="absolute top-[45%] right-[5%] w-[450px] h-[450px] rounded-full bg-accent-secondary/5 filter blur-[120px] animate-pulse-slow pointer-events-none -z-20" />

        {/* HERO SECTION */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center py-12 md:py-20 relative">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="space-y-6 flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full clay-badge clay-badge-active text-accent text-xs font-bold animate-float">
                <Sparkles className="w-3.5 h-3.5" />
                Open to Software Engineering Opportunities
              </div>
              
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground">
                Hi, I'm <span className="gradient-text">Ayush Kumar</span>
              </h1>

              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground/80 tracking-tight">
                Full Stack Software Engineer
              </h2>

              <p className="text-base sm:text-lg text-text-muted leading-relaxed font-sans max-w-xl mx-auto md:mx-0">
                I specialize in crafting premium web & mobile architectures. Proficient in the MERN stack, Next.js, React Native, Node.js, and event-driven microservices. I build robust APIs that achieve up to 25% faster response times and 40% better code reusability.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold rounded-full clay-btn cursor-pointer"
                >
                  Explore Projects
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 font-bold clay-badge hover:bg-foreground/[0.01] rounded-full hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                >
                  Let's Talk
                </a>
                <a
                  href="https://github.com/ayush931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 clay-badge rounded-full hover:scale-105 hover:-translate-y-0.5 cursor-pointer"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-card-border max-w-lg mx-auto md:mx-0">
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-accent">1+</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider">Years Exp</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-violet-500">25%</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider">Fast Response</div>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-extrabold text-indigo-500">40%</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-semibold uppercase tracking-wider">Code Reuse</div>
                </div>
              </div>
            </div>

            {/* Right Profile Photo */}
            <div className="flex-shrink-0 relative group">
              {/* Outer soft glowing halo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-accent to-accent-secondary rounded-full filter blur-xl opacity-20 group-hover:opacity-35 transition-opacity duration-500" />
              
              {/* Profile Image container with premium clay styling */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full clay-card border-4 border-white p-3.5 shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer animate-float overflow-hidden flex items-center justify-center">
                <img 
                  src="/profile_image.png" 
                  alt="Ayush Kumar" 
                  className="w-full h-full rounded-full object-cover object-[center_20%] shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Technical <span className="gradient-text">Skills</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                Expertise in modern languages, backend systems, database performance tuning, and cloud deployment.
              </p>
            </div>

            {/* Mobile Dropdown Category Filter (Claymorphic) */}
            <div className="relative md:hidden w-full max-w-xs mx-auto">
              <button
                onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 clay-card rounded-2xl font-bold text-sm text-foreground hover:bg-white cursor-pointer"
                id="skill-dropdown-btn"
              >
                <span className="flex items-center gap-2">
                  {React.createElement(skillCategories.find(c => c.id === selectedSkillCategory)?.icon || Sparkles, { className: "w-4 h-4 text-accent" })}
                  {skillCategories.find(c => c.id === selectedSkillCategory)?.name}
                </span>
                <ChevronRight className={`w-4 h-4 text-text-muted transform transition-transform duration-200 ${isSkillDropdownOpen ? 'rotate-90' : 'rotate-0'}`} />
              </button>
              
              {isSkillDropdownOpen && (
                <div className="absolute left-0 right-0 mt-2 z-30 clay-card rounded-2xl shadow-xl overflow-hidden bg-white/95 backdrop-blur-md">
                  {skillCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedSkillCategory(cat.id);
                          setIsSkillDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-4 py-3 text-left text-xs font-semibold hover:bg-accent/5 border-b border-card-border/50 last:border-0 transition-colors ${
                          selectedSkillCategory === cat.id ? 'text-accent bg-accent/5' : 'text-foreground/80'
                        }`}
                      >
                        <Icon className="w-4 h-4 text-accent/80" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Desktop Tabs Filter bar (Claymorphic) */}
            <div className="hidden md:flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
              {skillCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedSkillCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                      selectedSkillCategory === cat.id
                        ? 'clay-badge clay-badge-active text-accent'
                        : 'clay-badge text-foreground/80 hover:bg-foreground/[0.02]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Grid display of Skills tags (Claymorphic) */}
            <div className="flex flex-wrap justify-center gap-3.5 max-w-4xl mx-auto">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="clay-badge px-5 py-3 rounded-2xl flex items-center gap-2.5 hover:border-accent/30 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group cursor-default"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-br from-accent to-accent-secondary" />
                  <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section id="experience" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Professional <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                A track record of building production add-ins, microservices, and leading system migrations.
              </p>
            </div>

            {/* Vertical timeline */}
            <div className="max-w-3xl mx-auto relative border-l-2 border-timeline-line pl-6 md:pl-8 space-y-10 py-4">
              {experiences.map((exp, idx) => (
                <div 
                  key={idx} 
                  className={`relative group ${
                    expandedExperience === idx ? 'opacity-100 animate-float' : 'opacity-85 hover:opacity-100'
                  } transition-all duration-300`}
                >
                  {/* Glowing dot on the timeline line */}
                  <div 
                    className={`absolute -left-[33px] md:-left-[41px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                      expandedExperience === idx 
                        ? 'bg-accent border-accent timeline-dot' 
                        : 'bg-background border-timeline-line'
                    }`} 
                  />

                  {/* 3D Tilt Claymorphic content panel */}
                  <TiltCard
                    onClick={() => setExpandedExperience(expandedExperience === idx ? null : idx)}
                    className={`clay-card p-6 md:p-8 rounded-[2rem] transition-all duration-300 cursor-pointer relative overflow-hidden preserve-3d ${
                      expandedExperience === idx ? 'clay-card-indigo scale-[1.01]' : ''
                    }`}
                    maxTilt={5}
                    scale={1.015}
                  >
                    <div className="flex items-center justify-between gap-4 mb-3 preserve-3d">
                      <div className="translate-z-20">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-sm font-semibold text-accent">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-3.5 flex-shrink-0 translate-z-20">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-foreground/[0.04] border border-card-border text-text-muted font-mono">
                          {exp.period}
                        </span>
                        <ChevronRight 
                          className={`w-5 h-5 text-text-muted group-hover:text-accent transform transition-transform duration-300 ${
                            expandedExperience === idx ? 'rotate-90' : 'rotate-0'
                          }`} 
                        />
                      </div>
                    </div>

                    {/* Bullet Points (Collapsed state) */}
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out preserve-3d ${
                        expandedExperience === idx ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <ul className="space-y-2.5 text-sm text-foreground/80 font-sans list-disc list-inside mb-4 translate-z-10 text-left">
                        {exp.points.map((pt, pIdx) => (
                          <li key={pIdx} className="leading-relaxed pl-1">
                            <span className="relative -left-1">{pt}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-card-border/50 translate-z-15">
                        {exp.tech.map((t) => (
                          <span 
                            key={t}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-foreground/[0.03] border border-card-border text-text-muted font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SHOWCASE */}
        <section id="projects" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                A showcase of production-ready systems, real-time whiteboards, and geolocation ride booking applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {projects.map((proj, idx) => (
                <TiltCard
                  key={proj.title}
                  className="clay-card clay-card-indigo rounded-[2rem] flex flex-col justify-between transition-all duration-300 relative overflow-hidden group min-h-[380px] preserve-3d"
                  maxTilt={10}
                  scale={1.03}
                >
                  <div className="p-6 md:p-8 space-y-4 preserve-3d">
                    <div>
                      <div className="flex items-center justify-between translate-z-20">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono inline-block">
                          Project {idx + 1}
                        </span>
                        <a 
                          href={proj.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-full clay-badge hover:bg-accent hover:text-white border border-card-border hover:scale-110 active:scale-95 transition-all text-text-muted cursor-pointer"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-4.5 h-4.5" />
                        </a>
                      </div>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-foreground mt-2 group-hover:text-accent transition-colors duration-300 translate-z-30">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-text-muted font-semibold mt-1 translate-z-20">
                        {proj.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-foreground/80 leading-relaxed font-sans translate-z-10">
                      {proj.description}
                    </p>

                    <div className="space-y-2 pt-2 translate-z-15">
                      <div className="text-xs font-bold text-foreground font-mono">Key Highlights:</div>
                      <ul className="space-y-1.5 text-xs text-text-muted font-sans pl-4 list-disc list-outside">
                        {proj.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="leading-relaxed">{hl}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 md:px-8 pb-6 md:pb-8 flex flex-wrap gap-2 pt-3 border-t border-card-border/40 translate-z-20">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-foreground/[0.03] border border-card-border text-text-muted font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* GITHUB INTEGRATION HUB */}
        <section id="github" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                GitHub <span className="gradient-text">Integration Hub</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                Explore real-time repository stats and developer activities directly from my GitHub profile.
              </p>
            </div>

            <GithubStats />
          </div>
        </section>

        {/* INTERACTIVE CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Get In <span className="gradient-text">Touch</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                Feel free to reach out for project proposals, collaboration, or job opportunities.
              </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Contact Information Details */}
              <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Contact Information</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-sans">
                    Have an exciting product idea or a developer role? Shoot me a message, send an email, or give me a call. I usually respond within 24 hours.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5 group cursor-pointer">
                      <div className="w-11 h-11 rounded-xl clay-badge clay-badge-active flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Email</div>
                        <a href="mailto:ayushkumar9315983@gmail.com" className="text-sm font-semibold text-foreground hover:text-accent transition-colors font-mono">
                          ayushkumar9315983@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 group cursor-pointer">
                      <div className="w-11 h-11 rounded-xl clay-badge clay-badge-active flex items-center justify-center text-accent group-hover:scale-105 transition-transform duration-300">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Phone</div>
                        <a href="tel:+917070472634" className="text-sm font-semibold text-foreground hover:text-accent transition-colors font-mono">
                          +91 7070472634
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5 group cursor-default">
                      <div className="w-11 h-11 rounded-xl clay-badge flex items-center justify-center text-accent">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-mono tracking-widest text-text-muted">Location</div>
                        <span className="text-sm font-semibold text-foreground font-sans">
                          Patna, Bihar, India
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social widgets */}
                <div className="pt-6 border-t border-card-border/50 space-y-3">
                  <div className="text-xs font-bold text-foreground font-mono">Connect Socially</div>
                  <div className="flex gap-3">
                    <a
                      href="https://github.com/ayush931"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl clay-badge flex items-center justify-center text-foreground hover:text-accent hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Github className="w-4.5 h-4.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ayush-kumar-b4b9b422a" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl clay-badge flex items-center justify-center text-foreground hover:text-accent hover:scale-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Linkedin className="w-4.5 h-4.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Form panel with Claymorphism */}
              <div className="md:col-span-3">
                <div className="clay-card p-6 md:p-8 rounded-[2rem] relative overflow-hidden bg-card-bg">
                  {formSubmitted ? (
                    <div className="h-72 flex flex-col justify-center items-center text-center space-y-4 animate-float">
                      <div className="w-14 h-14 rounded-full bg-accent-glow text-accent flex items-center justify-center border border-accent/20">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h4 className="text-lg font-bold text-foreground">Message Sent Successfully!</h4>
                      <p className="text-sm text-text-muted max-w-xs leading-relaxed font-sans">
                        Thank you for reaching out. Ayush has received your message and will get back to you shortly!
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-5">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold font-mono text-foreground uppercase">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="w-full px-4 py-3 rounded-xl clay-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold font-mono text-foreground uppercase">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          required
                          placeholder="johndoe@example.com"
                          className="w-full px-4 py-3 rounded-xl clay-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm font-sans"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-bold font-mono text-foreground uppercase">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          placeholder="Hey Ayush, let's collaborate on a Next.js 3D application!"
                          className="w-full px-4 py-3 rounded-xl clay-input text-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all text-sm font-sans resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 font-bold rounded-xl clay-btn cursor-pointer"
                      >
                        Send Message
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-card-border mt-12 bg-background/50">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <div className="text-sm font-bold text-foreground">Ayush Kumar</div>
            <div className="text-xs text-text-muted font-mono">
              © {new Date().getFullYear()} All Rights Reserved. Built with Next.js & Three.js.
            </div>
          </div>
          
          <div className="flex gap-4">
            <a href="https://github.com/ayush931" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-text-muted hover:text-accent transition-colors font-mono">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/ayush-kumar-b4b9b422a" target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-text-muted hover:text-accent transition-colors font-mono">
              LinkedIn
            </a>
            <a href="mailto:ayushkumar9315983@gmail.com" className="text-xs font-semibold text-text-muted hover:text-accent transition-colors font-mono">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
