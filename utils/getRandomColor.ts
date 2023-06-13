// export const getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16)

export const mainColors = [
  '#1FBC9C',
  '#1CA085',
  '#2ECC70',
  '#27AF60',
  '#3398DB',
  '#2980B9',
  '#A463BF',
  '#8E43AD',
  '#F2C511',
  '#F39C19',
  '#E84B3C',
  '#C0382B',
  '#3D556E',
  '#222F3D',
  '#DDE6E8',
  '#BDC3C8',
]

export const getRandomColor = (): string => mainColors[Math.floor(Math.random() * (mainColors.length - 4))]
