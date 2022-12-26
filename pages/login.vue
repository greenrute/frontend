<script setup lang="ts">
const config = useRuntimeConfig()

interface gsiResponse {
  clientId: string,
  client_id: string,
  credential: string,
  select_by: string,
}

const handleCredentialResponse = (response: gsiResponse) => {
  console.log(response.credential)
}

onMounted(() => {
  if (!Array.from(document.querySelectorAll('script')).map(s => s.src).includes('https://accounts.google.com/gsi/client')) {
    console.log('script is not set')
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    document.head.append(script)

    script.addEventListener('load', () => {
      nextTick(() => {
        console.log('loaded');
        (window as any).google.accounts.id.initialize({
          client_id: config.public.gsiClientID,
          callback: handleCredentialResponse,
        });
        (window as any).google.accounts.id.prompt();
      })
    })
  } else {
    console.log('script is set');
    (window as any).google.accounts.id.initialize({
      client_id: config.public.gsiClientID,
      callback: handleCredentialResponse,
    });
    (window as any).google.accounts.id.prompt();
  }
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
              <span aria-hidden="true">&nbsp;&rarr;</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
    <div class="hidden sm:contents lg:relative lg:block lg:flex-1">
      <nuxt-img class="absolute inset-0 h-full w-full object-cover object-left" src="/img/auth-background.jpg" alt="" />
    </div>
  </div>
</template>
