<script lang="ts" setup>
import { Popover, PopoverButton, PopoverOverlay, PopoverPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { MoonIcon, SunIcon, ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline/index'
import { NuxtLink } from '#components'
import 'focus-visible'

const localePath = useLocalePath()
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
        <PopoverOverlay class="fixed inset-0 bg-slate-300/50 dark:bg-zinc-800/50" />
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
        <PopoverPanel as="div" class="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white dark:bg-zinc-900 p-4 text-lg tracking-tight text-zinc-900 dark:text-zinc-50 shadow-xl ring-1 ring-zinc-900/5 dark:ring-zinc-700">
          <PopoverButton :as="NuxtLink" to="#features" class="block w-full p-2">{{ $t('menu features') }}</PopoverButton>
          <PopoverButton :as="NuxtLink" to="#testimonials" class="block w-full p-2">{{ $t('menu testimonials') }}</PopoverButton>
          <PopoverButton :as="NuxtLink" to="#pricing" class="block w-full p-2">{{ $t('menu pricing') }}</PopoverButton>
          <hr class="m-2 border-zinc-300/40 dark:border-zinc-700" />
          <PopoverButton as="button" @click.prevent="switchColorMode" class="flex items-center justify-between w-full text-left p-2 pr-3">
            {{ $t('actions.change theme') }}
            <SunIcon class="h-5 w-5 hidden dark:block" aria-hidden="true" />
            <MoonIcon class="h-5 w-5 block dark:hidden" aria-hidden="true" />
          </PopoverButton>
          <hr class="m-2 border-zinc-300/40 dark:border-zinc-700" />
          <PopoverButton :as="NuxtLink" :to="localePath('/login')" class="flex items-center justify-between w-full p-2 pr-3">
            {{ $t('login', 1) }}
            <ArrowRightOnRectangleIcon class="h-5 w-5" aria-hidden="true" />
          </PopoverButton>
        </PopoverPanel>
      </TransitionChild>
    </TransitionRoot>
  </Popover>
</template>
