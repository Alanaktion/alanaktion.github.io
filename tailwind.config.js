const { colors, fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    colors: {
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      ngray: {
        '100': '#f5f5f5',
        '200': '#eeeeee',
        '300': '#e0e0e0',
        '400': '#bdbdbd',
        '500': '#9e9e9e',
        '600': '#757575',
        '700': '#585858',
        '800': '#3a3a3a',
        '900': '#212121',
      },
      teal: colors.teal,
      blue: colors.blue,
    },
    screens: {
      sm: '640px',
      md: '768px',
    },
    fontFamily: {
      sans: ['Source Sans Pro', ...fontFamily.sans],
      headings: ['Lato', ...fontFamily.sans],
      mono: ['Source Code Pro', 'JetBrains Mono', 'Fira Code', ...fontFamily.mono],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.3rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
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
