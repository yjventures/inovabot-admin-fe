import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { cn } from '@/lib/utils'
import ChatAvatar from './ChatAvatar'

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
      <div className='flex flex-col sm:flex-row md:flex-col min-[920px]:flex-row lg:flex-col xl:flex-row gap-y-1 gap-x-2 max-w-3xl w-[80%] justify-start'>
        <ChatAvatar imgSrc={imgSrc} />
        <CardWrapper
          className={cn('p-2.5', { 'border-transparent': isDark })}
          style={{
            backgroundColor: isDark ? secondary_color_dark : secondary_color,
            color: isDark ? font_color_dark : font_color
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            style={{
              color: isDark ? font_color_dark : font_color
            }}
            className={cn('prose max-w-full text-sm prose-headings:my-3 prose-p:my-1')}
          />
        </CardWrapper>
      </div>
    </div>
  )
}
