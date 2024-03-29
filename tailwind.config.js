/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      acidbath: ["Acidbath", "sans-serif"],
    },
    extend: {
     colors: {
        transparent: "transparent",
        current: "currentColor",
        roller: {
          1: "#09D79A",
          2: "#D0342C",
          3: "#DAA520",
          4: "#39C0ED",
        },
      },
    },
  },
  plugins: [],
};
