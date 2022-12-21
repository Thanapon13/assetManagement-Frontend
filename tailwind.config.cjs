/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sidebar-green': '#F3FFEF',
        "text-green": '#38821D',
        "text-gray":"#6C757D",
        "background-page":"#F8FAFB",
        "border-gray-table":"#E0E0E0"
      },
    },
  },
  plugins: [],
}
