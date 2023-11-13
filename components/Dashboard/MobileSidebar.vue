<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { PlusIcon } from '@heroicons/vue/20/solid'

const localePath = useLocalePath()

defineProps<{
  sidebarOpen: boolean
  navigation: NavMenuItem[]
  classes: apiResponseClass[] | undefined
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog as="div" class="relative z-40 lg:hidden" @close="$emit('close')">
      <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-600 dark:bg-zinc-900 bg-opacity-75 dark:bg-opacity-80" />
      </TransitionChild>

      <div class="fixed inset-0 z-40 flex">
        <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
          <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-zinc-800 pt-5">
            <div class="flex flex-shrink-0 items-center px-4 pt-2 pb-1">
              <Logo class="h-5 w-auto" />
            </div>
            <div class="mt-5 h-0 flex-1 overflow-y-auto pt-1 pb-4">
              <nav class="px-2">
                <div class="space-y-1">
                  <NuxtLink v-for="item in navigation" :key="item.name" :to="localePath(item.href)" custom v-slot="{ href, navigate, isActive, isExactActive }">
                    <a :href="href" @click.prevent="$emit('close'); navigate()" class="group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md" :class="isActive ? 'bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-zinc-50' : 'text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-zinc-50 hover:bg-gray-50 dark:hover:bg-zinc-900'" :aria-current="isExactActive ? 'page' : undefined">
                      <!--suppress JSValidateTypes -->
                      <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6" :class="isActive ? 'text-gray-500 dark:text-zinc-300' : 'text-gray-400 dark:text-zinc-400 group-hover:text-gray-500 dark:group-hover:text-zinc-300'" aria-hidden="true" />
                      {{ $t(item.name) }}
                    </a>
                  </NuxtLink>
                </div>
                <div class="mt-8">
                  <h3 class="flex justify-between items-center px-3 text-sm font-medium text-gray-500 dark:text-zinc-400" id="mobile-classes-headline">
                    {{ $t('menu.my classes') }}
                    <NuxtLink :to="localePath('/classes/new')" v-if="classes?.length" class="hover:text-gray-600 dark:hover:text-zinc-300">
                      <PlusIcon class="h-5 w-5" aria-hidden="true" />
                      <span class="sr-only">{{ $t('empty.classes.button') }}</span>
                    </NuxtLink>
                  </h3>
                  <div v-if="classes?.length" class="mt-1 space-y-1" role="group" aria-labelledby="mobile-classes-headline">
                    <NuxtLink v-for="classItem in classes" :key="classItem.hash" :to="localePath('/c/' + classItem.hash)" custom v-slot="{ href, navigate, isExactActive }">
                      <a :href="href" @click.prevent="$emit('close'); navigate()" class="group flex items-center rounded-md px-3 py-2 text-base font-medium leading-5 text-gray-600 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white" :aria-current="isExactActive ? 'page' : undefined">
                        <span class="w-2.5 h-2.5 mr-4 rounded-full shrink-0" :style="{ backgroundColor: classItem.color }" aria-hidden="true" />
                        <span class="truncate">{{ classItem.name }}</span>
                      </a>
                    </NuxtLink>
                  </div>
                  <div v-else class="mt-1 px-3 text-sm text-gray-400 dark:text-zinc-500">{{ $t('empty.not available yet') }}</div>
                </div>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
        <div class="w-14 flex-shrink-0" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
