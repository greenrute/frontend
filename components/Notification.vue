<script setup lang="ts">
import { BellIcon, CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
import { XMarkIcon } from '@heroicons/vue/20/solid'
import type { Notification } from '~/composables/useNotification'
import type { Ref } from 'vue'

withDefaults(defineProps<{
  position?: 'top' | 'bottom'
}>(), {
  position: 'top',
})

const notification: Ref<Notification> = useNotification()
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none fixed z-30 inset-0 flex items-end px-4 py-6 sm:p-6" :class="position === 'top' ? 'sm:items-start' : 'sm:items-end'">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="notification.show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5">
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="notification.status === 'success'" class="h-6 w-6 text-green-400 dark:text-green-500" aria-hidden="true" />
                <InformationCircleIcon v-else-if="notification.status === 'info'" class="h-6 w-6 text-blue-400 dark:text-blue-500" aria-hidden="true" />
                <ExclamationTriangleIcon v-else-if="notification.status === 'warning'" class="h-6 w-6 text-yellow-400 dark:text-yellow-500" aria-hidden="true" />
                <ExclamationCircleIcon v-else-if="notification.status === 'error'" class="h-6 w-6 text-red-400 dark:text-red-500" aria-hidden="true" />
                <BellIcon v-else class="h-6 w-6 text-gray-400 dark:text-gray-500" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900 dark:text-zinc-100">{{ notification.message }}</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button type="button" @click="notification.show = false" class="inline-flex rounded-md bg-white dark:bg-zinc-800 text-gray-400 dark:text-zinc-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800">
                  <span class="sr-only">Закрити</span>
                  <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
