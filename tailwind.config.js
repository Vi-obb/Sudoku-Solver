module.exports = {
  content: ['./public/**/*.{html,js}'],
  theme: {
    extend: {
      width: {
        's': '450px',
        'm': '50px',
      },
      height: {
        's': '450px',
        'm': '50px',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
