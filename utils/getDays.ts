export const getDays = (): string[] => {
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
}
