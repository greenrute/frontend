<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/vue/24/solid'
import { PencilIcon } from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

const props = defineProps<{
  day: string
}>()

const recordStatuses = ref<boolean[]>([])

const updateLock = ref(false)
const deleteMode = ref<boolean>(false)
const currentClass = useCurrentClass(updateLock.value)
const records = computed(() => currentClass.value.timetable.filter(i => i.day === props.day)[0].records)

const addLesson = async () => {
  updateLock.value = true
  let timetable = toRaw(currentClass.value).timetable
  let lastItem = timetable.filter(i => i.day === props.day)[0].records.at(-1)
  timetable.filter(i => i.day === props.day)[0].records.push(lastItem ? {
    uuid: crypto.randomUUID(),
    start: addMinutes(lastItem.start, 60),
    end: addMinutes(lastItem.start, 105),
  } : {
    uuid: crypto.randomUUID(),
    start: '08:30',
    end: '09:15'
  })

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
    .finally(() => {
      updateLock.value = false
    })
}

const deleteHandler = (index: number) => {
  updateLock.value = true
  if (records.value.length === 1) deleteMode.value = false
  recordStatuses.value[index] = true

  setTimeout(async () => {
    let timetable = toRaw(currentClass.value).timetable
    timetable.filter(i => i.day === props.day)[0].records.splice(index, 1)

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
      .then(() => {
        recordStatuses.value.splice(index, 1)
      })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
      .finally(() => {
        recordStatuses.value[index] = false
        updateLock.value = false
      })
  }, 200)
}
</script>

<template>
  <div>
    <div class="pl-3 pr-2.5 font-bold mb-2 uppercase flex items-center justify-between">
      {{ $t(`days.${day}`) }}
      <button v-show="records && records.length && !(records.length < 2 && recordStatuses.filter(s => s).length)" class="h-6 w-6 relative overflow-hidden" @click="deleteMode = !deleteMode">
        <CheckCircleIcon class="text-green-600 dark:text-green-500 absolute transition-all ease-out duration-300 inset-0" :class="deleteMode ? '' : '-top-full'" />
        <PencilIcon class="h-5 w-5 text-gray-600 dark:text-zinc-300 absolute transition-all ease-out duration-300 inset-0.5" :class="deleteMode ? 'top-full' : ''" />
      </button>
    </div>
    <div class="overflow-hidden bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <div class="flex flex-col">
        <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0" leave-to-class="!-translate-x-[calc(100%+40px)] scale-y-0 !h-0">
          <div v-for="(record, index) in records" :key="record.uuid" class="relative transition-all ease-out duration-300" :class="recordStatuses[index] ? '!-translate-x-[calc(100%+40px)] scale-y-0 h-0' : 'h-10'">
            <div class="absolute top-0 w-full group flex items-stretch justify-between gap-1.5 px-3 transition-all ease-out duration-300" :class="[index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80', deleteMode ? '-translate-x-10' : '']">
              <div class="w-full grid grid-cols-[auto_1fr] items-center gap-2 py-0.75" :class="deleteMode ? 'cursor-default pointer-events-none' : ''">
                <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5">{{ index + 1 }}.</div>
                <div class="w-full grid grid-cols-[1fr_1fr] items-center gap-2">
                  <ScheduleTimePicker :day="day" :time="record.start" :index="index" position="start">
                    <button class="flex items-center justify-center transition-all ease-out duration-200 border border-transparent hover:bg-white hover:border-gray-200 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 rounded-md py-0.5">
                      <div class="w-20 flex items-center justify-start gap-1 pl-1.5">
                        <ArrowLeftOnRectangleIcon class="h-5 w-5" />
                        <span class="text-base">{{ record.start }}</span>
                      </div>
                    </button>
                  </ScheduleTimePicker>
                  <ScheduleTimePicker :day="day" :time="record.end" :index="index" position="end">
                    <button class="flex items-center justify-center transition-all ease-out duration-200 border border-transparent hover:bg-white hover:border-gray-200 dark:hover:bg-zinc-800 dark:hover:border-zinc-700 rounded-md py-0.5">
                      <div class="w-20 flex items-center justify-start gap-1 pl-1.5">
                        <ArrowRightOnRectangleIcon class="h-5 w-5" />
                        <span class="text-base">{{ record.end }}</span>
                      </div>
                    </button>
                  </ScheduleTimePicker>
                </div>
              </div>
              <button class="shrink-0 flex justify-center items-center w-10 transition-all ease-out duration-200 -mr-13 text-gray-200 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-100 bg-red-500 dark:bg-red-600" :class="index !== 0 ? 'border-t border-white/30' : ''" tabindex="-1" @click="deleteHandler(index)">
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </transition-group>
      </div>
      <TransitionCollapse>
        <div v-show="!deleteMode">
          <div class="flex items-center justify-between gap-1.5 border-zinc-200 dark:border-zinc-700 transition-all ease-out duration-300" :class="records && records.length && !(records.length < 2 && recordStatuses.filter(s => s).length) ? 'mt-1 border-t' : ''">
            <button class="hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:hover:bg-opacity-80 flex w-full gap-1 justify-center items-center py-1.5 px-3 rounded-b-2xl focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600" :class="records.length ? '' : 'rounded-t-2xl'" @click="addLesson">
              <PlusCircleIcon class="h-5 w-5" />
              <span class="text-base truncate">{{ $t('edit.add lesson') }}</span>
            </button>
          </div>
        </div>
      </TransitionCollapse>
    </div>
  </div>
</template>
