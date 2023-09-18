export const useUser = () => {
  const currentClass = useCurrentClass()
  const user = useCookie<UserCookie>('user')

  return computed(() => {
    return {
      ...user.value,
      isOwner: !!currentClass.value?.people?.filter(p => p.id === user.value.id && (p.role === 'owner'))?.length,
      isAdmin: !!currentClass.value?.people?.filter(p => p.id === user.value.id && (p.role === 'owner' || p.role === 'admin'))?.length,
    }
  })
}
