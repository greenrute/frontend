<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()

const pending = ref(false)
const color = useState<string>('class-color', () => getRandomColor().color)

const newClass = reactive<Class>({
  name: '',
  description: '',
  color: color.value,
  country: '',
})

const randomColor = getRandomColor()
onUnmounted(() => {
  color.value = randomColor.color
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
      country: newClass.country,
    },
    baseURL: useRuntimeConfig().public.apiBase,
  })
    .then(async r => {
      $fetch('/classes/all', {
        headers: {
          'Accept-Language': locale.value,
          'Authorization': 'Bearer ' + useCookie('token').value
        },
        baseURL: useRuntimeConfig().public.apiBase,
      })
        .then(r => {
          const classes = useState<apiResponseClass[]>('classes', () => (r as any)?.data?.classes)

          const date = new Date()
          date.setMonth(date.getMonth() + 6)
          const selectedClass = useCookie<string>('selectedClass', {
            expires: date,
            sameSite: true,
          })

          if (!selectedClass.value) {
            selectedClass.value = (r as any)?.data?.classes[0].hash
            location.href = localePath('/c/' + selectedClass.value)
          } else {
            location.href = localePath('/c/' + (r as any)?.data?.classes[0].hash)
          }
        })
      pushNotification({
        status: 'success',
        message: (r as apiResponse<any>).message,
      })
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
      <div class="flex justify-between items-center flex-wrap gap-y-6">
        <div class="flex gap-6 min-w-0">
          <MainColorPicker :label="$t('new class.color')" class="shrink-0" id="class-color" v-model="newClass.color" :colors="mainColors.map(c => c.color)" />
          <MainCountryPicker v-model="newClass.country" class="min-w-0"/>
        </div>
        <MainButton type="submit" variant="solid" color="green" :disabled="pending" class="max-sm:w-full">
          <template v-if="!pending">{{ $t('empty.classes.button') }}</template>
          <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
        </MainButton>
      </div>
    </MainForm>
  </div>
</template>
