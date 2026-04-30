/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#0B0F14",
        secondary: "#9CA3AF",
        tertiary: "#111827",
        "black-100": "#0F172A",
        "black-200": "#111827",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 24px 90px -30px rgba(15, 23, 42, 0.8)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [],
};
