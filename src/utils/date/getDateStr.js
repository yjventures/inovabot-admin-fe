import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function getDateStr(isoDateStr) {
  const date = isoDateStr && parseISO(isoDateStr)
  const formattedDate = date && format(date, 'MMMM d, yyyy')
  return formattedDate
}

export function getRelativeTime(isoDateStr) {
  const date = isoDateStr && parseISO(isoDateStr)
  const relativeTime = date && formatDistanceToNow(date, { addSuffix: true })
  return relativeTime
}

export function getRelativeTimmeFromTimestamp(timestamp) {
  const date = new Date(timestamp)
  return formatDistanceToNow(date) + ' ago'
}
