export const addMinutes = (time: string, minutes: number): string => {
  const D = (J: number) => (J < 10 ? '0' : '' ) + J

  const piece = time.split(':').map(t => parseInt(t))
  const newTime = piece[0] * 60 + piece[1] + minutes

  return D(newTime % (24 * 60) / 60 | 0) + ':' + D(newTime % 60)
}
