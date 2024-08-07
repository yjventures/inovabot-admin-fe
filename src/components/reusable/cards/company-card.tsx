import React from 'react'
import CardWrapper from './commonn/card-wrapper'
import { Img } from '@/components/ui/img'
import Badge from './badge'
import CardBetween from './commonn/card-between'
import { formateDate } from '@/utils/date/formateDate'
import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import CardCeparatorBorder from './commonn/card-separator-border'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import ThreeDots from '@/components/ui/three-dots'

interface Props {
  logo?: string
  name: string
  web_url: string
  bots: number
  recurring: string
  last_subscribed: string
  createdAt: string
}

export default function CompanyCard({ logo, name, web_url, bots, recurring, last_subscribed, createdAt }: Props) {
  return (
    <CardWrapper>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <div className='size-12'>
          {logo ? (
            <Img src={logo} alt={name} className='size-full aspect-square object-cover' />
          ) : (
            <Img src={companyPlaceholder} alt={name} className='size-full aspect-square object-cover' />
          )}
        </div>

        <p className='text-sm font-semibold text-text-heading mt-2'>{name}</p>
        <a href={web_url} target='_blank' rel='noopener noreferrer'>
          <Badge variant='magenta' className='break-all'>
            {web_url}
          </Badge>
        </a>
      </div>

      <CardCeparatorBorder />

      <CardBetween left='Bots' right={bots.toString()} />
      <CardBetween left='Recurring' right={recurring} />
      <CardBetween left='Last Subscribed' right={formateDate(last_subscribed)} />
      <CardBetween left='Created At' right={formateDate(createdAt)} />

      <Popover>
        <PopoverTrigger>
          <ThreeDots className='absolute right-2 top-3' />
        </PopoverTrigger>
        <PopoverContent>
          <div>hello</div>
        </PopoverContent>
      </Popover>
    </CardWrapper>
  )
}
