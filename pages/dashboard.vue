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

    <div v-if="currentClass?.schedule[new Date().getDay() - 1]?.lessons.length" class="bg-zinc-800 p-2 rounded-3xl">
      <div>
        <div class="pl-3 pr-2.5 font-bold mb-2 uppercase text-xl flex items-center justify-between">
          {{ $t(`days.${currentClass?.schedule[new Date().getDay() - 1].day}`) }}
          <HomeworkDialog class="text-green-600 flex items-center gap-1 text-base" :day="currentClass?.schedule[new Date().getDay() - 1].day">
            <QueueListIcon class="h-5.5 w-5.5" />
            {{ $t('menu.homework') }}
          </HomeworkDialog>
        </div>
        <div class="overflow-hidden bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-700 rounded-2xl backdrop-blur-sm shadow-md">
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
