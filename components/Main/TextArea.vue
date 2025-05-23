<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { ExclamationCircleIcon } from '@heroicons/vue/20/solid'

withDefaults(defineProps<{
  id: string
  label?: string
  type?: string
  invalid?: string
  required?: boolean
  modelValue: string
}>(), {
  type: 'text',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const valid = ref(true)
const input = ref(null)

defineExpose({ input })

const detect = (event: Event) => {
  valid.value = (event.target as HTMLInputElement).checkValidity()
}
</script>

<template>
  <div>
    <MainTag v-if="label" :id="id">
      {{ label }}
      <span v-if="!required" class="inline-flex items-center rounded-md bg-gray-50 dark:bg-zinc-400/10 px-2 py-1 text-xs font-medium text-zinc-600 dark:text-gray-400 ring-1 ring-inset ring-gray-500/10 dark:ring-zinc-400/20">{{ $t('optional') }}</span>
    </MainTag>
    <div class="relative rounded-md">
      <textarea :id="id" :type="type" :value="modelValue" v-bind="$attrs" :required="required" @invalid="valid = false" ref="input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value);detect($event)" :class="type === 'password' && 'font-mono'"
        class="block w-full appearance-none rounded-md dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 group-[.is-validated]/form:invalid:border-red-300 dark:group-[.is-validated]/form:invalid:border-red-600 pl-3 pr-10 py-2 text-gray-900 dark:text-zinc-50 group-[.is-validated]/form:invalid:text-red-900 dark:group-[.is-validated]/form:invalid:text-red-500 placeholder-gray-400 dark:placeholder-zinc-500 group-[.is-validated]/form:invalid:placeholder-red-300 dark:group-[.is-validated]/form:invalid:placeholder-red-900 focus:border-green-500 dark:focus:border-green-600 group-[.is-validated]/form:invalid:focus:border-red-500 dark:group-[.is-validated]/form:invalid:focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-green-500 dark:focus:ring-green-600 group-[.is-validated]/form:invalid:focus:ring-red-500 dark:group-[.is-validated]/form:invalid:focus:ring-red-600 sm:text-sm peer"
      />
      <div class="hidden group-[.is-validated]/form:peer-invalid:flex pointer-events-none absolute inset-y-0 right-0 items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500 dark:text-red-600" aria-hidden="true" />
      </div>
    </div>
    <p v-if="invalid" class="mt-2 hidden text-red-600 dark:text-red-500 text-sm" :class="!valid && 'group-[.is-validated]/form:block'">
      {{ invalid }}
    </p>
  </div>
</template>
