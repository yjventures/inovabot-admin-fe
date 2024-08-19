'use client'

import React, { useEffect, useState } from 'react'
import CardWrapper from './commonn/card-wrapper'
import { Img } from '@/components/ui/img'
import Badge from './badge'
import CardBetween from './commonn/card-between'
import { formateDate } from '@/utils/date/formateDate'
import companyPlaceholder from '@/assets/images/common/dashboard/company-placeholder.png'
import CardCeparatorBorder from './commonn/card-separator-border'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import { ICompany } from '@/types/ICompany'
import { WithId } from '@/types/common/IResponse'
import { Eye, PencilLine, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import LLink from '@/components/ui/llink'
import { useDeleteCompanyMutation, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'

export interface CompanyCardProps {
  company: WithId<ICompany>
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const [open, setopen] = useState<boolean>(false)
  const { logo, name, web_url, bots, recurring, last_subscribed, createdAt, active } = { ...company }
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

  return (
    <>
      <CardWrapper>
        <CardPopover>
          {active ? (
            <CardPopoverContent
              text='Deactivate'
              icon={<ToggleLeft className='text-red-500' />}
              onClick={() => UpdateCompany({ id: company._id, payload: { active: false } })}
            />
          ) : (
            <CardPopoverContent
              text='Activate'
              icon={<ToggleRight className='text-green-500' />}
              onClick={() => UpdateCompany({ id: company._id, payload: { active: true } })}
            />
          )}
          <LLink href={`/admin/companies/${company._id}`}>
            <CardPopoverContent text='View Details' icon={<Eye className='text-text-primary' />} />
          </LLink>
          <LLink href={`/admin/companies/update/${company._id}`}>
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
