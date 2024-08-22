import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function usePush() {
  const { lang } = useParams()
  const { push } = useRouter()

  const localizedPush = useCallback(
    (path: string, options?: any) => {
      const localizedPath = `/${lang}${path}`
      push(localizedPath, options)
    },
    [lang, push]
  )

  return localizedPush
}
