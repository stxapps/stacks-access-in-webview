const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addVariant }) {
      addVariant('blk', '&');
    }),
  ],
};
