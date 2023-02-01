function customRule(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0
  }

  const teen = choice > 10 && choice < 20
  const endsWithOne = choice % 10 === 1
  if (!teen && endsWithOne) {
    return 1
  }
  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2
  }

  return choicesLength < 4 ? 2 : 3
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
  ],
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
    vueI18n: {
      pluralRules: {
        uk: customRule
      },
    },
  },
  runtimeConfig: {
    public: {
      gsiClientID: process.env.GSI_CLIENT_ID || '',
      apiBase: process.env.API_BASE || 'https://api.greenrute.com/',
    },
  },
  css: ['~/assets/css/fonts.css'],
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
        { name: 'theme-color', content: '#16a34a' },
        { 'http-equiv': 'content-security-policy', content: "object-src 'none'; base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; font-src 'self' data:; img-src 'self' data: images.unsplash.com gravatar.com lh3.googleusercontent.com; frame-src https://accounts.google.com/gsi/; connect-src 'self' api.greenrute.com https://accounts.google.com/gsi/" + (process.env.NODE_ENV !== 'production' ? " localhost:* 192.168.0.106:* ws: wss:;" : ";") },
      ],
    },
  },
})
