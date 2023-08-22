export const useCurrentClass = () => {
  const currentClass = ref('')
  const refreshProperty = ref(0)
  const { params } = useRoute()
  if (params.hash) {
    currentClass.value = params.hash as string
  } else {
    currentClass.value = useCookie<string>('selectedClass').value
  }

  const cc = computed(() => {
    let value = refreshProperty.value
    return useState<apiResponseClass[]>('classes').value?.filter(c => c.hash === currentClass.value)?.[0]
  })

  setInterval(() => {
    refreshProperty.value++
  }, 1000)

  return cc
}
