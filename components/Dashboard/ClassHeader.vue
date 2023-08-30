<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ClockIcon, TableCellsIcon } from '@heroicons/vue/20/solid'
import {
  InformationCircleIcon as InformationCircleOutlineIcon,
  PencilSquareIcon as PencilSquareOutlineIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/24/outline'
import {
  InformationCircleIcon as InformationCircleSolidIcon,
  PencilSquareIcon as PencilSquareSolidIcon,
} from '@heroicons/vue/24/solid'

const route = useRoute()
const localePath = useLocalePath()
const currentClass = useCurrentClass()
</script>

<template>
  <div class="hidden lg:flex relative border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-between px-8">
    <NuxtLink :to="localePath(`/c/${currentClass.hash}`)" class="mt-4 flex items-center gap-2 sm:mt-0 max-w-[8rem]">
      <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
      <h3 class="text-lg truncate">{{ currentClass.name }}</h3>
    </NuxtLink>

    <nav class="absolute left-1/2 -translate-x-1/2">
      <ul class="flex items-center gap-4">
        <li>
          <NuxtLink :to="localePath(`/c/${currentClass.hash}`)" :class="route.name === 'c-hash' ? 'font-bold' : ''">{{ $t('menu.schedule') }}</NuxtLink>
        </li>
      </ul>
    </nav>

    <div class="flex items-center gap-1.5">
      <NuxtLink :to="localePath(`/c/${currentClass.hash}/edit`)" class="text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white rounded-full p-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
        <span class="sr-only">{{ $t('menu.edit class info') }}</span>
        <InformationCircleSolidIcon class="h-6 w-6 text-gray-800 dark:text-white" aria-hidden="true" v-if="route.name === 'c-hash-edit'" />
        <InformationCircleOutlineIcon class="h-6 w-6" aria-hidden="true" v-else />
      </NuxtLink>
      <Menu as="div" class="relative text-left">
        <div>
          <MenuButton class="flex p-1 items-center rounded-full text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
            <span class="sr-only">{{ $t('menu.options') }}</span>
            <PencilSquareSolidIcon class="h-5.5 w-5.5 -mt-0.5" aria-hidden="true" v-if="route.name === 'c-hash-schedule' || route.name === 'c-hash-timetable'" />
            <PencilSquareOutlineIcon class="h-5.5 w-5.5 -mt-0.5" aria-hidden="true" v-else />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <NuxtLink :to="localePath(`/c/${currentClass.hash}/schedule`)" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                  <TableCellsIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                  {{ $t('menu.edit schedule') }}
                </NuxtLink>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <NuxtLink :to="localePath(`/c/${currentClass.hash}/timetable`)" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                  <ClockIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                  {{ $t('menu.edit timetable') }}
                </NuxtLink>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
      <!-- <Menu as="div" class="relative text-left">
        <div class="-ml-0.5">
          <MenuButton class="flex p-1 items-center rounded-full text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
            <span class="sr-only">{{ $t('menu.options') }}</span>
            <EllipsisVerticalIcon class="h-5.5 w-5.5" aria-hidden="true" />
          </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none">
            <div class="py-1"></div>
          </MenuItems>
        </transition>
      </Menu> -->
    </div>
  </div>
</template>
