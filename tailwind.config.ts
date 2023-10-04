import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      blue: {
        2: "var(--color-blue-2)",
        5: "var(--color-blue-5)",
        6: "var(--color-blue-6)",
      },
      gray: {
        5: "var(--color-gray-5)",
        6: "var(--color-gray-6)",
      },
    },
    borderRadius: {
      default: "8px",
    },
  },
  plugins: [],
  important: true,
};
export default config;
