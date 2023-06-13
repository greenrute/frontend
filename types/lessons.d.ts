declare interface Lesson {
  id: string
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

declare interface NavClassItem extends NavigationItem {
  bgColorClass: string
}
