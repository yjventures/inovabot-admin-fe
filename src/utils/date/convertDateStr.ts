export function convertDateStr(dateString: Date) {
  // Create a new Date object from the input string
  const date = new Date(dateString)

  // Define an array of month names
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // Get the hours and convert to 12-hour format
  let hours = date.getHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'

  // Get the minutes and pad with a zero if necessary
  let minutes: string | number = date.getMinutes()
  minutes = minutes < 10 ? '0' + minutes : minutes

  // Get the day of the month, month name, and year
  const day = date.getDate()
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  // Construct the new date string
  const newDateString = hours + ':' + minutes + ampm + ' | ' + day + ' ' + month + ' ' + year

  return newDateString
}
