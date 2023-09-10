<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useCurrentClass()
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.edit timetable') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="mt-6 px-4 sm:px-6 lg:px-8">
    <div class="mt-3 mb-10 grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ScheduleTimetable v-for="item in currentClass?.timetable" :key="item.day" :day="item.day" />
    </div>
  </div>
</template>
