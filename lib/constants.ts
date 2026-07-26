export const SITE = {
  name: "Ayush Kumar",
  role: "Full-Stack Software Engineer",
  location: "Patna, Bihar, India",
  phone: "+91 7070472634",
  email: "ayush931.dev@gmail.com",
  github: "https://github.com/ayush931",
  linkedin: "https://linkedin.com",
  resumePdf: "/resume.pdf",
} as const;

export const RESUME_SUMMARY =
  "Full-Stack Engineer (PERN/MERN) building scalable logistics and SaaS platforms with React.js, Next.js, and Node.js. Specializes in event-driven microservices, secure authentication, and CI/CD-driven delivery – cutting processing time by 45% and boosting query performance by 25%.";

export const EXPERIENCES = [
  {
    company: "NexoGrafix Private Limited",
    role: "Junior Software Engineer",
    location: "Patna, India",
    period: "Apr 2026 - Present",
    type: "Full-Time",
    bullets: [
      "Built a Word add-in (TypeScript, Office.js) to automate style enforcement – cut manual formatting effort 60% for a 15-person editorial team.",
      "Architected a 4-microservice document conversion platform (FastAPI, React), reducing processing turnaround 45%.",
      "Automated TOC generation for XML/EPUB pipelines (JATS, DocBook schemas), cutting QA review time 35%.",
    ],
    skills: ["TypeScript", "Office.js", "FastAPI", "React.js", "XML / EPUB", "JATS", "DocBook"],
    highlight: "4-Microservice Document Platform",
    metric: "45% Faster Turnaround",
  },
  {
    company: "ShipU Logistics Private Limited",
    role: "Software Engineer Intern",
    location: "Patna, India",
    period: "Sep 2025 - Mar 2026",
    type: "Internship",
    bullets: [
      "Built a real-time logistics platform (PERN) with shipment tracking, delivery workflows, and RBAC – improved database query performance 25%.",
      "Deployed event-driven microservices (RabbitMQ, Docker) across 3 AWS environments, accelerating deployment velocity 30%.",
      "Migrated the codebase to a Turborepo monorepo, sharing utility packages across 6 services – cut duplicate code 35%.",
    ],
    skills: ["PERN Stack", "PostgreSQL", "Express.js", "React.js", "Node.js", "RabbitMQ", "Docker", "AWS", "Turborepo", "RBAC"],
    highlight: "Real-Time PERN Logistics Platform",
    metric: "+25% Query Speed",
  },
  {
    company: "Shabra Softech Solution Pvt. Ltd.",
    role: "Software Engineer Intern",
    location: "Patna, India",
    period: "Feb 2025 - Aug 2025",
    type: "Internship",
    bullets: [
      "Migrated a legacy MERN monolith to a Turborepo monorepo, boosting code reuse across platforms 40%.",
      "Shipped Next.js web apps and React Native mobile apps for 1,000+ active users, built on shared component libraries.",
      "Secured access with JWT, OAuth 2.0, and RBAC – cut login-related support tickets 50%.",
    ],
    skills: ["Next.js", "React Native", "MERN Stack", "Turborepo", "JWT", "OAuth 2.0", "RBAC"],
    highlight: "MERN Monolith to Monorepo",
    metric: "1,000+ Active Users",
  },
] as const;

export const RESUME_PROJECTS = [
  {
    id: "aetheria",
    title: "Aetheria – Real-Time 2D Multiplayer Sandbox World",
    subtitle: "Real-Time 2D Multiplayer Sandbox Engine",
    category: "Game Engine & Networking",
    githubUrl: "https://github.com/ayush931",
    bullets: [
      "Built a real-time sync pipeline (Socket.io, Phaser.js) sustaining 60 FPS for 50+ concurrent players.",
      "Added WebRTC proximity voice chat, multiplayer canvas interactions, and drag-and-drop customization.",
      "Built a zero-config Neon PostgreSQL layer with automated local fallback – cut developer onboarding time 90%.",
    ],
    stack: ["Socket.io", "Phaser.js", "WebRTC", "Neon PostgreSQL", "TypeScript", "Node.js"],
    stats: [
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Concurrent Players", value: "50+" },
      { label: "Onboarding Saved", value: "90%" },
    ],
    accentColor: "#2146f3",
  },
  {
    id: "excalidraw-clone",
    title: "Excalidraw Clone – Real-Time Collaborative Whiteboard",
    subtitle: "Real-Time Collaborative Infinite Canvas",
    category: "Collaborative Tooling",
    githubUrl: "https://github.com/ayush931",
    bullets: [
      "Built a collaborative whiteboard (Next.js, WebSockets, Turborepo) with sub-100ms multi-user sync.",
      "Optimized rendering via React memoization and state diffing – cut re-renders 60%, latency 40%.",
    ],
    stack: ["Next.js", "WebSockets", "Turborepo", "React Memoization", "TypeScript", "Canvas"],
    stats: [
      { label: "Multi-User Sync", value: "< 100ms" },
      { label: "Re-renders Cut", value: "60%" },
      { label: "Latency Cut", value: "40%" },
    ],
    accentColor: "#ef4d2f",
  },
  {
    id: "ridesync",
    title: "RideSync – Real-Time Ride Booking Application",
    subtitle: "Cross-Platform Ride-Hailing Application",
    category: "Full Stack & Mobile",
    githubUrl: "https://github.com/ayush931",
    bullets: [
      "Built a cross-platform ride-hailing app (React Native, Expo) with live GPS tracking and WebSocket messaging.",
      "Added secure auth via Clerk and optimized Neon PostgreSQL queries – sub-200ms round-trip times.",
    ],
    stack: ["React Native", "Expo", "WebSockets", "Clerk Auth", "Neon PostgreSQL", "TypeScript"],
    stats: [
      { label: "Round-Trip Time", value: "< 200ms" },
      { label: "Platform", value: "iOS / Android" },
    ],
    accentColor: "#d9ff45",
  },
] as const;

