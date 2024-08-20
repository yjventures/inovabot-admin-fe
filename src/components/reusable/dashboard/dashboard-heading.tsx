import Typography, { type TypographyVariant } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  extra?: ReactNode
  className?: string
  variant?: TypographyVariant
}

export default function DashboardHeading({ title, extra, className, variant = 'h3', ...props }: Props) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-x-5 gap-y-3 mb-6', className)} {...props}>
      <Typography variant={variant}>{title}</Typography>
      <div className='flex flex-wrap items-center gap-x-5'>{extra}</div>
    </div>
  )
}
