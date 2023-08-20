<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useState<apiResponseClass[]>('classes').value.filter(c => c.hash === useCookie('selectedClass').value)[0]
</script>

<template>
  <div class="min-h-screen relative">
    <div class="hidden lg:flex border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-between px-8">
      <div class="mt-4 flex items-center gap-2 sm:mt-0">
        <div class="h-3 w-3 rounded-full" :style="{ backgroundColor: currentClass.color }" />
        <h3 class="text-lg">{{ currentClass.name }}</h3>
      </div>
    </div>

    <div class="mt-6 px-4 sm:px-6 lg:px-8">
      <div class="mt-3 mb-10 grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <ScheduleEdit v-for="(item, index) in currentClass.schedule" :key="item.day" :day="item.day" :lessons="item.lessons" />
      </div>
    </div>

    <div class="bg-cover bg-center absolute inset-0 -z-10 opacity-5" :style="{ backgroundImage: `url('/img/patterns/${getColorName(currentClass.color)}.png')` }" />
  </div>
</template>
