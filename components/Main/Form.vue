<script setup lang="ts">
const { t } = useI18n()

const emit = defineEmits<{
  (e: 'validated'): void
}>()

const validated = ref(false)

const validate = (event: Event) => {
  if (!(event.target as HTMLFormElement).checkValidity()) {
    event.preventDefault()
    event.stopPropagation()

    pushNotification({
      status: 'error',
      message: t('check that all fields are filled in correctly'),
    })
    validated.value = true
  } else {
    emit('validated')
    validated.value = false
  }
}
</script>

<template>
  <form @submit.prevent="validate" novalidate class="group/form" :class="validated && 'is-validated'">
    <slot />
  </form>
</template>
