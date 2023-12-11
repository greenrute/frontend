<script setup lang="ts">
definePageMeta({
  layout: 'main',
})

const { t, locale } = useI18n()

useServerSeoMeta({
  ogTitle: t('menu privacy policy') + ' - GreenRute',
})
</script>

<template>
  <Head>
    <Title>GreenRute - {{ $t('menu privacy policy') }}</Title>
  </Head>

  <MainHeader />
  <main>
    <MainContainer class="max-w-prose py-10">
      <component :is="'PrivacyPolicy' + capitalizeFirstLetter(locale)" />
    </MainContainer>
  </main>
  <MainFooter />
</template>
