<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps<{
  dayIndex: number
  invalid?: string
  modelValue: Date
}>()

defineEmits<{ (e: 'update:modelValue', value: Date): void }>()

const valid = ref(true)
const input = ref(null)
const weekDays = computed(() => {
  let days = [0, 1, 2, 3, 4, 5, 6]
  const index = days.indexOf(props.dayIndex)

  if (index !== -1) {
    days.splice(index, 1)
  } else {
    days.splice(1, 5)
  }

  return days
})

defineExpose({ input })

const { t, locale } = useI18n()
const colorMode = useColorMode()
const themeCookie = useCookie<string>('theme-color')

const isDarkTheme = computed(() => colorMode.value !== 'system' ? colorMode.value === 'dark' : themeCookie.value === 'dark')
</script>

<template>
  <div>
    <div class="relative rounded-md">
      <VueDatePicker :enable-time-picker="false" :model-value="modelValue" @update:model-value="newDate => $emit('update:modelValue', newDate ?? getNearestDay(props.dayIndex))" :locale="locale" :week-start="0" :disabled-week-days="weekDays" :cancel-text="$t('edit.cancel')" :select-text="$t('edit.select')" :dark="isDarkTheme" :teleport="true">
        <template #dp-input="{ isMenuOpen }">
          <input type="text" :value="`${modelValue.getDate().toString().padStart(2, '0')}.${(modelValue.getMonth() + 1).toString().padStart(2, '0')}.${modelValue.getFullYear()}`" v-bind="$attrs" ref="input"
            class="block w-full appearance-none rounded-md dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 group-[.is-validated]/form:invalid:border-red-300 dark:group-[.is-validated]/form:invalid:border-red-600 pl-3 pr-10 py-2 text-gray-900 dark:text-zinc-50 group-[.is-validated]/form:invalid:text-red-900 dark:group-[.is-validated]/form:invalid:text-red-500 placeholder-gray-400 dark:placeholder-zinc-500 group-[.is-validated]/form:invalid:placeholder-red-300 dark:group-[.is-validated]/form:invalid:placeholder-red-900 focus:border-green-500 dark:focus:border-green-600 group-[.is-validated]/form:invalid:focus:border-red-500 dark:group-[.is-validated]/form:invalid:focus:border-red-600 focus:outline-none focus:ring-green-500 dark:focus:ring-green-600 group-[.is-validated]/form:invalid:focus:ring-red-500 dark:group-[.is-validated]/form:invalid:focus:ring-red-600 sm:text-sm peer"
            :class="isMenuOpen ? 'border border-green-500 dark:border-green-600 group-[.is-validated]/form:invalid:border-red-500 dark:group-[.is-validated]/form:invalid:border-red-600 outline-none ring-1 ring-green-500 dark:ring-green-600 group-[.is-validated]/form:invalid:ring-red-500 dark:group-[.is-validated]/form:invalid:ring-red-600 on-top' : ''"
          />
        </template>
      </VueDatePicker>
      <div class="hidden group-[.is-validated]/form:peer-invalid:flex pointer-events-none absolute inset-y-0 right-0 items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 dark:text-red-600" aria-hidden="true" />
      </div>
    </div>
    <p v-if="invalid" class="mt-2 hidden text-red-600 dark:text-red-500 text-sm" :class="!valid && 'group-[.is-validated]/form:block'">
      {{ invalid }}
    </p>
  </div>
</template>
