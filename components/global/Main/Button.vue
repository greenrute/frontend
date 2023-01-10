<script lang="ts" setup>
const baseStyles = {
  solid: 'group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none',
  outline: 'group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none disabled:opacity-75 disabled:pointer-events-none',
}

const variantStyles = {
  solid: {
    zinc: 'bg-zinc-900 text-white hover:bg-zinc-700 hover:text-zinc-100 active:bg-zinc-800 active:text-zinc-300 focus-visible:outline-zinc-900',
    green: 'bg-green-600 text-white hover:text-zinc-100 hover:bg-green-550 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 disabled:bg-green-700',
    white: 'bg-white text-zinc-900 hover:bg-green-50 active:bg-green-200 active:text-zinc-600 focus-visible:outline-white',
  },
  outline: {
    zinc: 'ring-zinc-200 text-zinc-700 hover:text-zinc-900 hover:ring-zinc-300 active:bg-zinc-100 active:text-zinc-600 focus-visible:outline-green-600 focus-visible:ring-zinc-300',
    white: 'ring-zinc-700 text-white hover:ring-zinc-500 active:ring-zinc-700 active:text-zinc-400 focus-visible:outline-white',
  },
}

type Variant = 'solid' | 'outline'
type Color = 'zinc' | 'green' | 'white'

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
  <NuxtLink v-if="!!to" :class="[ baseStyles[variant], variantStyles[variant][color] ]" :to="to">
    <slot/>
  </NuxtLink>
  <button v-else :class="[ baseStyles[variant], variantStyles[variant][color] ]">
    <slot/>
  </button>
</template>
