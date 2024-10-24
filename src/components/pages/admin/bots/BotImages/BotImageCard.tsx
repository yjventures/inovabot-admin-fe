import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CardPopover, { CardPopoverContent } from '@/components/reusable/cards/commonn/card-popover'
import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import { Img } from '@/components/ui/img'
import { useDeleteBotImageMutation } from '@/redux/features/botsApi'
import { WithId } from '@/types/common/IResponse'
import { IBotImage } from '@/types/IBotImage'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  botImg: WithId<IBotImage>
}

export default function BotImageCard({ botImg }: Props) {
  const [openPrompt, setopenPrompt] = useState<boolean>(false)
  const [deleteImg, { isSuccess, isError, error }] = useDeleteBotImageMutation()

  useEffect(() => {
    if (isSuccess) toast.success('Image deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <>
      <CardWrapper className='w-full'>
        <CardPopover>
          {/* <CardPopoverContent text='View Details' icon={<Eye className='text-green-primary' />} />
          <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} /> */}
          <CardPopoverContent
            text='Delete'
            icon={<Trash2 className='text-destructive' />}
            onClick={() => setopenPrompt(true)}
          />
        </CardPopover>

        <CardGrid>
          {botImg.image_url.map(img => (
            <Img key={img} alt={img} src={img} />
          ))}
        </CardGrid>

        <p className='pt-3 text-lg text-text-secondary'>{botImg.objective}</p>
      </CardWrapper>
      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setopenPrompt}
        cb={() => deleteImg(botImg._id)}
        title='Are you sure you want to delete this image?'
      />
    </>
  )
}
