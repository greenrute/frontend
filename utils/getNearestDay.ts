export const getNearestDay = (dayIdx: number): Date => {
  let date = new Date()
  date.setDate(date.getDate() + (((dayIdx + 7 - date.getDay()) % 7) || 7))

  return date
}
