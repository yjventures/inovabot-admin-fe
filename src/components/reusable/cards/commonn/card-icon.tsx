import { cn } from '@/lib/utils'
import { LucideProps } from 'lucide-react'
import React, { ForwardRefExoticComponent, RefAttributes } from 'react'

interface Props {
  iconGradientClassName?: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}

export default function CardIcon({ iconGradientClassName = 'from-blue-dark to-cyan-dark', icon: Icon }: Props) {
  return (
    <div
      className={cn('size-10 flex items-center justify-center rounded-full bg-gradient-to-b', iconGradientClassName)}
    >
      <Icon className='text-white size-5' strokeWidth={2} />
    </div>
  )
}
