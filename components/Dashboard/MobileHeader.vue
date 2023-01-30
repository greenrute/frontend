<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserCircleIcon, Cog8ToothIcon, BellIcon, ArrowDownTrayIcon, MoonIcon, SunIcon, LifebuoyIcon, ArrowLeftOnRectangleIcon, LanguageIcon } from '@heroicons/vue/20/solid/index'
import { Bars3Icon } from '@heroicons/vue/24/outline/index'

defineEmits<{
  (e: 'open'): void
}>()

const user = useCookie<UserCookie>('user')

const switchTheme = () => {
  setTimeout(() => {
    switchColorMode()
  }, 120)
}
</script>

<template>
  <div class="sticky top-0 z-10 flex h-14 flex-shrink-0 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 lg:hidden">
    <button type="button" class="px-4 text-gray-500 dark:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500 lg:hidden" @click="$emit('open')">
      <span class="sr-only">{{ $t('actions.open sidebar') }}</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1" />
      <div class="flex items-center">
        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900">
              <span class="sr-only">{{ $t('actions.open user menu') }}</span>
              <img class="h-8 w-8 rounded-full" :src="user?.picture ?? 'https://gravatar.com/avatar?d=mp'" alt="" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-52 origin-top-right divide-y divide-gray-200 dark:divide-zinc-700 rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/profile" @click="close">
                  {{ $t('menu.view profile') }}
                  <UserCircleIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/settings" @click="close">
                  {{ $t('menu.settings') }}
                  <Cog8ToothIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/notifications" @click="close">
                  {{ $t('menu.notifications') }}
                  <BellIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="https://mobile.greenrute.com/" external target="_blank" @click="close">
                  {{ $t('menu.get app') }}
                  <ArrowDownTrayIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/settings#language" @click="close">
                  {{ $t('actions.change language') }}
                  <LanguageIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
                <MenuItem v-slot="{ active }"><button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" @click="switchTheme">
                  {{ $t('actions.change theme') }}
                  <SunIcon class="h-4 w-4 hidden dark:block" aria-hidden="true" />
                  <MoonIcon class="h-4 w-4 block dark:hidden" aria-hidden="true" />
                </button></MenuItem>
                <MenuItem v-slot="{ active, close }"><NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="/support" @click="close">
                  {{ $t('menu.support') }}
                  <LifebuoyIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink></MenuItem>
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
      </div>
    </div>
  </div>
</template>
