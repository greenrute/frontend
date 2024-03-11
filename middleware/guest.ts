export default defineNuxtRouteMiddleware(() => {
  const localePath = useLocalePath()

  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  
  const token = useCookie('token', {
    expires: date,
    sameSite: true,
  })

  if (token.value && token.value !== '') {
    return navigateTo(localePath('/dashboard'))
  }
})
