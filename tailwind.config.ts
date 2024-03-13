import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./assets/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./helpers/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./models/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./network/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/**/*.{js,ts,jsx,tsx,mdx}",
    "./redux/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        lobster: ["Lobster-Regular", "sans-serif"],
        sf_pro: ["SF-Pro", "sans-serif"],
        sf_pro_rounded: ["SF-Pro-Rounded-Black", "sans-serif"],
        sf_pro_text: ["SF-Pro-Text-Black", "sans-serif"],
        sf_pro_text_light: ["SF-Pro-Text-Light", "sans-serif"],
        sf_pro_display: ["SF-Pro-Display-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
