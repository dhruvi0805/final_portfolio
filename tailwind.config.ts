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
        night: {
          black: "var(--night-black)",
          navy: "var(--deep-navy)",
          cobalt: "var(--cobalt)",
          starlight: "var(--starlight-blue)",
          vangogh: "var(--van-gogh-blue)",
          cerulean: "var(--cerulean)",
          sky: "var(--sky-blue)",
        },
        star: {
          gold: "var(--gold)",
          amber: "var(--amber)",
          cream: "var(--cream)",
          white: "var(--white-star)",
          yellow: "var(--paint-yellow)",
          ochre: "var(--paint-ochre)",
        },
        motion: {
          tint: "rgba(13, 27, 62, 0.3)",
        },
      },
      boxShadow: {
        "glow-blue": "0 0 60px rgba(38, 85, 168, 0.2)",
        "glow-gold": "0 0 60px rgba(240, 180, 41, 0.1)",
        "cta-blue": "0 20px 60px rgba(38, 85, 168, 0.4)",
      },
      backgroundImage: {
        "work-section":
          "linear-gradient(180deg, var(--night-black) 0%, rgba(13,27,62,0.5) 50%, var(--night-black) 100%)",
        "btn-primary-night":
          "linear-gradient(135deg, var(--van-gogh-blue), var(--cerulean))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        ringPulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.4" },
          "50%": { transform: "scale(1.4)", opacity: "0" },
        },
        rotateGlow: {
          to: { filter: "hue-rotate(30deg)", transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-slow": "fadeIn 1.5s ease 0.4s forwards",
        "ring-pulse": "ringPulse 3s ease-in-out infinite",
        "orb-spin": "rotateGlow 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
