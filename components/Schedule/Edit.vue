<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import { QueueListIcon } from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()

const props = defineProps<{
  day: string
  lessons?: Lesson[]
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
      passive: false,
      threshold: 1,
      onSwipe: () => {
        if (containerWidth.value) {
          if (lengthX.value > 0) {
            const length = -Math.abs(lengthX.value)
            el.style.left = `${length}px`;
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

const currentClass = useCurrentClass()

const deleteHandler = (index: number) => {
  lessonStatuses.value[index] = true

  setTimeout(async () => {
    let schedule = toRaw(currentClass.value).schedule
    schedule.filter(i => i.day === props.day)[0].lessons.splice(index, 1)

    await $fetch<apiResponse<any>>('/classes/' + currentClass.value.id, {
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
</script>

<template>
  <div>
    <div class="pl-3 pr-2.5 font-bold mb-2 uppercase flex items-center justify-between">
      {{ $t(`days.${day}`) }}
      <button class="text-green-600">
        <QueueListIcon class="h-5.5 w-5.5" />
      </button>
    </div>

    <div class="overflow-hidden bg-white dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
      <div class="flex flex-col">
        <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0">
          <div v-for="(lesson, index) in lessons" :key="lesson.id" ref="containers" class="relative transition-all ease-out duration-300" :class="lessonStatuses[index] ? '!-translate-x-[calc(100%+40px)] scale-y-0 h-0' : 'h-10'">
            <div class="absolute top-0 w-full group transition-all ease-out duration-300 hover:-translate-x-10 flex items-stretch justify-between gap-1.5 px-3" ref="lessonElements" :class="[
              index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80',
            ]">
              <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2 py-1.5 cursor-default">
                <div class="text-sm text-gray-400 dark:text-zinc-400 w-2.5">{{ index + 1 }}.</div>
                <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
                <div class="text-base truncate">{{ lesson.name }}</div>
              </div>
              <button class="shrink-0 flex justify-center items-center w-10 -mr-13 transition-all ease-out duration-200 text-gray-200 dark:text-zinc-300 hover:text-white dark:hover:text-zinc-100 bg-red-500 dark:bg-red-600" tabindex="-1" @click="deleteHandler(index)">
                <TrashIcon class="h-5 w-5" />
              </button>
            </div>
          </div>
        </transition-group>
        <div class="flex items-center justify-between gap-1.5 border-zinc-200 dark:border-zinc-700 transition-all ease-out duration-300" :class="lessons && lessons.length && !((currentClass.schedule.filter(i => i.day === props.day)[0].lessons.length < 2) && lessonStatuses.filter(s => s).length) ? 'mt-1 border-t' : ''">
          <ScheduleNewLesson :day="day" />
        </div>
      </div>
    </div>
  </div>
</template>
