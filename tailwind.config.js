/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          primary: '#ef4444',
          secondary: '#dc2626',
          tertiary: '#fca5a5',
        },
        background: {
          DEFAULT: '#050505',
          card: 'rgba(20, 20, 22, 0.85)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
