# Ayush Kumar — Personal Portfolio & Systems Engineering Showcase

![Next.js 16](https://img.shields.io/badge/Next.js-16_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM_7-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)

A high-performance, developer-first personal portfolio and telemetry platform engineered with Next.js 16, Three.js WebGL graphics, Prisma ORM, and a custom **Cobalt Blueprint** design system.

---

## Key Features

- 🎨 **Cobalt Blueprint Design System**: Technical aesthetic featuring ambient blueprint grid drift, custom cursor, monospace kickers, and tailored HSL color tokens.
- ⚡ **Interactive 3D WebGL Experience**: Built with `@react-three/fiber` and `@react-three/drei` for responsive interactive 3D elements.
- ✉️ **Resilient Contact & CRM Integration**: Direct contact form powered by Zod schema validation, Resend email API, and automatic Neon PostgreSQL / JSON fallback storage.
- 🔔 **Project-Themed Toast Notifications**: Custom `ToastProvider` with Framer Motion slide animations, progress timer indicators, and Cobalt blueprint status badges (`SYS // TRANSMISSION_OK`).
- 📊 **Telemetry & Admin CRM Dashboard (`/crm`)**: Built-in administration portal for reviewing submitted inquiries, message statuses, and real-time visitor traffic telemetry.
- 🚀 **Smooth Physics Scrolling**: Integrated `Lenis` smooth scroll with GSAP timeline animations and dynamic scroll section wipes.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript (Strict mode) |
| **Styling** | Tailwind CSS v4, Custom CSS Variables |
| **3D & Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei`, Postprocessing |
| **Animations** | GSAP, `@gsap/react`, Framer Motion, Lenis Scroll |
| **Database & ORM** | Neon Serverless PostgreSQL, Prisma ORM 7 (`@prisma/adapter-pg`) |
| **Forms & Email** | React Hook Form, Zod, Resend Email SDK |
| **Fonts** | JetBrains Mono, Geist Sans |

---

## Project Structure

```text
├── app/
│   ├── api/             # Next.js Route Handlers (contact, crm, blogs, visitor tracking)
│   ├── blogs/           # Dynamic blog reader & listing pages
│   ├── crm/             # Admin CRM & telemetry dashboard
│   ├── globals.css      # CSS design tokens & blueprint grid styling
│   └── layout.tsx       # Root layout with ToastProvider & global overlays
├── components/
│   ├── about/           # Experience, skills & technical background
│   ├── blogs/           # Blog section components
│   ├── common/          # ToastProvider, CustomCursor, SmoothScroll, Blueprint overlays
│   ├── contact/         # Contact form with real-time toast feedback
│   ├── education/       # Education timeline (IIT Patna / IIIT Ranchi MCA)
│   ├── footer/          # Technical footer & direct links (GitHub, LinkedIn)
│   ├── hero/            # Hero section & preloader
│   ├── navigation/      # Header, mobile navigation & section wipe overlays
│   └── scene/           # 3D R3F Canvas & lighting setup
├── lib/
│   ├── constants.ts     # Developer profiles, social links & resume metadata
│   ├── crm-store.ts     # PostgreSQL / local JSON CRM data management
│   └── prisma.ts        # Prisma Client initialization with Neon adapter
├── prisma/
│   └── schema.prisma    # Database schemas for CRM messages & visitor logs
└── public/              # Resume PDF, favicons, & static assets
```

---

## Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### 2. Clone & Install Dependencies

```bash
git clone https://github.com/ayush931/Personal_Portfolio.git
cd Personal_Portfolio
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database Connection (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Resend API Key for Email Delivery (Optional: falls back to CRM storage)
RESEND_API_KEY="re_123456789"

# CRM Dashboard Access Password
NEXT_PUBLIC_CRM_PASSWORD="admin123"
```

### 4. Database Setup

Initialize Prisma schema and generate the Prisma Client:

```bash
npx prisma generate
npx prisma db push
```

### 5. Run Local Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser.

---

## Deployment & Build

To produce an optimized production build:

```bash
npm run build
npm run start
```

---

## Links & Profiles

- **GitHub Profile**: [github.com/ayush931](https://github.com/ayush931)
- **LinkedIn Profile**: [linkedin.com/in/ayush-kumar-94310522a](https://www.linkedin.com/in/ayush-kumar-94310522a)
- **Developer**: Ayush Kumar — Junior Software Engineer at NexoGrafix
