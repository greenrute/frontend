declare interface Lesson {
  id: number
  name: string
  icon: string
  alt: string
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
