<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/outline'

defineProps<{
  day: string
  lessons?: Lesson[]
}>()

const currentLesson = useCurrentLesson()
</script>

<template>
  <div v-if="lessons?.length">
    <div class="pl-3 pr-2.5 font-bold mb-2 uppercase flex items-center justify-between">
      {{ $t(`days.${day}`) }}
      <button class="text-green-600">
        <PlusCircleIcon class="h-5.5 w-5.5" />
      </button>
    </div>
    <div class="overflow-hidden bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <div class="flex flex-col">
        <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0" leave-to-class="!-translate-x-[calc(100%+40px)] scale-y-0 !h-0">
          <div v-for="(lesson, index) in lessons" :key="lesson.uuid" class="flex items-center justify-between gap-1.5 py-1.5 px-3 transition-all ease-out duration-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
            <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2">
              <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5">{{ index + 1 }}.</div>
              <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
              <div class="text-base truncate">{{ lesson.name }}</div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
