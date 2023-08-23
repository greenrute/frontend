<script setup lang="ts">
definePageMeta({
  layout: 'main',
  middleware: 'guest',
})

const googleSignIn = useGoogleSignIn()
const promptTimeout = ref<NodeJS.Timeout | undefined>(undefined)

onMounted(() => {
  promptTimeout.value = setTimeout(() => {
    googleSignIn.prompt()
  }, 3000)
})

onUnmounted(() => {
  clearTimeout(promptTimeout.value)
  googleSignIn.cancel()
})
</script>

<template>
  <Head>
    <Title>GreenRute - твій шкільний помічник</Title>
  </Head>

  <MainHeader />
  <main>
    <MainHero />
  </main>
</template>
