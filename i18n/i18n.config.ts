import { ukrainianPluralRule } from './ukrainianPluralRule'

export default defineI18nConfig(() => ({
  legacy: false,
  warnHtmlMessage: false,
  warnHtmlInMessage: 'off',
  pluralRules: {
    uk: ukrainianPluralRule,
  },
}))
