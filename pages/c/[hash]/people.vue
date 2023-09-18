<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon, UserMinusIcon, UsersIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { t, locale } = useI18n()

const currentClass = useCurrentClass()
const localePath = useLocalePath()
const user = useUser()

const deletePerson = async (id: number) => {
  if (!confirm(t('people.actions.delete member full', {
    name: currentClass.value?.people?.filter(p => p.id === id)?.[0]?.name as string,
  }))) return
  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}/users/remove`, {
    method: 'PATCH',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value,
    },
    body: {
      id,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .then(r => {
      pushNotification({
        status: 'success',
        message: r.message,
      })
    })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
    })
}
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.people') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="px-4 pt-8 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <div class="flex items-center justify-between gap-2 mb-2">
      <h1 class="text-2xl font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('people.students') }}</h1>
      <PeopleAddPerson v-if="user.isOwner" />
    </div>

    <div class="overflow-hidden pb-8 sm:pb-16 p-0.25">
      <ul role="list" class="flex flex-col divide-y divide-gray-100 dark:divide-zinc-700 bg-white/70 dark:bg-zinc-800/70 shadow-sm ring-1 ring-gray-900/5 dark:ring-zinc-700 rounded-xl">
        <transition-group enter-from-class="!translate-x-full scale-y-0 !h-0" leave-to-class="!-translate-x-full scale-y-0 !h-0">
          <li v-for="person in currentClass?.people" :key="person.email" class="h-[5.5rem] transition-all ease-out duration-300">
            <div class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6">
              <div class="flex min-w-0 gap-x-4">
                <img class="h-12 w-12 flex-none rounded-full object-cover bg-gray-50 dark:bg-zinc-700" :src="person.picture" alt="" />
                <div class="min-w-0 flex-auto">
                  <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-zinc-50">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ person.name }}
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
                <Menu v-if="user.isOwner && person.id !== user.id" as="div" class="relative text-left">
                  <div class="-ml-0.5">
                    <MenuButton class="flex p-1 items-center rounded-full text-gray-600 hover:text-gray-800 dark:text-zinc-200 dark:hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500">
                      <span class="sr-only">{{ $t('menu.options') }}</span>
                      <EllipsisVerticalIcon class="h-5 w-5 text-gray-400 dark:text-zinc-400" aria-hidden="true" />
                    </MenuButton>
                  </div>

                  <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                    <MenuItems class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-zinc-700 rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none">
                      <div class="py-1">
                        <!-- <MenuItem v-slot="{ active }">
                        <button v-if="isOwner" class="w-full group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-gray-100 dark:bg-zinc-900 text-gray-900 dark:text-zinc-50' : 'text-gray-800 dark:text-zinc-300'">
                          <UsersIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-600 dark:group-hover:text-zinc-400" aria-hidden="true" />
                          {{ $t('people.actions.change role') }}
                        </button>
                      </MenuItem> -->
                        <MenuItem v-slot="{ active }">
                        <button v-if="user.isOwner" @click="deletePerson(person.id)" class="w-full group flex items-center px-4 py-2 text-sm" :class="active ? 'bg-red-500 dark:bg-red-600 text-gray-50 dark:text-white' : 'text-gray-800 dark:text-zinc-300'">
                          <UserMinusIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-50 dark:group-hover:text-white" aria-hidden="true" />
                          {{ $t('people.actions.delete member') }}
                        </button>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </transition>
                </Menu>
                <div class="h-7 w-7" v-else-if="user.isOwner" />
                <div v-else />
              </div>
            </div>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>
