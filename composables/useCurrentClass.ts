export const useCurrentClass = (updateLock: boolean = false): ComputedRef<apiResponseClass| undefined> => {
  const currentClass = ref('')
  const classes = useState<apiResponseClass[]>('classes')
  const selectedClass = useCookie<string>('selectedClass')

  const cc = computed(() => {
    const { params } = useRoute()

    if (params.hash) {
      currentClass.value = params.hash as string
    } else {
      currentClass.value = selectedClass.value
    }

    return classes.value?.filter(c => c.hash === currentClass.value)?.[0]
  })

  return cc
}
