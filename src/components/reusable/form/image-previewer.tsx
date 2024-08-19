import { Img } from '@/components/ui/img'
import { X } from 'lucide-react'
import React from 'react'

interface Props {
  imgSrc: string
  onClick: () => void
}

export default function ImagePreviewer({ imgSrc, onClick }: Props) {
  return (
    <div className='aspect-video rounded-lg overflow-hidden relative border max-w-md'>
      <Img src={imgSrc} alt='img' className='w-full h-full object-cover' />
      <div className='absolute top-1 right-1 bg-red-500 rounded-full p-0.5 cursor-pointer'>
        <X className='text-white' onClick={onClick} />
      </div>
    </div>
  )
}
