export const useAuthentication = () => {
  const { t, locale } = useI18n()

  return {
    logout: async (): Promise<void> => {
      await $fetch('/users/logout', {
        method: 'POST',
        headers: { 'Accept-Language': locale.value, 'Authorization': 'Bearer ' + useCookie('token').value },
        body: { token: useCookie('token').value },
        baseURL: useRuntimeConfig().public.apiBase,
      })
        .then(async r => {
          useCookie('token').value = null
          useCookie('user').value = null
          await navigateTo('/login')
          setTimeout(() => {
            pushNotification({
              status: 'success',
              message: (r as apiResponse).message,
            })
          }, 150)
        })
        .catch(error => {
          pushNotification({
            status: 'error',
            message: error.data?.message || t('could not connect to the server'),
          })
        })
    },
  }
}
