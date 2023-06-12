<script lang="ts" setup>
import { QueueListIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const selectedClass = useState('class')

const now = useNow()
const days = getDays()
const lessons: Lesson[][] = []
</script>

<template>
  <Head>
    <Title>{{ $t('menu.schedule') }} - GreenRute</Title>
  </Head>

  <div class="hidden lg:flex border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-end px-8">
    <div class="mt-4 flex sm:mt-0 sm:ml-4">
      <MainButton variant="outline" disabled class="!opacity-100 py-1.5">{{ lessons?.[now.getDay() - 1] ? 'До кінця уроку: 34 хв' : $t('empty.day off') }}</MainButton>
    </div>
  </div>

  <div class="mt-6 px-4 sm:px-6 lg:px-8">
    <div v-if="lessons.length" class="mt-3 mb-10 grid grid-cols-1 gap-6 sm:gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      <ScheduleItem v-for="(day, index) in lessons" :key="index" :day="days[index]" :lessons="day" />
    </div>
    <div v-else-if="selectedClass" class="py-16 sm:py-32 text-center">
      <QueueListIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
      <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('empty.lessons.title') }}</h3>
      <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('empty.lessons.description') }}</p>
      <div class="mt-6">
        <MainButton variant="solid" color="green" class="inline-flex items-center">
          <PlusIcon class="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true" />
          {{ $t('empty.lessons.button') }}
        </MainButton>
      </div>
    </div>
    <div v-else class="py-16 sm:py-32 text-center">
      <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
      <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('empty.classes.title') }}</h3>
      <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('empty.classes.description') }}</p>
      <div class="mt-6">
        <MainButton variant="solid" color="green" class="inline-flex items-center">
          <PlusIcon class="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true" />
          {{ $t('empty.classes.button') }}
        </MainButton>
      </div>
    </div>
  </div>
</template>
