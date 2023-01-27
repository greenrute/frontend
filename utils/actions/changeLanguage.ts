import { LanguageIcon } from '@heroicons/vue/20/solid/index'

export const changeLanguageAction = (t: (key: string) => string) => {
  return {
    id: 2,
    name: t('actions.change language'),
    icon: LanguageIcon,
    action: () => {
      return navigateTo('/settings#language')
    }
  }
}
