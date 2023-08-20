<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { HandRaisedIcon, UserGroupIcon, RectangleGroupIcon } from '@heroicons/vue/24/outline'
import { ArrowRightIcon, PlusIcon } from '@heroicons/vue/20/solid'

const localePath = useLocalePath()

const firstStage = ref<HTMLElement | null>(null)
const secondStage = ref<HTMLElement | null>(null)
const thirdStage = ref<HTMLElement | null>(null)
const currentStage = ref(firstStage.value)

watch(currentStage, newStage => {
  const wrapElement = document.getElementById('welcome-wrap-el')
  if (!newStage || !wrapElement) return
  wrapElement.style.height = wrapElement.offsetHeight + 'px'
  nextTick(() => {
    wrapElement.style.height = newStage.scrollHeight + +getComputedStyle(wrapElement).paddingTop.slice(0, -2) + +getComputedStyle(wrapElement).paddingBottom.slice(0, -2) + 'px'
  })
})

const date = new Date()
date.setFullYear(date.getFullYear() + 10)
const open = useCookie<{
  data: boolean
}>('welcome', {
  expires: date,
  sameSite: true,
})

open.value = open.value || { data: true }

const completeView = () => {
  open.value = { data: false }
}

const toSecondStage = () => {
  if (!firstStage.value || !secondStage.value || !thirdStage.value) return
  firstStage.value.style.transform = 'translateX(-100%)'
  firstStage.value.style.opacity = '0'
  secondStage.value.style.transform = 'translateX(0%)'
  secondStage.value.style.opacity = '1'
  thirdStage.value.style.transform = 'translateX(100%)'
  currentStage.value = secondStage.value
}

const toThirdStage = () => {
  if (!firstStage.value || !secondStage.value || !thirdStage.value) return
  firstStage.value.style.transform = 'translateX(-200%)'
  secondStage.value.style.transform = 'translateX(-100%)'
  secondStage.value.style.opacity = '0'
  thirdStage.value.style.transform = 'translateX(0%)'
  thirdStage.value.style.opacity = '1'
  currentStage.value = thirdStage.value
}
</script>

<template>
  <ClientOnly>
    <TransitionRoot as="template" :show="open.data">
      <Dialog as="div" class="relative z-10" @close="completeView">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 dark:bg-zinc-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity backdrop-blur" aria-hidden="true" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel id="welcome-wrap-el" class="relative transform overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div ref="firstStage" class="transition-all h-max">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <HandRaisedIcon class="h-6 w-6 text-zinc-600 dark:text-zinc-300 motion-safe:animate-wave origin-bottom" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">Вітаємо!</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-zinc-400">Ви успішно зареєструвалися в GreenRute, хочемо розказати Вам про деякі аспекти користування застосунком.</p>
                      </div>
                    </div>
                  </div>
                  <MainButton variant="solid" color="adaptive" class="mt-5 sm:mt-6 w-full" @click="toSecondStage">
                    Далі&nbsp;
                    <ArrowRightIcon class="h-4 w-4" />
                  </MainButton>
                </div>
                <div ref="secondStage" class="transition-all h-max opacity-0 absolute inset-4 top-5 sm:inset-6 translate-x-full">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
                      <UserGroupIcon class="h-6 w-6 text-yellow-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">Клас — основна структурна ланка GreenRute</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-zinc-400">GreenRute складається з класів. Ви можете їх знайти на панелі зліва &lt;-. Ви можете їх створювати та приєднуватись до класів. На головній сторінці Ви можете вибрати, який клас буде відображатись за замовчуванням.</p>
                      </div>
                    </div>
                  </div>
                  <MainButton variant="solid" color="adaptive" class="mt-5 sm:mt-6 w-full" @click="toThirdStage">
                    Далі&nbsp;
                    <ArrowRightIcon class="h-4 w-4" />
                  </MainButton>
                </div>
                <div ref="thirdStage" class="transition-all h-max opacity-0 absolute inset-4 top-5 sm:inset-6 translate-x-[200%]">
                  <div>
                    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <RectangleGroupIcon class="h-6 w-6 text-green-600" aria-hidden="true" />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-50">Спільний розклад</DialogTitle>
                      <div class="mt-2">
                        <p class="text-sm text-gray-500 dark:text-zinc-400">Всередині класів Ви можете мати спільний розклад та домашнє завдання. Ви можете керувати правами учасників і вибирати, хто може додавати завдання.</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <MainButton variant="outline" color="zinc" class="w-full" @click="completeView">Закрити</MainButton>
                    <MainButton variant="solid" color="adaptive" class="w-full mt-3 sm:mt-0" :to="localePath('/classes/new')" @click="completeView">
                      Створити клас&nbsp;
                      <PlusIcon class="h-4 w-4" />
                    </MainButton>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>
