// https://nuxt.com/docs/api/configuration/nuxt-config
// noinspection JSUnusedGlobalSymbols
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    public: {
      gsiClientID: '',
      apiBase: 'https://api.greenrute.com/',
    },
  },
  colorMode: {
    classSuffix: '',
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        icon: 'English',
        file: 'en.yaml',
      },
      {
        code: 'uk',
        iso: 'uk-UA',
        name: 'Українська',
        icon: 'Ukrainian',
        file: 'uk.yaml',
      },
    ],
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      redirectOn: 'root',
    },
    vueI18n: './i18n.config.ts',
  },
  css: ['~/assets/css/fonts.css', '~/assets/css/animations.css'],
  postcss: {
    plugins: {
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
        { name: 'description', content: 'Новий щоденник у твоєму смартфоні — спільний розклад, домашнє завдання, обмін інформацією. Програма для Android та iOS, багато опцій, щоб налаштувати свій щоденник.' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
        { 'http-equiv': 'content-security-policy', content: "object-src 'none'; base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; font-src 'self' data:; img-src 'self' data: images.unsplash.com gravatar.com lh3.googleusercontent.com; frame-src https://accounts.google.com/gsi/; connect-src 'self' api.greenrute.com vitals.vercel-insights.com https://accounts.google.com/gsi/" + (process.env.NODE_ENV !== 'production' ? " localhost:* 192.168.0.101:* ws: wss:;" : ";") },
      ],
    },
  },
})
