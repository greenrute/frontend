<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'
import { LinkIcon, NoSymbolIcon, PlusCircleIcon } from '@heroicons/vue/20/solid'
import type { DefaultOptionIcon, Prompt } from '~/composables/usePrompt'
import type { Component, Ref } from 'vue'

const question: Ref<Prompt> = usePrompt()

const icon = (i: DefaultOptionIcon): Component => {
  switch (i) {
    case 'no':
      return NoSymbolIcon
    case 'go':
      return PlusCircleIcon
    case 'link':
      return LinkIcon
  }
}
</script>

<template>
  <TransitionRoot as="template" :show="question.show">
    <Dialog as="div" class="relative z-20" @close="question.show = false">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-700 bg-opacity-75 dark:bg-opacity-75 transition-opacity backdrop-blur" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative transform overflow-hidden rounded-3xl bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-700">
                  <QuestionMarkCircleIcon class="h-6 w-6 text-gray-600 dark:text-zinc-300" aria-hidden="true" />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">{{ question.title }}</DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500 dark:text-zinc-400">{{ question.description }}</p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <template v-if="question.options.length === 2">
                  <button type="button" class="relative inline-flex w-full justify-center rounded-full border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-800 sm:col-start-2 sm:text-sm" @click="question.show = false; question.options[0].action()">
                    <component :is="icon(question.options[0].icon)" class="h-5 w-5 absolute left-3.5 top-[50%] -translate-y-[50%]" />
                    {{ question.options[0].title }}
                  </button>
                  <button type="button" class="relative mt-3 inline-flex w-full justify-center rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-base font-medium text-gray-700 dark:text-zinc-100 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-800 sm:col-start-1 sm:mt-0 sm:text-sm" @click="question.show = false; question.options[1].action()">
                    <component :is="icon(question.options[1].icon)" class="h-5 w-5 absolute left-3.5 top-[50%] -translate-y-[50%]" />
                    {{ question.options[1].title }}
                  </button>
                </template>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
