export type Status = 'success' | 'info' | 'warning' | 'error'

export interface NotificationDraft {
  status: Status
  title: string
  message: string
}

export interface Notification extends NotificationDraft {
  id: number
  show: boolean
  close: (immediately: boolean) => void
}

export const useNotifications = () => useState<Notification[]>('notifications', () => [])

export const pushToNotifications = (notification: NotificationDraft) => {
  const notifications = useNotifications()
  const id: number = Math.round(Math.random() * (9999 - 1000) + 1000)
  const n = computed(() => notifications.value.indexOf(notifications.value.filter(n => n.id === id)[0]))

  notifications.value.push({
    status: notification.status,
    title: notification.title,
    message: capitalizeFirstLetter(notification.message, true),
    show: false,
    close: (immediately: boolean = true): void => {
      if (immediately) {
        notifications.value.splice(n.value, 1)
        return
      }
      notifications.value[n.value].show = false
      setTimeout(() => {
        notifications.value.splice(n.value, 1)
      }, 300)
    }, id
  })

  void nextTick(() => {
    notifications.value[n.value].show = true
  })
  setTimeout(() => {
    notifications.value[n.value]?.close(false)
  }, 3000)
}
