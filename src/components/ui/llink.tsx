'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  href: string
}

export default function LLink({ children, href, ...rest }: Props) {
  const { lang } = useParams()
  return (
    <Link href={`/${lang}${href}`} {...rest}>
      {children}
    </Link>
  )
}
