import { Img } from '@/components/ui/img'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import React from 'react'

interface Props {
  imgSrc: string
  onClick: () => void
  className?: string
  aspect?: 'video' | 'square' | 'auto'
}

export default function ImagePreviewer({ imgSrc, onClick, className, aspect = 'video' }: Props) {
  return (
    <div
      className={cn('rounded-lg overflow-hidden relative border max-w-md mb-3', className, {
        'aspect-video': aspect === 'video',
        'aspect-square': aspect === 'square',
        'aspect-auto': aspect === 'auto'
      })}
    >
      <Img src={imgSrc} alt='img' className='w-full h-full object-cover' />
      <div className='absolute top-1 right-1 bg-red-500 rounded-full p-0.5 cursor-pointer'>
        <X className='text-white' onClick={onClick} />
      </div>
    </div>
  )
}
