<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()

const pending = ref(false)

const currentClass = useCurrentClass()

const newClass = reactive<Class>({
  name: currentClass.value?.name as string,
  description: currentClass.value?.description as string,
  color: currentClass.value?.color as string,
  country: currentClass.value?.country as string,
})

const update = async () => {
  pending.value = true
  const start = new Date().getTime()
  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}`, {
    method: 'PATCH',
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
    baseURL: config.public.apiBase,
  })
    .then(async r => {
      await $fetch<apiResponse<{ classes: apiResponseClass[] }>>('/classes/all', {
        headers: {
          'Accept-Language': locale.value,
          'Authorization': 'Bearer ' + useCookie('token').value
        },
        baseURL: config.public.apiBase,
      })
        .then(r => {
          useState('classes').value = r.data?.classes
        })
      pushNotification({
        status: 'success',
        message: r.message,
      })
      await navigateTo(localePath(`/c/${currentClass.value?.hash}`))
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

const deleteHandler = async () => {
  if (!confirm(t('menu.delete class.full'))) return
  await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}`, {
    method: 'DELETE',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + useCookie('token').value
    },
    baseURL: config.public.apiBase,
  })
    .then(async r => {
      useCookie<string>('selectedClass').value = ''
      pushNotification({
        status: 'success',
        message: r.message,
      })
      location.href = localePath('/dashboard')
    })
    .catch(error => {
      pushNotification({
        status: 'error',
        message: error.data?.message || t('could not connect to the server'),
      })
    })
}
</script>

<template>
  <Head>
    <Title>{{ currentClass?.name }} | {{ $t('menu.edit class info') }} - GreenRute</Title>
  </Head>

  <DashboardClassHeader />

  <div class="px-4 py-8 sm:py-16 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <h1 class="text-2xl mb-4 font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('edit.class.title') }}</h1>

    <MainForm @validated="update" class="flex flex-col gap-6">
      <MainTextInput :label="$t('new class.name')" :invalid="$t('the title must not be shorter than n characters', 3)" id="class-name" v-model="newClass.name" required minlength="3" />
      <MainTextArea :label="$t('new class.description')" id="class-description" v-model="newClass.description" />
      <div class="flex justify-between items-center flex-wrap gap-y-6">
        <div class="flex gap-6 min-w-0">
          <MainColorPicker :label="$t('new class.color')" class="shrink-0" id="class-color" v-model="newClass.color" :colors="mainColors.map((c: any) => c.color)" />
          <MainCountryPicker v-model="newClass.country" class="min-w-0"/>
        </div>
        <MainButton type="submit" variant="solid" color="green" :disabled="pending">
          <template v-if="!pending">{{ $t('edit.class.button') }}</template>
          <IconLoader v-else class="my-0.5 w-5 h-5 motion-safe:animate-loader" />
        </MainButton>
      </div>
    </MainForm>
    <hr class="border-gray-200 dark:border-zinc-700 mx-20 my-2">
    <MainButton color="reverse" @click="deleteHandler" class="border w-full group flex items-center px-4 py-2 text-sm text-gray-800 dark:text-zinc-300 border-gray-200 dark:border-zinc-700 dark:bg-zinc-900/20 hover:!bg-red-500 hover:border-red-500 dark:hover:!bg-red-600 dark:hover:border-red-600 hover:text-gray-50 active:text-gray-50 dark:hover:text-white dark:active:text-white">
      <TrashIcon class="mr-3 h-5 w-5 text-gray-500 dark:text-zinc-400 group-hover:text-gray-50 dark:group-hover:text-white" aria-hidden="true"  />
      {{ $t('menu.delete class.short') }}
    </MainButton>
  </div>
</template>
