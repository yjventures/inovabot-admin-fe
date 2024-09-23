import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: ReactNode
}

export default function FormWrapper({ className, children, ...props }: Props) {
  return (
    <div className={cn('bg-foreground rounded-xl p-4 shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}
