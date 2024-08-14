import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export default function TableSkeleton({ className, ...props }: Props) {
  return (
    <div className={cn('flex flex-col gap-3', className)} {...props}>
      {Array.from({ length: 10 }, (_, index) => (
        <Skeleton key={index} className='h-14 w-full' />
      ))}
    </div>
  )
}
