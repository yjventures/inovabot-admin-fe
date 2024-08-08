import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  extra?: ReactNode
  className?: string
}

export default function DashboardHeading({ title, extra, className, ...props }: Props) {
  return (
    <div className={cn('flex flex-wrap items-center justify-between gap-x-5 gap-y-3', className)} {...props}>
      <Typography variant='h4'>{title}</Typography>
      {extra}
    </div>
  )
}