export const RESUME_SKILLS = [
  {
    category: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C++"],
  },
  {
    category: "Frontend Architecture",
    skills: ["React.js", "Next.js", "React Native (Expo)", "HTML5", "CSS3", "Tailwind CSS", "Redux Toolkit", "GraphQL"],
  },
  {
    category: "Backend & Microservices",
    skills: ["Node.js", "Express.js", "FastAPI", "RESTful APIs", "WebSockets", "Event-Driven Architecture"],
  },
  {
    category: "Authentication & Security",
    skills: ["JSON Web Token (JWT)", "Open Authorization (OAuth 2.0)", "Role-Based Access Control (RBAC)"],
  },
  {
    category: "Databases & ORMs",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma ORM", "Neon Serverless PostgreSQL"],
  },
  {
    category: "DevOps & Cloud Operations",
    skills: ["Docker", "Kubernetes", "Amazon Web Services (AWS) (EC2, S3)", "CI/CD (GitHub Actions)", "Vercel"],
  },
  {
    category: "Message Brokers",
    skills: ["RabbitMQ", "Apache Kafka"],
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "Postman", "Turborepo", "Monorepo Architecture", "Linux", "Agile/Scrum", "System Design"],
  },
] as const;

export const RESUME_EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    institution: "IIT Patna and IIIT Ranchi",
    location: "Patna and Ranchi, India",
    period: "2026 - Present",
    score: "Enrolled",
    description: "Advanced Computer Science, Software Engineering & Systems Architecture.",
    highlights: [
      "Joint/Collaborative Advanced Degree Program",
      "Specialization in Event-Driven Architecture & Distributed Systems",
      "Focus on Full-Stack Engineering, Microservices & Cloud Infrastructure",
    ],
  },
  {
    degree: "Master of Business Administration (MBA) – Marketing",
    institution: "Impact College, Aryabhatta Knowledge University",
    location: "Patna, India",
    period: "2023 - 2025",
    score: "CGPA: 8.61/10",
    description: "Strategic Management, Business Analytics, Product Growth & Marketing.",
    highlights: [
      "Graduated with High Distinction (CGPA: 8.61/10)",
      "Focus on Tech Product Marketing, Consumer Psychology & Business Operations",
      "Led cross-functional team projects & market research initiatives",
    ],
  },
  {
    degree: "Bachelor of Science (Honours) – Chemistry",
    institution: "B.D. College, Patliputra University",
    location: "Patna, India",
    period: "2020 - 2023",
    score: "60.4%",
    description: "Analytical Chemistry, Physical Science & Problem-Solving Methodologies.",
    highlights: [
      "Graduated with Chemistry Honours (60.4%)",
      "Strong foundation in analytical reasoning, quantitative research & scientific methodology",
      "Applied systematic data analysis & experimental lab modeling",
    ],
  },
] as const;

export const MOTION = {
  ease: {
    chrome: "power3.out",
    snap: "power4.inOut",
  },
  duration: {
    micro: 0.2,
    enter: 0.8,
    reveal: 1.1,
    scene: 1.6,
  },
  stagger: {
    characters: 0.024,
    items: 0.08,
  },
} as const;

export const SCENE = {
  camera: {
    fov: 38,
    near: 0.1,
    far: 100,
    position: [0, 0, 7] as [number, number, number],
  },
  dpr: {
    desktop: [1, 1.75] as [number, number],
    lowPower: 1,
  },
  performance: {
    lowPowerCores: 4,
    targetFps: 30,
  },
};

