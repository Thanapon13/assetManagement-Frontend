/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sidebar-green': '#F3FFEF',
        green: '#38821D',
      },
    },
  },
  plugins: [],
}
