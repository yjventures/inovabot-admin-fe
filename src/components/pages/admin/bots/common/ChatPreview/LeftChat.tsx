import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import ChatAvatar from './ChatAvatar'

interface Props {
  message: string
  imgSrc?: string
  fontColor: string
  secondaryColor: string
}

export default function LeftChat({ message, imgSrc, fontColor, secondaryColor }: Props) {
  return (
    <div className='flex justify-start'>
      <div className='flex gap-x-2 max-w-2xl w-2/3 justify-start'>
        <ChatAvatar imgSrc={imgSrc} />
        <CardWrapper className='p-2.5' style={{ backgroundColor: secondaryColor, color: fontColor }}>
          <p className='text-sm'>{message}</p>
        </CardWrapper>
      </div>
    </div>
  )
}
