'use client'

import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

interface Props extends LinkProps {
  children: ReactNode
  href: string
  className?: string
}

export default function LLink({ children, href, ...rest }: Props) {
  const { lang } = useParams()
  return (
    <Link href={`/${lang}${href}`} {...rest}>
      {children}
    </Link>
  )
}
