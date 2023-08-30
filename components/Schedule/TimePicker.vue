<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  day: string
  time: string
  index: number
  position: 'start' | 'end'
}>()

const { t, locale } = useI18n()
const mode = useColorMode()

const currentClass = useCurrentClass()

const time = ref({
  hours: toRaw(props.time).split(':').map(n => parseInt(n))[0],
  minutes: toRaw(props.time).split(':').map(n => parseInt(n))[1],
})

watch(time, async newTime => {
  let timetable = toRaw(currentClass.value).timetable
  timetable.filter(i => i.day === props.day)[0].records[props.index][props.position] = `${newTime.hours}:${newTime.minutes}`

  await $fetch<apiResponse<any>>(`/classes/${currentClass.value.id}/timetable`, {
    method: 'PATCH',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value,
    },
    body: {
      timetable,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
    })
})
</script>

<template>
  <VueDatePicker v-model="time" time-picker :cancel-text="$t('edit.cancel')" :select-text="$t('edit.select')" :dark="!mode.unknown ? mode.value === 'dark' : false" :teleport="true" mode-height="180">
    <template #trigger>
      <slot />
    </template>
  </VueDatePicker>
</template>
