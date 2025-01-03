<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import { CheckCircleIcon, TrashIcon } from '@heroicons/vue/20/solid'
import { ChevronLeftIcon } from '@heroicons/vue/24/solid'
import { CheckIcon } from '@heroicons/vue/24/outline'
import { isIOS } from '@vueuse/core'

const props = defineProps<{ day: DayName }>()

const { locale, t } = useI18n()
const token = useCookie('token')
const config = useRuntimeConfig()
const currentClass = useCurrentClass()
const currentLesson = useCurrentLesson(true, toRef(getNearestDay(getDayIndex(props.day))))
const {
  homework: days,
  refresh,
  percentOfDoneHomework,
  changeTaskStatus,
  add,
  pending,
} = await useHomework(props.day)

const open = ref(false)
watch(open, newValue => {
  if (newValue) refresh()
})

const showOptions = ref<boolean>(false)

const newHomework = reactive<NewHomework>({
  text: '',
  description: '',
  lesson: currentLesson.value.lessonDetails as Lesson,
  date: getNearestDay(getDayIndex(props.day)),
  public: true,
})

const submit = async () => {
  await add(newHomework)
}

const deleteButtons = ref<boolean[]>([])

const toggleDeleteButton = (id: number) => {
  const initialValue = deleteButtons.value[id]
  deleteButtons.value.forEach((b, i) => {
    deleteButtons.value[i] = false
  })
  deleteButtons.value[id] = !initialValue
}

const deleting = ref<boolean[]>([])

const deleteHomework = async (id: number, task: string) => {
  deleting.value[id] = true
  if (!confirm(t('homework.delete', { task }))) {
    deleting.value[id] = false
    return
  }
  const start = new Date().getTime()

  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}/homework/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value,
    },
    baseURL: useRuntimeConfig().public.apiBase,
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
    .finally(() => {
      const difference = new Date().getTime() - start

      if (difference > 300) {
        deleting.value[id] = false
      } else {
        setTimeout(() => {
          deleting.value[id] = false
        }, 300 - difference)
      }
    })
}
</script>

