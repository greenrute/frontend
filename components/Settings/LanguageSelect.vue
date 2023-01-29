<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid/index'
const { locale, locales, setLocale } = useI18n()

await preloadComponents(locales.value.map(l => 'Emoji' + (typeof l !== 'string' && l.icon)))

const selected = ref([...locales.value].filter(l => typeof l !== 'string' && l.code === locale.value)[0])
</script>

<template>
  <Listbox as="div" v-model="selected" @update:model-value="setLocale($event.code)">
    <ListboxLabel class="block text-sm font-medium text-gray-700 dark:text-zinc-300">{{ $t('actions.change language') }}</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 dark:focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-zinc-200 dark:focus:ring-zinc-800 sm:text-sm">
        <span class="flex items-center">
          <component :is="'Emoji' + selected.icon" class="h-4 w-4 flex-shrink-0" />
          <span class="ml-2 block truncate">{{ selected.name }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="l in locales" :key="l.id" :value="l" v-slot="{ active, selected }">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="active ? 'text-black dark:text-white bg-zinc-200 dark:bg-zinc-900' : 'text-gray-900 dark:text-zinc-50'">
              <div class="flex items-center">
                <component :is="'Emoji' + l.icon" class="h-4 w-4 flex-shrink-0" />
                <span class="ml-2 block truncate" :class="selected ? 'font-semibold' : 'font-normal'">{{ l.name }}</span>
              </div>

              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="active ? 'text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400'">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
