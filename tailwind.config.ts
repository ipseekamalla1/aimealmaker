import { fontFamily } from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0f0c",     // dark greenish black
        foreground: "#E6EAE7",     // light text
        primary: {
          DEFAULT: "#1DB954",      // bright green
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#163b29",      // deep forest green
          foreground: "#E6EAE7",
        },
        card: {
          DEFAULT: "#111814",      // slightly lighter dark green
          foreground: "#E6EAE7",
        },
      },
      fontFamily: {
        sans: ["Poppins", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
