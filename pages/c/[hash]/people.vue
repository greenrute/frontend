<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, UserMinusIcon, UsersIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useCurrentClass()
const localePath = useLocalePath()
const user = useCookie<UserCookie>('user')
const isAdmin = computed(() => !!currentClass.value?.people?.filter(p => p.id === user.value.id && (p.role === 'owner' || p.role === 'admin'))?.length)
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.people') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="px-4 py-8 sm:pb-16 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <div class="flex items-center justify-between gap-2 mb-2">
      <h1 class="text-2xl font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('people.students') }}</h1>
      <PeopleAddPerson />
    </div>

    <ul role="list" class="divide-y divide-gray-100 dark:divide-zinc-700 bg-white/70 dark:bg-zinc-800/70 shadow-sm ring-1 ring-gray-900/5 dark:ring-zinc-700 rounded-xl">
      <li v-for="person in currentClass?.people" :key="person.email" class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-zinc-700" :src="person.picture" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-zinc-50">
            <div>
              <span class="absolute inset-x-0 -top-px bottom-0" />
              {{ person.name }}
            </div>
            </p>
            <p class="mt-1 flex text-xs leading-5 text-gray-500 dark:text-zinc-400">
              <a :href="`mailto:${person.email}`" class="relative truncate hover:underline">{{ person.email }}</a>
            </p>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-x-4">
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900 dark:text-zinc-50">{{ $t('people.roles.' + person.role) }}</p>
          </div>
          <Menu v-if="isAdmin" as="div" class="relative text-left">
            <div class="-ml-0.5">
              <MenuButton class="flex p-1 items-center rounded-full text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                <span class="sr-only">{{ $t('menu.options') }}</span>
                <EllipsisVerticalIcon class="h-5 w-5 text-gray-400 dark:text-zinc-400" aria-hidden="true" />
              </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-zinc-700 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none">
                <div class="py-1">
                  <MenuItem v-slot="{ active }">
                    <NuxtLink v-if="isAdmin" :to="localePath(`/c/${currentClass?.hash}/timetable`)" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                      <UsersIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                      {{ $t('people.actions.change role') }}
                    </NuxtLink>
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <NuxtLink v-if="isAdmin" :to="localePath(`/c/${currentClass?.hash}/timetable`)" class="group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-50' : 'text-gray-800 dark:text-zinc-300'">
                      <UserMinusIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-200" aria-hidden="true" />
                      {{ $t('people.actions.delete member') }}
                    </NuxtLink>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </li>
    </ul>
  </div>
</template>
