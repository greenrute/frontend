<script setup lang="ts">
import { HomeIcon, ListBulletIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/20/solid'

const route = useRoute()
const { locale } = useI18n()
const localePath = useLocalePath()
const sidebarOpen = ref<boolean>(false)
const openSidebar = () => sidebarOpen.value = true
const closeSidebar = () => sidebarOpen.value = false

const navigation: NavMenuItem[] = [
  { name: 'menu.schedule', href: '/dashboard', icon: HomeIcon },
  { name: 'menu.homework', href: '/homework', icon: ListBulletIcon },
]

const { data } = await useFetch<apiResponse<{ classes: apiResponseClass[] }>>('/classes/all', {
  headers: {
    'Accept-Language': locale.value,
    'Authorization': 'Bearer ' + useCookie('token').value,
  },
  baseURL: useRuntimeConfig().public.apiBase,
})

const classes = useState<apiResponseClass[]>('classes', () => data.value?.data?.classes as apiResponseClass[])
const currentClass = useCurrentClass()

onMounted(() => {
  if (!classes.value || classes.value.filter(c => c.hash === useCookie('selectedClass').value).length === 0) {
    useCookie('selectedClass').value = null
  }
})
</script>

<template>
  <Html class="h-full scroll-smooth">

  <Body class="h-full bg-white dark:bg-zinc-900" />

  </Html>

  <div class="min-h-full">
    <DashboardMobileSidebar :sidebar-open="sidebarOpen" :navigation="navigation" :classes="classes" @close="closeSidebar" />

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-gray-200 dark:lg:border-zinc-600 lg:bg-gray-100 dark:lg:bg-zinc-800 lg:pt-6 lg:pb-5">
      <div class="flex flex-shrink-0 items-center px-6">
        <Logo class="h-5 w-auto" />
      </div>
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
        <!-- User account dropdown -->
        <SideAccountDropdown class="px-3" />
        <!-- Sidebar Search -->
        <SideSearch class="mt-5 px-3" />
        <!-- Navigation -->
        <nav class="mt-6 px-3">
          <div class="space-y-1">
            <NuxtLink v-for="item in navigation" :key="item.name" :to="item.href" custom v-slot="{ href, navigate, isActive, isExactActive }">
              <a :href="localePath(href)" @click="navigate" class="group flex items-center px-2 py-2 text-sm font-medium rounded-md" :class="isActive ? 'bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-zinc-50' : 'text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-zinc-50 hover:bg-gray-50 dark:hover:bg-zinc-900'" :aria-current="isExactActive ? 'page' : undefined">
                <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6" :class="isActive ? 'text-gray-500 dark:text-zinc-300' : 'text-gray-400 dark:text-zinc-400 group-hover:text-gray-500 dark:group-hover:text-zinc-300'" aria-hidden="true" />
                {{ $t(item.name) }}
              </a>
            </NuxtLink>
          </div>
          <div class="mt-8">
            <!-- Secondary navigation -->
            <h3 class="flex justify-between items-center px-3 text-sm font-medium text-gray-500 dark:text-zinc-400" id="desktop-classes-headline">
              {{ $t('menu.my classes') }}
              <NuxtLink :to="localePath('/classes/new')" v-if="classes?.length" class="hover:text-gray-600 dark:hover:text-zinc-300">
                <PlusIcon class="h-5 w-5" aria-hidden="true" />
                <span class="sr-only">{{ $t('empty.classes.button') }}</span>
              </NuxtLink>
            </h3>
            <div v-if="classes?.length" class="mt-1 space-y-1" role="group" aria-labelledby="desktop-classes-headline">
              <NuxtLink v-for="classItem in classes" :key="classItem.hash" :to="localePath('/c/' + classItem.hash)" custom v-slot="{ href, navigate, isExactActive }">
                <a :href="href" @click="navigate" class="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-zinc-200 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-white" :aria-current="isExactActive ? 'page' : undefined">
                  <span class="w-2.5 h-2.5 mr-3 rounded-full" :style="{ backgroundColor: classItem.color }" aria-hidden="true" />
                  <span class="truncate">{{ classItem.name }}</span>
                </a>
              </NuxtLink>
            </div>
            <div v-else-if="route.name === 'dashboard' || route.name === 'classes-new'" class="mt-1 px-3 text-sm text-gray-400 dark:text-zinc-500">{{ $t('empty.classes.description alt') }}</div>
            <div v-else class="mt-2 px-3">
              <MainButton variant="outline" color="zinc" class="inline-flex items-center" :to="localePath('/classes/new')">
                <PlusIcon class="-ml-1 mr-1.5 h-5 w-5" aria-hidden="true" />
                {{ $t('empty.classes.button') }}
              </MainButton>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <!-- Main column -->
    <div class="flex flex-col lg:pl-64">
      <!-- Search header -->
      <DashboardMobileHeader @open="openSidebar" />
      <main class="min-h-screen relative flex-1">
        <slot />

        <div v-if="route.params.hash" class="bg-cover bg-center absolute inset-0 -z-10 opacity-5" :style="{ backgroundImage: `url('/img/patterns/${getColorName(currentClass.color)}.png')` }" />
      </main>

    </div>
  </div>

  <Notification />
  <Welcome />
</template>
