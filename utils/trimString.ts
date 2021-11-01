const trimString = (string: string, length: number = 40, elipsis: string = " ...") => {

  if (string.length > 30) {
    const spaceIndex = string.indexOf(" ", length)
    if (spaceIndex > 0) {
      return string.substring(0, spaceIndex) + elipsis
    }
  }
  return string
}

export default trimString