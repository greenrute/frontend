<script lang="ts" setup>
import {Popover, PopoverButton, PopoverOverlay, PopoverPanel, TransitionChild, TransitionRoot} from '@headlessui/vue'
import NuxtLink from '#app/components/nuxt-link'
import 'focus-visible'
</script>

<template>
  <Popover v-slot="{ open }">
    <PopoverButton class="relative z-10 flex h-8 w-8 items-center justify-center [&:not(:focus-visible)]:focus:outline-none" aria-label="Toggle Navigation">
      <IconBurger :open="open" />
    </PopoverButton>
    <TransitionRoot>
      <TransitionChild
        as="template"
        enter="duration-150 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-150 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <PopoverOverlay class="fixed inset-0 bg-slate-300/50" />
      </TransitionChild>
      <TransitionChild
        as="template"
        enter="duration-150 ease-out"
        enter-from="opacity-0 scale-95"
        enter-to="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100 scale-100"
        leave-to="opacity-0 scale-95"
      >
        <PopoverPanel as="div" class="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5">
          <PopoverButton :as="NuxtLink" to="#features" class="block w-full p-2">Функції</PopoverButton>
          <PopoverButton :as="NuxtLink" to="#testimonials" class="block w-full p-2">Відгуки</PopoverButton>
          <PopoverButton :as="NuxtLink" to="#pricing" class="block w-full p-2">Ціни</PopoverButton>
          <hr class="m-2 border-slate-300/40" />
          <PopoverButton :as="NuxtLink" to="/login" class="block w-full p-2">Увійти</PopoverButton>
        </PopoverPanel>
      </TransitionChild>
    </TransitionRoot>
  </Popover>
</template>
