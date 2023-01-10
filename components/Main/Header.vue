<script lang="ts" setup>
const localePath = useLocalePath()
</script>

<template>
  <header class="py-10">
    <MainContainer>
      <nav class="relative z-20 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink :aria-label="$t('home')" :to="localePath('/')">
            <Logo class="h-5 w-auto" />
          </NuxtLink>
          <div class="hidden md:flex md:gap-x-6">
            <MainNavLink to="#features">{{ $t('menu features') }}</MainNavLink>
            <MainNavLink to="#testimonials">{{ $t('menu testimonials') }}</MainNavLink>
            <MainNavLink to="#pricing">{{ $t('menu pricing') }}</MainNavLink>
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block">
            <MainNavLink :to="localePath('/login')">{{ $t('login') }}</MainNavLink>
          </div>
          <MainButton :to="localePath('/register')" color="green">
              <span>
                {{ $t('get started') + ' ' }}<span class="hidden lg:inline">{{ $t('for free') }}</span>
              </span>
          </MainButton>
          <MainLangSwitcher class="hidden md:block -ml-4" />
          <div class="-mr-1 md:hidden">
            <MainMobileNavigation />
          </div>
        </div>
      </nav>
    </MainContainer>
  </header>
</template>
