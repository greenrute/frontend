import confetti from 'canvas-confetti'

export const useHomework = async (day: DayName | null = null) => {
  const { locale, t } = useI18n()
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const currentClass = useCurrentClass()

  if (day === null) {
    day = 'monday'
  }

  const { data, refresh } = await useFetch<apiResponse<{ homeworks: { [key: string]: { [key: string]: ARHomework[] } } }>>(`/classes/${currentClass.value?.id}/homework/by-day/${getDayIndex(day)}`, {
    method: 'GET',
    headers: {
      'Accept-Language': locale.value,
      'Authorization': 'Bearer ' + token.value,
    },
    baseURL: config.public.apiBase,
  })

  const homework = computed<{ [key: string]: { [key: string]: ARHomework[] } }>(() => Object.keys(data.value?.data?.homeworks ?? {}).sort((a, b) => {
    const A = parseInt(a.split('.').reverse().join(''))
    const B = parseInt(b.split('.').reverse().join(''))
    return A > B ? 1 : A < B ? -1 : 0
  }).reduce((object, key) => {
    (object as any)[key] = data.value?.data?.homeworks[key]
    return object
  }, {}))

  const percentsOfDoneHomeworks = computed(() => Object.values(homework.value).map(day => {
    return Math.round((Object.values(day).flat(1).filter(t => t.done).length / Object.values(day).flat(1).length) * 100)
  }))

  watch(percentsOfDoneHomeworks, (newData, oldData) => {
    newData.forEach((p, i) => {
      if ((oldData[i] || oldData[i] === 0) && p !== oldData[i]) {
        if (p === 100) {
          confetti({
            origin: { y: 0.8 },
          })
        }
      }
    })
  })

  const percentOfDoneHomework = (day: { [key: string]: ARHomework[] }) => (
    Math.round((Object.values(day).flat(1).filter(t => t.done).length / Object.values(day).flat(1).length) * 100)
  )

  const changeTaskStatus = async (tastId: number) => {
    await $fetch(`/classes/${currentClass.value?.id}/homework/${tastId}/status`, {
      method: 'GET',
      headers: {
        'Accept-Language': locale.value,
        'Authorization': 'Bearer ' + token.value,
      },
      baseURL: config.public.apiBase,
    })
      .then(() => {
        refresh()
      })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
  }

  return { homework, refresh, percentsOfDoneHomeworks, percentOfDoneHomework, changeTaskStatus }
}
