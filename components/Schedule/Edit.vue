<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'

defineProps<{
  day: string
  lessons?: Lesson[]
}>()
</script>

<template>
  <div>
    <div class="px-3 font-bold mb-2 uppercase">{{ $t(`days.${day}`) }}</div>
    <div class="overflow-hidden bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <div class="flex flex-col">
        <div v-for="(lesson, index) in lessons" :key="lesson.id" class="group transition-transform ease-out duration-300 hover:-translate-x-10 flex items-stretch justify-between gap-1.5 px-3" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
          <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-1.5 cursor-default">
            <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5">{{ index + 1 }}.</div>
            <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
            <div class="text-base truncate">{{ lesson.name }}</div>
          </div>
          <button class="shrink-0 flex justify-center items-center w-10 -mr-13 transition-all ease-out duration-200 text-gray-200 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-100 bg-red-500 dark:bg-red-600">
            <TrashIcon class="h-5 w-5" />
          </button>
        </div>
        <div class="flex items-center justify-between gap-1.5 border-zinc-200 dark:border-zinc-700" :class="lessons && lessons.length ? 'mt-1 border-t' : ''">
          <ScheduleNewLesson :day="day" />
        </div>
      </div>
    </div>
  </div>
</template>
