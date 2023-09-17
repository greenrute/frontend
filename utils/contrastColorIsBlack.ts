export const hexToRgb = (hexColor: string) => {
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hexColor = hexColor.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null
}

export const contrastColorIsBlack = (hexColor: string | undefined) => {
  if (!hexColor) return null
  const rgbColor = hexToRgb(hexColor)

  return rgbColor && ((rgbColor.r * 0.299 + rgbColor.g * 0.587 + rgbColor.b * 0.114) > 186)
}
