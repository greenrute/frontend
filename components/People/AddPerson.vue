<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle, Listbox, ListboxLabel, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import { UserPlusIcon } from '@heroicons/vue/24/outline'

const { t, locale } = useI18n()
const token = useCookie('token')
const config = useRuntimeConfig()

const currentClass = useCurrentClass()

const open = ref(false)
const invalid = ref(false)

const roles = ['owner', 'admin', 'member'] as const
const email = ref('')
const selectedRole = ref<typeof roles[number]>('member')

const pending = ref(false)

const submit = async () => {
  if (email.value === '') {
    invalid.value = true
    return
  } else {
    invalid.value = false
  }

  pending.value = true
  const start = new Date().getTime()

  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}/users`, {
    method: 'POST',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + token.value,
    },
    body: {
      email: email.value,
      role: selectedRole.value,
    },
    baseURL: config.public.apiBase,
  })
    .then(r => {
      open.value = false
      email.value = ''
      selectedRole.value = 'member'
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
  <MainButton variant="outline" color="zinc" class="!px-2" @click="open = true">
    <UserPlusIcon class="w-5.5 h-5.5" aria-hidden="true" />
    <span class="sr-only">{{ $t('people.actions.add member') }}</span>
  </MainButton>

  <TransitionRoot appear :show="open" as="template">
    <Dialog as="div" @close="open = false" class="relative z-20">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 backdrop-blur" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-start lg:items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left align-middle shadow-xl transition-all">
              <MainForm @validated="submit">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">
                  {{ $t('people.actions.add member') }}
                </DialogTitle>

                <div class="mt-5">
                  <MainTextInput class="!py-1.5 !pl-3" v-model="email" name="notASearchField" id="user-add-email" :label="$t('email address')" required :invalid="$t('please enter a valid email address')" autocomplete="off" />
                </div>

                <Listbox class="mt-5" as="div" v-model="selectedRole" v-slot="{ open }">
                  <ListboxLabel class="mb-3 block text-sm font-medium text-gray-700 dark:text-zinc-300">{{ $t('people.user role') }}</ListboxLabel>
                  <div class="relative">
                    <ListboxButton class="w-full rounded-md border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-1.5 pl-3 pr-10 text-left focus:outline-none focus:ring-1 sm:text-sm focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600">
                      {{ $t('people.roles.' + selectedRole) }}
                      <div class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                        <ChevronUpDownIcon class="h-5 w-5 text-zinc-400" aria-hidden="true" />
                      </div>
                    </ListboxButton>

                    <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                      <ListboxOptions class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py py-1 sm:text-sm shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-zinc-700 focus:outline-none origin-top">
                        <ListboxOption v-for="role in roles" :key="role" :value="role" as="template" v-slot="{ active, selected }">
                          <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-800 dark:text-white" :class="active ? 'bg-gray-100 dark:bg-zinc-800' : ''">
                            <div class="flex items-center">
                              <!-- <component :is="'Emoji' + lesson.icon" class="h-4 w-4 shrink-0" /> -->
                              <span :class="['ml-3 truncate', selected && 'font-semibold']">
                                {{ $t('people.roles.' + role) }}
                              </span>
                            </div>

                            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-gray-800 dark:text-white' : 'text-green-600']">
                              <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>

                <div class="mt-5 flex gap-5 items-center flex-row-reverse">
                  <MainButton class="w-full" color="green">
                    <template v-if="!pending">{{ $t('edit.add') }}</template>
                    <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
                  </MainButton>
                  <MainButton class="w-full" variant="outline" type="button" @click="open = false">{{ $t('edit.cancel') }}</MainButton>
                </div>
              </MainForm>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
