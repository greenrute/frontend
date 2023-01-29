<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronUpDownIcon, MoonIcon, SunIcon, ArrowLeftOnRectangleIcon, LanguageIcon } from '@heroicons/vue/20/solid/index'

const user = useCookie<UserCookie>('user')

const switchTheme = () => {
  setTimeout(() => {
    switchColorMode()
  }, 75)
}
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="group w-full rounded-md bg-gray-100 dark:bg-zinc-800 px-3.5 py-2 text-left text-sm font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-200 dark:hover:bg-zinc-900/50 active:bg-gray-300/60 dark:active:bg-zinc-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 dark:focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 dark:focus-visible:ring-offset-zinc-800">
        <span class="flex w-full items-center justify-between">
          <span class="flex min-w-0 items-center justify-between space-x-3">
            <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700" :src="user?.picture ?? 'https://gravatar.com/avatar?d=mp'" alt="" />
            <span class="flex min-w-0 flex-1 flex-col">
              <span class="truncate text-sm font-medium text-gray-900 dark:text-zinc-50">{{ user?.name ?? '' }}</span>
              <span class="truncate text-sm text-gray-500 dark:text-zinc-400">{{ user?.email ?? '' }}</span>
            </span>
          </span>
          <ChevronUpDownIcon class="h-5 w-5 flex-shrink-0 text-gray-400 dark:text-zinc-400 group-hover:text-gray-500 dark:group-hover:text-zinc-300" aria-hidden="true" />
        </span>
      </MenuButton>
    </div>
    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 dark:divide-zinc-700 rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-slot="{ active, close }"><NuxtLink class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/profile" @click="close">{{ $t('menu.view profile') }}</NuxtLink></MenuItem>
          <MenuItem v-slot="{ active, close }"><NuxtLink class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/settings" @click="close">{{ $t('menu.settings') }}</NuxtLink></MenuItem>
          <MenuItem v-slot="{ active, close }"><NuxtLink class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/notifications" @click="close">{{ $t('menu.notifications') }}</NuxtLink></MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active, close }"><NuxtLink class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="https://mobile.greenrute.com/" external target="_blank" @click="close">{{ $t('menu.get app') }}</NuxtLink></MenuItem>
          <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/settings#language" @click="close">
            {{ $t('actions.change language') }}
            <LanguageIcon class="h-4 w-4" aria-hidden="true" />
          </NuxtLink></MenuItem>
          <MenuItem v-slot="{ active }"><button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" @click="switchTheme">
            {{ $t('actions.change theme') }}
            <SunIcon class="h-4 w-4 hidden dark:block" aria-hidden="true" />
            <MoonIcon class="h-4 w-4 block dark:hidden" aria-hidden="true" />
          </button></MenuItem>
          <MenuItem v-slot="{ active, close }"><NuxtLink class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/support" @click="close">{{ $t('menu.support') }}</NuxtLink></MenuItem>
        </div>
        <div class="py-1">
          <MenuItem v-slot="{ active }"><button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" @click="logout">
            {{ $t('logout', 1) }}
            <ArrowLeftOnRectangleIcon class="h-4 w-4" aria-hidden="true" />
          </button></MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
