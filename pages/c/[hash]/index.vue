<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})
</script>

<template>
  {{ $route.params.hash }}
</template>
