const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        green: colors.green,
      },
    },
  },
  variants: {
    extend: {
      textColor: ['group-focus', 'focus-visible'],
      ringColor: ['group-focus', 'focus-visible'],
      ringOffsetColor: ['group-focus', 'focus-visible'],
      ringOffsetWidth: ['group-focus', 'focus-visible'],
      ringOpacity: ['group-focus', 'focus-visible'],
      ringWidth: ['group-hover', 'group-focus', 'hover', 'focus-visible'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
