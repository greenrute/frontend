<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { PlusCircleIcon, CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const { t, locale } = useI18n()

const props = defineProps<{ day: string }>()

const currentClass = useCurrentClass()

const open = ref(false)
const invalid = ref(false)

const { data: lessons, error } = await useFetch<apiResponse<ARLessons>>('/lessons/all', {
  headers: {
    'Accept-Language': locale.value,
    'Authorization': 'Bearer ' + useCookie('token').value
  },
  baseURL: useRuntimeConfig().public.apiBase,
})

if (error.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found',
  })
}

const query = ref<string>('')
const selectedLesson = ref<Lesson>({ id: -1, key: '', uuid: '', icon: '', name: '', alt: '' })
const filteredLessons = computed(() =>
  query.value === ''
    ? (lessons.value?.data?.lessons as Lesson[] ?? [])
    : (lessons.value?.data?.lessons as Lesson[] ?? []).filter(lesson => lesson.name.toLowerCase().includes(query.value.toLowerCase()))
)

const pending = ref(false)

const submit = async () => {
  if (selectedLesson.value.name === '') {
    invalid.value = true
    return
  } else {
    invalid.value = false
  }

  pending.value = true
  const start = new Date().getTime()
  selectedLesson.value.uuid = crypto.randomUUID()

  let schedule = toRaw(currentClass.value)?.schedule
  schedule?.filter(i => i.day === props.day)[0].lessons.push(selectedLesson.value)

  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}/schedule`, {
    method: 'PATCH',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value,
    },
    body: {
      schedule,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .then(r => {
      open.value = false
      selectedLesson.value = { id: -1, key: '', uuid: '', icon: '', name: '', alt: '' }
      pushNotification({
        status: 'success',
        message: r.message,
      })
    })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
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
</script>

<template>
  <button class="hover:bg-zinc-50 dark:hover:bg-zinc-900 dark:hover:bg-opacity-80 flex w-full gap-1 justify-center items-center py-1.5 px-3 rounded-b-2xl focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-green-600" :class="currentClass?.schedule.filter(i => i.day === day)[0].lessons?.length ? '' : 'rounded-t-2xl'" @click="open = true">
    <PlusCircleIcon class="h-5 w-5" />
    <span class="text-base truncate">{{ $t('edit.add lesson') }}</span>
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
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                {{ $t('edit.add lesson') }}
              </DialogTitle>

              <Combobox class="mt-5" as="div" v-model="selectedLesson" v-slot="{ open }">
                <ComboboxLabel class="mb-3 block text-sm font-medium text-gray-700 dark:text-zinc-300">{{ $t('edit.lesson name') }}</ComboboxLabel>
                <div class="relative">
                  <ComboboxInput class="w-full rounded-md border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-1.5 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-1 sm:text-sm" :class="invalid ? 'ring-1 border-red-600 dark:border-red-500 ring-red-600 dark:ring-red-500' : 'focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600'" @keydown.enter="!open && submit()" @change="query = $event.target.value" :display-value="(lesson) => (lesson as Lesson).name" :placeholder="$t('edit.placeholder')" />
                  <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon class="h-5 w-5 text-zinc-400" aria-hidden="true" />
                  </ComboboxButton>

                  <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <ComboboxOptions v-if="filteredLessons?.length > 0" class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py py-1 sm:text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none origin-top">
                      <ComboboxOption v-for="lesson in filteredLessons" :key="lesson.id" :value="lesson" as="template" v-slot="{ active, selected }">
                        <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-800 dark:text-white" :class="active ? 'bg-gray-100 dark:bg-zinc-800' : ''">
                          <div class="flex items-center">
                            <component :is="'Emoji' + capitalizeFirstLetter(lesson.icon)" class="h-4 w-4 shrink-0" />
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

              <div v-if="invalid" class="mt-2 text-red-600 dark:text-red-500 text-sm">{{ $t('edit.invalid') }}</div>

              <div class="mt-5 flex gap-5 items-center flex-row-reverse">
                <MainButton class="w-full" color="green" @click="submit">
                  <template v-if="!pending">{{ $t('edit.add') }}</template>
                  <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
                </MainButton>
                <MainButton class="w-full" variant="outline" @click="open = false">{{ $t('edit.cancel') }}</MainButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
