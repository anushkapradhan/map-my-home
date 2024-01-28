/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white3: '#f3f4f5',
        black3: '#09221f',
        blue3: '#1e63b5',
      },
    },
  },
  plugins: [],
}

