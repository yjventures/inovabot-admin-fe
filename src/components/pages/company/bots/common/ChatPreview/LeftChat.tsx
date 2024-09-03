import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import ChatAvatar from './ChatAvatar'
import { cn } from '@/lib/utils'

interface Props {
  message: string
  imgSrc?: string
  sources: {
    secondary_color: string
    secondary_color_dark: string
    font_color: string
    font_color_dark: string
  }
  isDark: boolean
}

export default function LeftChat({ message, imgSrc, sources, isDark }: Props) {
  const { secondary_color, secondary_color_dark, font_color, font_color_dark } = { ...sources }

  return (
    <div className='flex justify-start pl-2'>
      <div className='flex gap-x-2 max-w-2xl w-2/3 justify-start'>
        <ChatAvatar imgSrc={imgSrc} />
        <CardWrapper
          className={cn('p-2.5', { 'border-transparent': isDark })}
          style={{
            backgroundColor: isDark ? secondary_color_dark : secondary_color,
            color: isDark ? font_color_dark : font_color
          }}
        >
          <p className='text-sm'>{message}</p>
        </CardWrapper>
      </div>
    </div>
  )
}
