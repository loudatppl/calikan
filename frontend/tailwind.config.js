/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dblack: " #1e1f26",
        dblue: "#283655",
        navy: "#4d648d",
        sky: "#d0e1f9",
        dwhite: "#f9f9f9",
      },
      fontFamily: {
        logo: "BLOND",
        heading: "ROBOTO",
        body: "LATO-REGULAR",
      },
    },
  },
  plugins: [],
};
