import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import React from 'react'

function getAbbreviation(name: string): string {
  if (!name) return ''

  // Split the name into words
  const words = name.trim().split(/\s+/)

  // Map each word to its first letter and join them together
  const abbreviation = words.map(word => word[0]).join('')

  return abbreviation.toUpperCase()
}

interface Props {
  imgSrc?: string
  name: string
  className?: string
  wrapperClassName?: string
}

export default function CardAvatar({ imgSrc, name, className, wrapperClassName }: Props) {
  return (
    <div className={wrapperClassName}>
      <div className={cn('size-20 rounded-full overflow-hidden', className)}>
        {imgSrc ? (
          <Img src={imgSrc} alt={name} className='size-full aspect-square object-cover rounded-full' />
        ) : (
          <div className='flex items-center justify-center text-xl font-semibold text-blue-dark bg-blue-light size-full rounded-full'>
            <p>{getAbbreviation(name)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
