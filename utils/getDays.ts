export const getDays = (native: boolean = false): string[] => {
  if (native) {
    const lang = useRequestHeaders()['accept-language']?.split(';')[0].split(',')[0] || navigator.language

    const date = new Date()
    date.setDate(1)
    let days = []

    while (date.getDay() !== 1) {
      date.setDate(date.getDate() + 1)
    }

    do {
      days.push(capitalizeFirstLetter(date.toLocaleString(lang, { weekday: 'long' })))
      date.setDate(date.getDate() + 1)
    } while (days.length < 5)

    return days
  } else {
    const { t } = useI18n()

    return [
      t('days.monday'),
      t('days.tuesday'),
      t('days.wednesday'),
      t('days.thursday'),
      t('days.friday'),
    ]
  }
}

export const getDayIndex = (day: DayName): number => {
  switch (day) {
    case 'monday':
      return 1
    case 'tuesday':
      return 2
    case 'wednesday':
      return 3
    case 'thursday':
      return 4
    case 'friday':
      return 5
    default:
      return 1
  }
}
