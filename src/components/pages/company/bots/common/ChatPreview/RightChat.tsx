import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import ChatAvatar from './ChatAvatar'
import { cn } from '@/lib/utils'

interface Props {
  message: string
  imgSrc?: string
  sources: {
    primary_color: string
    primary_color_dark: string
    font_color: string
    font_color_dark: string
  }
  isDark: boolean
}

export default function RightChat({ message, imgSrc, sources, isDark }: Props) {
  const { primary_color, primary_color_dark, font_color, font_color_dark } = { ...sources }

  return (
    <div className='flex justify-end pr-2'>
      <div className='flex gap-x-2 max-w-2xl w-2/3 justify-end'>
        <CardWrapper
          className={cn('p-2.5', { 'border-transparent': isDark })}
          style={{
            backgroundColor: isDark ? primary_color_dark : primary_color,
            color: isDark ? font_color_dark : font_color
          }}
        >
          <p className='text-sm'>{message}</p>
        </CardWrapper>
        <ChatAvatar imgSrc={imgSrc} />
      </div>
    </div>
  )
}
