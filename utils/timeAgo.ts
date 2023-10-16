export const timeAgo = (date: Date) => {
  const { locale, t } = useI18n()

  const now = useNow({ interval: 2000 })
  date.setHours(now.value.getHours())
  date.setMinutes(now.value.getMinutes())


  const oneDay = 1000 * 60 * 60 * 24

  const getMidnight = (day: Date) => {
    const date = new Date(day)
    date.setMilliseconds(999)
    date.setSeconds(59)
    date.setMinutes(59)
    date.setHours(23)
    return date
  }

  const isYesterday = (date: Date) => {
    const midnightYesterday = new Date(getMidnight(new Date()).getTime() - oneDay)
    const midnightBeforeYesterday = new Date(midnightYesterday.getTime() - (oneDay * 2))

    return date > midnightBeforeYesterday && date < midnightYesterday
  }

  const isToday = (date: Date) => {
    const midnightTonight = getMidnight(new Date())
    const midnightYesterday = new Date(midnightTonight.getTime() - oneDay)

    return date > midnightYesterday && date < midnightTonight
  }

  const isTomorrow = (date: Date) => {
    const midnightTonight = getMidnight(new Date())
    const midnightTomorrow = new Date(midnightTonight.getTime() + oneDay)

    return date > midnightTonight && date < midnightTomorrow
  }

  if (isYesterday(date)) return t('general.yesterday').toLowerCase()
  if (isToday(date)) return t('general.today').toLowerCase()
  if (isTomorrow(date)) return t('general.tomorrow').toLowerCase()

  const messages = locale.value === 'uk' ? {
    justNow: 'прямо зараз',
    past: (n: string) => n.match(/\d/) ? `${n} тому` : n,
    future: (n: string) => n.match(/\d/) ? `через ${n}` : n,
    month: (n: number, past: boolean) => n === 1
      ? past
        ? 'минулого місяця'
        : 'наступного місяця'
      : `${n} ${n % 10 === 0 ? 'місяців' : n % 100 > 4 && n % 100 < 20 ? 'місяців' : n % 10 === 1 ? 'місяць' : 'місяці'}`,
    year: (n: number, past: boolean) => n === 1
      ? past
        ? 'минулого року'
        : 'наступного року'
      : `${n} ${n % 10 === 0 ? 'років' : n % 100 > 4 && n % 100 < 20 ? 'років' : n % 10 === 1 ? 'рік' : 'роки'}`,
    day: (n: number, past: boolean) => n === 1
      ? past
        ? 'вчора'
        : 'завтра'
      : `${n} ${n % 10 === 0 ? 'днів' : n % 100 > 4 && n % 100 < 20 ? 'днів' : n % 10 === 1 ? 'день' : 'дні'}`,
    week: (n: number, past: boolean) => n === 1
      ? past
        ? 'минулого тижня'
        : 'наступного тижня'
      : `${n} ${n % 10 === 0 ? 'тижнів' : n % 100 > 4 && n % 100 < 20 ? 'тижнів' : n % 10 === 1 ? 'тиждень' : 'тижні'}`,
    hour: (n: number) => `${n} ${n % 10 === 0 ? 'годин' : n % 100 > 4 && n % 100 < 20 ? 'годин' : n % 10 === 1 ? 'годину' : 'години'}`,
    minute: (n: number) => `${n} ${n % 10 === 0 ? 'хвилин' : n % 100 > 4 && n % 100 < 20 ? 'хвилин' : n % 10 === 1 ? 'хвилину' : 'хвилини'}`,
    second: (n: number) => `${n} ${n % 10 === 0 ? 'секунд' : n % 100 > 4 && n % 100 < 20 ? 'секунд' : n % 10 === 1 ? 'секунду' : 'секунди'}`,
    invalid: '',
  } : {
    justNow: 'just now',
    past: (n: string) => n.match(/\d/) ? `${n} ago` : n,
    future: (n: string) => n.match(/\d/) ? `in ${n}` : n,
    month: (n: number, past: boolean) => n === 1
      ? past
        ? 'last month'
        : 'next month'
      : `${n} month${n > 1 ? 's' : ''}`,
    year: (n: number, past: boolean) => n === 1
      ? past
        ? 'last year'
        : 'next year'
      : `${n} year${n > 1 ? 's' : ''}`,
    day: (n: number, past: boolean) => n === 1
      ? past
        ? 'yesterday'
        : 'tomorrow'
      : `${n} day${n > 1 ? 's' : ''}`,
    week: (n: number, past: boolean) => n === 1
      ? past
        ? 'last week'
        : 'next week'
      : `${n} week${n > 1 ? 's' : ''}`,
    hour: (n: number) => `${n} hour${n > 1 ? 's' : ''}`,
    minute: (n: number) => `${n} minute${n > 1 ? 's' : ''}`,
    second: (n: number) => `${n} second${n > 1 ? 's' : ''}`,
    invalid: '',
  }

  return useTimeAgo(date, {
    units: [
      { max: 518400000, value: 86400000, name: 'day' },
      { max: 2419200000, value: 604800000, name: 'week' },
      { max: 28512000000, value: 2592000000, name: 'month' },
      { max: Number.POSITIVE_INFINITY, value: 31536000000, name: 'year' },
    ],
    messages: messages as any,
  }).value
}
