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

const { data: homework, refresh } = await useFetch<apiResponse<{ homeworks: ARHomework[] }>>(`/classes/${currentClass.value?.id}/homework/by-day/${getDayIndex(props.day)}`, {
  method: 'GET',
  headers: {
    'Accept-Language': locale.value,
    'Authorization': 'Bearer ' + token.value,
  },
  baseURL: config.public.apiBase,
})

const days = computed<Record<string, ARHomework[]>>(() => homework.value?.data?.homeworks?.reduce((previousValue, currentValue) => {
  if (!(previousValue as any)[currentValue.date]) {
    (previousValue as any)[currentValue.date] = []
  }
  (previousValue as any)[currentValue.date].push(currentValue)
  return previousValue
}, {}) as any)

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

                <div v-if="!homework?.data?.homeworks?.length" class="pt-6 lg:pt-4 pb-3 flex justify-center items-center gap-1 text-gray-600 dark:text-zinc-400">
                  <CheckCircleIcon class="w-5 h-5" />
                  {{ $t('homework.empty') }}
                </div>

                <div v-for="(day, date) in days">
                  <div class="mt-5">
                    <h5 class="bg-gray-100 dark:bg-zinc-800 py-2 px-4 -mx-1 rounded-full">{{ (new Date(date).getDate()).toString().padStart(2, '0') + '.' + (new Date(date).getMonth() + 1).toString().padStart(2, '0') }}</h5>
                  </div>

                  <div class="mt-3">
                    <ul>
                      <li v-for="task in day">
                        <div class="flex items-center gap-2">
                          <div class="flex items-center">
                            <input :checked="task.done" @change="changeTaskStatus(task.id)" :id="task.id.toString()" :aria-describedby="task.id + '-description'" type="checkbox" class="h-4.5 w-4.5 cursor-pointer rounded dark:focus:ring-offset-zinc-900 border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-green-600 dark:checked:border-green-600 text-green-600 focus:ring-green-600" />
                          </div>
                          <div class="flex items-center w-full" :class="task.done ? 'line-through' : ''">
                            <label :for="task.id.toString()" class="cursor-pointer truncate shrink-0">{{ task.text }}</label>
                            <p :id="task.id + '-description'" class="truncate text-base text-gray-500">&nbsp;{{ task.description }}</p>
                          </div>
                          <img class="h-7 w-h-7 flex-shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700 object-cover" :src="task.created_by.picture" :alt="task.created_by.name">
                        </div>
                      </li>
                    </ul>
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
