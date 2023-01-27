import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid/index'

export const temporallyDisableTransitions = () => {
  document.documentElement.classList.add('[&_*]:!transition-none')
  setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-none')
  }, 0)
}

export const changeTheme = () => {
  const colorMode = useColorMode()

  temporallyDisableTransitions()
  if (colorMode.preference === 'system') {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  } else {
    colorMode.preference = 'system'
  }
}

export const changeThemeAction = (t: (key: string) => string) => {
  if (process.server) return
  const colorMode = useColorMode()

  return {
    id: 1,
    name: t('actions.change theme'),
    icon: computed(() => colorMode.value === 'dark' ? SunIcon : MoonIcon).value,
    action: changeTheme,
  }
}
