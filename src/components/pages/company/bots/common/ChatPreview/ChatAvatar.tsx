import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Img } from '@/components/ui/img'

interface Props {
  imgSrc?: string
}

export default function ChatAvatar({ imgSrc }: Props) {
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
