<script setup lang="ts">
const colorMode = useColorMode()

const themeColor = computed(() => colorMode.value === 'dark' ? '#18181b' : '#ffffff')

useHead({
  meta: [
    { name: 'theme-color', content: themeColor },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#16a34a" />
    <NuxtPage />
  </NuxtLayout>
</template>
