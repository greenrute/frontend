<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const days = getDays()
const lessons: Lesson[][] = [
  [
    { id: 'pe', name: 'Фізкультура', icon: 'PE' },
    { id: 'hs', name: 'Історія', icon: 'History' },
    { id: 'al', name: 'Алгебра', icon: 'Algebra' },
    { id: 'gr', name: 'Географія', icon: 'Geography' },
    { id: 'uk', name: 'Українська мова', icon: 'Ukrainian' },
    { id: 'bl', name: 'Біологія', icon: 'Biology' },
    { id: 'hr', name: 'Громадянська освіта', icon: 'Civic' },
  ],
  [
    { id: 'pe', name: 'Фізкультура', icon: 'PE' },
    { id: 'hs', name: 'Історія', icon: 'History' },
    { id: 'al', name: 'Алгебра', icon: 'Algebra' },
    { id: 'gr', name: 'Географія', icon: 'Geography' },
    { id: 'uk', name: 'Українська мова', icon: 'Ukrainian' },
    { id: 'bl', name: 'Біологія', icon: 'Biology' },
    { id: 'hr', name: 'Громадянська освіта', icon: 'Civic' },
  ],
  [
    { id: 'pe', name: 'Фізкультура', icon: 'PE' },
    { id: 'hs', name: 'Історія', icon: 'History' },
    { id: 'al', name: 'Алгебра', icon: 'Algebra' },
    { id: 'gr', name: 'Географія', icon: 'Geography' },
    { id: 'uk', name: 'Українська мова', icon: 'Ukrainian' },
    { id: 'bl', name: 'Біологія', icon: 'Biology' },
    { id: 'hr', name: 'Громадянська освіта', icon: 'Civic' },
  ],
  [
    { id: 'pe', name: 'Фізкультура', icon: 'PE' },
    { id: 'hs', name: 'Історія', icon: 'History' },
    { id: 'al', name: 'Алгебра', icon: 'Algebra' },
    { id: 'gr', name: 'Географія', icon: 'Geography' },
    { id: 'uk', name: 'Українська мова', icon: 'Ukrainian' },
    { id: 'bl', name: 'Біологія', icon: 'Biology' },
    { id: 'hr', name: 'Громадянська освіта', icon: 'Civic' },
  ],
  [
    { id: 'pe', name: 'Фізкультура', icon: 'PE' },
    { id: 'hs', name: 'Історія', icon: 'History' },
    { id: 'al', name: 'Алгебра', icon: 'Algebra' },
    { id: 'gr', name: 'Географія', icon: 'Geography' },
    { id: 'uk', name: 'Українська мова', icon: 'Ukrainian' },
    { id: 'bl', name: 'Біологія', icon: 'Biology' },
    { id: 'hr', name: 'Громадянська освіта', icon: 'Civic' },
  ],
]
</script>

<template>
  <Head>
    <Title>Розклад - GreenRute</Title>
  </Head>

  <!-- Page title & actions -->
  <div class="px-4 py-6 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
    <Logo class="h-5 w-auto text-zinc-500" monochrome />
    <div class="hidden lg:block mt-4 flex sm:mt-0 sm:ml-4">
      <button class="invisible sm:order-0 order-1 ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-0" type="button">Share</button>
      <button class="invisible order-0 inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:order-1 sm:ml-3" type="button">Create</button>
    </div>
  </div>
  <!-- Schedule -->
  <div class="mt-6 px-4 sm:px-6 lg:px-8">
    {{$t('hello')}}
    <div class="mt-3 mb-10 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      <ScheduleItem v-for="(day, index) in days" :key="day" :day="day" :lessons="lessons[index]" />
    </div>
  </div>
</template>
