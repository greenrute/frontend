<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const currentClass = useState<apiResponseClass[]>('classes').value.filter(c => c.hash === useCookie('selectedClass').value)[0]
</script>

<template>
  <Head>
    <Title>{{ currentClass.name }} | {{ $t('menu.edit schedule') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="mt-6 px-4 sm:px-6 lg:px-8">
    <div class="mt-3 mb-10 grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ScheduleEdit v-for="(item, index) in currentClass.schedule" :key="item.day" :day="item.day" :lessons="item.lessons" />
    </div>
  </div>
</template>
