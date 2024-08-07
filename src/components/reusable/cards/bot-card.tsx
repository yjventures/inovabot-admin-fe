'use client'

import React from 'react'
import CardWrapper from './commonn/card-wrapper'
import Badge from './badge'
import CardBetween from './commonn/card-between'
import { formateDate } from '@/utils/date/formateDate'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardAvatar from './commonn/card-avatar'
import { useTheme } from 'next-themes'
import CardPopover from './commonn/card-popover'

interface Props {
  logo_light?: string
  logo_dark?: string
  name: string
  assistant_id: string
  model: string
  createdAt: string
}

export default function BotCard({ logo_light, logo_dark, name, assistant_id, model, createdAt }: Props) {
  const { theme } = useTheme()
  const imgSrc = theme === 'light' ? logo_light : logo_dark || logo_light
  return (
    <CardWrapper>
      <CardPopover>Hello</CardPopover>

      <div className='flex flex-col items-center justify-center gap-y-2'>
        <CardAvatar imgSrc={imgSrc} name={name} />
        <p className='text-sm font-semibold text-text-heading mt-2'>{name}</p>
        <Badge variant='blue' className='break-all'>
          {assistant_id}
        </Badge>
      </div>

      <CardCeparatorBorder />
      <CardBetween left='Model' right={model} />
      <CardBetween left='Created' right={formateDate(createdAt)} />
    </CardWrapper>
  )
}
