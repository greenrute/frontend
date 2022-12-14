const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontSize: {
      'xs': ['0.75rem', {lineHeight: '1rem'}],
      'sm': ['0.875rem', {lineHeight: '1.5rem'}],
      'base': ['1rem', {lineHeight: '1.75rem'}],
      'lg': ['1.125rem', {lineHeight: '2rem'}],
      'xl': ['1.25rem', {lineHeight: '2rem'}],
      '2xl': ['1.5rem', {lineHeight: '2rem'}],
      '3xl': ['2rem', {lineHeight: '2.5rem'}],
      '4xl': ['2.5rem', {lineHeight: '3.5rem'}],
      '5xl': ['3rem', {lineHeight: '3.5rem'}],
      '6xl': ['3.75rem', {lineHeight: '1'}],
      '7xl': ['4.5rem', {lineHeight: '1.1'}],
      '8xl': ['6rem', {lineHeight: '1'}],
      '9xl': ['8rem', {lineHeight: '1'}],
    },
    extend: {
      screens: {
        xs: '410px',
      },
      backgroundImage: {
        'dashboard-gradient': 'url("/img/dashboard-background.png")',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      colors: {
        green: {
          550: '#1cb454',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        display: ['Montserrat', ...defaultTheme.fontFamily.sans],
        manrope: ['Manrope', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
        system: [...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '2xl': '40rem',
      },
      spacing: {
        '0.25': '0.0625rem',
      },
      letterSpacing: {
        tightest: '-0.075em',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
        border: 'border-radius',
      },
      animation: {
        loader: 'spin 1s steps(8, end) infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
