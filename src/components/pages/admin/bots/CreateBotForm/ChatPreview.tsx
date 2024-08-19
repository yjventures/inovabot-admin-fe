'use client'

import Intro from '@/components/reusable/common/intro'
import { useTheme } from 'next-themes'
import { useFormContext } from 'react-hook-form'
import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Img } from '@/components/ui/img'
import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Paperclip, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ChatPreview() {
  const { watch } = useFormContext()
  const first_message = watch('first_message')
  const logo_light = watch('logo_light')
  const logo_dark = watch('logo_dark')
  const name = watch('name')
  const embedded_link = 'https://demo-ai-cahtbot.com'
  const primary_color = watch('primary_color')
  const secondary_color = watch('secondary_color')
  const font_color = watch('font_color')

  const { theme } = useTheme()
  const imgSrc = theme === 'dark' && logo_dark ? logo_dark : logo_light

  function ChatAvatar({ imgSrc }: { imgSrc?: string }) {
    return (
      <div className='size-12 min-w-12 rounded-full overflow-hidden'>
        {imgSrc ? (
          <Img src={imgSrc} alt='avatar' className='size-full aspect-square object-cover' />
        ) : (
          <Img src={companyPlaceholder} alt='avatar' className='size-full aspect-square object-cover' />
        )}
      </div>
    )
  }

  return (
    <div>
      <div className='bg-foreground p-2'>
        <Intro title={name} description={embedded_link} imgSrc={imgSrc} hasLink />
      </div>
      <div className='w-full h-px bg-gray-primary' />

      <div className='space-y-5 py-5'>
        <div className='flex justify-end'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <CardWrapper className='p-3'>
              <p className='text-sm'>
                {first_message || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, hic.'}
              </p>
            </CardWrapper>
            <ChatAvatar imgSrc={imgSrc} />
          </div>
        </div>

        <div className='flex justify-start'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <ChatAvatar imgSrc={imgSrc} />
            <CardWrapper className='p-3 bg-gray-primary'>
              <p className='text-sm'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, quam provident? Veritatis aut
                distinctio, labore molestias odio nisi ullam fugit, delectus nulla officia, eligendi rem vel nostrum
                modi! Doloribus voluptatibus et blanditiis, corrupti ipsum quod ut rem, totam pariatur natus distinctio
                repellendus iste iusto ea ex non impedit aliquid earum!
              </p>
            </CardWrapper>
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <CardWrapper className='p-3'>
              <p className='text-sm'>Lorem ipsum dolor sit?</p>
            </CardWrapper>
            <ChatAvatar imgSrc={imgSrc} />
          </div>
        </div>

        <div className='flex justify-start'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <ChatAvatar imgSrc={imgSrc} />
            <CardWrapper className='p-3 bg-gray-primary'>
              <p className='text-sm'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, quisquam exercitationem magnam
                molestias nam iusto.
              </p>
            </CardWrapper>
          </div>
        </div>

        <div className='flex justify-end'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <CardWrapper className='p-3'>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur</p>
            </CardWrapper>
            <ChatAvatar imgSrc={imgSrc} />
          </div>
        </div>

        <div className='flex justify-start'>
          <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
            <ChatAvatar imgSrc={imgSrc} />
            <CardWrapper className='p-3 bg-gray-primary'>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit, hic.</p>
            </CardWrapper>
          </div>
        </div>
      </div>

      <div className='w-full h-px bg-gray-primary' />
      <div className='bg-foreground px-4 flex gap-x-3 items-center'>
        <Input
          icon={<Paperclip />}
          iconPosition='right'
          placeholder='Type a message'
          containerClassName='mt-4 w-full'
        />
        <Button variant='black' size='icon'>
          <Send />
        </Button>
      </div>
    </div>
  )
}
