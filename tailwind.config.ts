import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oled: {
          bg: "#09090B",
          card: "#121215",
          surface: "#18181C",
          border: "#24242C",
          hover: "#2A2A34",
          muted: "#71717A",
          text: "#FAFAFA",
        },
        signal: {
          cyan: "#5EEAD4",
          green: "#00FF9C",
          amber: "#FFB020",
          red: "#FF453A",
          purple: "#A78BFA",
        },
      },
      fontFamily: {
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "Fira Code", "monospace"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-scan": "radar 4s linear infinite",
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s step-end infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 25px -5px rgba(94, 234, 212, 0.25)",
        "glow-green": "0 0 25px -5px rgba(0, 255, 156, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
