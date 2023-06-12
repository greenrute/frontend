export const useThemeColor = () => {
  const colorMode = useColorMode()
  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  const themeCookie = useCookie<string>('theme-color', {
    expires: date,
    sameSite: true,
  })

  const isDarkTheme = computed(() => colorMode.value !== 'system' ? colorMode.value === 'dark' : themeCookie.value === 'dark')
  const themeColor = computed(() => isDarkTheme.value ? '#18181b' : '#ffffff')

  watch(colorMode, newMode => {
    if (newMode.value !== 'system') {
      themeCookie.value = newMode.value
    }
  })

  useHead({
    meta: [
      { name: 'theme-color', content: themeColor },
    ],
  })
}
