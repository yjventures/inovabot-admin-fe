import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function getDateStr(isoDateStr: string): string {
  const date = isoDateStr && parseISO(isoDateStr)
  const formattedDate = date && format(date, 'MMMM d, yyyy')
  return formattedDate
}

export function getRelativeTime(isoDateStr: string): string {
  const date = isoDateStr && parseISO(isoDateStr)
  const relativeTime = date && formatDistanceToNow(date, { addSuffix: true })
  return relativeTime
}

export function getRelativeTimmeFromTimestamp(timestamp: number) {
  const date = new Date(timestamp)
  return formatDistanceToNow(date) + ' ago'
}
