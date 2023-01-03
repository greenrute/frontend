export type Status = 'success' | 'info' | 'warning' | 'error' | null

export interface NotificationDraft {
  status: Status
  message: string | undefined
}

export interface Notification extends NotificationDraft {
  show: boolean
  timeout: NodeJS.Timeout | undefined
}

export const useNotification = () => useState<Notification>('notification', () => ({
  status: null,
  message: '',
  show: false,
  timeout: undefined,
}))

export const pushNotification = (notification: NotificationDraft) => {
  if (!notification.message) return

  const notif = useNotification()

  clearTimeout(notif.value.timeout)

  notif.value.status = notification.status
  switch (notification.status) {
    case 'error':
      notif.value.message = capitalizeFirstLetter(notification.message, 'exclamation')
      break
    default:
      notif.value.message = capitalizeFirstLetter(notification.message, 'dot')
      break
  }
  notif.value.show = false
  void nextTick(() => {
    notif.value.show = true
  })

  notif.value.timeout = setTimeout(() => {
    notif.value.show = false
  }, 3000)
}
