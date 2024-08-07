import React from 'react'
import CardWrapper from './commonn/card-wrapper'
import CardAvatar from './commonn/card-avatar'
import Badge from './badge'

interface Props {
  logo?: string
  name: string
  tag: string
  description: string
}

export default function TemplateCard({ logo, name, tag, description }: Props) {
  return (
    <CardWrapper>
      <div className='flex flex-wrap gap-4 mb-4 items-center'>
        <CardAvatar imgSrc={logo} name={name} className='size-16' />
        <div className='flex flex-col gap-y-2 items-start'>
          <p className='text-sm font-semibold text-text-heading'>{name}</p>
          <Badge variant='magenta' className='break-all text-[13px] font-medium px-3' solid rounded light>
            # {tag}
          </Badge>
        </div>
      </div>

      <p className='text-base text-text-secondary'>{description}</p>
    </CardWrapper>
  )
}
