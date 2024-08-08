import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  topCTASection?: React.ReactNode
  name: string
  logo?: string
  web_url?: string
  address?: string
  payment_status: string
  createdAt: string
  expires_at: string
  description: string
  gradientClassName?: string
}

export default function CompanyIntoCard({
  topCTASection,
  name,
  logo,
  web_url,
  address,
  payment_status,
  createdAt,
  expires_at,
  description,
  gradientClassName
}: Props) {
  return (
    <section>
      <div className={cn('w-full h-24 bg-gradient-to-r from-cyan-dark to-emerald-primary', gradientClassName)} />
    </section>
  )
}
