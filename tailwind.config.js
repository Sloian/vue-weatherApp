/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width:{
        '128': '32rem',
        '66': "16.5rem"
      },
      minWidth: {
        '35': '35px',
        '175': '175px',
        '185': '185px',
        '205': '205px',
        '250': '250px',
        '350': '350px',
      },
      boxShadow: {
        'my': ' 0px 5px 15px rgba(0, 0, 0, 0.35)',
      },
      screens: {
        'phone': '320px',
        // => @media (min-width: 640px) { ... }
      }
    },
  },
  plugins: [],
}
