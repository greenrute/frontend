<script lang="ts" setup>
defineProps<{
  error: {
    url: string
    statusCode: number
    statusMessage: string
    message: string
    stack: string
  },
}>()

useThemeColor()
</script>

<template>
  <Html class="h-full scroll-smooth antialiased">
    <Body class="flex h-full flex-col bg-white dark:bg-zinc-900"/>
  </Html>

  <div class="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
    <div class="mx-auto max-w-max">
      <main class="sm:flex">
        <p class="text-4xl font-bold tracking-tight text-green-600 sm:text-5xl">{{ error.statusCode }}</p>
        <div class="sm:ml-6">
          <div class="sm:border-l sm:border-gray-200 dark:sm:border-zinc-700 sm:pl-6">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-50 sm:text-5xl">Сторінку не знайдено</h1>
            <p class="mt-1 text-base text-gray-500 dark:text-zinc-400">Перевірте URL-адресу в адресному рядку та повторіть спробу.</p>
          </div>
          <div class="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <MainButton color="green" to="/">На головну</MainButton>
            <MainButton to="/support" variant="outline">Служба підтримки</MainButton>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
