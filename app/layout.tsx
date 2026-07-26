import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Ayush — Full Stack & Systems Engineer",
    template: "%s — Ayush",
  },
  description:
    "Full Stack Engineer at NexoGrafix specializing in distributed Python document pipelines (DocStream), FastAPI, Celery, React/Next.js, WebGL 3D, and real-time multiplayer systems.",
  keywords: [
    "Ayush",
    "Full Stack Engineer",
    "NexoGrafix",
    "DocStream",
    "FastAPI",
    "Python",
    "React",
    "Next.js",
    "Three.js",
    "WebGL",
    "Celery",
    "Aetheria",
    "RideSync",
  ],
  authors: [{ name: "Ayush", url: "https://github.com/ayush931" }],
  creator: "Ayush",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ayush-portfolio.vercel.app",
    title: "Ayush — Full Stack & Systems Engineer",
    description:
      "Full Stack Engineer at NexoGrafix specializing in high-throughput document pipelines, WebGL 3D experiences, and real-time software systems.",
    siteName: "Ayush Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush — Full Stack & Systems Engineer",
    description:
      "Full Stack Engineer at NexoGrafix building distributed document processing, React/Next.js apps, and interactive 3D WebGL experiences.",
    creator: "@ayush931",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ayush",
  jobTitle: "Full Stack Engineer",
  worksFor: {
    "@type": "Organization",
    name: "NexoGrafix",
  },
  url: "https://github.com/ayush931",
  sameAs: ["https://github.com/ayush931"],
  knowsAbout: [
    "Software Engineering",
    "FastAPI",
    "Python",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "WebGL",
    "PostgreSQL",
    "Docker",
    "Celery",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
