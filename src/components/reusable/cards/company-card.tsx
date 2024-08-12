import React from 'react'
import CardWrapper from './commonn/card-wrapper'
import { Img } from '@/components/ui/img'
import Badge from './badge'
import CardBetween from './commonn/card-between'
import { formateDate } from '@/utils/date/formateDate'
import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardPopover from './commonn/card-popover'
import { ICompany } from '@/types/ICompany'
import { WithId } from '@/types/common/IResponse'

export interface CompanyCardProps {
  company: WithId<ICompany>
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const { logo, name, web_url, bots, recurring, last_subscribed, createdAt } = { ...company }
  return (
    <CardWrapper>
      <CardPopover>Hello</CardPopover>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <div className='size-12 rounded-lg overflow-hidden'>
          {logo ? (
            <Img src={logo} alt={name} className='size-full aspect-square object-cover' />
          ) : (
            <Img src={companyPlaceholder} alt={name} className='size-full aspect-square object-cover' />
          )}
        </div>

        <p className='text-sm font-semibold text-text-heading mt-2'>{name}</p>
        {web_url && (
          <a href={web_url} target='_blank' rel='noopener noreferrer'>
            <Badge variant='magenta' className='break-all'>
              {web_url}
            </Badge>
          </a>
        )}
      </div>

      <CardCeparatorBorder />
      <CardBetween left='Bots' right={bots?.toString()} />
      <CardBetween left='Recurring' right={recurring} />
      <CardBetween left='Last Subscribed' right={formateDate(last_subscribed)} />
      <CardBetween left='Created' right={formateDate(createdAt)} />
    </CardWrapper>
  )
}
