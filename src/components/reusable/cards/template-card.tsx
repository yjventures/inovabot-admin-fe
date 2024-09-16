import { useLogo } from '@/hooks/useLogo'
import { ITemplate } from '@/types/Itemplate'
import Badge from './badge'
import CardAvatar from './commonn/card-avatar'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  template: ITemplate
}

export default function TemplateCard({ template }: Props) {
  const { logo_light, logo_dark, name, category, description } = template

  const logo = useLogo(logo_light!, logo_dark!)
  return (
    <CardWrapper>
      <div className='flex flex-wrap gap-4 mb-4 items-center'>
        <CardAvatar imgSrc={logo} name={name} className='size-16' />
        <div className='flex flex-col gap-y-2 items-start'>
          <p className='text-sm font-semibold text-text-heading'>{name}</p>
          <Badge variant='magenta' className='break-all text-[13px] font-medium px-3' solid rounded light>
            {category}
          </Badge>
        </div>
      </div>

      <p className='text-base text-text-secondary'>
        {description.slice(0, 200)} {description && description.length > 200 ? '...' : ''}
      </p>
    </CardWrapper>
  )
}
