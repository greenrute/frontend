<script setup lang="ts">
import {ArrowSmallRightIcon} from '@heroicons/vue/20/solid/index'

const googleSignIn = useGoogleSignIn()

const googleSignInButton = ref(null)

onMounted(() => {
  googleSignIn.render(googleSignInButton, 'signin_with')
})
</script>

<template>
  <Head>
    <Title>Вхід - GreenRute</Title>
  </Head>

  <div class="relative flex min-h-full justify-center md:px-12 lg:px-0">
    <div class="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
      <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
        <div class="flex flex-col">
          <NuxtLink to="/" aria-label="Домівка">
            <Logo class="h-5 w-auto" />
          </NuxtLink>
          <div class="mt-20">
            <h2 class="text-lg font-semibold text-gray-900">
              Увійдіть у свій акаунт
            </h2>
            <p class="mt-2 text-sm text-gray-700">
              Не маєте акаунта?{{ ' ' }}
              <NuxtLink to="/register" class="font-medium text-green-600 hover:underline">Зареєструйтеся</NuxtLink>
              безкоштовно.
            </p>
          </div>
        </div>
        <form action="#" class="mt-10 grid grid-cols-1 gap-y-8">
          <InputField label="Адреса електронної пошти" id="email" type="email" autocomplete="email" required />
          <InputField label="Пароль" id="password" type="password" autocomplete="current-password" required />
          <div>
            <Button type="submit" variant="solid" color="green" class="w-full">
              Увійти
              <ArrowSmallRightIcon aria-hidden="true" class="w-5 h-5 -mb-0.25" />
            </Button>
            <div ref="googleSignInButton" class="mt-4"></div>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden sm:contents lg:relative lg:block lg:flex-1">
      <nuxt-img class="absolute inset-0 h-full w-full object-cover object-left" src="/img/auth-background.jpg" alt="" />
    </div>
  </div>
</template>
