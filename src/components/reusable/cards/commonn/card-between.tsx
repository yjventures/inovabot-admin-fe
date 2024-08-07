import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  left: string
  right: string
  className?: string
}

export default function CardBetween({ left, right, className }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-between text-text-secondary text-xs mb-4 font-medium last:mb-0',
        className
      )}
    >
      <p>{left}</p>
      <p>{right}</p>
    </div>
  )
}
