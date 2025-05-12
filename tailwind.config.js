/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ivory: '#F5F1E8',
          gold: '#B89F6E',
          charcoal: '#2A2A2A',
        },
        secondary: {
          beige: '#E8DECD',
          gray: '#5C5C5C',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
