// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],
  colorMode: {
    classSuffix: '',
  },
  googleFonts: {
    families: {
      Inter: true,
      'Fira Sans': [400, 500],
    },
    display: 'swap',
    preconnect: true,
    download: true,
  },
  postcss: {
    plugins: {
      'postcss-focus-visible': {
        replaceWith: '[data-focus-visible-added]',
      },
      autoprefixer: {},
    }
  },
})
