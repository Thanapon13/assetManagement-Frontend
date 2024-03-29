const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sidebar-green': '#F3FFEF',
        'text-green': '#38821D',
        'text-gray': '#6C757D',
        'background-page': '#F8FAFB',
        'border-gray-table': '#E0E0E0',
        'text-black-table': 'rgba(0, 0, 0, 0.87)',
        'text-blue': '#1572FE',
        'background-light-blue': '#E8E9FF',
        'icon-dark-gray': 'rgba(0, 0, 0, 0.54)',
        'focus-blue': '#0466BF',
        'background-gray-table': '#F5F5F5',
        'text-sidebar': '#999999',
        'table-gray': '#F5F5F5',
        'table-data': '#F0F0F0',
        'button-red': '#FE5F7C',
        'button-orange': '#FFAE66',
        'upload-pic': '#FBFBFB',
      },
      gridTemplateColumns: {
        // 14: 'repeat(14, minmax(0, 1fr))',
        13: 'repeat(13, minmax(0, 1fr))',
        14: 'repeat(14, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        16: 'repeat(16, minmax(0, 1fr))',
        17: 'repeat(17, minmax(0, 1fr))',
        18: 'repeat(18, minmax(0, 1fr))',
        19: 'repeat(19, minmax(0, 1fr))',
        // 20: 'repeat(20, minmax(0, 1fr))',
        // 22: 'repeat(22, minmax(0, 1fr))',
        23: 'repeat(23, minmax(0, 1fr))',
        // 24: 'repeat(24, minmax(0, 1fr))',
        // 26: 'repeat(26, minmax(0, 1fr))',

        // Complex site-specific column configuration
        // footer: '200px minmax(900px, 1fr) 100px',
      },
      fontFamily: {
        sans: ['IBM Plex Sans Thai', ...defaultTheme.fontFamily.sans],
        // sans: ['Sarabun', ...defaultTheme.fontFamily.sans],
        // thai: ['IBM Plex Sans Thai', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
