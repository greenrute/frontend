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

export const useCurrentLesson = (
  withLessonDetails: boolean = false
): ComputedRef<CurrentLesson> => {
  const currentClass = useCurrentClass()
  const now = useNow({ interval: 1000 })
  const { t } = useI18n()

  const currentLesson = computed<CurrentLesson>((): CurrentLesson => {
    const currentDay = currentClass.value?.schedule?.[now.value.getDay() - 1]
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
      if (!withLessonDetails) {
        return {
          active: false,
          dayoff: false,
          timeToEnd: t('empty.lessons have not started yet'),
        }
      }
    } else if (lastLessonLimits.end < now.value.getTime()) {
      if (!withLessonDetails) {
        return {
          active: false,
          dayoff: false,
          timeToEnd: t('empty.lessons are already over'),
        }
      }
    }

    const currentLesson = ref<number | null>(null)
    currentDay.lessons.forEach((l, i) => {
      if (!currentTimetable?.[i]) return
      const lessonLimits = getLessonLimits(currentTimetable?.[i], now.value)
      if (withLessonDetails) {
        if (!currentTimetable?.[i + 1] || !currentDay.lessons?.[i + 1]) {
          return {
            active: false,
            dayoff: false,
            timeToEnd: '',
            lessonDetails: l,
          }
        } else {
          if (lessonLimits.start <= now.value.getTime() && getLessonLimits(currentTimetable?.[i + 1], now.value).start > now.value.getTime()) {
            return {
              active: false,
              dayoff: false,
              timeToEnd: '',
              lessonDetails: currentDay.lessons[i + 1],
            }
          }
        }
      }
      if (lessonLimits.start <= now.value.getTime() && now.value.getTime() <= lessonLimits.end) {
        currentLesson.value = i
      }
    })

    if (currentLesson.value === null) {
      if (withLessonDetails) {
        if (now.value.getTime() < firstLessonLimits.start) {
          if (withLessonDetails) {
            return {
              active: false,
              dayoff: false,
              timeToEnd: '',
              lessonDetails: currentDay.lessons[0],
            }
          }
        } else if (lastLessonLimits.end < now.value.getTime()) {
          if (withLessonDetails) {
            return {
              active: false,
              dayoff: false,
              timeToEnd: '',
              lessonDetails: currentDay.lessons[currentDay.lessons.length - 1],
            }
          }
        }
      }

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
