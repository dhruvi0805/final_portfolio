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
        canvas: {
          DEFAULT: "#F9F9F9",
          ink: "#013220",
        },
        sage: "#9CAF88",
        willow: "#7D8B6F",
        cobalt: "#3D6B8C",
        lilac: "#B8A9C9",
        ochre: "#C4A35A",
      },
      boxShadow: {
        glass: "0 10px 32px rgba(1, 50, 32, 0.12), 0 2px 10px rgba(1, 50, 32, 0.08)",
        "glass-soft": "0 8px 24px rgba(1, 50, 32, 0.1)",
      },
      backgroundImage: {
        "impasto-vibrant":
          "radial-gradient(circle at 22% 20%, rgba(61, 107, 140, 0.4), transparent 42%), radial-gradient(circle at 80% 12%, rgba(156, 175, 136, 0.35), transparent 40%), radial-gradient(circle at 10% 85%, rgba(184, 169, 201, 0.32), transparent 42%)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
