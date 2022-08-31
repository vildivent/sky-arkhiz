/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        h1: ["Alegreya", "serif"],
        h2: ["Taviraj", "serif"],
        p: ['"Hind Guntur"', "sans-serif"],
        "logo-h1": ['"Open Sans"', "sans-serif"],
        "logo-p": ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
