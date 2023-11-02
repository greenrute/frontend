<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const { locale } = useI18n()
</script>

<template>
  <Head>
    <Title>GreenRute - {{ $t('menu privacy policy') }}</Title>
  </Head>

  <MainHeader />
  <main>
    <MainContainer class="max-w-prose py-10">
      <component :is="'PrivacyPolicy' + locale.toUpperCase()" />
    </MainContainer>
  </main>
  <MainFooter />
</template>
