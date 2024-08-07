import { cn } from '@/lib/utils'
import React from 'react'

export default function CardCeparatorBorder({ className }: { className?: string }) {
  return <div className={cn('border-b border-dotted border-foreground-border my-5', className)} />
}
