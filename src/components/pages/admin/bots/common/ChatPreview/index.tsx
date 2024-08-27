'use client'

import Intro from '@/components/reusable/common/intro'
import { useTheme } from 'next-themes'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/reusable/form/input'
import { Paperclip, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LeftChat from './LeftChat'
import RightChat from './RightChat'
import { BOT_URL } from '@/configs'

export default function ChatPreview() {
  const { watch } = useFormContext()
  const first_message = watch('first_message')
  const logo_light = watch('logo_light')
  const logo_dark = watch('logo_dark')
  const name = watch('name')
  const embedding_url = watch('embedding_url')
  const primary_color = watch('primary_color')
  const secondary_color = watch('secondary_color')
  const font_color = watch('font_color')

  const { theme } = useTheme()
  const imgSrc = theme === 'dark' && logo_dark ? logo_dark : logo_light

  return (
    <div>
      <div className='bg-foreground p-2'>
        <Intro title={name} description={`${BOT_URL}/${embedding_url}`} imgSrc={imgSrc} hasLink />
      </div>
      <div className='w-full h-px bg-gray-primary' />

      <div className='space-y-5 py-5'>
        <RightChat
          message={first_message || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, hic.'}
          imgSrc={imgSrc}
          fontColor={font_color}
          primaryColor={primary_color}
        />
        <LeftChat
          message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, quam provident? Veritatis aut
                distinctio, labore molestias odio nisi ullam fugit, delectus nulla officia, eligendi rem vel nostrum
                modi! Doloribus voluptatibus et blanditiis, corrupti ipsum quod ut rem, totam pariatur natus distinctio
                repellendus iste iusto ea ex non impedit aliquid earum!'
          imgSrc={imgSrc}
          fontColor={font_color}
          secondaryColor={secondary_color}
        />
        <RightChat
          message='Lorem ipsum dolor sit?'
          imgSrc={imgSrc}
          fontColor={font_color}
          primaryColor={primary_color}
        />
        <LeftChat
          message='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, quisquam exercitationem magnam
                molestias nam iusto.'
          imgSrc={imgSrc}
          fontColor={font_color}
          secondaryColor={secondary_color}
        />
        <RightChat
          message='Lorem ipsum dolor sit amet consectetur'
          imgSrc={imgSrc}
          fontColor={font_color}
          primaryColor={primary_color}
        />
        <LeftChat
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit, hic.'
          imgSrc={imgSrc}
          fontColor={font_color}
          secondaryColor={secondary_color}
        />
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