<template>
  <button @click="open = true" v-bind="$attrs">
    <slot />
  </button>

  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="open = false" class="relative z-30">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full sm:items-center justify-center p-4 text-center" :class="Object.keys(days).length ? 'items-end' : isIOS ? 'items-start' : 'items-center'">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
              <div>
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                  {{ $t('days.' + day) }}
                </DialogTitle>

                <div v-if="!Object.keys(days).length" class="pt-6 lg:pt-5 pb-3 flex justify-center items-center gap-1 text-gray-600 dark:text-zinc-400">
                  <CheckCircleIcon class="w-5 h-5" />
                  {{ $t('homework.empty') }}
                </div>

                <div>
                  <transition-group enter-from-class="!translate-x-8 opacity-0" leave-from-class="!max-h-full" leave-active-class="-mt-[5.125rem] -mb-[3.125rem]" leave-to-class="opacity-0 scale-y-75 !max-h-0">
                    <div v-for="(day, date) in days" :key="date" class="transition-all ease-out duration-300">
                      <div class="mt-5">
                        <h5 class="bg-gray-100 dark:bg-zinc-800 py-2 px-4 -mx-1 rounded-full flex justify-between items-center">
                          <span>{{ (date as string).split('.').slice(0, 2).join('.') }}</span>
                          <div class="flex items-center gap-2">
                            <span class="inline-flex items-center rounded-full bg-gray-200/70 dark:bg-zinc-700/70 px-2 text-sm font-medium text-gray-600 dark:text-zinc-300/80">{{ capitalizeFirstLetter(timeAgo(new Date(parseInt((date as string).split('.')[2]), parseInt((date as string).split('.')[1]) - 1, parseInt((date as string).split('.')[0])))) }}</span>
                            <div class="relative">
                              <div class="absolute inset-0.25 flex justify-center items-center rounded-full bg-green-600 z-10 transition-all ease-out duration-300" :class="percentOfDoneHomework(day) === 100 ? '' : 'scale-0'">
                                <CheckIcon class="h-4 w-4 text-white stroke-[3] -ml-0.25" aria-hidden="true" />
                              </div>
                              <svg class="-rotate-90" width="24" height="24" viewBox="0 0 24 24">
                                <circle class="stroke-gray-300/80 dark:stroke-zinc-700" cx="12" cy="12" r="10" fill="none" stroke-width="3" />
                                <circle class="stroke-green-600 [stroke-dasharray:100] transition-all ease-out duration-300" :style="{ strokeDashoffset: `calc(100 - ${percentOfDoneHomework(day)})` }" cx="12" cy="12" r="10" fill="none" stroke-width="3" pathLength="100" />
                              </svg>
                            </div>
                          </div>
                        </h5>
                      </div>

                      <div class="mt-2">
                        <transition-group enter-from-class="!translate-x-8 opacity-0" leave-to-class="!-translate-x-8 opacity-0">
                          <div v-for="(tasks, lesson) in day" :key="lesson" class="transition-all ease-out duration-300">
                            <div class="flex items-center gap-1">
                              <component :is="'Emoji' + tasks[0].lesson.icon" class="h-5 w-5 shrink-0 -mb-0.25" />
                              <div class="text-lg truncate font-semibold">{{ tasks[0].lesson.name }}</div>
                            </div>
                            <ul class="ml-2 mt-1 flex flex-col gap-0.5">
                              <transition-group enter-from-class="!translate-x-8 opacity-0" leave-to-class="!-translate-x-8 opacity-0">
                                <li v-for="task in tasks" :key="task.id" class="transition-all ease-out duration-300">
                                  <div class="flex items-center gap-2 py-0.5">
                                    <div class="flex items-center [&:has(:checked)~div:has(label)]:line-through [&:has(:not(:checked))~div:has(label)]:!no-underline">
                                      <input :checked="task.done" @change="changeTaskStatus(task.id)" :id="task.id.toString()" :aria-describedby="task.id + '-description'" type="checkbox" class="h-4.5 w-4.5 cursor-pointer rounded dark:focus:ring-offset-zinc-900 border-gray-300 dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-green-600 dark:checked:border-green-600 text-green-600 focus:ring-green-600" />
                                    </div>
                                    <div class="flex items-center w-full overflow-hidden" :class="task.done ? 'line-through' : ''">
                                      <label :for="task.id.toString()" class="max-w-full truncate cursor-pointer shrink-0 text-gray-900 dark:text-zinc-200">{{ task.text }}</label>
                                      <span :id="task.id + '-description'" class="max-w-full truncate text-base text-gray-500/90 dark:text-zinc-400/90"><span v-if="task.description">&nbsp;</span>{{ task.description }}</span>
                                    </div>
                                    <div class="shrink-0 flex gap-1 group h-6 overflow-hidden transition-all ease-out duration-300 rounded-full" :class="deleteButtons[task.id] === true ? 'w-13 ring ring-gray-200 dark:ring-zinc-700' : 'w-6 hover:w-13 hover:ring hover:ring-gray-200 dark:hover:ring-zinc-700'">
                                      <button @click="toggleDeleteButton(task.id)" class="h-6 w-6 flex shrink-0 rounded-full" tabindex="-1">
                                        <img class="h-full w-full rounded-full bg-gray-300 dark:bg-zinc-700 object-cover" :src="task.created_by.picture" :alt="task.created_by.name">
                                      </button>
                                      <button @click="deleteHomework(task.id, `${task.text}${task.description ? ` ${task.description}` : ''}`)" class="h-6 w-6 flex shrink-0 justify-center items-center rounded-full bg-red-600 text-white transition-all ease-out duration-300" tabindex="-1">
                                        <TrashIcon v-if="!deleting[task.id]" class="h-4.5 w-4.h-4.5" />
                                        <IconLoader v-else class="w-4.5 h-4.5 motion-safe:animate-loader" />
                                      </button>
                                    </div>
                                  </div>
                                </li>
                              </transition-group>
                            </ul>
                          </div>
                        </transition-group>
                      </div>
                    </div>
                  </transition-group>
                </div>

                <div class="mt-5">
                  <MainForm @validated="submit" class="bg-gray-100 dark:bg-zinc-800 py-3 px-3 -mx-1 rounded-3xl flex flex-col items-stretch [&_*:has(:focus)]:!z-20 [&_*:has(.on-top)]:!z-20 [&>div:nth-child(2):has(:focus)]:!z-40 [&>div:nth-child(2):has(.on-top)]:!z-40 [&.is-validated_*:has(:invalid)]:!z-30">
                    <div class="w-full flex justify-stretch [&>div]:w-full [&>div]:-mx-0.25 [&>div]:-mt-0.25 [&:has(:first-child:not(:focus)>*:last-child)]:z-20">
                      <MainTextInput class="!text-sm !rounded-tl-2xl !rounded-b-none !rounded-r-none !ring-inset" v-model="newHomework.text" :placeholder="$t('homework.placeholders.task')" required />
                      <MainButton type="button" @click="showOptions = !showOptions" variant="outline" class="z-10 focus:z-20 active:z-20 rounded-tr-2xl rounded-l-none rounded-b-none bg-white dark:bg-zinc-900 ring-inset ring-gray-200 dark:ring-zinc-700 -mx-0.25 -mt-0.25">
                        <ChevronLeftIcon class="h-5.5 w-5.h-5.5 transition-all ease-out duration-300" :class="showOptions ? '-rotate-90' : ''" />
                      </MainButton>
                    </div>
                    <TransitionCollapse>
                      <div v-show="showOptions" class="-mx-0.25 px-0.25">
                        <MainTextInput class="!text-sm !w-[calc(100%+2px)] !rounded-none -m-0.25 !ring-inset" v-model="newHomework.description" :placeholder="$t('homework.placeholders.description')" />
                        <HomeworkDatePicker class="!text-sm !w-[calc(100%+2px)] !rounded-none -m-0.25 !ring-inset" v-model="newHomework.date" :day-index="getDayIndex(day)" />
                        <HomeworkLessonPickerNew class="!text-sm !w-[calc(100%+2px)] !rounded-none -m-0.25 !ring-inset" v-model="newHomework.lesson" :day-index="getDayIndex(day)" />
                        <SwitchGroup as="div" class="flex items-center justify-between w-[calc(100%+2px)] rounded-none -m-0.25 mb-0 border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 px-3">
                          <span class="flex flex-grow flex-col">
                            <SwitchLabel as="span" class="text-sm leading-6" passive>{{ $t('homework.public') }}</SwitchLabel>
                          </span>
                          <Switch v-model="newHomework.public" :class="[newHomework.public ? 'bg-green-600' : 'bg-gray-200 dark:bg-zinc-700', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-800']">
                            <span aria-hidden="true" :class="[newHomework.public ? 'translate-x-5 dark:bg-zinc-100' : 'translate-x-0 dark:bg-zinc-400', 'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                          </Switch>
                        </SwitchGroup>
                      </div>
                    </TransitionCollapse>
                    <MainButton class="w-full z-10 rounded-b-2xl rounded-t-none hover:z-20" :class="newHomework.text.trim() ? '' : 'bg-white dark:bg-zinc-900 ring-gray-200 dark:ring-zinc-700'" :variant="newHomework.text.trim() ? 'solid' : 'outline'" :color="newHomework.text.trim() ? 'green' : 'zinc'" type="submit" :disabled="!newHomework.text.trim()">
                      <span v-if="!pending">{{ $t('homework.add') }}</span>
                      <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
                    </MainButton>
                  </MainForm>
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
