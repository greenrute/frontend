<script setup lang="ts">
import { Bars3Icon, TrashIcon } from '@heroicons/vue/20/solid'
import { ArrowsUpDownIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { SlickList, SlickItem, DragHandle } from 'vue-slicksort'

const { t, locale } = useI18n()

const props = defineProps<{
  day: string
}>()

const lessonStatuses = ref<boolean[]>([])
const containers = ref<(HTMLElement | null)[]>([])
const lessonElements = ref<(HTMLElement | null)[]>([])

const bindSwipeHandler = (el: HTMLElement | null, index: number) => {
  if (!el) return
  if (el.dataset.swipe === 'true') return
  el.dataset.swipe = 'true'
  el.dataset.id = Math.random().toString()
  const containerWidth = computed(() => el?.parentElement?.offsetWidth)
  const { lengthX } = useSwipe(
    el, {
    threshold: 20,
    onSwipe: () => {
      if (editMode.value) return
      if (containerWidth.value) {
        if (lengthX.value > 0) {
          const length = -Math.abs(lengthX.value)
          el.style.left = `${length}px`
          for (let i = 0; i < (el.parentElement?.parentElement as HTMLElement).children.length; i++) {
            const element = (el.parentElement?.parentElement as HTMLElement).children[i].children[0] as HTMLElement
            if (element.dataset.id !== el.dataset.id) {
              element.style.left = '0'
            }
          }
        } else {
          el.style.left = '0'
        }
      }
    },
    onSwipeEnd: () => {
      if (editMode.value) return
      if (lengthX.value > 0 && containerWidth.value && (-Math.abs(lengthX.value) / containerWidth.value) <= 0.5) {
        el.style.left = '-40px'
      }
      else {
        el.style.left = '0'
      }
    },
  }
  )
}

onMounted(() => {
  lessonElements.value.forEach(bindSwipeHandler)
})

onUpdated(() => {
  lessonElements.value.forEach(bindSwipeHandler)
})

const editMode = ref<boolean>(false)
const currentClass = useCurrentClass(editMode.value)
const lessons = computed(() => currentClass.value.schedule.filter(i => i.day === props.day)[0].lessons)

const deleteHandler = (index: number) => {
  lessonStatuses.value[index] = true

  setTimeout(async () => {
    let schedule = toRaw(currentClass.value).schedule
    schedule.filter(i => i.day === props.day)[0].lessons.splice(index, 1)

    await $fetch<apiResponse<any>>(`/classes/${currentClass.value.id}/schedule`, {
      method: 'PATCH',
      headers: {
        'Accept-Language': locale.value,
        'Authorization': 'Bearer ' + useCookie('token').value,
      },
      body: {
        schedule,
      },
      baseURL: useRuntimeConfig().public.apiBase,
    })
      .then(() => {
        lessonStatuses.value.splice(index, 1)
      })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
      .finally(() => {
        lessonStatuses.value[index] = false
      })
  }, 200)
}

watch(computed(() => currentClass.value.schedule.filter(i => i.day === props.day)[0].lessons), async (newSchedule, oldSchedule) => {
  if (editMode.value && !arraysEqual(oldSchedule, newSchedule)) {
    let schedule = toRaw(currentClass.value).schedule
    schedule.filter(i => i.day === props.day)[0].lessons = newSchedule

    await $fetch<apiResponse<any>>(`/classes/${currentClass.value.id}/schedule`, {
      method: 'PATCH',
      headers: {
        'Accept-Language': locale.value,
        'Authorization': 'Bearer ' + useCookie('token').value,
      },
      body: {
        schedule,
      },
      baseURL: useRuntimeConfig().public.apiBase,
    })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
  }
})
</script>

<template>
  <div>
    <div class="pl-3 pr-2.5 font-bold mb-2 uppercase flex items-center justify-between">
      {{ $t(`days.${day}`) }}
      <button v-show="lessons?.length && lessons.length > 1" class="h-5.5 w-5.5 relative overflow-hidden" @click="editMode = !editMode">
        <CheckCircleIcon class="text-green-600 dark:text-green-500 absolute transition-all ease-out duration-300 inset-0" :class="editMode ? '' : '-top-full'" />
        <ArrowsUpDownIcon class="h-5 w-5 text-gray-600 dark:text-zinc-300 absolute transition-all ease-out duration-300 inset-0.25" :class="editMode ? 'top-full' : ''" />
      </button>
    </div>

    <div class="overflow-hidden bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <SlickList axis="y" v-model:list="currentClass.schedule.filter(i => i.day === day)[0].lessons" lockAxis="y" :useDragHandle="true" class="flex flex-col">
        <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0" leave-to-class="!-translate-x-[calc(100%+40px)] scale-y-0 !h-0">
          <SlickItem v-for="(lesson, index) in currentClass.schedule.filter(i => i.day === day)[0].lessons" :key="lesson.id" :index="index" ref="containers" class="relative" :class="[
            lessonStatuses[index] ? '!-translate-x-[calc(100%+40px)] scale-y-0 h-0' : 'h-10',
            editMode ? 'cursor-default select-none' : 'transition-all ease-out duration-300',
          ]">
            <div class="absolute top-0 w-full group transition-all ease-out duration-300 flex items-stretch px-3" ref="lessonElements" :class="[
              index % 2 === 0 ? '' : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80',
              editMode ? 'pointer-events-none translate-x-10' : 'hover:-translate-x-10',
            ]">
              <DragHandle class="shrink-0 flex justify-center items-center w-10 -ml-13 transition-all ease-out duration-200 pointer-events-auto cursor-move" :class="[editMode ? '' : 'invisible', contrastColorIsBlack(currentClass.color) ? 'text-black hover:text-zinc-700' : 'text-white hover:text-zinc-200']" :style="{ backgroundColor: currentClass.color }" tabindex="-1">
                <Bars3Icon class="h-5 w-5" />
              </DragHandle>
              <div class="flex-1 flex items-stretch justify-between">
                <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-1.5 px-3 cursor-default transition-all ease-out duration-300" :class="editMode ? '-translate-x-4' : ''">
                  <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5 transition-all ease-out duration-300" :class="editMode ? 'scale-0' : ''">{{ index + 1 }}.</div>
                  <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
                  <div class="text-base truncate">{{ lesson.name }}</div>
                </div>
                <button class="shrink-0 flex justify-center items-center w-10 -mr-13 transition-all ease-out duration-200 text-gray-200 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-100 bg-red-500 dark:bg-red-600" :class="editMode ? 'invisible' : ''" tabindex="-1" @click="deleteHandler(index)">
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
          </SlickItem>
        </transition-group>
      </SlickList>
      <TransitionCollapse>
        <div v-show="!editMode">
          <div class="flex items-center justify-between gap-1.5 border-zinc-200 dark:border-zinc-700 transition-all ease-out duration-300" :class="lessons && lessons.length && !((currentClass.schedule.filter(i => i.day === props.day)[0].lessons.length < 2) && lessonStatuses.filter(s => s).length) ? 'mt-1 border-t' : ''">
            <ScheduleNewLesson :day="day" />
          </div>
        </div>
      </TransitionCollapse>
    </div>
  </div>
</template>
