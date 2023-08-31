<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { UserPlusIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useCurrentClass()

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Co-Founder / CTO',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    href: '#',
    lastSeen: null,
  },
]
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.people') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="px-4 py-8 sm:pb-16 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <div class="flex items-center justify-between gap-2 mb-2">
      <h1 class="text-2xl font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('people.students') }}</h1>
      <button class="p-2 text-gray-900 dark:text-zinc-50 bg-white/70 dark:bg-zinc-800/70 ring-1 ring-gray-900/5 dark:ring-zinc-700 rounded-full">
        <UserPlusIcon class="w-5.5 h-5.5" aria-hidden="true" />
      </button>
      <MainButton variant="outline" color="zinc" class="!px-0">
        <UserPlusIcon class="w-5.5 h-5.5" aria-hidden="true" />
      </MainButton>
    </div>

    <ul role="list" class="divide-y divide-gray-100 dark:divide-zinc-700 overflow-hidden bg-white/70 dark:bg-zinc-800/70 shadow-sm ring-1 ring-gray-900/5 dark:ring-zinc-700 sm:rounded-xl">
      <li v-for="person in people" :key="person.email" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50/70 dark:hover:bg-zinc-900/70 sm:px-6">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50 dark:bg-zinc-700" :src="person.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900 dark:text-zinc-50">
              <a :href="person.href">
                <span class="absolute inset-x-0 -top-px bottom-0" />
                {{ person.name }}
              </a>
            </p>
            <p class="mt-1 flex text-xs leading-5 text-gray-500 dark:text-zinc-400">
              <a :href="`mailto:${person.email}`" class="relative truncate hover:underline">{{ person.email }}</a>
            </p>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-x-4">
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-sm leading-6 text-gray-900 dark:text-zinc-50">{{ person.role }}</p>
          </div>
          <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400 dark:text-zinc-400" aria-hidden="true" />
        </div>
      </li>
    </ul>
  </div>
</template>
