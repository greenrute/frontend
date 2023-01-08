declare interface Day {
  date: string
  isCurrentMonth?: boolean
  isToday?: boolean
}

declare interface Week {
  isSelected?: boolean
  days: Day[]
}
