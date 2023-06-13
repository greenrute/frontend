<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { CheckIcon } from '@heroicons/vue/24/outline'

defineProps<{
  id: string
  label?: string
  invalid?: string
  modelValue: string
  colors: string[]
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
    <Menu as="div" class="relative inline-block">
      <div>
        <MenuButton class="flex items-center w-full rounded-md dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-3 py-2 text-gray-900 dark:text-zinc-50 placeholder-gray-400 dark:placeholder-zinc-500 focus-visible:border-green-500 dark:focus-visible:border-green-600 focus:outline-none focus-visible:ring-1 focus-visible:ring-green-500 dark:focus-visible:ring-green-600 text-sm">
          {{ label }}
          <div class="ml-2 h-5 w-5 rounded ring-1 ring-inset ring-black/30 dark:ring-white/20" :style="{ backgroundColor: modelValue }" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <MenuItems class="absolute w-max mt-2 grid grid-cols-4 p-2 gap-2 origin-top-right rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
          <MenuItem v-for="color in colors" v-slot="{ active }" :key="color" @click="$emit('update:modelValue', color)">
            <button type="button" class="flex items-center justify-center rounded-md w-8 h-8 text-sm ring-1 ring-inset ring-black/30 dark:ring-white/20" :class="active ? 'bg-violet-500 text-white' : 'text-gray-900'" :style="{ backgroundColor: color }">
              <CheckIcon v-if="color === modelValue" class="w-6 h-6" :class="contrastColorIsBlack(color) ? 'text-black/80' : 'text-white/80'" />
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>
