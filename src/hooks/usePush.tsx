'use client'

import { useParams, useRouter } from 'next/navigation'

export default function usePush() {
  const { lang } = useParams()
  const { push } = useRouter()

  const localizedPush = (path: string, options?: any) => {
    const localizedPath = `/${lang}${path}`
    push(localizedPath, options)
  }

  return localizedPush
}
