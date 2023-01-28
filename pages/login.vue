<script setup lang="ts">
import {ArrowSmallRightIcon} from '@heroicons/vue/20/solid/index'
import {Ref} from 'vue'

definePageMeta({
  layout: 'main',
  middleware: 'guest',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

const googleSignIn = useGoogleSignIn()
const googleSignInButton: Ref<HTMLDivElement | null> = ref(null)

const email: Ref<{ input: HTMLInputElement } | null> = ref(null)
const password: Ref<{ input: HTMLInputElement } | null> = ref(null)

onMounted(() => {
  googleSignIn.render(googleSignInButton, 'signin_with')

  if (credentials.email === '' && !!email.value) {
    credentials.email = email.value?.input.value
  }
  if (credentials.password === '' && !!password.value) {
    credentials.password = password.value?.input.value
  }
})

const pending = ref(false)

const credentials = reactive({
  email: '',
  password: '',
})

const login = async () => {
  pending.value = true
  const start = new Date().getTime()
  await $fetch('/users/login', {
    method: 'POST',
    headers: { 'Accept-Language': locale.value },
    body: {
      email: credentials.email,
      password: credentials.password,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .then(async r => {
      const date = new Date()
      date.setMonth(date.getMonth() + 6)
      useCookie('token', {
        expires: date,
        sameSite: true,
      }).value = (r as apiResponse).data?.token?.token || null
      useCookie<UserCookie>('user', {
        expires: date,
        sameSite: true,
      }).value = {
        id: (r as apiResponse).data?.user?.id,
        email: (r as apiResponse).data?.user?.email,
        name: (r as apiResponse).data?.user?.name,
        picture: (r as apiResponse).data?.user?.picture,
      }
      await navigateTo('/dashboard')
      setTimeout(() => {
        pushNotification({
          status: 'success',
          message: (r as apiResponse).message,
        })
      }, 150)
    })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
    })
    .finally(() => {
      const difference = new Date().getTime() - start

      if (difference > 300) {
        pending.value = false
      } else {
        setTimeout(() => {
          pending.value = false
        }, 300 - difference)
      }
    })
}
</script>

<template>
  <Head>
    <Title>{{ $t('login', 0) }} - GreenRute</Title>
  </Head>

  <div class="relative flex min-h-full justify-center md:px-12 lg:px-0">
    <div class="relative z-10 flex flex-1 flex-col bg-white dark:bg-zinc-900 py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
      <div class="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
        <div class="flex flex-col">
          <div class="flex items-center justify-between">
            <NuxtLink :to="localePath('/')" :aria-label="$t('home')">
              <Logo class="h-5 w-auto" />
            </NuxtLink>
            <MainLangSwitcher />
          </div>
          <div class="mt-20">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-zinc-50">
              {{ $t('sign in to your account') }}
            </h2>
            <p class="mt-2 text-sm text-gray-700 dark:text-zinc-300">
              {{ $t("don't have an account") + ' ' }}
              <NuxtLink :to="localePath('/register')" class="font-medium text-green-600 dark:text-green-500 hover:underline">{{ $t('register', 3) }}</NuxtLink>
              {{ $t('for free') }}
            </p>
          </div>
        </div>
        <MainForm @validated="login" class="mt-10 grid grid-cols-1 gap-y-8">
          <MainTextInput :label="$t('email address')" :invalid="$t('please enter a valid email address')" id="email" type="email" v-model="credentials.email" ref="email" autocomplete="email" required />
          <MainTextInput :label="$t('password')" :invalid="$t('the password must be at least n characters long', 3)" id="password" type="password" v-model="credentials.password" ref="password" autocomplete="current-password" required minlength="3" />
          <div>
            <MainButton type="submit" variant="solid" color="green" class="w-full" :disabled="pending">
              <template v-if="!pending">
                {{ $t('login', 1) }}
                <ArrowSmallRightIcon aria-hidden="true" class="w-5 h-5 -mb-0.25" />
              </template>
              <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
            </MainButton>
            <div ref="googleSignInButton" class="mt-4 h-10 overflow-hidden [color-scheme:light]" />
          </div>
        </MainForm>
      </div>
    </div>
    <div class="hidden sm:contents lg:relative lg:block lg:flex-1">
      <nuxt-img class="absolute inset-0 h-full w-full object-cover object-left bg-green-600" src="/img/auth-background.jpg" alt="" />
    </div>
  </div>
</template>
