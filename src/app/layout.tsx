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
  title: "Ayush Kumar | Tech Lead & Full-Stack Systems Engineer",
  description:
    "Tech Lead & Systems Engineer specializing in real-time sync engines, event-driven microservices, multi-user WebSocket architectures, and monorepos.",
  keywords: [
    "Ayush Kumar",
    "Tech Lead",
    "Systems Engineer",
    "Full-Stack Engineer",
    "Patna India",
    "WebSockets",
    "Event Driven Architecture",
    "Turborepo",
    "Next.js",
    "React Native",
  ],
  authors: [{ name: "Ayush Kumar", url: "https://github.com/ayush931" }],
  openGraph: {
    title: "Ayush Kumar — Systems & Real-Time Engineer",
    description:
      "Architecting event-driven pipelines, sub-100ms multi-user sync engines, and robust monorepo infrastructures.",
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
      <body className="bg-oled-bg text-oled-text antialiased selection:bg-signal-cyan/20 selection:text-signal-cyan min-h-screen relative font-sans">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
