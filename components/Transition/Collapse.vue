<script lang="ts" setup>
const beforeEnter = (el: Element): void => {
  requestAnimationFrame(() => {
    if (!(el as HTMLElement).style.height) {
      (el as HTMLElement).style.height = '0px'
    }

    (el as HTMLElement).style.display = ''
  })
}

const enter = (el: Element): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      (el as HTMLElement).style.height = (el as HTMLElement).scrollHeight + 'px'
    })
  })
}

const afterEnter = (el: Element): void => {
  (el as HTMLElement).style.height = ''
}

const beforeLeave = (el: Element): void => {
  requestAnimationFrame(() => {
    if (!(el as HTMLElement).style.height) {
      (el as HTMLElement).style.height = (el as HTMLElement).offsetHeight + 'px'
    }
  })
}

const leave = (el: Element): void => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      (el as HTMLElement).style.height = '0px'
    })
  })
}

const afterLeave = (el: Element): void => {
  (el as HTMLElement).style.height = ''
}
</script>

<template>
  <transition
    enter-active-class="overflow-hidden transition-height duration-300 ease-out"
    leave-active-class="overflow-hidden transition-height duration-300 ease-out"
    @enter="enter"
    @leave="leave"
    @before-enter="beforeEnter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @after-leave="afterLeave"
  >
    <slot />
  </transition>
</template>
