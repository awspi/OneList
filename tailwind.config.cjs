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
        'main-text': '#101010',
        'main-text-blue': '#4095E5',
        'main-bg': '#F6F6F6',
        'main-bg-2': '#EFEFEF',
        'main-gray': '#6F6F6F',
        'main-gray-2': '#DBDBDB',
        'main-border': '#BBBBBB',
        'pro-1': '#D23333',
        'pro-2': '#FECE00',
        'pro-3': '#4095E5',
        'pro-4': '#6F6F6F',
        'success-100': '#F2F9EC',
        'success-200': '#E4F2DB',
        'success-300': '#7EC050',
        'warn-100': '#FCF6ED',
        'warn-200': '#F8ECDA',
        'warn-300': '#DCA550',
        'error-100': '#ED7456',
        'error-200': '#f3471c',
        'error-300': '#ffffff'
      }
    }
  },
  plugins: []
}
