<script setup lang="ts">
import {PlusIcon} from '@heroicons/vue/20/solid/index'

defineProps<{
  day: string
  lessons?: Lesson[]
}>()
</script>

<template>
  <div>
    <div class="px-4 font-display font-bold mb-2 text-lg uppercase">{{day}}</div>
    <div class="bg-zinc-50 rounded-3xl backdrop-blur-sm shadow-schedule">
      <div class="flex flex-col divide-y-2">
        <div class="flex items-center justify-between gap-1.5 py-2 px-3" v-for="lesson in lessons" :key="lesson.id">
          <div class="grid grid-cols-[1fr_auto] items-center gap-2">
            <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
            <div class="font-semibold truncate">{{ lesson.name }}</div>
          </div>
          <button class="text-green-600 hover:text-green-900">
            <PlusIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
