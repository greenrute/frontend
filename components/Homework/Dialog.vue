<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
})
</script>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

defineProps<{
  day: string
}>()

const open = ref(false)
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
        <div class="flex min-h-full items-start lg:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
              <div>
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                  {{ $t('days.' + day) }}
                </DialogTitle>

                <div class="mt-5">
                  <h5>25.09</h5>
                </div>

                <div class="mt-5 flex gap-5 items-center flex-row-reverse">
                  <MainButton class="w-full" color="green">
                    {{ $t('edit.add') }}
                  </MainButton>
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
