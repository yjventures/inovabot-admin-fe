'use client'

import tutorialBg from '@/assets/images/common/dashboard/tutorial-bg.png'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import YoutubeEmbed from '@/components/ui/youtube-embed'
import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  videoId: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  className?: string
}

export default function Tutorial({ videoId, title, description, ctaLabel, ctaHref, className, ...props }: Props) {
  return (
    <section
      className={cn(
        'bg-cover bg-center bg-no-repeat p-2 min-[400px]:p-4 sm:p-6 rounded-[10px] shadow-sm flex flex-col min-[900px]:flex-row lg:flex-col min-[1200px]:flex-row items-center justify-between gap-x-10 gap-y-12',
        className
      )}
      style={{ backgroundImage: `url(${tutorialBg.src})` }}
      {...props}
    >
      <div className='w-full min-[900px]:w-1/2 lg:w-full min-[1200px]:w-1/2 aspect-video object-cover order-2 min-[900px]:order-1 lg:order-2 min-[1200px]:order-1'>
        <YoutubeEmbed videoId={videoId} />
      </div>

      <div className='w-full min-[900px]:w-1/2 lg:w-full min-[1200px]:w-1/2 flex flex-col items-center justify-center gap-y-4 order-1 min-[900px]:order-2 lg:order-1 min-[1200px]:order-2 pt-10 min-[900px]:pt-0 lg:pt-10 min-[1200px]:pt-0'>
        <Typography variant='h1' className='text-white font-bold'>
          {title}
        </Typography>
        <p className='text-lg font-normal text-white'>{description}</p>
        {/* <LLink href={ctaHref}> */}
        <Button variant='unstyled' className='bg-orange-dark text-white px-8' disabled>
          {ctaLabel}
        </Button>
        {/* </LLink> */}
      </div>
    </section>
  )
}
