import { changeThemeAction } from '~/utils/actions/changeTheme'
import type { Component } from 'vue'
import { changeLanguageAction } from '~/utils/actions/changeLanguage'

export interface Action {
  id: number
  name: string
  icon: Component
  action: () => void
}

export const actions = (): (Action | undefined)[] => {
  const { t } = useI18n()

  return [
    changeThemeAction(t),
    changeLanguageAction(t),
  ]
}
