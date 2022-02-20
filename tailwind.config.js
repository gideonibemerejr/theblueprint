const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      blue: '#0506c0',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      red: colors.red,
      yellow: colors.yellow,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
