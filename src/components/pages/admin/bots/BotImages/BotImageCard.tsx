import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { Img } from '@/components/ui/img'
import { IBotImage } from '@/types/IBotImage'

interface Props {
  botImg: IBotImage
}

export default function BotImageCard({ botImg }: Props) {
  return (
    <CardWrapper>
      <Img src={botImg.image_url} alt={botImg.bot_id} />
      <p>{botImg.objective}</p>
    </CardWrapper>
  )
}
