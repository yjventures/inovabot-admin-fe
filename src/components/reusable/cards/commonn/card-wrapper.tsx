import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export default function CardWrapper({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn('rounded-lg border border-foreground-border p-4 bg-foreground relative shadow-sm', className)}
    >
      {children}
    </div>
  )
}
