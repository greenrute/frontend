export const capitalizeFirstLetter = (str: string, endWith: '' | 'dot' | 'exclamation' = '') => {
  let end: string

  switch (endWith) {
    case 'dot':
      end = '.'
      break
    case 'exclamation':
      end = '!'
      break
    default:
      end = ''
      break
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() + end
}
