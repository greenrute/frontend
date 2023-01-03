<script setup lang="ts">
definePageMeta({
  layout: 'app',
  middleware: 'auth',
})
</script>

<template>
  <Head>
    <Title>Розклад - GreenRute</Title>
  </Head>

  <div class="min-h-full">
    <AppHeader />

    <div class="py-10">
      <header>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-gray-900">Розклад</h1>
        </div>
      </header>
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <!-- Replace with your content -->
          <div class="px-4 py-8 sm:px-0">
            <div class="h-96 rounded-lg border-4 border-dashed border-gray-200" />
          </div>
          <!-- /End replace -->
        </div>
      </main>
    </div>
  </div>
</template>
