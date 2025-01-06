<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(defineProps<{
  scheduleChanges: apiResponseScheduleChanges | undefined
  targetClass?: string
  targetDay?: string
}>(), {
  targetDay: 'today',
})

const records = computed(() => props.targetClass ? props.scheduleChanges?.records.filter(r => r.class.includes(props.targetClass as string)) : props.scheduleChanges?.records)
</script>

<template>
  <div>
    <div v-if="!records?.length">
      <div class="py-16 sm:py-32 text-center max-w-screen-sm mx-auto">
        <CheckCircleIcon class="mx-auto h-12 w-12 text-gray-400 dark:text-zinc-500 stroke-1" />
        <h3 class="mt-2 font-medium text-gray-900 dark:text-white">{{ $t('schedule changes.no changes' + (targetDay === 'tomorrow' ? ' tomorrow' : '')) }}</h3>
        <p class="mt-1.5 text-sm text-gray-500 dark:text-zinc-300/90">{{ $t('schedule changes.no changes description') }}</p>
      </div>
    </div>
    <div v-else class="flow-root max-w-screen-sm mx-auto">
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
                <tr v-for="(record, index) in records" :key="record.class+record.lesson.join(',')" :class="record.status === 'canceled' ? 'opacity-60' : ''">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 sm:pl-6" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
                    <span class="inline-block min-w-7">{{ record.class }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">{{ getRanges(record.lesson)[0] }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="[index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80', record.status === 'canceled' ? 'line-through' : '']">{{ record.subject }}</td>
                  <td v-if="record.previous_teacher === record.new_teacher" class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="[index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80', record.status === 'canceled' ? 'line-through' : '']">{{ record.new_teacher }}</td>
                  <td v-else class="whitespace-nowrap px-3 py-4 text-sm text-zinc-500 dark:text-zinc-300" :class="[index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80', record.status === 'canceled' ? 'line-through' : '']">{{ record.new_teacher }} <span class="line-through">{{ record.previous_teacher }}</span></td>
                  <td class="whitespace-nowrap py-4 pr-4 pl-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 sm:pr-6" :class="index % 2 === 0 ? undefined : 'bg-zinc-50 dark:bg-zinc-900 dark:bg-opacity-80'">
                    <span :class="record.status === 'canceled' ? 'text-red-600 dark:text-red-500' : ''">
                      {{ $t('schedule changes.' + record.status) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>