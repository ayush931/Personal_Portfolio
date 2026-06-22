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
import dynamic from 'next/dynamic';
import TiltCard from '@/components/TiltCard';

// Lazy load ParticleCanvas to prioritize initial text paint (LCP optimization)
const ParticleCanvas = dynamic(() => import('@/components/ParticleCanvas'), {
  ssr: false,
  loading: () => null
});

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedExperience, setExpandedExperience] = useState<number | null>(0); // Default expand first job
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSkillDropdownOpen, setIsSkillDropdownOpen] = useState(false);
  const [loadCanvas, setLoadCanvas] = useState(false);

  // Delay canvas loading slightly to prioritize text rendering
  useEffect(() => {
    const timer = setTimeout(() => setLoadCanvas(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'github', 'contact'];
      const threshold = 160; // Threshold in pixels from viewport top

      let currentSection = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > threshold) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize active state on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skill categorization
  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: Sparkles },
    { id: 'languages', name: 'Languages', icon: Code },
    { id: 'frontend', name: 'Frontend', icon: Terminal },
    { id: 'backend', name: 'Backend', icon: Cpu },
    { id: 'databases', name: 'Databases', icon: Database },
    { id: 'devops', name: 'DevOps & Cloud', icon: Cloud }
  ];

  const skillsData = [
    // Languages
    { name: 'TypeScript', category: 'languages', primary: true },
    { name: 'JavaScript (ES6+)', category: 'languages', primary: false },
    { name: 'SQL', category: 'languages', primary: false },
    { name: 'C++', category: 'languages', primary: false },
    { name: 'Python', category: 'languages', primary: false },
    
    // Frontend
    { name: 'Next.js', category: 'frontend', primary: true },
    { name: 'React.js', category: 'frontend', primary: false },
    { name: 'React Native (Expo)', category: 'frontend', primary: true },
    { name: 'Tailwind CSS', category: 'frontend', primary: false },
    { name: 'Redux Toolkit', category: 'frontend', primary: false },
    { name: 'Expo Router', category: 'frontend', primary: false },
    
    // Backend
    { name: 'Node.js', category: 'backend', primary: true },
    { name: 'FastAPI', category: 'backend', primary: true },
    { name: 'Express.js', category: 'backend', primary: false },
    { name: 'RabbitMQ', category: 'backend', primary: false },
    { name: 'RESTful APIs', category: 'backend', primary: false },
    { name: 'WebSockets', category: 'backend', primary: false },
    { name: 'Microservices', category: 'backend', primary: false },
    { name: 'JWT & OAuth 2.0', category: 'backend', primary: false },
    { name: 'RBAC (Auth)', category: 'backend', primary: false },

    // Databases
    { name: 'PostgreSQL', category: 'databases', primary: true },
    { name: 'MongoDB', category: 'databases', primary: false },
    { name: 'Redis', category: 'databases', primary: false },
    { name: 'Prisma ORM', category: 'databases', primary: false },
    { name: 'Neon Serverless', category: 'databases', primary: false },

    // DevOps & Cloud
    { name: 'Docker', category: 'devops', primary: true },
    { name: 'AWS (EC2/S3)', category: 'devops', primary: false },
    { name: 'GitHub Actions', category: 'devops', primary: false },
    { name: 'Turborepo', category: 'devops', primary: false }
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
        'Built a Microsoft Word Add-in (TypeScript + Office.js) that automated style guide enforcement for client documents — cutting manual formatting effort by 60%.',
        'Architected a full-stack document conversion platform (DocStream) using FastAPI and React, divided into high-throughput microservices.',
        'Created XML and EPUB microservices supporting JATS/DocBook schemas to automate EPUB 3 generation with built-in validation.'
      ],
      tech: ['TypeScript', 'Office.js API', 'FastAPI', 'React.js', 'Microservices', 'JATS/DocBook']
    },
    {
      role: 'Software Engineer Intern',
      company: 'ShipU Logistics Private Limited',
      period: 'Sept 2025 – Jan 2026',
      points: [
        'Designed a logistics management platform (MERN + Next.js) that integrated shipment tracking and RBAC security.',
        'Optimized PostgreSQL queries and Prisma ORM connection pooling, boosting database response times by 25%.',
        'Deployed event-driven microservices using RabbitMQ and Docker to AWS staging environments.',
        'Restructured the codebase into a Turborepo monorepo, cutting duplicate code dependencies by 35% and accelerating release cycles.'
      ],
      tech: ['Next.js', 'MERN Stack', 'PostgreSQL', 'Prisma ORM', 'RabbitMQ', 'Docker', 'AWS', 'Turborepo']
    },
    {
      role: 'Software Engineer Intern',
      company: 'Shabra Softech Solution Pvt. Ltd.',
      period: 'Feb 2025 – Jul 2025',
      points: [
        'Migrated a legacy MERN monolith into a Turborepo monorepo, increasing code reusability by 40%.',
        'Shipped Next.js and React Native production apps, scaling user engagement to 1,000+ active monthly users.',
        'Integrated JWT, OAuth 2.0, and RBAC authorization pipelines, reducing authentication tickets by 50%.'
      ],
      tech: ['React Native', 'Next.js', 'Zustand', 'Turborepo', 'JWT', 'OAuth 2.0', 'RBAC']
    }
  ];

  // Projects Data
  const projects = [
    {
      title: 'DocStream',
      subtitle: 'Document Conversion Platform',
      description: 'A microservices-based pipeline transforming PDFs and raw images into structured JATS/DocBook XML and automated EPUB 3 publications.',
      highlights: [
        'OCR microservice running PaddleOCR and Tesseract via RabbitMQ and Celery workers for async queue management',
        'FastAPI API layer backed by PostgreSQL and Redis for high-speed job state persistence',
        'Responsive React client dashboard utilizing TanStack Query and Zustand for real-time tracking'
      ],
      tech: ['FastAPI', 'Celery', 'RabbitMQ', 'Redis', 'PostgreSQL', 'React', 'PaddleOCR', 'Docker'],
      github: '#',
      isPrivateProd: true
    },
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
      github: 'https://github.com/ayush931/excalidraw',
      isPrivateProd: false
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
      github: 'https://github.com/ayush931/RideSync',
      isPrivateProd: false
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      {/* 3D Canvas Background (Lazy-loaded after LCP) */}
      {loadCanvas && <ParticleCanvas />}

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
          <nav className="hidden md:flex items-center gap-2.5">
            {['hero', 'about', 'skills', 'experience', 'projects', 'github', 'contact'].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => setActiveSection(sec)}
                className={`px-3.5 py-2 rounded-full nav-tab text-[10px] uppercase tracking-wider ${
                  activeSection === sec ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                {sec === 'hero' ? 'home' : sec}
              </a>
            ))}
          </nav>

          {/* Contact Action */}
          <div className="flex items-center gap-3">
            {/* Pulsing Green Dot Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full clay-badge text-[10px] font-bold text-emerald-600 bg-emerald-50/50 border border-emerald-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Open to Work
            </div>

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
          <nav className="flex flex-col p-6 gap-3.5">
            {['hero', 'about', 'skills', 'experience', 'projects', 'github', 'contact'].map((sec) => (
              <a
                key={sec}
                href={`#${sec}`}
                onClick={() => {
                  setActiveSection(sec);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-3.5 rounded-2xl nav-tab text-sm uppercase tracking-wider text-center ${
                  activeSection === sec ? 'nav-tab-active' : 'nav-tab-inactive'
                }`}
              >
                {sec === 'hero' ? 'home' : sec}
              </a>
            ))}
            <div className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-emerald-600">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Currently Open to Work
            </div>
            <a
              href="mailto:ayushkumar9315983@gmail.com"
              className="mt-2 flex items-center justify-center gap-2 p-3 text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-secondary rounded-xl hover:opacity-90 shadow-md"
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
        <div className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-accent/5 filter blur-[100px] pointer-events-none -z-20" />
        <div className="absolute top-[45%] right-[5%] w-[450px] h-[450px] rounded-full bg-accent-secondary/5 filter blur-[120px] pointer-events-none -z-20" />

        {/* HERO SECTION */}
        <section id="hero" className="min-h-[75vh] flex flex-col justify-center py-12 md:py-16 relative">
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
                I build full-stack systems that go to production — from event-driven microservices and OCR pipelines to real-time mobile apps. Currently at NexoGrafix, open to my next challenge.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2 items-center">
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
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-card-border max-w-xl mx-auto md:mx-0">
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-accent">3 Companies</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Production</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-violet-500">1,000+ Users</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Served in Prod</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-extrabold text-indigo-500 font-sans">Microservices</div>
                  <div className="text-[10px] md:text-xs text-text-muted font-bold uppercase tracking-wider">Architect</div>
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
                  src="/avatar.png" 
                  alt="Ayush Kumar Avatar" 
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                About <span className="gradient-text">Me</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
              {/* Left text description */}
              <div className="md:col-span-3 space-y-6 text-base text-text-muted leading-relaxed font-sans">
                <p>
                  I'm a Full Stack Engineer based in Patna, India, currently building <span className="font-bold text-foreground">DocStream</span> at NexoGrafix — a document conversion platform (OCR &rarr; XML &rarr; EPUB) in a microservices architecture using FastAPI, React, and RabbitMQ. I specialize in data structures, API design, and performance tuning.
                </p>
                <p>
                  I hold an <span className="font-bold text-foreground">MBA in Marketing</span> alongside my engineering background. That unique combination means I can architect a Celery worker queue AND write the PRD for why it needs to exist.
                </p>
                <p>
                  Previously at ShipU Logistics and Shabra Softech, where I shipped production systems, migrated a legacy monolith to a Turborepo monorepo, and helped serve 1,000+ monthly active users.
                </p>
              </div>

              {/* Right JSON Terminal block */}
              <div className="md:col-span-2 w-full">
                <div className="clay-card rounded-[2rem] p-6 font-mono text-xs text-foreground/90 space-y-4 bg-white/80">
                  <div className="flex items-center gap-2 pb-3 border-b border-card-border/50">
                    <span className="w-3 h-3 rounded-full bg-red-400" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <span className="text-[10px] text-text-muted ml-2">ayush_profile.json</span>
                  </div>
                  <div className="space-y-1.5 leading-relaxed">
                    <p><span className="text-purple-600">const</span> <span className="text-blue-600">engineer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-indigo-600">currently</span>: <span className="text-emerald-600">"Junior SWE @ NexoGrafix"</span>,</p>
                    <p className="pl-4"><span className="text-indigo-600">building</span>: <span className="text-emerald-600">"DocStream (OCR pipeline)"</span>,</p>
                    <p className="pl-4"><span className="text-indigo-600">open_to</span>: <span className="text-emerald-600">"Full Stack / Backend roles"</span>,</p>
                    <p className="pl-4"><span className="text-indigo-600">location</span>: <span className="text-emerald-600">"Patna &rarr; Open to relocation"</span>,</p>
                    <p className="pl-4"><span className="text-indigo-600">bonus</span>: <span className="text-emerald-600">"MBA + Engineering = rare combo"</span></p>
                    <p>&#125;;</p>
                  </div>
                </div>
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

            {/* Label indicating production-tested focus */}
            <p className="text-xs font-bold text-center text-text-muted font-mono tracking-wider">
              1 year of production use across all core skills below.
            </p>

            {/* Mobile Dropdown Category Filter (Claymorphic) */}
            <div className="relative md:hidden w-full max-w-xs mx-auto">
              <button
                onClick={() => setIsSkillDropdownOpen(!isSkillDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 clay-card rounded-2xl font-bold text-sm text-foreground hover:bg-white cursor-pointer bg-white"
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
                  className={`clay-badge px-5 py-3 rounded-2xl flex items-center gap-2.5 hover:border-accent/30 hover:-translate-y-1 hover:scale-105 transition-all duration-300 group cursor-default ${
                    skill.primary ? 'clay-badge-active border-accent/40 font-bold' : ''
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${skill.primary ? 'bg-accent' : 'bg-gradient-to-br from-accent to-accent-secondary'}`} />
                  <span className="font-mono text-sm font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                    {skill.name} {skill.primary && <span className="text-[10px] text-accent font-semibold ml-1">(Primary)</span>}
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

                    {/* Product Callout box for NexoGrafix */}
                    {exp.company === 'NexoGrafix Private Limited' && (
                      <div className="mt-3.5 mb-2.5 p-3.5 rounded-xl bg-accent-glow border border-accent/15 flex items-center justify-between text-xs translate-z-10 bg-white/70">
                        <span className="font-sans text-text-muted">
                          Core Product: <span className="font-bold text-foreground">DocStream</span> (Document Conversion Pipeline)
                        </span>
                        <a
                          href="https://github.com/ayush931" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline font-bold flex items-center gap-1 cursor-pointer font-mono"
                          onClick={(e) => e.stopPropagation()} // Prevent card accordion toggle
                        >
                          Codebase <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}

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
                A showcase of production systems, real-time whiteboards, and geolocation logistics applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projects.map((proj, idx) => (
                <TiltCard
                  key={proj.title}
                  className="clay-card clay-card-indigo rounded-[2rem] flex flex-col justify-between transition-all duration-300 relative overflow-hidden group min-h-[410px] preserve-3d"
                  maxTilt={8}
                  scale={1.02}
                >
                  <div className="p-6 space-y-4 preserve-3d">
                    <div>
                      <div className="flex items-center justify-between translate-z-20">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono inline-block">
                          Project {idx + 1}
                        </span>
                        
                        {proj.isPrivateProd ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-100 font-mono shadow-sm">
                            Private • In Production
                          </span>
                        ) : (
                          <a 
                            href={proj.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full clay-badge hover:bg-accent hover:text-white border border-card-border hover:scale-110 active:scale-95 transition-all text-text-muted cursor-pointer bg-white"
                            aria-label="GitHub Repository"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-foreground mt-2 group-hover:text-accent transition-colors duration-300 translate-z-30">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono text-text-muted font-semibold mt-1 translate-z-20">
                        {proj.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-foreground/80 leading-relaxed font-sans translate-z-10">
                      {proj.description}
                    </p>

                    <div className="space-y-2 pt-1 translate-z-15">
                      <div className="text-[10px] font-bold text-foreground font-mono">Highlights:</div>
                      <ul className="space-y-1.5 text-[10px] text-text-muted font-sans pl-4 list-disc list-outside">
                        {proj.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="leading-relaxed">{hl}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex flex-wrap gap-1.5 pt-3 border-t border-card-border/40 translate-z-20">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-foreground/[0.03] border border-card-border text-text-muted font-mono"
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
                GitHub <span className="gradient-text">Contributions</span>
              </h2>
              <p className="text-sm md:text-base text-text-muted max-w-xl mx-auto leading-relaxed">
                I commit daily. Here's the proof of my open-source activities and development consistency.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Contribution chart widget */}
              <div className="clay-card rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden bg-white/80">
                <h3 className="text-base font-bold text-foreground mb-4 font-mono w-full text-left">
                  Commit Timeline
                </h3>
                <div className="w-full overflow-x-auto py-2 flex justify-center">
                  <img
                    src="https://ghchart.ssh.surf/ayush931?theme=light"
                    alt="Ayush's GitHub Contribution Chart"
                    className="min-w-[600px] h-auto object-contain max-w-full"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Pinned Repos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="clay-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 bg-white/85">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-accent font-mono">Pinned Repository</span>
                      <a href="https://github.com/ayush931/excalidraw" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <h4 className="text-base font-extrabold text-foreground">excalidraw-clone</h4>
                    <p className="text-xs text-text-muted">A performance-oriented collaborative whiteboard clone. WebSockets sync, optimized database connections.</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-card-border/50 mt-4 text-[10px] text-text-muted font-mono font-bold">
                    <span>TypeScript • Next.js</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Pinned</span>
                  </div>
                </div>

                <div className="clay-card rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 bg-white/85">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-accent font-mono">Pinned Repository</span>
                      <a href="https://github.com/ayush931/RideSync" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <h4 className="text-base font-extrabold text-foreground">RideSync</h4>
                    <p className="text-xs text-text-muted">Real-time ride-booking mobile application. Geolocation tracking, Zustand state engine, Expo routing.</p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-card-border/50 mt-4 text-[10px] text-text-muted font-mono font-bold">
                    <span>TypeScript • React Native</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Pinned</span>
                  </div>
                </div>
              </div>

              {/* Daily commitment action */}
              <div className="text-center pt-2">
                <a
                  href="https://github.com/ayush931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-bold rounded-full clay-btn cursor-pointer"
                >
                  I commit daily. Here's proof &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-card-border scroll-mt-16">
          <div className="space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
                Get In <span className="gradient-text">Touch</span>
              </h2>
            </div>

            <div className="max-w-2xl mx-auto clay-card p-8 md:p-10 rounded-[2rem] bg-white/80 text-center space-y-6">
              <p className="text-base text-text-muted leading-relaxed font-sans max-w-md mx-auto">
                Have an exciting product idea or a developer role? Let's connect. I typically respond within 24 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto pt-2">
                <a
                  href="mailto:ayushkumar9315983@gmail.com"
                  className="flex items-center justify-center gap-2 p-3 text-xs font-bold clay-badge hover:bg-accent hover:text-white transition-all cursor-pointer rounded-xl border border-card-border bg-white"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-kumar-b4b9b422a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 text-xs font-bold clay-badge hover:bg-accent hover:text-white transition-all cursor-pointer rounded-xl border border-card-border bg-white"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/ayush931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 text-xs font-bold clay-badge hover:bg-accent hover:text-white transition-all cursor-pointer rounded-xl border border-card-border bg-white"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>

              <div className="pt-6 border-t border-card-border/50">
                <a
                  href="https://cal.com/ayush931"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 font-bold rounded-xl clay-btn cursor-pointer"
                >
                  Book a 15-min call &rarr;
                </a>
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
              Designed & built by Ayush Kumar · Next.js + Three.js
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
