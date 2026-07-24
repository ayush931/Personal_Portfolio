import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayush Kumar | Full-Stack Software Engineer & Systems Architect",
  description:
    "Full-Stack Software Engineer specializing in real-time sync engines, event-driven microservices, multi-user WebSocket architectures, FastAPI, and Turborepos.",
  keywords: [
    "Ayush Kumar",
    "Full-Stack Engineer",
    "Systems Architect",
    "Patna India",
    "WebSockets",
    "FastAPI",
    "Turborepo",
    "Next.js",
    "React Native",
  ],
  authors: [{ name: "Ayush Kumar", url: "https://github.com/ayush931" }],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Ayush Kumar — Systems & Real-Time Engineer",
    description:
      "Architecting event-driven pipelines, sub-100ms multi-user sync engines, and robust microservices.",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body suppressHydrationWarning className="bg-[#050510] text-[#F1F5F9] antialiased selection:bg-cyber-accent/20 selection:text-cyber-accent-light min-h-screen relative font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
