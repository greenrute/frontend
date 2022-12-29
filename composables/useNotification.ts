export type Status = 'success' | 'info' | 'warning' | 'error' | null

export interface NotificationDraft {
  status: Status
  title: string
  message: string
}

export interface Notification extends NotificationDraft {
  show: boolean
  timeout: NodeJS.Timeout | undefined
}

export const useNotification = () => useState<Notification>('notification', () => ({
  status: null,
  title: '',
  message: '',
  show: false,
  timeout: undefined,
}))

export const pushNotification = (notification: NotificationDraft) => {
  if (!notification.message) return

  const notif = useNotification()

  clearTimeout(notif.value.timeout)

  notif.value.status = notification.status
  notif.value.title = notification.title
  notif.value.message = capitalizeFirstLetter(notification.message, true)
  notif.value.show = true

  notif.value.timeout = setTimeout(() => {
    notif.value.show = false
  }, 3000)
}
