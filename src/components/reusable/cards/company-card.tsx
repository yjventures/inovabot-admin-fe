'use client'

import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteCompanyMutation, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { ICompany } from '@/types/ICompany'
import { WithId } from '@/types/common/IResponse'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { formatValue } from '@/utils/misc/formatValue'
import { Eye, PencilLine, PlusCircle, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import Badge from './badge'
import CardBetween from './commonn/card-between'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardWrapper from './commonn/card-wrapper'

export interface CompanyCardProps {
  company: WithId<ICompany>
  from?: 'admin' | 'reseller'
}

export default function CompanyCard({ company, from = 'admin' }: CompanyCardProps) {
  const [open, setopen] = useState<boolean>(false)
  const { logo, logo_dark, name, web_url, bots, recurring_type, last_subscribed, createdAt, active } = { ...company }
  const [UpdateCompany, { isSuccess, isError, error }] = useUpdateCompanyMutation()
  const [deleteCompany, { isLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }] =
    useDeleteCompanyMutation()

  useEffect(() => {
    if (isSuccess) toast.success('Company updated successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Company deleted successfully')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  const logoSrc = useLogo(logo!, logo_dark!)

  return (
    <>
      <CardWrapper>
        <CardPopover>
          <LLink href={`/${from}/bots/create?companyId=${company._id}`}>
            <CardPopoverContent text='Create a bot' icon={<PlusCircle className='text-emerald-primary' />} />
          </LLink>
          {active ? (
            <CardPopoverContent
              text='Deactivate'
              icon={<ToggleLeft className='text-red-500' />}
              onClick={() => UpdateCompany({ id: company._id, body: { active: false } })}
            />
          ) : (
            <CardPopoverContent
              text='Activate'
              icon={<ToggleRight className='text-green-500' />}
              onClick={() => UpdateCompany({ id: company._id, body: { active: true } })}
            />
          )}
          <LLink href={`/${from}/companies/${company._id}`}>
            <CardPopoverContent text='View Details' icon={<Eye className='text-text-primary' />} />
          </LLink>
          <LLink href={`/${from}/companies/update/${company._id}`}>
            <CardPopoverContent text='Edit' icon={<PencilLine className='text-blue-primary' />} />
          </LLink>
          <CardPopoverContent
            text='Delete'
            icon={<Trash2 className='text-destructive' />}
            onClick={() => setopen(true)}
          />
        </CardPopover>
        <div className='flex flex-col items-center justify-center gap-y-2'>
          <div className='size-12 rounded-lg overflow-hidden'>
            {logoSrc ? (
              <Img src={logoSrc} alt={name} className='size-full aspect-square object-cover' />
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
        <CardBetween left='Recurring' right={formatValue(recurring_type)} />
        <CardBetween left='Last Subscribed' right={last_subscribed ? formateDate(last_subscribed) : 'N/A'} />
        <CardBetween left='Created' right={formateDate(createdAt)} />
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        isLoading={isLoading}
        title='Are you sure to delete this company?'
        cb={() => deleteCompany(company._id)}
      />
    </>
  )
}
