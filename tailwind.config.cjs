/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Alibaba PuHuiTi']
      },
      colors: {
        main: '#147AD9',
        'main-shallow': '#82B3E2',
        'main-bg': '#F6F6F6',
        'main-gray': '#6F6F6F'
      }
    }
  },
  plugins: []
}
