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
      transparent: "transparent",
      blue: {
        2: "var(--color-blue-2)",
        5: "var(--color-blue-5)",
        6: "var(--color-blue-6)",
      },
      red: {
        1: "var(--color-red-1)",
        2: "var(--color-red-2)",
      },
      gray: {
        1: "var(--color-gray-1)",
        3: "var(--color-gray-3)",
        5: "var(--color-gray-5)",
        6: "var(--color-gray-6)",
        10: "var(--color-gray-10)",
      },
    },
    borderRadius: {
      default: "8px",
      full: "100%",
    },
  },
  plugins: [],
};
export default config;
