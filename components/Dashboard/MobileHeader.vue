<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { UserCircleIcon, Cog8ToothIcon, BellIcon, ArrowDownTrayIcon, MoonIcon, SunIcon, LifebuoyIcon, ArrowLeftEndOnRectangleIcon, LanguageIcon, ClockIcon, TableCellsIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import {
  PencilSquareIcon as PencilSquareOutlineIcon,
  InformationCircleIcon as InformationCircleOutlineIcon,
  UsersIcon as UsersOutlineIcon,
  Bars3Icon,
} from '@heroicons/vue/24/outline'
import {
  PencilSquareIcon as PencilSquareSolidIcon,
  InformationCircleIcon as InformationCircleSolidIcon,
  UsersIcon as UsersSolidIcon,
} from '@heroicons/vue/24/solid'

defineEmits<{
  (e: 'open'): void
}>()

const route = useRoute()
const localePath = useLocalePath()
const currentClass = useCurrentClass()
const currentLesson = useCurrentLesson()
const authentication = useAuthentication()
const user = useCookie<UserCookie>('user')
const currentDay = useState<string>('current-schedule-changes-day', () => 'today')

const switchTheme = () => {
  setTimeout(() => {
    switchColorMode()
  }, 120)
}
</script>

<template>
  <div class="sticky top-0 z-20 flex h-14 flex-shrink-0 border-b border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 lg:hidden">
    <button type="button" class="px-4 text-gray-500 dark:text-zinc-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-500 lg:hidden" @click="$emit('open')">
      <span class="sr-only">{{ $t('actions.open sidebar') }}</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <template v-if="currentClass && route.name?.toString()?.includes('c-hash')">
      <NuxtLink :to="localePath(`/c/${currentClass?.hash}`)" class="flex items-center gap-2 min-w-0">
        <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
        <h3 class="text-lg truncate">{{ currentClass?.name }}</h3>
      </NuxtLink>
    </template>
    <template v-else-if="currentClass && (route.name?.toString()?.includes('dashboard___') || route.name?.toString()?.includes('schedule-changes___'))">
      <div class="flex items-center gap-2 min-w-0">
        <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
        <h3 class="text-lg truncate">{{ currentClass?.name }}</h3>
      </div>
    </template>
    <div class="flex flex-1" />
    <template v-if="currentClass && route.name?.toString()?.includes('c-hash')">
      <div class="flex items-center">
        <NuxtLink :to="localePath(`/c/${currentClass?.hash}/people`)" class="p-2 -mr-0.5">
          <span class="sr-only">{{ $t('menu.people') }}</span>
          <UsersSolidIcon class="h-5.5 w-5.5 text-gray-800 dark:text-white" aria-hidden="true" v-if="route.name.toString().includes('c-hash-people___')" />
          <UsersOutlineIcon class="h-5.5 w-5.5 text-gray-600 dark:text-zinc-200" aria-hidden="true" v-else />
        </NuxtLink>
        <NuxtLink :to="localePath(`/c/${currentClass?.hash}/edit`)" class="p-2">
          <span class="sr-only">{{ $t('menu.edit class info') }}</span>
          <InformationCircleSolidIcon class="h-6 w-6 text-gray-800 dark:text-white" aria-hidden="true" v-if="route.name.toString().includes('c-hash-edit___')" />
          <InformationCircleOutlineIcon class="h-6 w-6 text-gray-600 dark:text-zinc-200" aria-hidden="true" v-else />
        </NuxtLink>
        <Menu as="div" class="relative text-left">
          <div>
            <MenuButton class="flex p-1 items-center rounded-full text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
              <span class="sr-only">{{ $t('menu.options') }}</span>
              <PencilSquareSolidIcon class="h-5.5 w-5.5 text-gray-800 dark:text-white -mt-0.5" aria-hidden="true" v-if="route.name.toString().includes('c-hash-schedule___') || route.name.toString().includes('c-hash-timetable___')" />
              <PencilSquareOutlineIcon class="h-5.5 w-5.5 text-gray-600 dark:text-zinc-200 -mt-0.5" aria-hidden="true" v-else />
            </MenuButton>
          </div>

          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink :to="localePath(`/c/${currentClass?.hash}/schedule`)" @click="close" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                  <TableCellsIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                  {{ $t('menu.edit schedule') }}
                </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink :to="localePath(`/c/${currentClass?.hash}/timetable`)" @click="close" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                  <ClockIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                  {{ $t('menu.edit timetable') }}
                </NuxtLink>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </template>
    <template v-else-if="currentClass && route.name?.toString()?.includes('dashboard___')">
      <div class="max-sm:hidden w-max flex justify-end shrink-0">
        <MainButton variant="outline" disabled class="!opacity-100 my-2 ml-2 px-0">{{ currentLesson.timeToEnd }}</MainButton>
      </div>
      <div class="sm:hidden flex fixed bottom-4 left-1/2 lg:left-[calc(50%+8rem)] -translate-x-1/2">
        <MainButton variant="solid" :color="currentLesson.active ? 'adaptive' : 'reverse'" disabled class="!opacity-100 !py-1.5 whitespace-nowrap shadow-md dark:shadow-zinc-800/30 transition-all duration-300 ease-out">{{ currentLesson.timeToEnd }}</MainButton>
      </div>
    </template>
    <template v-else-if="currentClass && route.name?.toString().includes('schedule-changes___')">
      <Listbox v-model="currentDay">
        <div class="relative my-auto">
          <ListboxButton class="relative w-full text-left rounded-full py-1 pl-3 pr-10 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 dark:placeholder-zinc-400 focus:border-green-500 dark:focus:border-green-600 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 text-base sm:text-sm">
            {{ $t('general.' + currentDay) }}
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-slot="{ active, selected }" v-for="day in ['today', 'tomorrow']" :key="day" :value="day">
                <li class="flex items-center relative select-none py-1 px-3 text-gray-800 dark:text-white" :class="[selected ? 'cursor-default font-medium' : 'cursor-pointer', active ? 'bg-gray-100 dark:bg-zinc-800' : '']">
                  <span class="block truncate">{{ $t('general.' + day) }}</span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
    <div class="flex pr-4 sm:pr-6 lg:pr-8 shrink-0">
      <div class="flex items-center">
        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton class="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900">
              <span class="sr-only">{{ $t('actions.open user menu') }}</span>
              <img class="h-8 w-8 rounded-full object-cover" :src="user?.picture ?? 'https://gravatar.com/avatar?d=mp'" alt="" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 dark:divide-zinc-700 rounded-md bg-white dark:bg-zinc-900 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none">
              <div class="py-1">
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" :to="localePath('/profile')" @click="close">
                  {{ $t('menu.view profile') }}
                  <UserCircleIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" :to="localePath('/settings')" @click="close">
                  {{ $t('menu.settings') }}
                  <Cog8ToothIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" :to="localePath('/notifications')" @click="close">
                  {{ $t('menu.notifications') }}
                  <BellIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="https://mobile.greenrute.com/" external target="_blank" @click="close">
                  {{ $t('menu.get app') }}
                  <ArrowDownTrayIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" :to="localePath('/settings') + '#language'" @click="close">
                  {{ $t('actions.change language') }}
                  <LanguageIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                <button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" @click="switchTheme">
                  {{ $t('actions.change theme') }}
                  <SunIcon class="h-4 w-4 hidden dark:block" aria-hidden="true" />
                  <MoonIcon class="h-4 w-4 block dark:hidden" aria-hidden="true" />
                </button>
                </MenuItem>
                <MenuItem v-slot="{ active, close }" as="div">
                <NuxtLink class="flex items-center justify-between px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" to="mailto:support@greenrute.com" target="_blank" :external="true" @click="close">
                  {{ $t('menu.support') }}
                  <LifebuoyIcon class="h-4 w-4" aria-hidden="true" />
                </NuxtLink>
                </MenuItem>
              </div>
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                <button class="flex items-center justify-between w-full text-left px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-zinc-200'" @click="authentication.logout">
                  {{ $t('logout', 1) }}
                  <ArrowLeftEndOnRectangleIcon class="h-4 w-4" aria-hidden="true" />
                </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
</template>
