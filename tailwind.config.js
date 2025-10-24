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
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    extend: {
            colors: {
        brand: {
          DEFAULT: "#1576C5",   // main brand blue
          dark: "#0F5C99",      // darker hover shade
          light: "#E6F2FB",     // soft background tint
        },
      },

      borderRadius: {
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
