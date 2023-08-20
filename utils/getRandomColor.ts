// export const getRandomColor = (): string => '#' + Math.floor(Math.random() * 16777215).toString(16)

export const mainColors = [
  { name: 'teal', color: '#1FBC9C' },
  { name: 'emerald', color: '#1CA085' },
  { name: 'light-green', color: '#2ECC70' },
  { name: 'green', color: '#27AF60' },
  { name: 'sky', color: '#3398DB' },
  { name: 'blue', color: '#2980B9' },
  { name: 'light-purple', color: '#A463BF' },
  { name: 'purple', color: '#8E43AD' },
  { name: 'yellow', color: '#F2C511' },
  { name: 'orange', color: '#F39C19' },
  { name: 'red', color: '#E84B3C' },
  { name: 'cherry', color: '#C0382B' },
  { name: 'stone', color: '#3D556E' },
  { name: 'dark-stone', color: '#222F3D' },
  { name: 'light-gray', color: '#DDE6E8' },
  { name: 'gray', color: '#BDC3C8' },
]

export const getRandomColor = (): { name: string, color: string } => mainColors[Math.floor(Math.random() * (mainColors.length - 4))]

export const getColorName = (color: string): string => mainColors.filter(c => c.color === color)[0].name
