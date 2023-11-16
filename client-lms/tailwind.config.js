/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'books': 'url("./src/assets/book.jpg")'
      }
    },
  },
  plugins:  [
    require("daisyui"),
    require("@tailwindcss/line-clamp")
    ],
}

