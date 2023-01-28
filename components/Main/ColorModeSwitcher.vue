<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/outline/index'
</script>

<template>
  <MainButton @click="switchColorMode" class="px-2" color="zinc" variant="outline">
    <SunIcon class="h-5 w-5 hidden dark:block" aria-hidden="true" />
    <MoonIcon class="h-5 w-5 block dark:hidden" aria-hidden="true" />
  </MainButton>
</template>
