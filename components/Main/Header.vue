<template>
  <header class="py-10">
    <MainContainer>
      <nav class="relative z-20 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink aria-label="Домівка" to="/">
            <Logo class="h-5 w-auto"/>
          </NuxtLink>
          <div class="hidden md:flex md:gap-x-6">
            <MainNavLink to="#features">Функції</MainNavLink>
            <MainNavLink to="#testimonials">Відгуки</MainNavLink>
            <MainNavLink to="#pricing">Ціни</MainNavLink>
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block">
            <MainNavLink to="/login">Увійти</MainNavLink>
          </div>
          <MainButton color="green" to="/register">
              <span>
                Розпочати <span class="hidden lg:inline">безкоштовно</span>
              </span>
          </MainButton>
          <div class="-mr-1 md:hidden">
            <MainMobileNavigation/>
          </div>
        </div>
      </nav>
    </MainContainer>
  </header>
</template>
