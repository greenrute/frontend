<script setup lang="ts">
const googleSignIn = useGoogleSignIn()

onMounted(() => {
  googleSignIn.prompt()
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
