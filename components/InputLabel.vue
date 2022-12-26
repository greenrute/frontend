<script setup lang="ts">
defineProps<{
  id: string,
}>()
</script>

<template>
  <label :for="id" class="mb-3 block text-sm font-medium text-gray-700">
    <slot/>
  </label>
</template>
