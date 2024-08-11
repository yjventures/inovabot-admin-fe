export function formateDate(dateString: string, showMonth: boolean = false) {
  // Parse the ISO date string from MongoDB
  const date = new Date(dateString)

  if (showMonth) {
    // Format the date as "D Month, YYYY"
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
    return date.toLocaleDateString('en-UK', options)
  } else {
    // Get the day, month, and year components
    const day: string = date.getUTCDate().toString()
    const month: string = (date.getUTCMonth() + 1).toString() // Months are zero-indexed
    const year: string = date.getUTCFullYear().toString().slice(-2) // Get the last two digits of the year

    // Format the date components as "D/M/YY"
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`
  }
}
