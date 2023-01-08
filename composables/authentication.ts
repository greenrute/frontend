export const logout = async (): Promise<void> => {
  await $fetch('/users/logout', {
    method: 'POST',
    body: {token: useCookie('token').value},
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
        message: error.data?.message,
      })
    })
}
