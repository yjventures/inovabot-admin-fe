import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  videoId: string
  className?: string
}

export default function YoutubeEmbed({ videoId, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden pb-[56.25%] relative h-0 [&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 [&>iframe]:w-full [&>iframe]:h-full',
        className
      )}
      {...props}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded Youtube'
      />
    </div>
  )
}
