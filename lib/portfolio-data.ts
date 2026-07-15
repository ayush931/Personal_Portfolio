export type StationId = 'boot' | 'about' | 'skills' | 'experience' | 'projects' | 'github' | 'contact';

export type Station = {
  id: StationId;
  nav: string;
  object: string;
  kicker: string;
  title: string;
  summary: string;
};

export const stations: Station[] = [
  {
    id: 'boot',
    nav: 'Boot',
    object: 'Main console',
    kicker: 'Terminal Station online',
    title: 'Ayush Kumar',
    summary: 'Full Stack Software Engineer who builds production systems that scale: OCR microservices, event-driven pipelines, and real-time mobile apps.',
  },
  {
    id: 'about',
    nav: 'About',
    object: 'Desk notebook',
    kicker: 'Operator profile',
    title: 'Systems-minded full stack engineer based in Patna, India',
    summary: 'Building DocStream at NexoGrafix while pursuing MCA at IIIT Ranchi & IIT Patna, with an MBA in Marketing adding product-thinking context.',
  },
  {
    id: 'skills',
    nav: 'Skills',
    object: 'Dual monitors',
    kicker: 'Stack telemetry',
    title: 'Typed frontend, service backends, data, and deployment',
    summary: 'The workstation monitors split Ayush’s toolkit exactly across Languages & Core, Frontend, Backend, and Databases & DevOps.',
  },
  {
    id: 'experience',
    nav: 'Experience',
    object: 'Deploy folders',
    kicker: 'Service history',
    title: 'Education and production work in chronological deploy logs',
    summary: 'IIIT Ranchi & IIT Patna, NexoGrafix, ShipU Logistics, and Shabra Softech form the core timeline.',
  },
  {
    id: 'projects',
    nav: 'Projects',
    object: 'Build shelf',
    kicker: 'Shipped builds',
    title: 'Realtime worlds, ride systems, document pipelines, and collaboration tools',
    summary: 'Aetheria, RideSync, DocStream, and Excalidraw Clone are presented as shipped build cartridges.',
  },
  {
    id: 'github',
    nav: 'GitHub',
    object: 'Activity terminal',
    kicker: 'Public signal',
    title: 'github.com/ayush931',
    summary: '24 public repos, 45 followers, live contribution graph, and featured repositories from product work and experiments.',
  },
  {
    id: 'contact',
    nav: 'Contact',
    object: 'Radio phone',
    kicker: 'Transmit message',
    title: 'Open to work',
    summary: 'Email, LinkedIn, GitHub, Cal.com, resume, and an in-theme message form are always one station away.',
  },
];

export const links = {
  github: 'https://github.com/ayush931',
  linkedin: 'https://www.linkedin.com/in/ayush-kumar-94310522a',
  email: 'mailto:ayushkumar9315983@gmail.com',
  cal: 'https://cal.com/ayushkumar',
  resume: '/Ayush_Full_Stack_Developer_Resume.pdf',
};

export const skills = [
  { group: 'Languages & Core', items: ['TypeScript', 'JavaScript (ES6+)', 'SQL', 'C++', 'Python'] },
  { group: 'Frontend', items: ['Next.js', 'React.js', 'React Native (Expo)', 'Tailwind CSS', 'Redux Toolkit', 'Expo Router'] },
  { group: 'Backend', items: ['Node.js', 'FastAPI', 'Express.js', 'RabbitMQ', 'RESTful APIs', 'WebSockets', 'Microservices', 'JWT & OAuth 2.0', 'RBAC'] },
  { group: 'Databases & DevOps', items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma ORM', 'Neon Serverless', 'Docker', 'AWS (EC2/S3)', 'GitHub Actions', 'Turborepo'] },
];

export const experience = [
  { org: 'IIIT Ranchi & IIT Patna', role: 'MCA', date: '2026-Present', bullets: [] },
  {
    org: 'NexoGrafix Private Limited',
    role: 'Junior Software Engineer',
    date: 'Apr 2026-Present',
    bullets: [
      'TypeScript Word Add-in (Office.js), style-guide enforcement, -60% manual review effort',
      'Architected DocStream: 4-service OCR -> XML -> EPUB pipeline (FastAPI + React), independent per-service scaling',
      'XML + EPUB generation supporting JATS/DocBook schemas, automated TOC, validation report engine',
    ],
  },
  {
    org: 'ShipU Logistics Private Limited',
    role: 'Software Engineer Intern',
    date: 'Sept 2025-Jan 2026',
    bullets: [
      'MERN + Next.js logistics platform, shipment tracking, RBAC',
      '-25% backend response time (PostgreSQL query optimization + Prisma pooling)',
      '-35% code duplication (Turborepo monorepo, Docker/AWS)',
    ],
  },
  {
    org: 'Shabra Softech Solution Pvt. Ltd.',
    role: 'Software Engineer Intern',
    date: 'Feb 2025-Jul 2025',
    bullets: [
      'MERN monolith -> Turborepo (+40% code reuse, +30% delivery speed)',
      'Next.js + React Native apps, 1,000+ MAUs',
      'JWT + OAuth 2.0 + RBAC (-50% auth incidents, 95%+ on-time sprint delivery)',
    ],
  },
];

export const projects = [
  { name: 'Aetheria', description: 'real-time 2D multiplayer sandbox (Phaser, Socket.io, WebRTC proximity voice, Prisma/Neon Postgres)', status: 'Open Source' },
  { name: 'RideSync', description: 'real-time GPS ride-booking app (React Native/Expo, Mapbox, Clerk, Neon Postgres, Zustand)', status: 'Open Source' },
  { name: 'DocStream', description: '4-microservice OCR->XML->EPUB pipeline (FastAPI, Celery, RabbitMQ, Redis, Postgres, React, Docker)', status: 'Currently Building / Private / In Production' },
  { name: 'Excalidraw Clone', description: 'real-time collaborative whiteboard (Next.js, WebSockets, Postgres, Turborepo)', status: 'Open Source' },
];

export const featuredRepos = ['ShopU', 'Aetheria', 'Arohio_Another_Backend', 'Arohio_New_Frontend', 'RideSync', 'ms-word-addin', 'Personal_Portfolio'];
