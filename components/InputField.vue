<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
withDefaults(defineProps<{
  id: string
  label?: string
  type?: string
  modelValue: string
}>(), {
  type: 'text',
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div>
    <InputLabel v-if="label" :id="id">{{ label }}</InputLabel>
    <input :id="id" :type="type" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" class="block w-full appearance-none rounded-md border border-gray-200 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm" :class="type === 'password' && 'font-system'" />
  </div>
</template>
