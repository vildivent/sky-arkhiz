/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        h1: ["Alegreya", "serif"],
        h2: ["Taviraj", "serif"],
        p: ["Mulish", "sans-serif"],
        "logo-h1": ['"Open Sans"', "sans-serif"],
        "logo-p": ["Lora", "serif"],
      },
      screens: {
        lg: "1110px",
      },
    },
  },
  plugins: [],
};
