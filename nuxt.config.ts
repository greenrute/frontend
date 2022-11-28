// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
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
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      'postcss-focus-visible': {
        replaceWith: '[data-focus-visible-added]',
      },
      autoprefixer: {},
    }
  },
  experimental: {
    payloadExtraction: false,
  },
})
