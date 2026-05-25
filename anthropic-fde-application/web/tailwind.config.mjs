/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCFAF6",
          100: "#F7F2E8",
          200: "#EEE6D2",
          300: "#E0D2B0"
        },
        ink: {
          900: "#1F1B16",
          800: "#322B22",
          700: "#4A4034",
          600: "#6B5B49",
          500: "#8B7860",
          400: "#A89683"
        },
        rust: {
          50: "#FBF1EC",
          400: "#D97757",
          500: "#C25B3D",
          600: "#A0492F",
          700: "#7B3624"
        }
      },
      fontFamily: {
        serif: ["'Tiempos Headline'", "'Source Serif Pro'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};
