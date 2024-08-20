import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import ChatAvatar from './ChatAvatar'

interface Props {
  message: string
  imgSrc?: string
  fontColor: string
  primaryColor: string
}

export default function RightChat({ message, imgSrc, fontColor, primaryColor }: Props) {
  return (
    <div className='flex justify-end'>
      <div className='flex gap-x-2 max-w-2xl w-2/3 justify-end'>
        <CardWrapper className='p-2.5' style={{ backgroundColor: primaryColor, color: fontColor }}>
          <p className='text-sm'>{message}</p>
        </CardWrapper>
        <ChatAvatar imgSrc={imgSrc} />
      </div>
    </div>
  )
}
