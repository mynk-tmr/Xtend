/** @type {import('tailwindcss').Config} */

const myColors = {
  grass: "#126c33",
  navy: "#2b6e8b",
  love: "#fb7185",
  neutral: "#FCF6CF",
  ink: "#6d28d9",
  success: "#d9f99d",
  yellow: "#fcd34d",
  blood: "#b91c1c",
};

export default {
  content: [
    "./index.html",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: myColors,
      screens: {
        xs: { min: "540px" },
      },
    },
    plugins: [],
  },
};
