<script setup lang="ts">
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Bars3CenterLeftIcon, XMarkIcon, HomeIcon, Bars4Icon } from '@heroicons/vue/24/outline/index'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid/index'
import type { Component, Ref } from 'vue'
import type { CookieRef } from '#app'

const { t } = useI18n()

const sidebarOpen: Ref<boolean> = ref(false)
const now = useDateFormat(useNow(), 'HH:mm')
const user: CookieRef<UserCookie> = useCookie('user')

interface NavigationItem {
  name: string
  href: string
}

interface MenuItem extends NavigationItem {
  icon: Component
}

interface ClassItem extends NavigationItem {
  bgColorClass: string
}

const navigation: MenuItem[] = [
  { name: t('menu.schedule'), href: '/dashboard', icon: HomeIcon },
  { name: t('menu.homework'), href: '/homework', icon: Bars4Icon },
]
const classes: ClassItem[] = [
  { name: '10-А Фізика', href: '/c/1234567890hash', bgColorClass: 'bg-blue-500 dark:bg-blue-600' },
  { name: '10-А Алгебра', href: '/c/1234567891hash', bgColorClass: 'bg-green-500 dark:bg-green-600' },
  { name: '10-А Історія', href: '/c/1234567892hash', bgColorClass: 'bg-yellow-500 dark:bg-yellow-600' },
]
</script>

<template>
  <Html class="h-full scroll-smooth">
    <Body class="h-full font-manrope bg-white dark:bg-zinc-900" />
  </Html>

  <div class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=green&shade=500" alt="Your Company" />
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="px-2">
                  <div class="space-y-1">
                    <a v-for="item in navigation" :key="item.name" :href="item.href" :class="[item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50', 'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md']" :aria-current="item.current ? 'page' : undefined">
                      <component :is="item.icon" :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
                      {{ item.name }}
                    </a>
                  </div>
                  <div class="mt-8">
                    <h3 class="px-3 text-sm font-medium text-gray-500" id="mobile-teams-headline">Teams</h3>
                    <div class="mt-1 space-y-1" role="group" aria-labelledby="mobile-teams-headline">
                      <a v-for="team in classes" :key="team.name" :href="team.href" class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        <span :class="[team.bgColorClass, 'w-2.5 h-2.5 mr-4 rounded-full']" aria-hidden="true" />
                        <span class="truncate">{{ team.name }}</span>
                      </a>
                    </div>
                  </div>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 dark:lg:border-zinc-600 lg:bg-gray-100 dark:lg:bg-zinc-800 lg:pt-6 lg:pb-5">
      <div class="flex flex-shrink-0 items-center px-6">
        <Logo class="h-5 w-auto" />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        <!-- User account dropdown -->
        <SideAccountDropdown class="px-3" />
        <!-- Sidebar Search -->
        <SideSearch class="mt-5 px-3" />
        <!-- Navigation -->
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" custom v-slot="{ href, navigate, isActive }">
              <a :href="href" @click="navigate" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="isActive ? 'bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-zinc-50' : 'text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-zinc-50 hover:bg-gray-50 dark:hover:bg-zinc-900'">
                <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6" :class="isActive ? 'text-gray-500 dark:text-zinc-300' : 'text-gray-400 dark:text-zinc-400 group-hover:text-gray-500 dark:group-hover:text-zinc-300'" aria-hidden="true" />
                {{ item.name }}
              </a>
            </NuxtLink>
          </div>
          <div class="mt-8">
            <!-- Secondary navigation -->
            <h3 class="px-3 text-sm font-medium text-gray-500 dark:text-zinc-400" id="desktop-classes-headline">{{ $t('menu.my classes') }}</h3>
            <div class="mt-1 space-y-1" role="group" aria-labelledby="desktop-classes-headline">
              <NuxtLink v-for="team in classes" :key="team.name" :to="team.href" custom v-slot="{ href, navigate, isActive }">
                <a :href="href" @click="navigate" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white">
                  <span class="w-2.5 h-2.5 mr-4 rounded-full" :class="team.bgColorClass" aria-hidden="true" />
                  <span class="truncate">{{ team.name }}</span>
                </a>
              </NuxtLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <!-- Search header -->
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 lg:hidden" @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
          <div class="flex flex-1">
            <form class="flex w-full md:ml-0" action="#" method="GET">
              <label for="search-field" class="sr-only">Search</label>
              <div class="relative w-full text-gray-400 focus-within:text-gray-600">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                  <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input id="search-field" name="search-field" class="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm" placeholder="Search" type="search" />
              </div>
            </form>
          </div>
          <div class="flex items-center">
            <!-- Profile dropdown -->
            <Menu as="div" class="relative ml-3">
              <div>
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">View profile</a></MenuItem>
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Settings</a></MenuItem>
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Notifications</a></MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Get desktop app</a></MenuItem>
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Get desktop app</a></MenuItem>
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Support</a></MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }"><a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Logout</a></MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
      <main class="flex-1">
        <slot />
      </main>
    </div>
  </div>
</template>
