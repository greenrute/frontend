export const temporallyDisableTransitions = () => {
  document.documentElement.classList.add('[&_*]:!transition-none')
  setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-none')
  }, 0)
}

export const switchColorMode = () => {
  const colorMode = useColorMode()

  temporallyDisableTransitions()
  if (colorMode.preference === 'system') {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  } else {
    colorMode.preference = 'system'
  }
}
