<script setup lang="ts">
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { actions, type Action } from '~/utils/actions'

const localePath = useLocalePath()
const classes = useState<apiResponseClass[]>('classes')

const availableActions = computed(() => [
  ...classes.value.map(c => <Action>{
    id: c.id * 100,
    name: c.name,
    icon: c.color,
    action: () => navigateTo(localePath(`/c/${c.hash}`)),
  }),
  ...actions()
])

const show = ref<boolean>(false)
const query = ref<string>('')
const selectedAction = ref(null)
const filteredActions = computed(() =>
  query.value === ''
    ? availableActions.value
    : availableActions.value.filter((action) => {
      return action?.name.toLowerCase().includes(query.value.toLowerCase())
    })
)

watch(selectedAction, (newAction: Action | null) => {
  if (newAction === null) return
  newAction.action()
  show.value = false
  selectedAction.value = null
})

const blurHandler = () => {
  setTimeout(() => {
    if (!(document.activeElement as HTMLElement)?.dataset?.headlessuiState) {
      show.value = false
    }
  }, 0)
}
</script>

<template>
  <Combobox as="div" v-model="selectedAction" v-slot="{ open }">
    <ComboboxLabel class="sr-only">{{ $t('menu.search') }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxButton class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <MagnifyingGlassIcon class="mr-3 h-4 w-4 text-gray-400 dark:text-zinc-400" aria-hidden="true" />
      </ComboboxButton>
      <!--suppress JSUnusedLocalSymbols -->
      <ComboboxInput class="block w-full rounded-md dark:bg-zinc-900 border-gray-300 dark:border-zinc-700 dark:placeholder-zinc-400 pl-9 focus:border-green-500 dark:focus:border-green-600 focus:ring-green-500 dark:focus:ring-green-600 sm:text-sm" @focus="show = true" @blur="blurHandler" @change="query = $event.target.value" :display-value="(action) => (action as any)?.name" :placeholder="$t('menu.search')" />

      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
        <div v-if="show || open">
          <ComboboxOptions static v-if="filteredActions.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black dark:ring-zinc-700 ring-opacity-5 focus:outline-none sm:text-sm">
            <ComboboxOption v-for="action in filteredActions" :key="action?.id" :value="action" as="div" v-slot="{ active, selected }">
              <li class="relative cursor-default select-none py-2 pl-3 pr-9" :class="active ? 'bg-green-600 text-white' : 'text-gray-900 dark:text-zinc-300'">
                <div class="flex items-center">
                <span class="inline-flex justify-center items-center h-4 w-4 flex-shrink-0" aria-hidden="true">
                  <div v-if="typeof action?.icon === 'string'" class="h-3 w-3 rounded-full" :style="{ backgroundColor: action?.icon }" />
                  <component v-else :is="action?.icon" class="h-4 w-4" aria-hidden="true" />
                </span>
                  <span class="block ml-2 truncate" :class="selected ? 'font-semibold' : ''">
                  {{ action?.name }}
                </span>
                </div>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </div>
      </transition>
    </div>
  </Combobox>
</template>
