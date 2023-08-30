const transformStringToDate = (d: string, c: Date): number => {
  const [hours, minutes] = d.split(':').map(r => parseInt(r))

  return new Date(
    c.getFullYear(),
    c.getMonth(),
    c.getDate(),
    hours,
    minutes,
  ).getTime()
}

const getLessonLimits = (r: { start: string, end: string }, c: Date): {
  start: number
  end: number
} => ({
  start: transformStringToDate(r.start, c),
  end: transformStringToDate(r.end, c),
})

export const useCurrentLesson = (): ComputedRef<CurrentLesson> => {
  const currentClass = useCurrentClass()
  const now = useNow({ interval: 1000 })
  const { t } = useI18n()

  const currentLesson = computed<CurrentLesson>((): CurrentLesson => {
    const currentDay = currentClass.value.schedule?.[now.value.getDay() - 1]
    if (!currentDay) {
      return {
        active: false,
        dayoff: true,
        timeToEnd: t('empty.day off'),
      }
    }

    if (!currentDay.lessons.length) {
      return {
        active: false,
        dayoff: false,
        timeToEnd: t('empty.no lessons today'),
      }
    }

    const currentTimetable = currentClass.value.timetable?.[now.value.getDay()]?.records?.length
      ? currentClass.value.timetable?.[now.value.getDay()]?.records
      : currentClass.value.timetable?.[0]?.records
    if (!currentTimetable?.length) {
      return {
        active: false,
        dayoff: false,
        timeToEnd: t('empty.unknown timetable'),
      }
    }

    const firstLessonLimits = getLessonLimits(currentTimetable[0], now.value)
    const lastLessonLimits = getLessonLimits(currentTimetable[currentDay.lessons.length <= currentTimetable.length ? currentDay.lessons.length - 1 : currentTimetable.length - 1], now.value)

    if (now.value.getTime() < firstLessonLimits.start) {
      return {
        active: false,
        dayoff: false,
        timeToEnd: t('empty.lessons have not started yet'),
      }
    } else if (lastLessonLimits.end < now.value.getTime()) {
      return {
        active: false,
        dayoff: false,
        timeToEnd: t('empty.lessons are already over'),
      }
    }

    const currentLesson = ref<number | null>(null)
    currentDay.lessons.forEach((l, i) => {
      const lessonLimits = getLessonLimits(currentTimetable[i], now.value)
      if (lessonLimits.start <= now.value.getTime() && now.value.getTime() <= lessonLimits.end) {
        currentLesson.value = i
      }
    })

    if (!currentLesson.value) {
      return {
        active: false,
        dayoff: false,
        timeToEnd: t('empty.break now'),
      }
    }

    const currentLessonLimits = getLessonLimits(currentTimetable[currentLesson.value], now.value)

    if (Math.round(Math.abs(currentLessonLimits.end - now.value.getTime()) / 1000) >= 60) {
      return {
        active: true,
        dayoff: false,
        timeToEnd: t('empty.time to end', Math.round((((currentLessonLimits.end - now.value.getTime()) % 86400000) % 3600000) / 60000)),
        lessonUUID: currentDay.lessons[currentLesson.value].uuid,
      }
    } else {
      return {
        active: true,
        dayoff: false,
        timeToEnd: t('empty.time to end sec', Math.round(Math.abs(currentLessonLimits.end - now.value.getTime()) / 1000)),
        lessonUUID: currentDay.lessons[currentLesson.value].uuid,
      }
    }
  })

  return currentLesson
}