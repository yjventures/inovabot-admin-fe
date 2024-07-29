export function isURLValid(string: string): boolean {
  try {
    new URL(string)
    return true
  } catch (err) {
    return false
  }
}
