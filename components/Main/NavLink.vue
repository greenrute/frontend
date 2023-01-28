<script lang="ts" setup>
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="inline-block rounded-lg py-1 px-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 hover:text-zinc-900 dark:hover:text-zinc-100">
    <slot />
  </NuxtLink>
</template>
