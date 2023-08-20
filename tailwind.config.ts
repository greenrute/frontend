import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = <Partial<Config>>{
  theme: {
    fontSize: {
      'xs': ['0.7rem', { lineHeight: '1rem' }],
      'sm': ['0.8rem', { lineHeight: '1.5rem' }],
      'base': ['0.925rem', { lineHeight: '1.75rem' }],
      'lg': ['1.05rem', { lineHeight: '2rem' }],
      'xl': ['1.175rem', { lineHeight: '2rem' }],
      '2xl': ['1.3rem', { lineHeight: '2rem' }],
      '3xl': ['1.55rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.05rem', { lineHeight: '3.5rem' }],
      '5xl': ['2.55rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.05rem', { lineHeight: '1' }],
      '7xl': ['3.755rem', { lineHeight: '1.1' }],
      '8xl': ['4.55rem', { lineHeight: '1.125' }],
      '9xl': ['6.05rem', { lineHeight: '1' }],
    },
    extend: {
      screens: {
        xxs: '360px',
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
        sans: ['e-Ukraine', ...defaultTheme.fontFamily.sans],
        display: ['e-Ukraine Head', ...defaultTheme.fontFamily.sans],
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
        wave: 'wave 1s linear',
      },
    },
  },
  darkMode: 'class',
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/forms')],
}
