import confetti from 'canvas-confetti'

export const useHomework = async (day: DayName, tomorrow: boolean = false) => {
  const { locale, t } = useI18n()
  const token = useCookie('token')
  const config = useRuntimeConfig()
  const currentClass = useCurrentClass()
  const currentLesson = useCurrentLesson(true, toRef(getNearestDay(getDayIndex(day))))

  if (!currentClass.value?.hash) {
    return {
      homework: computed<{ [key: string]: { [key: string]: ARHomework[] } }>(() => [].reduce(() => ({}), {})),
      percentOfDoneHomework: (day: { [key: string]: ARHomework[] }) => 0,
      changeTaskStatus: async (tastId: number) => {},
      add: async (homework: NewHomework) => {},
      pending: ref(false),
    }
  }

  const url = tomorrow ? `/classes/${currentClass.value?.id}/homework/by-days/${getDayIndex(day)},${getDayIndex(day)+1 > 5 ? 1 : getDayIndex(day)+1}` : `/classes/${currentClass.value?.id}/homework/by-day/${getDayIndex(day)}`
  const { data, refresh } = await useFetch<apiResponse<{ homeworks: { [key: string]: { [key: string]: ARHomework[] } } }>>(url, {
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
    (object as any)[key] = Object.keys(data.value?.data?.homeworks[key] ?? {}).sort((a, b) => {
      const A = data.value?.data?.homeworks[key][a]
      const B = data.value?.data?.homeworks[key][b]
      if (!A || !B) return 0

      const C = Math.round((A.filter(t => t.done).length / A.length) * 100)
      const D = Math.round((B.filter(t => t.done).length / B.length) * 100)

      return C > D ? 1 : C < D ? -1 : 0
    }).reduce((object2, key2) => {
      (object2 as any)[key2] = data.value?.data?.homeworks[key][key2]
      return object2
    }, {})
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

  const pending = ref<boolean>(false)

  const add = async (homework: NewHomework) => {
    pending.value = true
    const start = new Date().getTime()
  
    await $fetch<apiResponse<any>>(`/classes/${currentClass.value?.id}/homework`, {
      method: 'POST',
      headers: {
        'Accept-Language': locale.value,
        'Authorization': 'Bearer ' + useCookie('token').value,
      },
      body: {
        text: homework.text.trim(),
        description: homework.description.trim(),
        lesson: homework.lesson.id,
        date: `${homework.date.getFullYear()}-${(homework.date.getMonth() + 1).toString().padStart(2, '0')}-${homework.date.getDate().toString().padStart(2, '0')}`,
        public: homework.public,
      },
      baseURL: useRuntimeConfig().public.apiBase,
    })
      .then(() => {
        homework.text = ''
        homework.description = ''
        homework.lesson = currentLesson.value.lessonDetails as Lesson
        homework.date = getNearestDay(getDayIndex(day as DayName))
        homework.public = true
  
        refresh()
      })
      .catch(error => {
        pushNotification({
          status: 'error',
          message: error.data?.message || t('could not connect to the server'),
        })
      })
      .finally(() => {
        const difference = new Date().getTime() - start
  
        if (difference > 300) {
          pending.value = false
        } else {
          setTimeout(() => {
            pending.value = false
          }, 300 - difference)
        }
      })
  }

  return {
    homework,
    refresh,
    percentsOfDoneHomeworks,
    percentOfDoneHomework,
    changeTaskStatus,
    pending,
    add,
  }
}
