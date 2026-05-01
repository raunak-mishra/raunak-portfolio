/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#030711",
        secondary: "#9CA3AF",
        tertiary: "#07111f",
        "black-100": "#0F172A",
        "black-200": "#111827",
        "white-100": "#f3f3f3",
        neon: {
          blue: "#38BDF8",
          green: "#34D399",
          violet: "#A78BFA",
        },
      },
      boxShadow: {
        card: "0px 24px 90px -30px rgba(15, 23, 42, 0.8)",
        glow: "0 0 80px -24px rgba(56, 189, 248, 0.72)",
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
