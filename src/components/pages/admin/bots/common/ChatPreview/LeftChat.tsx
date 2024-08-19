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
      <div className='flex gap-x-2 max-w-xl w-2/3 justify-end'>
        <ChatAvatar imgSrc={imgSrc} />
        <CardWrapper className='p-3 bg-gray-primary' style={{ backgroundColor: secondaryColor, color: fontColor }}>
          <p className='text-sm'>{message}</p>
        </CardWrapper>
      </div>
    </div>
  )
}
