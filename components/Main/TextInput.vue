<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import {ExclamationCircleIcon} from '@heroicons/vue/20/solid/index'

withDefaults(defineProps<{
  id: string
  label?: string
  type?: string
  invalid?: string
  modelValue: string
}>(), {
  type: 'text',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const valid = ref(true)

const detect = (event: Event) => {
  valid.value = (event.target as HTMLInputElement).checkValidity()
}
</script>

<template>
  <div>
    <MainTag v-if="label" :id="id">{{ label }}</MainTag>
    <div class="relative rounded-md">
      <input :id="id" :type="type" :value="modelValue" v-bind="$attrs" @invalid="valid = false"
             @input="$emit('update:modelValue', $event.target.value);detect($event)" :class="type === 'password' && 'font-mono'"
             class="block w-full appearance-none rounded-md border border-gray-200 group-[.is-validated]/form:invalid:border-red-300 pl-3 pr-10 py-2 text-gray-900 group-[.is-validated]/form:invalid:text-red-900 placeholder-gray-400 group-[.is-validated]/form:invalid:placeholder-red-300 focus:border-green-500 group-[.is-validated]/form:invalid:focus:border-red-500 focus:outline-none focus:ring-green-500 group-[.is-validated]/form:invalid:focus:ring-red-500 sm:text-sm peer"
      />
      <div class="hidden group-[.is-validated]/form:peer-invalid:flex pointer-events-none absolute inset-y-0 right-0 items-center pr-3">
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" aria-hidden="true" />
      </div>
    </div>
    <p v-if="invalid" class="mt-2 hidden text-red-600 text-sm" :class="!valid && 'group-[.is-validated]/form:block'">
      {{ invalid }}
    </p>
  </div>
</template>
