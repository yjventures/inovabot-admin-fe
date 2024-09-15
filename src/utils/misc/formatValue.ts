export const formatValue = (str: string, withDash?: boolean) => {
  return str
    .split(withDash ? '-' : '_') // Split the string by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and make the rest lowercase
    .join(' ') // Join the words with spaces
}
