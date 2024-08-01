export function formatFieldName(input: string): string {
  return input
    .split('_') // Split by underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(' ') // Join with spaces
}
