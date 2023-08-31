<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useCurrentClass()
const currentLesson = useCurrentLesson()
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.schedule') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="mt-6 px-4 sm:px-6 lg:px-8">
    <div class="mt-3 mb-10 grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ScheduleItem v-for="item in currentClass?.schedule" :key="item.day" :day="item.day" :lessons="item.lessons" />
    </div>
  </div>

  <div class="flex fixed bottom-4 left-1/2 lg:left-[calc(50%+8rem)] -translate-x-1/2">
    <MainButton variant="solid" :color="currentLesson.active ? 'adaptive' : 'reverse'" disabled class="!opacity-100 !py-1.5 whitespace-nowrap shadow-md dark:shadow-zinc-800/30">{{ currentLesson.timeToEnd }}</MainButton>
  </div>
</template>
