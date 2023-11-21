/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'books': 'url("./src/assets/book.jpg")',
        'login' : 'url("./src/assets/loginAnim.jpg")',

      },
      boxShadow: {
        'sd' : "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }
    },
  },
  plugins:  [
    require("daisyui"),
    require("@tailwindcss/line-clamp")
    ],
}

