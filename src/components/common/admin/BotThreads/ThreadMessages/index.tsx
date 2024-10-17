import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import LeftChat from '@/components/pages/admin/bots/common/ChatPreview/LeftChat'
import RightChat from '@/components/pages/admin/bots/common/ChatPreview/RightChat'
import { Img } from '@/components/ui/img'
import { BOT_URL } from '@/configs'
import { cn } from '@/lib/utils'
import { useGetBotQuery, useGetThreadMessagesQuery } from '@/redux/features/botsApi'
import { AlignRight } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction, useCallback } from 'react'

interface Props {
  currThread: undefined | string
  threadSidebarOpen: boolean
  setthreadSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function ThreadMessages({ currThread, threadSidebarOpen, setthreadSidebarOpen }: Props) {
  const { id } = useParams()
  const { data: botData } = useGetBotQuery(id as string)
  const { data } = useGetThreadMessagesQuery(currThread, { skip: !currThread })

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const {
    embedding_url,
    bg_light,
    bg_dark,
    logo_light,
    logo_dark,
    name,
    primary_color,
    primary_color_dark,
    font_color,
    font_color_dark,
    secondary_color,
    secondary_color_dark,
    user_logo,
    bot_logo
  } = { ...botData?.data }

  const getSrc = useCallback(
    (lightSrc: string, darkSrc: string): string => {
      return isDark && darkSrc ? darkSrc : lightSrc
    },
    [isDark]
  )

  const url = `${BOT_URL}/${embedding_url}`

  return (
    <div
      style={{ backgroundImage: `url(${isDark && bg_dark ? bg_dark : bg_light})` }}
      className={cn(
        'bg-cover bg-center flex-1 pl-0 transition-all duration-300 bg-fixed relative h-[calc(100vh_-_80px)] overflow-auto',
        {
          'pl-60': threadSidebarOpen
        }
      )}
    >
      <div
        className={cn('bg-foreground p-2 flex flex-wrap items-center justify-between sticky top-0 z-20', {
          'bg-gray-800 text-white': isDark
        })}
      >
        <div className={cn('flex items-center justify-between gap-3 w-full')}>
          <div className='flex items-center gap-3'>
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

          <AlignRight className='cursor-pointer size-8' onClick={() => setthreadSidebarOpen(prev => !prev)} />
        </div>
      </div>
      <div className={cn('w-full h-px bg-gray-primary', { 'bg-black': isDark })} />

      <div
        className={cn('space-y-5 py-5 min-h-[calc(100%_-_65px)]', {
          'bg-gray-primary': !isDark && !bg_light,
          'bg-gray-800': isDark && !bg_dark
        })}
      >
        {data?.messages?.map(msg => (
          <div key={msg?._id}>
            {msg?.role === 'user' ? (
              <RightChat
                message={msg?.content[0]?.text?.value}
                imgSrc={user_logo}
                sources={{ primary_color, primary_color_dark, font_color, font_color_dark }}
                isDark={isDark}
              />
            ) : (
              <LeftChat
                message={msg?.content[0]?.text?.value}
                imgSrc={bot_logo}
                sources={{ secondary_color, secondary_color_dark, font_color, font_color_dark }}
                isDark={isDark}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
