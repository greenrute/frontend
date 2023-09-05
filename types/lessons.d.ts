declare interface Lesson {
  id: number
  key: string
  name: string
  icon: string
  alt: string
  uuid: string
}

declare interface Class {
  name: string
  description: string
  color: string
}

declare interface NavigationItem {
  name: string
  href: string
}

declare interface NavMenuItem extends NavigationItem {
  icon: import('vue').Component
}

declare interface CurrentLesson {
  active: boolean
  dayoff: boolean
  timeToEnd: string
  lessonUUID?: string
}
