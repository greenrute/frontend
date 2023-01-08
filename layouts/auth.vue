<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { Bars3CenterLeftIcon, ClockIcon, XMarkIcon, CalendarIcon, BookOpenIcon } from '@heroicons/vue/24/outline/index'
import { ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid/index'
import type {Ref, Component} from 'vue'
import type {CookieRef} from '#app'

interface Info {
  title: string
  description: string
  icon: Component
}

const todayInfo: Info[] = [
  { title: '11 січня, середа', description: 'Сьогоднішня дата', icon: CalendarIcon },
  { title: '08:30-14:20', description: 'Час уроків', icon: BookOpenIcon },
  { title: '45 хв', description: 'До кінця уроку', icon: ClockIcon },
]

const sidebarOpen: Ref<boolean> = ref(false)

const now = useDateFormat(useNow(), 'HH:mm')

const user: CookieRef<UserCookie> = useCookie('user')
</script>

<template>
  <Html class="h-full scroll-smooth bg-dashboard-gradient bg-right-top bg-cover">
    <Body class="h-full font-manrope" />
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
                <img class="h-8 w-auto" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Your Company" />
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
                      <a v-for="team in teams" :key="team.name" :href="team.href" class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
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
    <div class="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:flex lg:w-72 lg:flex-col lg:border-l lg:border-gray-200">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex h-0 flex-1 flex-col overflow-y-auto py-6">
        <!-- User account dropdown -->
        <Menu as="div" class="relative inline-block px-3 text-left">
          <div>
            <MenuButton class="group w-full rounded-md px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-200/50 active:bg-gray-300/50">
              <span class="flex w-full items-center justify-between">
                <span class="flex min-w-0 items-center justify-between space-x-3">
                  <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" :src="user?.picture ?? 'https://gravatar.com/avatar?d=mp'" alt="" />
                  <span class="flex min-w-0 flex-1 flex-col">
                    <span class="truncate text-base font-display text-gray-900">{{ user?.name ?? '' }}</span>
                  </span>
                </span>
                <ChevronUpDownIcon class="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              </span>
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Мій профіль</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Налаштування</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Повідомлення</a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Завантажити програму</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" class="block px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Підтримка</a>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'">Вийти</button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <!-- Sidebar calendar -->
        <SideCalendar class="mt-5 px-3" />
        <!-- Navigation -->
        <nav class="mt-6 px-6">
          <h3 class="text-sm font-medium text-gray-500" id="desktop-teams-headline">Однокласники</h3>
          <div class="mt-3 flex gap-2 items-center">
            <div class="flex -space-x-2 overflow-hidden">
              <img class="h-10 w-10 rounded-full ring-2 ring-white inline-block" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img class="h-10 w-10 rounded-full ring-2 ring-white inline-block" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <img class="h-10 w-10 rounded-full ring-2 ring-white inline-block" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
              <img class="h-10 w-10 rounded-full ring-2 ring-white inline-block" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </div>
            <NuxtLink to="/classmates" class="text-gray-500 text-sm">Ще...</NuxtLink>
          </div>
        </nav>
        <!-- Current info -->
        <div class="mt-12 px-6 flex flex-col gap-3">
          <div class="block w-full select-none bg-green-600 font-extrabold rounded-2xl text-center text-white p-3.5">Уроків немає</div>
          <div class="block w-full select-none bg-gray-200/60 font-extrabold rounded-2xl text-center text-gray-900 p-3.5">{{ now }}</div>
        </div>
        <!-- Today info -->
        <div class="mt-12 px-6 flex flex-col gap-8">
          <div v-for="info in todayInfo" class="flex items-center gap-2">
            <component :is="info.icon" class="h-11 w-11 text-gray-300" />
            <div class="flex flex-col">
              <h5 class="text-base leading-5 font-extrabold font-display">{{ info.title }}</h5>
              <p class="text-xs font-medium text-gray-400">{{ info.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pr-72">
      <!-- Mobile search header -->
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:hidden">
        <button type="button" class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden" @click="sidebarOpen = true">
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
                <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </MenuButton>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="absolute right-0 z-10 mt-2 w-48 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">View profile</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Settings</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Notifications</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Get desktop app</a>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Support</a>
                    </MenuItem>
                  </div>
                  <div class="py-1">
                    <MenuItem v-slot="{ active }">
                      <a href="#" :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">Logout</a>
                    </MenuItem>
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

  <Notification />
</template>
