import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  classname?: string
  children?: React.ReactNode
}

export default function TableActions({ classname, children, ...props }: Props) {
  return (
    <div className={cn('flex gap-2 [&svg]:cursor-pointer [&svg]:size-[18px]', classname)} {...props}>
      {children}
    </div>
  )
}
