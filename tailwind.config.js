/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5F1",
        ink: "#252938",
        primary: "#7567C8",
        navy: "#293148",
        line: "#E4E0D9",
        muted: "#85828A",
        soft: "#FAF9F7",
        lavender: "#F0EDF9",
        lavenderLight: "#F7F4FF",
      },
      borderRadius: {
        card: "26px",
      },
    },
  },
  plugins: [],
};