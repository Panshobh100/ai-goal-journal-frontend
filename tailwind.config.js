/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background: "#12090B",
        surface: "#190D0F",
        surface2: "#211114",

        burgundy: "#561C24",
        wine: "#6D2932",

        beige: "#C7B7A3",
        cream: "#E8D8C4",

        border: "#352024",
        muted: "#9F8F82",
        text: "#E8D8C4",
      },

      borderRadius: {
        panel: "18px",
        card: "14px",
      },

      boxShadow: {
        card: "0 10px 35px rgba(0, 0, 0, 0.22)",
        glow: "0 12px 40px rgba(86, 28, 36, 0.16)",
      },
    },
  },

  plugins: [],
};