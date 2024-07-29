export const setMaxDate = (maxYear: number = 0): string => {
  const today = new Date()
  const year = today.getFullYear()
  let month: string | number = today.getMonth() + 1
  let day: string | number = today.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return `${year - maxYear}-${month}-${day}`
}
