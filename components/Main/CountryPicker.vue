<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

defineProps<{
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const supportedCountries = [
  {
    name: 'not specified',
    value: '',
    icon: 'Empty',
  },
  {
    name: 'germany',
    value: 'germany',
    icon: 'German',
  },
]
</script>

<template>
  <div>
    <Menu as="div" class="relative block">
      <div>
        <MenuButton class="flex min-w-0 items-center w-full rounded-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-3 py-2 text-gray-900 dark:text-zinc-50 placeholder-gray-400 dark:placeholder-zinc-500 focus-visible:border-green-500 dark:focus-visible:border-green-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-green-500 dark:focus-visible:ring-green-600 text-sm">
          {{ $t('new class.country') }}
          <div class="flex min-w-0 items-center gap-1 ml-2 rounded ring-1 ring-inset ring-black/15 dark:ring-white/20 text-sm px-2">
            <component v-if="modelValue" :is="'Emoji' + supportedCountries.filter(c => c.value === modelValue)[0].icon" class="h-3.5 w-3.5 shrink-0" />
            <span class="block truncate">{{ modelValue === '' ? $t('supported countries.not specified') : $t('supported countries.' + modelValue) }}</span>
          </div>
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems class="absolute right-0 max-h-56 w-full min-w-56 overflow-auto mt-2 py-1 gap-2 origin-top-right rounded-md bg-white dark:bg-zinc-900 text-sm shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
          <MenuItem v-for="country in supportedCountries" v-slot="{ active }" :key="country.name" @click="$emit('update:modelValue', country.value)">
            <button type="button" class="flex w-full relative cursor-default select-none py-1.5 pl-3 pr-9 text-gray-800 dark:text-white" :class="active ? 'bg-gray-100 dark:bg-zinc-800' : ''">
              <div class="flex items-center">
                <component :is="'Emoji' + country.icon" class="h-4 w-4 shrink-0" />
                <span :class="['ml-3 truncate', country.value === modelValue && 'font-semibold']">
                  {{ $t('supported countries.' + country.name) }}
                </span>
              </div>

              <span v-if="country.value === modelValue" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-gray-800 dark:text-white' : 'text-green-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
