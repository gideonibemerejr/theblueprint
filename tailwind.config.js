const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      blue: {
        DEFAULT: '#0506C0',
        50: '#8182FC',
        100: '#6D6EFB',
        200: '#4546FA',
        300: '#1D1FF9',
        400: '#0607E8',
        500: '#0506C0',
        600: '#040489',
        700: '#020353',
        800: '#01011C',
        900: '#000000',
      },
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      red: colors.red,
      yellow: colors.yellow,
      green: colors.green,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
