import { LanguageIcon } from '@heroicons/vue/20/solid'

export const changeLanguageAction = (t: (key: string) => string) => {
  const localePath = useLocalePath()

  return {
    id: 2,
    name: t('actions.change language'),
    icon: LanguageIcon,
    action: () => {
      return navigateTo(localePath('/settings#language'))
    }
  }
}
