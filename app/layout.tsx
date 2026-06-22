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
  description: "Explore the 3D portfolio of Ayush Kumar, a Full Stack Software Engineer specializing in MERN stack, Next.js, and high performance SaaS architecture.",
  keywords: ["Ayush Kumar", "Full Stack Engineer", "Web Developer Portfolio", "Three.js Portfolio", "React Developer", "Next.js Portfolio"],
  authors: [{ name: "Ayush Kumar" }],
  icons: {
    icon: "/profile_image.png",
    shortcut: "/profile_image.png",
    apple: "/profile_image.png",
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
