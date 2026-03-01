import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "neon-card": "0 0 30px rgba(6,182,212,0.1)",
        "neon-btn": "0 0 20px rgba(6,182,212,0.3)",
        "neon-input": "inset 0 0 10px rgba(6,182,212,0.1)",
      },
    },
  },
  safelist: [
    { pattern: /^bg-(cyan|pink|blue|purple|yellow|red|green|orange|indigo)-500\/(10|20)$/ },
    { pattern: /^border-(cyan|pink|blue|purple|yellow|red|green|orange|indigo)-500\/(30)$/ },
    { pattern: /^border-(cyan|pink|blue|purple|yellow|red|green|orange|indigo)-500$/ },
    { pattern: /^text-(cyan|pink|blue|purple|yellow|red|green|orange|indigo)-400$/ },
  ],
  plugins: [],
};

export default config;
