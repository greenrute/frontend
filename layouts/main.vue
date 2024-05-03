<script setup lang="ts">
const route = useRoute()
const { t, locale } = useI18n()
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useServerSeoMeta({
  description: t('meta description'),
  ogDescription: t('meta description'),
  ogImage: `https://greenrute.com/_vercel/image?url=/img/screenshots/dark/${locale.value}/dashboard.png&w=768&q=100`,
})

import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <Html class="h-full scroll-smooth antialiased" :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir" prefix="og: https://ogp.me/ns#">
    <Head>
      <template v-for="link in head.link" :key="link.id">
        <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
      </template>
      <template v-for="meta in head.meta" :key="meta.id">
        <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
      </template>
    </Head>
    <Body class="flex h-full flex-col bg-white dark:bg-zinc-900" />
  </Html>

  <slot />

  <SpeedInsights />
  <Notification />
  <Prompt />
</template>
