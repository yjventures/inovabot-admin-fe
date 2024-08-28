'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formateDate } from '@/utils/date/formateDate'
import { Eye, PencilLine, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import { TableMode } from '@/components/reusable/tables/table-selector'
import Intro from '@/components/reusable/common/intro'
import { IParams } from '@/types/common/IParams'
import TableSorter from '@/components/reusable/tables/table-sorter'
import TableActions from '@/components/reusable/tables/table-actions'
import LLink from '@/components/ui/llink'
import { useDeleteCompanyMutation, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import Badge from '@/components/reusable/cards/badge'
import { useLogo } from '@/hooks/useLogo'
import CompanyCardSkeletons from '@/components/reusable/cards/Skeletons/company-card-skeletons'

interface Props {
  mode: TableMode
  isLoading: boolean
  isSuccess: boolean
  data?: IResponseWithMeta<WithId<ICompany>[]>
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
}

export default function Companies({ mode, isLoading, isSuccess, data, params, setparams }: Props) {
  const [UpdateCompany, { isSuccess: isUpdateSuccess, isError, error }] = useUpdateCompanyMutation()

  const [deleteId, setdeleteId] = useState<string | undefined>(undefined)
  const [open, setopen] = useState<boolean>(false)
  const [
    deleteCompany,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteCompanyMutation()

  useEffect(() => {
    if (isUpdateSuccess) toast.success('Company updated successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isUpdateSuccess, isError, error])

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Company deleted successfully')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <>
      {isLoading && <CompanyCardSkeletons />}

      {isSuccess && data?.data?.length ? (
        mode == 'grid' ? (
          <CardGrid>
            {data?.data?.map((company: WithId<ICompany>) => (
              <CompanyCard key={company._id} company={company} />
            ))}
          </CardGrid>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='name'>
                    Company Name
                  </TableSorter>
                </TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='createdAt'>
                    Created
                  </TableSorter>
                </TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='bots'>
                    Bots
                  </TableSorter>
                </TableHead>
                <TableHead className='text-right'>Payment</TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='status'>
                    Status
                  </TableSorter>
                </TableHead>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='last_subscribed'>
                    Payment on
                  </TableSorter>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((company: WithId<ICompany>) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const logoSrc = useLogo(company?.logo!, company?.logo_dark!)
                return (
                  <TableRow key={company?._id}>
                    <TableCell>
                      <Intro imgSrc={logoSrc} title={company?.name} description={company?.web_url} hasLink />
                    </TableCell>
                    <TableCell>{formateDate(company.createdAt, true)}</TableCell>
                    <TableCell>{company.bots}</TableCell>
                    <TableCell className='text-right'>${company.payment_amount}</TableCell>
                    <TableCell>
                      {company.active ? (
                        <Badge variant='emerald'>Active</Badge>
                      ) : (
                        <Badge variant='error'>Deactivated</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {company.last_subscribed ? formateDate(company.last_subscribed, true) : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <TableActions>
                        {company.active ? (
                          <ToggleLeft
                            className='text-red-500 cursor-pointer'
                            onClick={() => UpdateCompany({ id: company._id, body: { active: false } })}
                          />
                        ) : (
                          <ToggleRight
                            className='text-green-500 cursor-pointer'
                            onClick={() => UpdateCompany({ id: company._id, body: { active: true } })}
                          />
                        )}
                        <LLink href={`/admin/companies/${company._id}`}>
                          <Eye className='text-text-primary' />
                        </LLink>
                        <LLink href={`/admin/companies/update/${company._id}`}>
                          <PencilLine className='text-blue-primary' />
                        </LLink>
                        <Trash2
                          className='text-error'
                          onClick={() => {
                            setdeleteId(company._id)
                            setopen(true)
                          }}
                        />
                      </TableActions>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )
      ) : null}

      {isSuccess && !data?.data?.length && <p className='mt-10 italic text-text-gray'>No Company Yet</p>}

      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        isLoading={isDeleteLoading}
        title='Are you sure to delete this company?'
        cb={() => deleteCompany(deleteId!)}
      />
    </>
  )
}
