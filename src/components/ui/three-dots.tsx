import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  dotClassName?: string
  className?: string
}

export default function ThreeDots({ dotClassName, className, ...props }: Props) {
  return (
    <div className={cn('flex flex-col gap-y-1 cursor-pointer px-1.5', className)} {...props}>
      <div className={cn('size-[3px] rounded-full bg-text-secondary', dotClassName)} />
      <div className={cn('size-[3px] rounded-full bg-text-secondary', dotClassName)} />
      <div className={cn('size-[3px] rounded-full bg-text-secondary', dotClassName)} />
    </div>
  )
}
