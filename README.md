# 🌟 Interactive 3D Developer Portfolio

A premium, interactive 3D developer portfolio website built using modern web standards. This portfolio showcases projects, experience, skills, and real-time GitHub integration, complete with an interactive background particle canvas and a self-hosted contact CRM.

[![Next.js Version](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-orange?style=flat-square&logo=threedotjs)](https://threejs.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

---

## 🎨 Design & Aesthetics
This application is designed with high visual excellence:
- **Interactive 3D Particle Canvas**: Dynamic WebGL-based custom floating particle field reacting to mouse movement.
- **Glassmorphism**: Sleek frosted glass panel designs matching professional dark-mode aesthetics.
- **Modern Typography**: Seamlessly styled using modern geist-sans and geist-mono typography.
- **Smooth Animations**: Tailored hover micro-interactions and transitions.

---

## ⚡ Features
- **Categorized Skills Matrix**: Fully interactive, categorized skill set filtering panel.
- **Accordion Experience Timeline**: Expandable career history timeline highlighting previous engineering positions.
- **Github Statistics Dashboard**: Fetches and displays GitHub stats and visualizer blocks.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@tailwindcss/postcss`)
- **3D Engine**: [Three.js](https://threejs.org/) (`three`, `@types/three`)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📂 Project Structure
```text
├── app/
│   ├── favicon.ico
│   ├── globals.css         # Global Tailwind style rules
│   ├── layout.tsx          # App entry wrapper and Metadata
│   └── page.tsx            # Main Portfolio Page (Hero, Skills, Experience, CRM, Contact)
├── components/
│   ├── icons.tsx           # Custom SVG Brand Icons
│   ├── GithubStats.tsx     # GitHub activity visualizations and metrics
│   └── ParticleCanvas.tsx  # Three.js custom particle rendering canvas
├── public/                 # Static assets (images, profile pictures)
└── tsconfig.json           # TypeScript configuration details
```

---

## 🚀 Getting Started

### 📋 Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18+) installed.

### 🔧 Installation & Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/ayush931/Personal_Portfolio.git
   cd Personal_Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

4. **Build the production application:**
   ```bash
   npm run build
   ```

---
