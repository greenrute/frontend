<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { locale, t } = useI18n()
const token = useCookie('token')
const config = useRuntimeConfig()
const currentClass = useCurrentClass()

const backgroundImage = computed(() => `url('/img/patterns/${getColorName(currentClass.value?.color) ?? 'green'}.png')`)

const status = ref('pending')
const scheduleChanges = ref<apiResponse<{ schedule_change: apiResponseScheduleChanges }> | null>(null)

onMounted(async () => {
  await $fetch<apiResponse<{ schedule_change: apiResponseScheduleChanges }>>(`/classes/${currentClass.value?.id}/schedule/changes`, {
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
})

const tabs = [
  { name: t('schedule changes.my class'), id: 0 },
  { name: t('schedule changes.all classes'), id: 1 },
]
const currentTab = ref<number>(1)
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

  <template v-else>
    <div v-show="currentClass?.schedule?.filter(i => i?.lessons?.length)?.length" class="hidden lg:flex border-b border-gray-200 dark:border-zinc-700 py-3 items-center justify-between px-8">
      <div class="mt-4 flex items-center gap-2 sm:mt-0 max-w-[16rem]">
        <div class="h-3 w-3 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" />
        <h3 class="text-lg truncate">{{ currentClass?.name }}</h3>
      </div>
      <!-- <div class="mt-4 flex sm:mt-0 sm:ml-4">
        <MainButton variant="outline" disabled class="!opacity-100 !py-1.5 -my-0.5">{{ $t('schedule changes.no changes') }}</MainButton>
      </div> -->
    </div>

    <div class="mt-6 px-4 sm:px-6 lg:px-8">
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
      <div class="flex items-center justify-center min-h-96 font-display text-4xl uppercase text-center leading-normal">
        <div>
          🏗️{{ ' ' }}<span class="opacity-60">{{ $t('general.wip') }}</span>
        </div>
      </div>
    </div>

    <div v-show="currentTab === 1" class="mt-6 px-4 sm:px-6 lg:px-8">
      <div class="flow-root">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black/5 sm:rounded-3xl">
              <table class="min-w-full divide-y divide-gray-300 dark:divide-zinc-700">
                <thead class="bg-zinc-50 dark:bg-zinc-800">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:pl-6">
                      <span class="sr-only">{{ $t('schedule changes.class') }}</span>
                    </th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">{{ $t('schedule changes.lesson') }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">{{ $t('schedule changes.subject') }}</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50">{{ $t('schedule changes.teacher') }}</th>
                    <th scope="col" class="py-3.5 pr-4 pl-3 text-left text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:pr-6">
                      <span class="sr-only">{{ $t('schedule changes.status') }}</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-zinc-700/50 bg-white dark:bg-zinc-800/50">
                  <tr v-for="(record, index) in scheduleChanges?.data?.schedule_change.records" :key="record.class+record.lesson.join(',')">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 sm:pl-6" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ record.class }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ getRanges(record.lesson)[0] }}</td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ record.subject }}</td>
                    <td v-if="record.previous_teacher === record.new_teacher" class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ record.new_teacher }}</td>
                    <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ record.new_teacher }} <span class="line-through">{{ record.previous_teacher }}</span></td>
                    <td class="whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 sm:pr-6" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ $t('schedule changes.' + record.status) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
