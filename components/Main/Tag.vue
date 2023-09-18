<script setup lang="ts">
defineProps<{
  id?: string
  hint?: string
}>()
</script>

<template>
  <label :for="id" class="mb-3 flex items-center justify-between flex-wrap gap-1 text-sm font-medium text-gray-700 dark:text-zinc-300">
    <slot/>
    <span v-if="hint" class="inline-flex items-center rounded-full bg-gray-50 dark:bg-zinc-800 px-1.5 py-0.5 text-xs font-medium text-gray-600 dark:text-zinc-200 ring-1 ring-inset ring-gray-500/10 dark:ring-zinc-400/20">{{ hint }}</span>
  </label>
</template>
