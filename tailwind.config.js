/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F5F2EB",
        forest: {
          DEFAULT: "#234B3D",
          dark: "#17201C",
          light: "#2E6350",
        },
        terracotta: {
          DEFAULT: "#CE6B3D",
          dark: "#A85530",
          light: "#D98259",
        },
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        content: "1320px",
      },
      fontSize: {
        "hero-lg": ["clamp(2.5rem,5vw,4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "hero-sm": ["clamp(2rem,4vw,2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "section-lg": ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
