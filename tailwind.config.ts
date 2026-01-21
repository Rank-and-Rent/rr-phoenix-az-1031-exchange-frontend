import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mansion Global inspired palette
        mansion: {
          gold: "#8B7355",
          "gold-dark": "#6B5A47",
          "gold-light": "#A89070",
          navy: "#1a1f2e",
          "navy-light": "#2d3344",
          cream: "#FAFAF8",
          charcoal: "#1a1a1a",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        "desert-xl": "0 32px 120px rgba(24, 24, 24, 0.08)",
        "desert-lg": "0 20px 60px rgba(24, 24, 24, 0.08)",
        editorial: "0 4px 20px rgba(0, 0, 0, 0.08)",
        "editorial-hover": "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-source-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [forms],
};

export default config;

