<script setup lang="ts">
useThemeColor()

const date = new Date()
date.setMonth(date.getMonth() + 1)

const warningCookie = useCookie<boolean>('beta-warning', {
  sameSite: true,
  expires: date,
})

import { provideUseId } from '@headlessui/vue'

provideUseId(() => useId())

import { isIOS } from '@vueuse/core'
const event = useRequestEvent()

if (event?.node.req.headers['user-agent']?.includes('iPhone') || isIOS) {
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
    ],
  })
}

import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div v-if="!warningCookie" class="flex gap-1 fixed inset-x-0 top-0 p-3 z-50 text-center font-semibold border-b bg-yellow-50 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-900 text-yellow-800 dark:text-yellow-50">
    <span class="w-full">⚠️&nbsp;{{ $t('general.warning') }}</span>
    <button @click="warningCookie = true">❎</button>
  </div>
  <NuxtLoadingIndicator color="#16a34a" :throttle="0" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ClientOnly>
    <SpeedInsights />
  </ClientOnly>
</template>
