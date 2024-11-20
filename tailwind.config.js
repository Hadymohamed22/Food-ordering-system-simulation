/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#952c0c",
        secondary: "#180a07",
        thirdColor: "#7c6a68",
        fourColor: "#fcf8f5"
      },
      backgroundColor: {
        primary: "#fcf8f5"
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xlg: "1200px",
        "2xlg": "1400px"
      }
    },
  },
  plugins: [],
}

