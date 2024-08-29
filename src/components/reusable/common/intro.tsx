import { Img } from '@/components/ui/img'
import React, { HTMLAttributes, ReactNode } from 'react'
import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { cn } from '@/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  imgSrc?: string
  placeholderImgSrc?: string
  title: string
  description: string | ReactNode
  className?: string
  hasLink?: boolean
}

export default function Intro({ imgSrc, title, description, className, hasLink, ...props }: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <div className='size-12 rounded-lg overflow-hidden'>
        {imgSrc ? (
          <Img src={imgSrc} alt={title} className='size-full aspect-square object-cover' />
        ) : (
          <Img src={companyPlaceholder} alt={title} className='size-full aspect-square object-cover' />
        )}
      </div>

      <div className='space-y-1'>
        <p className='text-sm font-semibold'>{title}</p>
        {hasLink && typeof description === 'string' ? (
          <a href={description as string} target='_blank' className='text-blue-primary text-xs font-semibold'>
            {description}
          </a>
        ) : (
          <p className='text-xs text-text-secondary'>{description}</p>
        )}
      </div>
    </div>
  )
}
