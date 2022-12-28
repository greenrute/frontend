<script setup lang="ts">
import type {Ref} from 'vue'

definePageMeta({
  layout: 'home',
})

const googleSignIn = useGoogleSignIn()
const promptTimeout: Ref<NodeJS.Timeout | undefined> = ref(undefined)

onMounted(() => {
  promptTimeout.value = setTimeout(() => {
    googleSignIn.prompt()
  }, 5000)
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

  <Header />
  <main>
    <Hero />
  </main>
</template>
