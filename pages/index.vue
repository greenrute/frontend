<script setup lang="ts">
const googleSignIn = useGoogleSignIn()

onMounted(() => {
  setTimeout(() => {
    googleSignIn.prompt()
  }, 5000)
})

onUnmounted(() => {
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
