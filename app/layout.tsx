import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ayush Kumar | Full Stack Software Engineer Portfolio",
  description: "Ayush Kumar — Full Stack Software Engineer specializing in microservices, React, FastAPI, and React Native. Open to full-time engineering roles.",
  keywords: ["Ayush Kumar", "Full Stack Engineer", "Web Developer Portfolio", "Three.js Portfolio", "React Developer", "Next.js Portfolio", "Patna Software Engineer"],
  authors: [{ name: "Ayush Kumar" }],
  metadataBase: new URL("https://anotherayush.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ayush Kumar | Full Stack Software Engineer Portfolio",
    description: "Ayush Kumar — Full Stack Software Engineer specializing in microservices, React, FastAPI, and React Native. Open to full-time engineering roles.",
    url: "https://anotherayush.in",
    siteName: "Ayush Kumar Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 600,
        alt: "Ayush Kumar Portfolio Hero Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayush Kumar | Full Stack Software Engineer Portfolio",
    description: "Ayush Kumar — Full Stack Software Engineer specializing in microservices, React, FastAPI, and React Native. Open to full-time engineering roles.",
    images: ["/avatar.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  }
};

import { CursorProvider } from "@/lib/cursor-context";
import CustomCursor from "@/components/cursor/CustomCursor";
import PageTransition from "@/components/layout/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-bg-void text-text-secondary">
        <CursorProvider>
          <CustomCursor />
          <PageTransition>
            {children}
          </PageTransition>
        </CursorProvider>
      </body>
    </html>
  );
}
