'use client'

import { useParams } from 'next/navigation'

export const useLocale = () => {
  const { lang } = useParams()
  return lang
}
