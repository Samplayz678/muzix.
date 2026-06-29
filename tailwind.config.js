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
          primary: '#ff3b30',
          secondary: '#7f0000',
          tertiary: '#fff7f0',
        },
        background: {
          DEFAULT: '#050505',
          card: 'rgba(20, 20, 22, 0.85)',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Helvetica Neue"', 'Arial', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
