<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <header class="py-10">
    <MainContainer>
      <nav class="relative z-20 flex justify-between">
        <div class="flex items-center lg:gap-x-12">
          <NuxtLink :aria-label="$t('home')" :to="localePath('/')">
            <Logo class="h-5 w-auto" />
          </NuxtLink>
          <div class="hidden lg:flex lg:gap-x-6">
            <MainNavLink :to="localePath('/') + '#features'">{{ $t('menu features') }}</MainNavLink>
            <!-- <MainNavLink :to="localePath('/') + '#testimonials'">{{ $t('menu testimonials') }}</MainNavLink> -->
            <!-- <MainNavLink :to="localePath('/') + '#pricing'">{{ $t('menu pricing') }}</MainNavLink> -->
          </div>
        </div>
        <div class="flex items-center gap-x-3 xxs:gap-x-5 lg:gap-x-8">
          <div class="hidden md:block">
            <MainNavLink :to="localePath('/login')">{{ $t('login', 1) }}</MainNavLink>
          </div>
          <MainButton :to="localePath('/register')" color="green">
              <span>
                {{ $t('get started') + ' ' }}<span class="hidden lg:inline">{{ $t('for free') }}</span>
              </span>
          </MainButton>
          <MainLangSwitcher class="hidden xxs:block -ml-2 -mr-3 lg:-ml-4 lg:mr-0" />
          <MainColorModeSwitcher class="hidden lg:block xxs:-ml-2 -mr-3 lg:-ml-4 lg:mr-0" />
          <div class="-mr-1 lg:hidden">
            <MainMobileNavigation />
          </div>
        </div>
      </nav>
    </MainContainer>
  </header>
</template>
