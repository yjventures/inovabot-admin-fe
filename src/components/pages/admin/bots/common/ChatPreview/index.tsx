import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Switch } from '@/components/ui/switch'
import { BOT_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { Moon, Paperclip, Send, Sun } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import LeftChat from './LeftChat'
import RightChat from './RightChat'

export default function ChatPreview() {
  const { watch } = useFormContext()
  const first_message = watch('first_message')

  const logo_light = watch('logo_light')
  const logo_dark = watch('logo_dark')
  const user_logo = watch('user_logo')
  const bot_logo = watch('bot_logo')

  const bg_light = watch('bg_light')
  const bg_dark = watch('bg_dark')

  const name = watch('name')
  const embedding_url = watch('embedding_url')

  const primary_color = watch('primary_color')
  const primary_color_dark = watch('primary_color_dark')
  const secondary_color = watch('secondary_color')
  const secondary_color_dark = watch('secondary_color_dark')
  const font_color = watch('font_color')
  const font_color_dark = watch('font_color_dark')

  const [isDark, setIsDark] = useState<boolean>(false)

  const getSrc = useCallback(
    (lightSrc: string, darkSrc: string): string => {
      return isDark && darkSrc ? darkSrc : lightSrc
    },
    [isDark]
  )

  const url = `${BOT_URL}/${embedding_url}`

  return (
    <div style={{ backgroundImage: `url(${isDark && bg_dark ? bg_dark : bg_light})` }} className='bg-cover bg-center'>
      <div
        className={cn('bg-foreground p-2 flex flex-wrap items-center justify-between', {
          'bg-text-heading text-white': isDark
        })}
      >
        <div className={cn('flex items-center gap-3')}>
          <div className='size-12 rounded-lg overflow-hidden'>
            {getSrc(logo_light, logo_dark) ? (
              <Img src={getSrc(logo_light, logo_dark)} alt={name} className='size-full aspect-square object-cover' />
            ) : (
              <Img src={companyPlaceholder} alt={name} className='size-full aspect-square object-cover' />
            )}
          </div>

          <div className='space-y-1'>
            <p>{name}</p>
            <a href={url} target='_blank' className='text-blue-primary text-xs font-semibold'>
              {url}
            </a>
          </div>
        </div>

        <div className='flex items-center gap-x-2'>
          <Sun className='size-5' />
          <Switch checked={isDark} onCheckedChange={e => setIsDark(e)} />
          <Moon className='size-5' />
        </div>
      </div>
      <div className={cn('w-full h-px bg-gray-primary', { 'bg-black': isDark })} />

      <div
        className={cn('space-y-5 py-5', {
          'bg-gray-primary': !isDark && !bg_light,
          'bg-gray-800': isDark && !bg_dark
        })}
      >
        <RightChat
          message={
            first_message ||
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, hic.  nulla officia, eligendi rem vel nostrum modi! D'
          }
          imgSrc={user_logo}
          sources={{ primary_color, primary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
        <LeftChat
          message='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam, quam provident? Veritatis aut distinctio, labore molestias odio nisi ullam fugit, delectus nulla officia, eligendi rem vel nostrum modi! Doloribus voluptatibus et blanditiis, corrupti ipsum quod ut rem, totam pariatur natus distinctio repellendus iste iusto ea ex non impedit aliquid earum!'
          imgSrc={bot_logo}
          sources={{ secondary_color, secondary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
        <RightChat
          message='Lorem ipsum dolor sit?'
          imgSrc={user_logo}
          sources={{ primary_color, primary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
        <LeftChat
          message='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, quisquam exercitationem magnam molestias nam iusto.'
          imgSrc={bot_logo}
          sources={{ secondary_color, secondary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
        <RightChat
          message='Lorem ipsum dolor sit amet consectetur'
          imgSrc={user_logo}
          sources={{ primary_color, primary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
        <LeftChat
          message='Lorem ipsum dolor sit amet consectetur adipisicing elit, hic.'
          imgSrc={bot_logo}
          sources={{ secondary_color, secondary_color_dark, font_color, font_color_dark }}
          isDark={isDark}
        />
      </div>

      <div className={cn('w-full h-px bg-gray-primary', { 'bg-black': isDark })} />
      <div
        className={cn('bg-foreground px-4 flex gap-x-3 items-center', {
          'bg-text-heading text-white': isDark
        })}
      >
        <Input
          icon={<Paperclip />}
          iconPosition='right'
          placeholder='Type a message'
          className={cn({ 'bg-gray-700 border-gray-800': isDark })}
          containerClassName='mt-4 w-full'
        />
        <Button variant='black' size='icon' className={cn({ 'bg-white [&>svg]:text-gray-900': isDark })}>
          <Send />
        </Button>
      </div>
    </div>
  )
}
