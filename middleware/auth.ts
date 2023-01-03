export default defineNuxtRouteMiddleware(() => {
  const token = useCookie('token')

  if (!token.value || token.value === '') {
    return navigateTo('/login')
  }
})
