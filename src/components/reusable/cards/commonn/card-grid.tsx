import { cn } from '@/lib/utils'
import React, { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export default function CardGrid({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'grid grid-cols-1 min-[460px]:grid-cols-2 md:grid-cols-3 min-[1150px]:grid-cols-4 xl:grid-cols-5 gap-6',
        className
      )}
    >
      {children}
    </div>
  )
}
