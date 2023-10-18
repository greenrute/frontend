<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps<{ modelValue: Lesson, dayIndex: number }>()
defineEmits<{ (e: 'update:modelValue', value: Lesson): void }>()

const invalid = ref(false)
const currentClass = useCurrentClass()
const lessons = computed(() => currentClass.value?.schedule[props.dayIndex - 1].lessons ?? [])
const query = ref<string>('')
const filteredLessons = computed(() =>
  query.value === ''
    ? lessons.value
    : lessons.value.filter(lesson => lesson.name.toLowerCase().includes(query.value.toLowerCase()))
)
</script>

<template>
  <Combobox as="div" :model-value="modelValue" @update:model-value="(newLesson: Lesson) => $emit('update:modelValue', newLesson)" v-slot="{ open }">
    <div class="relative">
      <ComboboxInput v-bind="$attrs" class="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-2 pl-3 pr-10 text-left focus:outline-none focus:ring-1 sm:text-sm" :class="invalid ? 'ring-1 border-red-600 dark:border-red-500 ring-red-600 dark:ring-red-500' : 'focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600'" @change="query = $event.target.value" :display-value="(lesson) => (lesson as Lesson).name" :placeholder="$t('edit.placeholder')" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-zinc-400" aria-hidden="true" />
      </ComboboxButton>

      <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
        <ComboboxOptions v-if="filteredLessons?.length > 0" class="absolute bottom-full z-50 mb-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py py-1 sm:text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none origin-top">
          <ComboboxOption v-for="lesson in filteredLessons" :key="lesson.id" :value="lesson" as="template" v-slot="{ active, selected }">
            <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-800 dark:text-white" :class="active ? 'bg-gray-100 dark:bg-zinc-800' : ''">
              <div class="flex items-center">
                <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" />
                <span :class="['ml-3 truncate', selected && 'font-semibold']">
                  {{ lesson.name }}
                </span>
              </div>

              <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-gray-800 dark:text-white' : 'text-green-600']">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </transition>
    </div>
  </Combobox>
</template>
