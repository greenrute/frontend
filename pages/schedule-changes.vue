<script setup lang="ts">
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const route = useRoute()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const token = useCookie('token')
const config = useRuntimeConfig()
const currentClass = useCurrentClass()

const backgroundImage = computed(() => `url('/img/patterns/${getColorName(currentClass.value?.color) ?? 'green'}.png')`)

const pending = ref(true)
const status = ref('pending')
const scheduleChanges = ref<apiResponse<{ schedule_change: apiResponseScheduleChanges }> | null>(null)

const fetchScheduleChanges = async () => {
  pending.value = true
  const start = new Date().getTime()
  await $fetch<apiResponse<{ schedule_change: apiResponseScheduleChanges }>>(`/classes/${currentClass.value?.id}/schedule/${currentDay.value}/changes`, {
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + token.value,
    },
    baseURL: config.public.apiBase,
  })
    .then(r => {
      scheduleChanges.value = r
      status.value = 'success'
    })
    .catch(() => {
      status.value = 'error'
    })
    .finally(() => {
      const difference = new Date().getTime() - start

      if (difference > 300) {
        pending.value = false
      } else {
        setTimeout(() => {
          pending.value = false
        }, 300 - difference)
      }
    })
}

const currentDay = useState<string>('current-schedule-changes-day', () => 'today')
watch(currentDay, (v, ov) => {
  fetchScheduleChanges()
})

onMounted(async () => {
  await fetchScheduleChanges()
})

const tabs = [
  { name: t('schedule changes.my class'), id: 0 },
  { name: t('schedule changes.all classes'), id: 1 },
]
const currentTab = ref<number>(0)
</script>

<template>
  <Head>
    <Title>{{ $t('menu.schedule changes') }} - GreenRute</Title>
  </Head>

  <div v-if="status === 'pending'" class="min-w-full min-h-screen flex items-center justify-center flex-col">
    <IconLoader class="w-7 h-7 motion-safe:animate-loader text-zinc-500" />
    <div class="mt-3 text-lg">{{ $t('general.loading') }}...</div>
    <div class="bg-cover bg-center absolute -inset-10 -z-10 opacity-10 blur-xl dark:opacity-10" :style="{ backgroundImage }" />
  </div>

  <div v-else-if="status === 'error'" class="flex items-center justify-center h-screen font-display text-4xl uppercase text-center leading-normal">
    <div>
      🔎{{ ' ' }}<span class="opacity-60">{{ $t('schedule changes.no changes available') }}</span>
    </div>
  </div>

  <template v-else-if="status === 'success'">
    <div v-show="(currentClass as apiResponseClass)?.schedule.filter(i => i.lessons.length)?.length" class="hidden lg:flex border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-between px-8">
      <div class="mt-4 flex items-center gap-2 sm:mt-0 max-w-[16rem]">
        <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
        <h3 class="text-lg truncate">{{ currentClass?.name }}</h3>
      </div>
      <nav class="absolute left-1/2 -translate-x-1/2 max-w-sm shrink-0 isolate flex divide-x divide-gray-200 dark:divide-zinc-700 rounded-lg shadow" aria-label="Tabs">
        <button v-for="(tab, tabIdx) in tabs" :key="tab.name" @click="currentTab = tabIdx" :class="[tab.id === currentTab ? 'text-gray-900 dark:text-zinc-50' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-zinc-800/50 px-2.5 py-2.5 text-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 focus:z-10']" :aria-current="tab.id === currentTab ? 'page' : undefined">
          <span class="whitespace-nowrap px-4">{{ tab.name }}</span>
          <span aria-hidden="true" :class="[tab.id === currentTab ? 'bg-green-600' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
        </button>
      </nav>
      <!-- <div class="mt-4 flex sm:mt-0 sm:ml-4">
        <MainButton :to="localePath(`/c/${currentClass?.hash}/schedule-changes/tomorrow`)" variant="outline" class="!py-1.5 -my-0.5 gap-1">
          {{ $t('general.tomorrow') }}
          <ArrowTopRightOnSquareIcon class="w-4.5 h-4.5 -mb-0.25" />
        </MainButton>
      </div> -->
      <Listbox v-model="currentDay">
        <div class="relative">
          <ListboxButton class="relative w-full text-left rounded-md py-2 pl-3 pr-10 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 dark:placeholder-zinc-400 focus:border-green-500 dark:focus:border-green-600 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 sm:text-sm">
            {{ $t('general.' + currentDay) }}
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>
          <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-slot="{ active, selected }" v-for="day in ['today', 'tomorrow']" :key="day" :value="day">
                <li class="flex items-center relative select-none py-1 px-3 text-gray-800 dark:text-white" :class="[selected ? 'cursor-default font-medium' : 'cursor-pointer', active ? 'bg-gray-100 dark:bg-zinc-800' : '']">
                  <span class="block truncate">{{ $t('general.' + day) }}</span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </div>

    <div class="mt-6 px-4 sm:px-6 lg:hidden">
      <div>
        <nav class="max-w-sm mx-auto isolate flex divide-x divide-gray-200 dark:divide-zinc-700 rounded-lg shadow" aria-label="Tabs">
          <button v-for="(tab, tabIdx) in tabs" :key="tab.name" @click="currentTab = tabIdx" :class="[tab.id === currentTab ? 'text-gray-900 dark:text-zinc-50' : 'text-gray-500 dark:text-zinc-400 hover:text-gray-700 dark:hover:text-zinc-200', tabIdx === 0 ? 'rounded-l-lg' : '', tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-zinc-800/50 px-2.5 py-2.5 text-center text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 focus:z-10']" :aria-current="tab.id === currentTab ? 'page' : undefined">
            <span>{{ tab.name }}</span>
            <span aria-hidden="true" :class="[tab.id === currentTab ? 'bg-green-600' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
          </button>
        </nav>
      </div>
    </div>

    <div v-show="currentTab === 0" class="mt-6 px-4 sm:px-6 lg:px-8">
      <ScheduleChangesTable :schedule-changes="scheduleChanges?.data?.schedule_change" :target-class="currentClass?.name" :target-day="currentDay" />
    </div>

    <div v-show="currentTab === 1" class="mt-6 px-4 sm:px-6 lg:px-8">
      <ScheduleChangesTable :schedule-changes="scheduleChanges?.data?.schedule_change" />
    </div>
  </template>
</template>
