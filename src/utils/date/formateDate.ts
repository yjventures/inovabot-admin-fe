export function formateDate(dateString: string) {
  // Parse the ISO date string from MongoDB
  const date = new Date(dateString)

  // Get the day, month, and year components
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1 // Months are zero-indexed
  const year = date.getUTCFullYear().toString().slice(-2) // Get the last two digits of the year

  // Format the date components as "D/M/YY"
  const formattedDate = `${day}/${month}/${year}`

  return formattedDate
}
