import React from 'react'
import CardAvatar from '../cards/commonn/card-avatar'
import { cn } from '@/lib/utils'

type Props = {
  imgSrc?: string
  title: string
  description: string
  className?: string
}

export default function ChatUser({ imgSrc, title, description, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <CardAvatar imgSrc={imgSrc} name={title} className='size-10' />

      <div className='flex flex-col gap-2'>
        <h5 className='text-text-heading text-sm font-medium'>{title}</h5>
        <p className='text-primary text-xs font-bold break-all'>{description}</p>
      </div>
    </div>
  )
}
