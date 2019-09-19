const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      teal: colors.teal,
      blue: colors.blue,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {}
  },
  variants: {
    appearance: [],
    backgroundAttachment: [],
    backgroundColor: ['hover', 'focus'],
    backgroundPosition: [],
    backgroundRepeat: [],
    backgroundSize: [],
    borderCollapse: [],
    borderColor: ['hover', 'focus'],
    borderRadius: [],
    borderStyle: [],
    borderWidth: [],
    boxShadow: ['hover', 'focus'],
    cursor: [],
    fill: [],
    fontFamily: [],
    fontSize: [],
    fontSmoothing: [],
    fontStyle: [],
    fontWeight: [],
    opacity: ['hover', 'focus'],
    outline: ['focus'],
    placeholderColor: [],
    pointerEvents: [],
    stroke: [],
    textColor: ['hover', 'focus'],
    textDecoration: ['hover', 'focus'],
    textTransform: [],
    userSelect: [],
    whitespace: [],
  },
  plugins: [],
  corePlugins: {
    backgroundAttachment: false,
    float: false,
    placeholderColor: false,
  }
}
