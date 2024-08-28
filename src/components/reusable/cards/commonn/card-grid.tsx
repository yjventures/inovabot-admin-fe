import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  total?: 5 | 4 | 3 | 'packages'
}

export default function CardGrid({ children, className, total = 5, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'grid grid-cols-1 gap-6',
        { 'min-[460px]:grid-cols-2 md:grid-cols-3 min-[1150px]:grid-cols-4 xl:grid-cols-5': total === 5 },
        { 'md:grid-cols-2 lg:grid-cols-4': total === 4 },
        { 'md:grid-cols-2 lg:grid-cols-3': total === 3 },
        { 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': total === 'packages' },
        className
      )}
    >
      {children}
    </div>
  )
}
