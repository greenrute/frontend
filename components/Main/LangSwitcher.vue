<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { LanguageIcon } from '@heroicons/vue/20/solid'
import { MainButton } from '#components'

const { locale, locales, setLocale } = useI18n()

await preloadComponents(locales.value.map(l => 'Emoji' + (typeof l !== 'string' && l.icon)))
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton :as="MainButton" class="px-2" color="zinc" variant="outline">
      <span class="sr-only">{{ $t('actions.change language') }}</span>
      <LanguageIcon aria-hidden="true" class="h-5 w-5" />
    </MenuButton>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-for="l in locales" :key="l.code" v-slot="{ active, close }" :disabled="l.code === locale">
            <button @click="setLocale(l.code);close" class="flex items-center w-full gap-1.5 px-4 py-2 text-sm" :class="[
              active ? 'bg-gray-100 dark:bg-zinc-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200',
              l.code === locale && 'opacity-50 pointer-events-none',
            ]">
              <component :is="'Emoji' + l.icon" class="h-4 w-4 shrink-0" />
              {{ l.name }}
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
