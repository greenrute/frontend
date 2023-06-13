<script lang="ts" setup>
const baseStyle = 'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none disabled:pointer-events-none'

const baseStyles = {
  solid: 'font-semibold focus-visible:outline-2 focus-visible:outline-offset-2',
  outline: 'ring-1 disabled:opacity-75',
}

const variantStyles = {
  solid: {
    zinc: 'bg-zinc-900 text-white hover:bg-zinc-700 hover:text-zinc-100 active:bg-zinc-800 active:text-zinc-300 focus-visible:outline-zinc-900',
    green: 'bg-green-600 text-white hover:text-zinc-100 hover:bg-green-550 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 disabled:bg-green-700',
    white: 'bg-white text-zinc-900 hover:bg-green-50 active:bg-green-200 active:text-zinc-600 focus-visible:outline-white',
    adaptive: 'bg-zinc-900 text-white hover:bg-zinc-700 hover:text-zinc-100 active:bg-zinc-800 active:text-zinc-300 focus-visible:outline-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:bg-zinc-300 dark:active:text-zinc-600 dark:focus-visible:outline-white',
  },
  outline: {
    zinc: 'ring-zinc-200 dark:ring-zinc-600 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-50 hover:ring-zinc-300 dark:hover:ring-zinc-500 active:bg-zinc-100 dark:active:bg-zinc-700 active:text-zinc-600 focus-visible:outline-green-600 focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-500',
    white: 'ring-zinc-700 text-white hover:ring-zinc-500 active:ring-zinc-700 active:text-zinc-400 focus-visible:outline-white',
    green: '',
    adaptive: '',
  },
}

type Variant = 'solid' | 'outline'
type Color = 'zinc' | 'green' | 'white' | 'adaptive'

withDefaults(defineProps<{
  variant?: Variant,
  color?: Color,
  to?: string
}>(), {
  variant: 'solid',
  color: 'zinc',
})
</script>

<template>
  <NuxtLink v-if="!!to" :class="[ baseStyle, baseStyles[variant], variantStyles[variant][color] ]" :to="to">
    <slot />
  </NuxtLink>
  <button v-else :class="[ baseStyle, baseStyles[variant], variantStyles[variant][color] ]">
    <slot />
  </button>
</template>
