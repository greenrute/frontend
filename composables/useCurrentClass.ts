export const useCurrentClass = (updateLock: boolean = false) => {
  const currentClass = ref('')

  const cc = computed(() => {
    const { params } = useRoute()

    if (params.hash) {
      currentClass.value = params.hash as string
    } else {
      currentClass.value = useCookie<string>('selectedClass').value
    }

    return useState<apiResponseClass[]>('classes').value?.filter(c => c.hash === currentClass.value)?.[0]
  })

  return cc
}
