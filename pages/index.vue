<script setup lang="ts">
definePageMeta({
  layout: 'main',
  middleware: 'guest',
})

const { t } = useI18n()

useServerSeoMeta({
  title: t('homepage.title'),
})

const documentEl = ref<Document | null>(null)

const { y } = useScroll(documentEl)
const googleSignIn = useGoogleSignIn()
const promptTimeout = ref<NodeJS.Timeout | undefined>(undefined)

onMounted(() => {
  documentEl.value = document
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
    <Title>{{ $t('homepage.title') }}</Title>
    <component is="style">
      #credential_picker_container {
        top: {{ y > 0 ? y > 90 ? 20 : 112 - y : 112 }}px;
      }
    </component>
  </Head>

  <MainHeader />
  <main>
    <MainHero />
    <ClientOnly>
      <MainPrimaryFeatures />
    </ClientOnly>
    <MainFaqs />
  </main>
  <MainFooter />
</template>
