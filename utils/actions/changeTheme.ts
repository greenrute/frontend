import { MoonIcon, SunIcon } from '@heroicons/vue/20/solid'

export const changeThemeAction = (t: (key: string) => string) => {
  if (process.server) return
  const colorMode = useColorMode()

  return {
    id: 1,
    name: t('actions.change theme'),
    icon: computed(() => colorMode.value === 'dark' ? SunIcon : MoonIcon).value,
    action: switchColorMode,
  }
}
