<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

const pending = ref(false)
const color = useState<string>('class-color', getRandomColor)

const newClass = reactive<Class>({
  name: '',
  description: '',
  color: color.value,
})

onUnmounted(() => {
  color.value = getRandomColor()
})

const create = async () => {
  pending.value = true
  const start = new Date().getTime()
  await $fetch('/classes/new', {
    method: 'POST',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value
    },
    body: {
      name: newClass.name,
      description: newClass.description,
      color: newClass.color,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .then(async r => {
      await navigateTo('/dashboard')
      setTimeout(() => {
        pushNotification({
          status: 'success',
          message: (r as apiResponse<any>).message,
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
    <Title>{{ $t('new class.title') }} - GreenRute</Title>
  </Head>

  <div class="px-4 py-8 sm:py-16 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <h1 class="text-2xl mb-4 font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('new class.heading') }}</h1>

    <MainForm @validated="create" class="flex flex-col gap-6">
      <MainTextInput :label="$t('new class.name')" :invalid="$t('the title must not be shorter than n characters', 3)" id="class-name" v-model="newClass.name" required minlength="3" />
      <MainTextArea :label="$t('new class.description')" id="class-description" v-model="newClass.description" />
      <div class="flex justify-between items-center">
        <MainColorPicker :label="$t('new class.color')" id="class-color" v-model="newClass.color" :colors="mainColors" />
        <MainButton type="submit" variant="solid" color="green" :disabled="pending">
          <template v-if="!pending">{{ $t('empty.classes.button') }}</template>
          <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
        </MainButton>
      </div>
    </MainForm>

  </div>
</template>
