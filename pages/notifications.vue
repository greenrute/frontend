<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})
</script>

<template>
  <div class="flex items-center justify-center h-screen font-display text-4xl uppercase text-center leading-normal">
    <div>
      🏗️{{ ' ' }}<span class="opacity-60">{{ $t('general.wip') }}</span>
    </div>
  </div>
</template>
