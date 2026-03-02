/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d7b6',
          300: '#e9bb87',
          400: '#df9756',
          500: '#d77c35',
          600: '#c8642b',
          700: '#a64d25',
          800: '#863f25',
          900: '#6d3521',
        },
        slate: {
          850: '#172033',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}