<script setup lang="ts">
useThemeColor()
</script>

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator color="#16a34a" :throttle="0" />
    <NuxtPage />
  </NuxtLayout>
</template>
