/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#050505',
        'brand-green': '#39FF14',
        'brand-red': '#FF1E1E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'], // For the tagline
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
