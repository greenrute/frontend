<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{
  day: DayName
}>()

const { locale, t } = useI18n()
const token = useCookie('token')
const config = useRuntimeConfig()
const now = useNow({ interval: 1000 })
const currentClass = useCurrentClass()

const open = ref(false)

const { data: homework, refresh } = await useFetch<apiResponse<{ homeworks: { [key: string]: { [key: string]: ARHomework[] } } }>>(`/classes/${currentClass.value?.id}/homework/by-day/${getDayIndex(props.day)}`, {
  method: 'GET',
  headers: {
    'Accept-Language': locale.value,
    'Authorization': 'Bearer ' + token.value,
  },
  baseURL: config.public.apiBase,
})

const days = computed<{ [key: string]: { [key: string]: ARHomework[] } }>(() => Object.keys(homework.value?.data?.homeworks as object).sort((a, b) => {
  const A = parseInt(a.split('.').reverse().join(''))
  const B = parseInt(b.split('.').reverse().join(''))
  return A > B ? 1 : A < B ? -1 : 0
}).reduce((object, key) => {
  (object as any)[key] = homework.value?.data?.homeworks[key]
  return object
}, {}))

watch(open, newValue => {
  if (newValue) refresh()
})

const changeTaskStatus = async (tastId: number) => {
  await $fetch(`/classes/${currentClass.value?.id}/homework/${tastId}/status`, {
    method: 'GET',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + token.value,
    },
    baseURL: config.public.apiBase,
  })
    .then(() => {
      refresh()
    })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
    })
}

const newHomework = reactive({
  text: '',
  description: '',
})
</script>

<template>
  <button @click="open = true" v-bind="$attrs">
    <slot />
  </button>

  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="open = false" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-end lg:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
              <div>
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                  {{ $t('days.' + day) }}
                </DialogTitle>

                <div v-if="!Object.keys(days || {}).length" class="pt-6 lg:pt-4 pb-3 flex justify-center items-center gap-1 text-gray-600 dark:text-zinc-400">
                  <CheckCircleIcon class="w-5 h-5" />
                  {{ $t('homework.empty') }}
                </div>

                <div v-for="(day, date) in days" :key="date">
                  <div class="mt-5">
                    <h5 class="bg-gray-100 dark:bg-zinc-800 py-2 px-4 -mx-1 rounded-full flex justify-between items-center">
                      <span>{{ (date as string).split('.').slice(0, 2).join('.') }}</span>
                      <span class="inline-flex items-center rounded-full bg-gray-200/70 dark:bg-zinc-700/70 px-2 text-sm font-medium text-gray-600 dark:text-zinc-300/80">{{ capitalizeFirstLetter(timeAgo(new Date(parseInt((date as string).split('.')[2]), parseInt((date as string).split('.')[1]) - 1, parseInt((date as string).split('.')[0])))) }}</span>
                    </h5>
                  </div>

                  <div class="mt-2">
                    <div v-for="(tasks, lesson) in day" :key="lesson">
                      <div class="flex items-center gap-1">
                        <component :is="'Emoji' + tasks[0].lesson.icon" class="h-5 w-5 shrink-0 -mb-0.25" />
                        <div class="text-lg truncate font-semibold">{{ tasks[0].lesson.name }}</div>
                      </div>
                      <ul class="ml-2 mt-1 flex flex-col gap-0.5">
                        <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0" leave-to-class="!-translate-x-[calc(100%+40px)] scale-y-0 !h-0">
                          <li v-for="task in tasks" :key="task.id" class="transition-all ease-out duration-300">
                            <div class="flex items-center gap-2 py-0.5">
                              <div class="flex items-center">
                                <input :checked="task.done" @change="changeTaskStatus(task.id)" :id="task.id.toString()" :aria-describedby="task.id + '-description'" type="checkbox" class="h-4.5 w-4.5 cursor-pointer rounded dark:focus:ring-offset-zinc-900 border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-green-600 dark:checked:border-green-600 text-green-600 focus:ring-green-600" />
                              </div>
                              <div class="flex items-center w-full" :class="task.done ? 'line-through' : ''">
                                <label :for="task.id.toString()" class="cursor-pointer truncate shrink-0 text-gray-900 dark:text-zinc-200">{{ task.text }}</label>
                                <p :id="task.id + '-description'" class="truncate text-base text-gray-500/90 dark:text-zinc-400/90"><span v-if="task.description">&nbsp;</span>{{ task.description }}</p>
                              </div>
                              <img class="h-6 w-h-6 flex-shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700 object-cover" :src="task.created_by.picture" :alt="task.created_by.name">
                            </div>
                          </li>
                        </transition-group>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="mt-5">
                  <div class="bg-gray-100 dark:bg-zinc-800 py-3 px-3 -mx-1 rounded-3xl flex flex-col items-stretch">
                    <MainTextInput class="!w-[calc(100%+2px)] !rounded-t-2xl !rounded-b-none -mx-0.25 !ring-inset" v-model="newHomework.text" placeholder="Завдання, наприклад: вивчити вірш..." />
                    <MainTextInput class="!w-[calc(100%+2px)] !rounded-none -m-0.25 !ring-inset" v-model="newHomework.description" placeholder="Опис, наприклад: на с. 12..." />
                    <MainButton class="w-full z-10 rounded-b-2xl rounded-t-none" :class="newHomework.text ? '' : 'bg-white dark:bg-zinc-900 ring-gray-200 dark:ring-zinc-700'" :variant="newHomework.text ? 'solid' : 'outline'" :color="newHomework.text ? 'green' : 'zinc'" type="button" @click="open = false">{{ $t('general.create') }}</MainButton>
                  </div>
                </div>

                <div class="mt-5 flex items-center">
                  <MainButton class="w-full" variant="outline" type="button" @click="open = false">{{ $t('general.close') }}</MainButton>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
