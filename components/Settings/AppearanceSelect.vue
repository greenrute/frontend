<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon, ComputerDesktopIcon, SunIcon, MoonIcon } from '@heroicons/vue/20/solid'
import type { Component } from 'vue'
const colorMode = useColorMode()

const currentMode = ref<{
  icon: Component
  key: string
}>({
  icon: ComputerDesktopIcon,
  key: 'system',
})

const updateColorMode = () => {
  currentMode.value = {
    icon: modes[colorMode.preference],
    key: colorMode.preference,
  }
}

const modes: Record<string, Component> = {
  system: ComputerDesktopIcon,
  light: SunIcon,
  dark: MoonIcon,
}

onMounted(() => {
  updateColorMode()
})

watch(colorMode, () => {
  updateColorMode()
})
</script>

<template>
  <Listbox as="div" v-model="$colorMode.preference">
    <ListboxLabel class="block text-sm font-medium text-gray-700 dark:text-zinc-300">{{ $t('actions.change theme') }}</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 dark:focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 sm:text-sm">
      <span class="flex items-center">
        <component :is="currentMode.icon" class="h-4 w-4 flex-shrink-0" />
        <span class="ml-2 block truncate">{{ $t(`color modes.${currentMode.key}`) }}</span>
      </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none sm:text-sm">
          <!--suppress JSValidateTypes -->
          <ListboxOption as="template" v-for="(mode, key) in modes" :key="key" :value="key" v-slot="{ active, selected }">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="active ? 'text-black dark:text-white bg-zinc-200 dark:bg-zinc-900' : 'text-gray-900 dark:text-zinc-50'">
              <div class="flex items-center">
                <component :is="mode" class="h-4 w-4 flex-shrink-0" />
                <span class="ml-2 block truncate" :class="selected ? 'font-semibold' : 'font-normal'">{{ $t(`color modes.${key}`) }}</span>
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
