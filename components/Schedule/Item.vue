<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/20/solid'

defineProps<{
  day: string
  lessons?: Lesson[]
}>()
</script>

<template>
  <div>
    <div class="px-3 font-bold mb-2 uppercase">{{ day }}</div>
    <div class="font-overpass bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <div class="flex flex-col">
        <div v-for="(lesson, index) in lessons" :key="lesson.id" class="flex items-center justify-between gap-1.5 py-[0.45rem] px-3" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
          <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2">
            <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5 -mb-0.5">{{ index + 1 }}.</div>
            <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
            <div class="font-medium truncate -mb-0.5">{{ lesson.name }}</div>
          </div>
          <button class="text-green-600 hover:text-green-900 dark:hover:text-green-700">
            <PlusIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
