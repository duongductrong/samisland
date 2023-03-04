/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        semantic: {
          dark: "#151515",
          dark100: "#202022",

          light: "#ffffff",

          gray: "#949495",
        },
      },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
