// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/google-fonts',
    '@nuxt/image-edge'
  ],
  colorMode: {
    classSuffix: '',
  },
  runtimeConfig: {
    public: {
      gsiClientID: process.env.GSI_CLIENT_ID || '122300346388-0ee31s58epvv7udrjvgqht1oij1sdnu7.apps.googleusercontent.com',
    },
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
  app: {
    head: {
      htmlAttrs: {
        lang: 'uk',
      },
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#16a34a' },
      ],
      meta: [
        { name: 'description', content: 'Новий щоденник у твоєму смартфоні - спільний розклад, домашнє завдання, обмін інформацією. Програма для Android та iOS, багато опцій, щоб налаштувати свій щоденник.' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { name: 'theme-color', content: '#16a34a' },
        { 'http-equiv': 'content-security-policy', content: "object-src 'none'; base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; font-src 'self' data: ; frame-src https://accounts.google.com/gsi/; connect-src 'self' ws: wss: https://accounts.google.com/gsi/;" },
      ],
    },
  },
})
