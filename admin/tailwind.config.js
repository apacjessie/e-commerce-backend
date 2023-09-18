/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: ["even"],
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
