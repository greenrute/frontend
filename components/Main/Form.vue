<script setup lang="ts">
const emit = defineEmits<{
  (e: 'validated'): void
}>()

const validated = ref(false)

const validate = (event: SubmitEvent) => {
  if (!(event.target as HTMLFormElement).checkValidity()) {
    event.preventDefault()
    event.stopPropagation()

    pushNotification({
      status: 'error',
      message: 'Перевірте, чи всі поля правильно заповнено',
    })
    validated.value = true
  } else {
    emit('validated')
  }
}
</script>

<template>
  <form @submit.prevent="validate" novalidate class="group/form" :class="validated && 'is-validated'">
    <slot />
  </form>
</template>
