<script setup lang="ts">
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const { t, locale } = useI18n()
const colorMode = useColorMode()
const tf = (index: number, key: string) => t(`homepage.features.items[${index}].${key}`)

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

const features = computed(() => [
  {
    title: tf(0, 'title'),
    description: tf(0, 'description'),
    image: 'dashboard',
  },
  {
    title: tf(1, 'title'),
    description: tf(1, 'description'),
    image: 'schedule',
  },
  {
    title: tf(2, 'title'),
    description: tf(2, 'description'),
    image: 'people',
  },
  {
    title: tf(3, 'title'),
    description: tf(3, 'description'),
    image: 'homework',
  },
])
</script>

<template>
  <section id="features" aria-label="Features for running your books" class="relative overflow-hidden bg-green-600 pb-28 pt-20 sm:py-32">
    <NuxtImg class="absolute left-1/2 top-1/2 max-w-none translate-x-[-44%] translate-y-[-42%]" src="/img/features-background.jpg" alt="" width="2245" height="1636" />
    <MainContainer class="relative">
      <div class="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 class="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">{{ $t('homepage.features.title') }}</h2>
        <p class="mt-6 text-lg tracking-tight text-green-100">{{ $t(`homepage.features.descriptions[${getRandomInt(6)}]`) }}</p>
      </div>
      <TabGroup as="div" class="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0" :vertical="tabOrientation === 'vertical'" :default-index="0" v-slot="{ selectedIndex }">
        <div class="-mx-4 flex overflow-x-auto pb-4 sm:mx-0 sm:overflow-visible sm:pb-0 lg:col-span-5">
          <TabList class="relative z-10 flex gap-x-4 whitespace-nowrap px-4 sm:mx-auto sm:px-0 lg:mx-0 lg:block lg:gap-x-0 lg:gap-y-1 lg:whitespace-normal">
            <div v-for="(feature, featureIndex) in features" :key="feature.title" class="group relative rounded-full px-4 py-1 lg:rounded-l-xl lg:rounded-r-none lg:p-6" :class="selectedIndex === featureIndex ? 'bg-white lg:bg-white/10 lg:ring-1 lg:ring-inset lg:ring-white/10' : 'hover:bg-white/10 lg:hover:bg-white/5'">
              <h3>
                <Tab class="font-display text-lg [&:not(:focus-visible)]:focus:outline-none" :class="selectedIndex === featureIndex ? 'text-green-600 lg:text-white' : 'text-green-100 hover:text-white lg:text-white'">
                  <span class="absolute inset-0 rounded-full lg:rounded-l-xl lg:rounded-r-none" />
                  {{ feature.title }}
                </Tab>
              </h3>
              <p class="mt-2 hidden text-sm lg:block" :class="selectedIndex === featureIndex ? 'text-white' : 'text-green-100 group-hover:text-white'">{{ feature.description }}</p>
            </div>
          </TabList>
        </div>
        <TabPanels class="lg:col-span-7">
          <TabPanel v-for="feature in features" :key="feature.title" :unmount="false">
            <div class="relative sm:px-6 lg:hidden">
              <div class="absolute -inset-x-4 bottom-[-4.25rem] top-[-6.5rem] bg-white/10 ring-1 ring-inset ring-white/10 sm:inset-x-0 sm:rounded-t-xl" />
              <p class="relative mx-auto max-w-2xl text-base text-white sm:text-center">
                {{ feature.description }}
              </p>
            </div>
            <div class="mt-10 w-[45rem] overflow-hidden rounded-xl bg-slate-50 shadow-xl shadow-green-900/20 sm:w-auto lg:mt-0 lg:w-[67.8125rem]">
              <NuxtImg class="w-full" :src="`/img/screenshots/${colorMode.value}/${locale}/${feature.image}.png`" alt="" sizes="45rem md:100vw lg:67.8125rem" />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </MainContainer>
  </section>
</template>
