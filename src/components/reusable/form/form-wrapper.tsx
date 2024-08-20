import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export default function FormWrapper({ className, children, ...props }: Props) {
  return (
    <div className={cn('bg-foreground rounded-xl p-4', className)} {...props}>
      {children}
    </div>
  )
}
