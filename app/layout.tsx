import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
