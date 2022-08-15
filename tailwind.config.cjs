/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'smoke-darkest': 'rgba(0, 0, 0, 0.3)'
      }
    },
    boxShadow: {
      'card-l-hover': 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
      'card-l': 'rgba(0, 0, 0, 0.24) 0px 3px 8px;'
    }
  },
  plugins: []
}
