<script setup lang="ts">
defineProps<{
  home: boolean
}>()
</script>

<template>
  <header class="py-10">
    <Container>
      <nav class="relative z-50 flex justify-between">
        <div class="flex items-center md:gap-x-12">
          <NuxtLink aria-label="Home" to="/" v-if="home">
            <Logo class="h-5 w-auto" />
          </NuxtLink>
          <Logo class="h-5 w-auto" v-else />
          <div class="hidden md:flex md:gap-x-6">
            <NavLink to="#features">Функції</NavLink>
            <NavLink to="#testimonials">Відгуки</NavLink>
            <NavLink to="#pricing">Ціни</NavLink>
          </div>
        </div>
        <div class="flex items-center gap-x-5 md:gap-x-8">
          <div class="hidden md:block">
            <NavLink to="/login">Увійти</NavLink>
          </div>
          <Button color="green" to="/register">
              <span>
                Розпочати <span class="hidden lg:inline">безкоштовно</span>
              </span>
          </Button>
          <div class="-mr-1 md:hidden">
            <MobileNavigation/>
          </div>
        </div>
      </nav>
    </Container>
  </header>
</template>
