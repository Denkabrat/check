import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tiffani: "#0ABAB5",
        white: "#fff",
        pink: "#E30387",
        "gray-search": "#F5F5F5",
        border: "#DEDEDE",
        "gray-color": "#D9D9D9",
        blue: "#0500FC",
        brown: "#663700",
        select: "#F9F9F9",
        textAcc: "#737373",
        "gray/500": "#667085",
        textGray: "#373737",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;