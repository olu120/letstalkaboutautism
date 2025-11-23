/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1100px",
        xl: "1300px",
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E5ACB",
          dark: "#1546A0",
          light: "#E8F0FF",
        },
        secondary: {
          DEFAULT: "#35B457",
          dark: "#288B40",
          light: "#E9F8EF",
        },
        accent: {
          DEFAULT: "#CF3A32",
          dark: "#A62D27",
          light: "#FDEBE9",
        },
      },
    },
  },
  plugins: [],
};
