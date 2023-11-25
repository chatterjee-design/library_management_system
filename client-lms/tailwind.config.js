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
        'sd2': 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px'
      },
      keyframes: {
        'fade-in-left': {
          to: {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'fade-in-left': 'fade-in-left 1s ease-out forwards',
        'slide-in-left': 'slide-in-left 1s ease-out forwards',
      },
    },
  },
  plugins:  [
    require("daisyui"),
    require("@tailwindcss/line-clamp")
    ],
}

