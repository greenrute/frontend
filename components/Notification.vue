<script setup lang="ts">
import { CheckCircleIcon, InformationCircleIcon, ExclamationTriangleIcon, ExclamationCircleIcon, BellIcon } from '@heroicons/vue/24/outline/index'
import { XMarkIcon } from '@heroicons/vue/20/solid/index'
import type {Notification} from '~/composables/useNotification'
import type {Ref} from 'vue'

const notification: Ref<Notification> = useNotification()

const close = () => {
  notification.value.show = false
  clearTimeout(notification.value.timeout)
}
</script>

<template>
  <div aria-live="assertive" class="pointer-events-none fixed z-30 inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <transition enter-active-class="transform ease-out duration-300 transition" enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2" enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="notification.show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div class="p-4">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon v-if="notification.status === 'success'" class="h-6 w-6 text-green-400" aria-hidden="true" />
                <InformationCircleIcon v-else-if="notification.status === 'info'" class="h-6 w-6 text-blue-400" aria-hidden="true" />
                <ExclamationTriangleIcon v-else-if="notification.status === 'warning'" class="h-6 w-6 text-yellow-400" aria-hidden="true" />
                <ExclamationCircleIcon v-else-if="notification.status === 'error'" class="h-6 w-6 text-red-400" aria-hidden="true" />
                <BellIcon v-else class="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div class="ml-3 w-0 flex-1">
                <p class="text-sm font-medium text-gray-900">{{ notification.message }}</p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button type="button" @click="notification.show = false" class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
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
