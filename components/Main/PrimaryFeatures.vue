<script setup lang="ts">
const tabOrientation = ref<'horizontal' | 'vertical'>('horizontal')

watchEffect(onCleanup => {
  let lgMediaQuery = window.matchMedia('(min-width: 1024px)')

  const onMediaQueryChange = ({ matches }: { matches: boolean }) => {
    tabOrientation.value = matches ? 'vertical' : 'horizontal'
  }

  onMediaQueryChange(lgMediaQuery)
  lgMediaQuery.addEventListener('change', onMediaQueryChange)

  onCleanup(() => {
    lgMediaQuery.removeEventListener('change', onMediaQueryChange)
  })
})
</script>

<template>
  <section id="features" aria-label="Features for running your books" class="relative overflow-hidden bg-green-600 pb-28 pt-20 sm:py-32">
    <NuxtImg class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]" src="/img/auth-background.jpg" alt="" width="2245" height="1636" />
  </section>
</template>
