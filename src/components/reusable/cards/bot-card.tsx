'use client'

import LLink from '@/components/ui/llink'
import { BOT_URL } from '@/configs'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteBotMutation } from '@/redux/features/botsApi'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Eye, PencilLine, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import Badge from './badge'
import CardAvatar from './commonn/card-avatar'
import CardBetween from './commonn/card-between'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  _id: string
  logo_light?: string
  logo_dark?: string
  name: string
  category: string
  model: string
  createdAt: string
  embedding_url: string
}

export default function BotCard({ logo_light, logo_dark, name, category, createdAt, embedding_url, _id }: Props) {
  const imgSrc = useLogo(logo_light!, logo_dark!)
  const [deleteBot, { isSuccess, isError, error }] = useDeleteBotMutation()
  const [open, setopen] = useState<boolean>(false)

  useEffect(() => {
    if (isSuccess) toast.success('Bot deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  const url = `${BOT_URL}/${embedding_url}`

  return (
    <>
      <CardWrapper>
        <CardPopover>
          <a href={url} target='_blank' className='flex items-center justify-between'>
            <p className='text-sm font-medium text-text-secondary'>View Bot</p>
            <Eye className='size-5' />
          </a>

          {getUserRole() !== 'viewer' && (
            <>
              <LLink href={`/${getDashboardURLPath()}/bots/update/${_id}`}>
                <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
              </LLink>
              <CardPopoverContent
                text='Delete'
                icon={<Trash2 className='text-destructive' />}
                onClick={() => setopen(true)}
              />
            </>
          )}
        </CardPopover>

        <div className='flex flex-col items-center justify-center gap-y-2'>
          <CardAvatar imgSrc={imgSrc} name={name} />
          <p className='text-sm font-semibold text-text-heading mt-2'>{name}</p>
          <Badge variant='blue' className='break-all'>
            {category}
          </Badge>
        </div>

        <CardCeparatorBorder />
        <CardBetween left='Created' right={formateDate(createdAt)} />
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        cb={() => deleteBot(_id)}
        title='Are you sure to delete this bot?'
      />
    </>
  )
}
