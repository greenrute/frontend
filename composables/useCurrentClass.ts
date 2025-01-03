export const useCurrentClass = (updateLock: boolean = false): ComputedRef<apiResponseClass| undefined> => {
  const currentClass = ref('')
  const classes = useState<apiResponseClass[]>('classes')

  const date = new Date()
  date.setMonth(date.getMonth() + 6)
  const selectedClass = useCookie<string>('selectedClass', {
    expires: date,
    sameSite: true,
  })

  const currentClassCountry = useCookie<string>('currentClassCountry', {
    expires: date,
    sameSite: true,
  })

  const cc = computed(() => {
    const { params } = useRoute()

    if (params.hash) {
      currentClass.value = params.hash as string
    } else {
      currentClass.value = selectedClass.value
    }

    const ccr = classes.value?.filter(c => c.hash === currentClass.value)?.[0]

    if ((!currentClassCountry.value || currentClassCountry.value !== ccr?.country) && !!ccr?.country) {
      currentClassCountry.value = ccr.country
    }

    return ccr
  })

  return cc
}
