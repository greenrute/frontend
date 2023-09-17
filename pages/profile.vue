<script setup lang="ts">
import { CameraIcon } from '@heroicons/vue/20/solid'
import { DocumentArrowUpIcon } from '@heroicons/vue/24/outline'

definePageMeta({
  layout: 'auth',
  middleware: 'auth',
})

const { t, locale } = useI18n()
const token = useCookie('token')
const config = useRuntimeConfig()
const localePath = useLocalePath()

const userCookie = useCookie<UserCookie>('user')
const user = useUser()
const userData = ref({
  ...toRaw(user.value),
  oldPassword: '',
  newPassword: '',
  repeatedPassword: '',
})

const fileInput = ref<HTMLInputElement | null>(null)
const overlay = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('dragenter', (event: DragEvent) => {
    event.stopPropagation()
    event.preventDefault()
    overlay.value = true
  })
})

const openFile = () => {
  if (fileInput.value) fileInput.value.click()
}

const fileInputHandler = (event: Event) => {
  updateProfilePicture((event.target as HTMLInputElement).files?.[0])
}

const dropHandler = (event: DragEvent) => {
  overlay.value = false
  updateProfilePicture(event.dataTransfer?.files?.[0])
}

const updateProfilePicture = async (file: File | undefined) => {
  if (!file) return
  let formData = new FormData()
  formData.append('picture', file)

  await $fetch<apiResponse<{ picture: string }>>('/users/picture', {
    method: 'PUT',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + token.value
    },
    body: formData,
    baseURL: config.public.apiBase,
  })
    .then(r => {
      userCookie.value.picture = r.data?.picture
      pushNotification({
        status: 'success',
        message: r.message
      })
      setTimeout(() => {
        reloadNuxtApp()
      }, 400)
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
    <Title>{{ $t('menu.view profile') }} - GreenRute</Title>
  </Head>

  <div class="px-4 py-8 sm:py-16 flex flex-col gap-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    <div class="fixed inset-y-0 right-0 left-0 lg:left-64 z-20 bg-gray-50/70 dark:bg-zinc-900/70 flex items-center justify-center p-10" @dragleave.stop.prevent="overlay = false" @dragover.stop.prevent @drop.stop.prevent="dropHandler" :class="overlay ? 'visible' : 'invisible'">
      <div class="pointer-events-none w-full h-full text-gray-950 border-gray-950 dark:text-zinc-50 dark:border-zinc-50 border-2 border-dashed rounded-xl gap-2 flex flex-col items-center justify-center">
        <DocumentArrowUpIcon class="h-16 w-16 stroke-1" aria-hidden="true" />
        {{ $t('profile.drop here') }}
      </div>
    </div>

    <h1 class="text-2xl mb-3 font-display font-semibold text-gray-900 dark:text-zinc-50 sm:truncate">{{ $t('menu.view profile') }}</h1>

    <div>
      <h4 class="text-xl font-overpass font-medium mb-2">{{ $t('profile.general info') }}</h4>
      <div class="border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
        <div class="flex justify-between gap-8 max-[410px]:flex-col-reverse max-[410px]:gap-4">
          <div class="[&_label]:mb-2 w-full flex flex-col gap-3">
            <MainTextInput v-model="(userData.name as string)" id="name-input" :label="$t('name')" />
            <MainTextInput v-model="(userData.email as string)" id="email-input" :label="$t('email address')" />
          </div>
          <div class="shrink-0">
            <div class="mb-2">{{ $t('profile.photo') }}</div>
            <input ref="fileInput" @change="fileInputHandler" type="file" id="picture" accept="image/png,image/jpg,image/jpeg" class="hidden">
            <button @click="openFile" class="block h-24 w-24 group cursor-pointer max-[410px]:h-28 max-[410px]:w-28 max-[410px]:mx-auto flex-shrink-0 rounded-full overflow-hidden relative">
              <img class="bg-gray-300 dark:bg-zinc-700 object-cover w-full h-full" :src="user?.picture ?? 'https://gravatar.com/avatar?d=mp'" alt="" />
              <div class="absolute bottom-0 inset-x-0 flex items-center justify-center bg-black/50 p-1 transition-opacity ease-out duration-200 [@media(hover:hover)]:opacity-0 group-hover:opacity-100">
                <CameraIcon class="h-5 w-5" aria-hidden="true" />
              </div>
            </button>
            <button @click="openFile" class="w-full mt-2 lg:mt-1 text-base text-green-600 dark:text-green-500">{{ $t('profile.change picture') }}</button>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h4 class="text-xl font-overpass font-medium mb-2">{{ $t('profile.сhange password') }}</h4>
      <div class="border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 rounded-xl p-4">
        <div class="flex justify-between gap-8">
          <div class="[&_label]:mb-2 w-full flex flex-col gap-3">
            <MainTextInput v-model="userData.oldPassword" id="old-password-input" :label="$t('profile.old password')" type="password" autocomplete="current-password" />
            <MainTextInput v-model="userData.newPassword" id="new-password-input" :label="$t('profile.new password')" type="password" autocomplete="new-password" />
            <MainTextInput v-model="userData.repeatedPassword" id="repeat-password-input" :label="$t('profile.repeat password')" type="password" autocomplete="new-password" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
