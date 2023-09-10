<script setup lang="ts">
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
const { locale, locales, setLocale } = useI18n()

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
</script>

<template>
  <Listbox as="div" v-model="selectedClass" @update:model-value="setSelectedClass($event)">
    <ListboxLabel class="block text-sm font-medium text-gray-700 dark:text-zinc-300">{{ $t('empty.classes.select.title') }}</ListboxLabel>
    <div class="relative mt-2">
      <ListboxButton class="relative w-full cursor-default rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 pl-3 pr-10 text-left shadow-sm focus:border-green-500 dark:focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 sm:text-sm">
        <span class="flex items-center">
          <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: currentClass?.color }" aria-hidden="true" />
          <span class="ml-2 block truncate">{{ currentClass?.name }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="classItem in classes" :key="classItem.hash" :value="classItem.hash" v-slot="{ active, selected }">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="active ? 'text-black dark:text-white bg-zinc-200 dark:bg-zinc-900' : 'text-gray-900 dark:text-zinc-50'">
              <div class="flex items-center">
                <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ backgroundColor: classItem.color }" aria-hidden="true" />
                <span class="ml-2 block truncate" :class="selected ? 'font-semibold' : 'font-normal'">{{ classItem.name }}</span>
              </div>

              <span v-if="selected" class="absolute inset-y-0 right-0 flex items-center pr-4" :class="active ? 'text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400'">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
