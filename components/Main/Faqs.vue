<template>
  <section id="faq" aria-labelledby="faq-title" class="relative overflow-hidden bg-gray-50 dark:bg-zinc-900 py-20 sm:py-32">
    <NuxtImg class="absolute inset-x-0 bottom-0 top-auto min-h-full w-full" src="/img/faqs-background.png" alt="" width="1558" height="946" />
    <MainContainer class="relative">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 id="faq-title" class="font-display text-3xl tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">{{ $t('homepage.faqs.title') }}</h2>
        <p class="mt-4 text-lg tracking-tight text-gray-700 dark:text-zinc-400">{{ $t('homepage.faqs.description') }}</p>
      </div>
      <ul role="list" class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
        <li v-for="(column, columnIndex) in $tm('homepage.faqs.items')" :key="columnIndex">
          <ul role="list" class="flex flex-col gap-y-8">
            <li v-for="(faq, faqIndex) in $tm(`homepage.faqs.items[${String(columnIndex)}]`)" :key="faqIndex">
              <h3 class="font-display text-lg leading-7 text-gray-900 dark:text-zinc-200">
                {{ $t(`homepage.faqs.items[${String(columnIndex)}][${String(faqIndex)}].question`) }}
              </h3>
              <p class="mt-4 text-sm text-gray-700 dark:text-zinc-400">{{ $t(`homepage.faqs.items[${String(columnIndex)}][${String(faqIndex)}].answer`) }}</p>
            </li>
          </ul>
        </li>
      </ul>
    </MainContainer>
  </section>
</template>
