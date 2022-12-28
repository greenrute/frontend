export const capitalizeFirstLetter = (str: string, dot: boolean = false) => (
  str.charAt(0).toUpperCase() + str.slice(1) + (dot && '.')
)
