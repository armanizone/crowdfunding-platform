const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./resources/**/*.blade.php", 
    "./resources/**/*.jsx",
    "./resources/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'red': colors.red,
        'blue': colors.blue,
        'gray': colors.gray,
        'yellow': colors.yellow,
        'green': colors.green,
      },
      fontFamily: {
        'head': ['Montserrat', 'sans-serif'],
        'body': ['Roboto, Arial', 'sans-serif']
      },
      container: {
        center: true,
        padding: '12px'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled']
    }
  },
  plugins: [],
}
