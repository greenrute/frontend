<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})
</script>

<template>
  <Head>
    <Title>{{ $t('menu.settings') }} - GreenRute</Title>
  </Head>

  <div class="px-4 py-8 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <h1 class="text-2xl mb-4 font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('menu.settings') }}</h1>
    <div>
      <h4 class="text-xl font-overpass font-medium mb-2">{{ $t('settings.language') }}</h4>
      <div class="border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 rounded-xl p-3">
        <SettingsLanguageSelect />
      </div>
    </div>
  </div>
</template>
