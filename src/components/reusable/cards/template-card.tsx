import LLink from '@/components/ui/llink'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteTemplateMutation } from '@/redux/features/templatesApi'
import { WithId } from '@/types/common/IResponse'
import { ITemplate } from '@/types/Itemplate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine, Trash2 } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import Badge from './badge'
import CardAvatar from './commonn/card-avatar'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardWrapper from './commonn/card-wrapper'

interface Props extends HTMLAttributes<HTMLDivElement> {
  template: WithId<ITemplate>
  hidePopover?: boolean
}

export default function TemplateCard({ template, hidePopover = false, ...rest }: Props) {
  const { _id, logo_light, logo_dark, name, category, description } = template

  const logo = useLogo(logo_light!, logo_dark!)
  const [open, setopen] = useState<boolean>(false)

  const [deleteTemplate, { isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteTemplateMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Template deleted successfully')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <>
      <CardWrapper {...rest}>
        {!hidePopover && (
          <CardPopover>
            <LLink href={`/admin/templates/update/${_id}`}>
              <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
            </LLink>
            <CardPopoverContent
              text='Delete'
              icon={<Trash2 className='text-destructive' />}
              onClick={() => setopen(true)}
            />
          </CardPopover>
        )}
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
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        cb={() => deleteTemplate(_id)}
        title='Are you sure to delete this bot?'
      />
    </>
  )
}
