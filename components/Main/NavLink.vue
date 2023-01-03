<script lang="ts" setup>
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink :to="to" class="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900">
    <slot />
  </NuxtLink>
</template>
