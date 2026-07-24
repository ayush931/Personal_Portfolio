import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#050607",
          card: "#0D1011",
          surface: "#151918",
          border: "#27302D",
          accent: "#C9956A",
          "accent-light": "#E8C9A0",
          "accent-dim": "#8B6B50",
          text: "#FFFFFF",
          muted: "#C8CCC9",
          gold: "#C9956A",
          cyan: "#A0A5A2",
          emerald: "#8F948E",
          amber: "#C9956A",
          pink: "#A8968E",
          indigo: "#8A918E",
          purple: "#968B85",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "premium": "0 4px 24px rgba(0,0,0,0.4)",
        "premium-lg": "0 8px 48px rgba(0,0,0,0.5)",
        "elevated": "0 2px 8px rgba(0,0,0,0.3)",
        "elevated-lg": "0 4px 16px rgba(0,0,0,0.4)",
        "accent-glow": "0 0 34px -14px rgba(232,201,160,0.36)",
        "luxury": "0 28px 90px rgba(0,0,0,0.56), 0 0 48px -30px rgba(232,201,160,0.55)",
        "neon-purple": "0 16px 42px rgba(0,0,0,0.36)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #6E4A3A 0%, #D5AA84 100%)",
        "dark-gradient": "radial-gradient(ellipse at 50% 0%, #17201C 0%, #050607 72%)",
      },
    },
  },
  plugins: [],
};

export default config;
