<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckCircleIcon, QueueListIcon, UserGroupIcon } from '@heroicons/vue/24/outline'
import { ChevronUpDownIcon, PlusIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const localePath = useLocalePath()

const date = new Date()
date.setMonth(date.getMonth() + 6)

const setSelectedClass = (event: string) => {
  selectedClass.value = event
  location.reload()
}

const selectedClass = useCookie<string>('selectedClass', {
  expires: date,
  sameSite: true,
})
const classes = useState<apiResponseClass[]>('classes')
const currentClass = useCurrentClass()

const currentLesson = useCurrentLesson()
const { homework, percentOfDoneHomework, changeTaskStatus } = await useHomework()
</script>

<template>
  <Head>
    <Title>{{ $t('menu.schedule') }} - GreenRute</Title>
  </Head>

  <div v-show="classes?.length && currentClass?.schedule?.filter(i => i?.lessons?.length)?.length" class="hidden lg:flex border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-between px-8">
    <div class="mt-4 flex items-center gap-2 sm:mt-0 max-w-[16rem]">
      <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
      <h3 class="text-lg truncate">{{ currentClass?.name }}</h3>
    </div>
    <div class="mt-4 flex sm:mt-0 sm:ml-4">
      <MainButton variant="outline" disabled class="!opacity-100 !py-1.5 -my-0.5">{{ currentLesson.timeToEnd }}</MainButton>
    </div>
  </div>

  <div class="mt-6 px-4 sm:px-6 lg:px-8">

    <div class="grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3" v-if="currentClass?.schedule[new Date().getDay() - 1]?.lessons.length">
      <div class="bg-gray-100 dark:bg-zinc-800 p-2 rounded-3xl">
        <div>
          <div class="pl-3 pr-2.5 font-bold mb-2 uppercase text-xl flex items-center justify-between">
            {{ $t(`days.${currentClass?.schedule[new Date().getDay() - 1].day}`) }}
            <HomeworkDialog class="text-green-600 flex items-center gap-1 text-base" :day="currentClass?.schedule[new Date().getDay() - 1].day">
              <QueueListIcon class="h-5.5 w-5.5" />
            </HomeworkDialog>
          </div>
          <div class="overflow-hidden bg-white dark:bg-zinc-900/40 rounded-2xl backdrop-blur-sm">
            <div class="flex flex-col">
              <transition-group enter-from-class="!translate-x-[calc(100%+40px)] scale-y-0 !h-0" leave-to-class="!-translate-x-[calc(100%+40px)] scale-y-0 !h-0">
                <div v-for="(lesson, index) in currentClass?.schedule[new Date().getDay() - 1].lessons" :key="lesson.uuid" class="flex items-center justify-between gap-1.5 py-1.5 px-3 transition-all ease-out duration-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
                  <div class="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                    <div class="text-base text-gray-400 dark:text-zinc-400 w-2.5">{{ index + 1 }}.</div>
                    <component :is="'Emoji' + lesson.icon" class="h-4.5 w-4.5 shrink-0" />
                    <div class="text-lg truncate">{{ lesson.name }}</div>
                  </div>
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div v-if="!Object.keys(homework).length" class="pt-6 lg:pt-5 pb-3 flex justify-center items-center gap-1 text-gray-600 dark:text-zinc-400">
          <CheckCircleIcon class="w-5 h-5" />
          {{ $t('homework.empty') }}
        </div>

        <div>
          <transition-group enter-from-class="!translate-x-8 opacity-0" leave-from-class="!max-h-full" leave-active-class="-mt-[5.125rem] -mb-[3.125rem]" leave-to-class="opacity-0 scale-y-75 !max-h-0">
            <div v-for="(day, date) in homework" :key="date" class="transition-all ease-out duration-300">
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
      </div>
    </div>

    <div v-if="currentClass?.schedule?.filter(i => i?.lessons?.length)?.length" class="mt-10 mb-10 grid grid-cols-1 gap-6 sm:gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      <ScheduleItem v-for="item in currentClass.schedule.filter((d, i) => i !== new Date().getDay() - 1)" :key="item.day" :day="item.day" :lessons="item.lessons" />
    </div>

    <div v-else-if="selectedClass" class="py-16 sm:py-32 text-center">
      <QueueListIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
      <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('empty.lessons.title') }}</h3>
      <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('empty.lessons.description') }}</p>
      <div class="mt-6">
        <MainButton variant="solid" color="green" class="inline-flex items-center" :to="localePath(`/c/${selectedClass}/schedule`)">
          <PlusIcon class="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true" />
          {{ $t('empty.lessons.button') }}
        </MainButton>
      </div>
    </div>
    <div v-else-if="classes?.length" class="py-16 sm:py-32 text-center">
      <CheckCircleIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
      <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('empty.classes.select.title') }}</h3>
      <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('empty.classes.select.description') }}</p>
      <div class="mt-6">
        <Listbox :model-value="selectedClass" @update:model-value="setSelectedClass">
          <div class="relative max-w-[12rem] mx-auto">
            <ListboxButton class="relative w-full text-left rounded-md py-2 pl-3 pr-10 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 dark:placeholder-zinc-400 focus:border-green-500 dark:focus:border-green-600 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 sm:text-sm">
              {{ $t('empty.classes.select.button') }}
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </ListboxButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none sm:text-sm">
                <ListboxOption as="template" v-slot="{ active, selected }" v-for="classItem in classes" :key="classItem.hash" :value="classItem.hash">
                  <li class="flex items-center relative select-none py-1 px-3 text-gray-800 dark:text-white" :class="[selected ? 'cursor-default font-medium' : 'cursor-pointer', active ? 'bg-gray-100 dark:bg-zinc-800' : '']">
                    <span class="w-2.5 h-2.5 mr-3 rounded-full" :style="{ backgroundColor: classItem.color }" aria-hidden="true" />
                    <span class="block truncate">{{ classItem.name }}</span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
    </div>
    <div v-else class="py-16 sm:py-32 text-center">
      <UserGroupIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
      <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('empty.classes.title') }}</h3>
      <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('empty.classes.description') }}</p>
      <div class="mt-6">
        <MainButton variant="solid" color="green" class="inline-flex items-center" :to="localePath('/classes/new')">
          <PlusIcon class="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true" />
          {{ $t('empty.classes.button') }}
        </MainButton>
      </div>
    </div>
  </div>
</template>
