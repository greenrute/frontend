<script lang="ts" setup>
import {PopoverButton} from '@headlessui/vue'
import {NuxtLink} from '#components'

defineProps<{
  to: string
}>()
</script>

<template>
  <PopoverButton :as="NuxtLink" :to="to" class="block w-full p-2">
    <slot/>
  </PopoverButton>
</template>
