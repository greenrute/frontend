// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/robots',
    "@nuxtjs/sitemap"
  ],

  runtimeConfig: {
    public: {
      gsiClientID: '',
      apiBase: 'https://api.greenrute.com/',
    },
  },

  site: {
    url: 'https://greenrute.com',
  },

  sitemap: {
    urls: () => ([
      '/uk',
      '/uk/login',
      '/uk/register',
      '/uk/privacy-policy',
      '/en',
      '/en/login',
      '/en/register',
      '/en/privacy-policy',
      '/de',
      '/de/login',
      '/de/register',
      '/de/privacy-policy',
    ]),
    excludeAppSources: true,
  },

  colorMode: {
    classSuffix: '',
  },

  i18n: {
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        icon: 'English',
        files: ['./en/general.yaml', './en/homepage.yaml'],
      },
      {
        code: 'de',
        language: 'de-DE',
        name: 'Deutsch',
        icon: 'German',
        files: ['./de/general.yaml', './de/homepage.yaml'],
      },
      {
        code: 'uk',
        language: 'uk-UA',
        name: 'Українська',
        icon: 'Ukrainian',
        files: ['./uk/general.yaml', './uk/homepage.yaml'],
      },
    ],
    defaultLocale: 'uk',
    strategy: 'prefix_and_default',
    detectBrowserLanguage: {
      redirectOn: 'no prefix',
    },
  },

  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/animations.css',
    '~/assets/css/datepicker.css',
  ],

  postcss: {
    plugins: {
      'postcss-focus-visible': {
        replaceWith: '[data-focus-visible-added]',
      },
      autoprefixer: {},
    }
  },

  build: {
    transpile: [
      '@heroicons/vue',
      'vue-slicksort',
      'canvas-confetti',
      'focus-visible',
      '@vuepic/vue-datepicker',
      'object-hash',
      'tailwindcss',
    ],
  },

  experimental: {
    payloadExtraction: false,
  },

  app: {
    head: {
      link: [
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        // @ts-ignore
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#16a34a' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#ffffff' },
        process.env.NODE_ENV !== 'production' ? {} : { 'http-equiv': 'content-security-policy', content: "object-src 'none'; base-uri 'self'; default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://families.google.com https://accounts.google.com/gsi/client; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; font-src 'self' data:; img-src 'self' data: images.unsplash.com gravatar.com lh3.googleusercontent.com profile-pictures.greenrute.com; frame-src https://accounts.google.com/gsi/; connect-src 'self' api.greenrute.com vitals.vercel-insights.com vitals.vercel-analytics.com https://accounts.google.com/gsi/;" },
      ],
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
})