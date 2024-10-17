'use client'

import Badge from '@/components/reusable/cards/badge'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import CompanyCardSkeletons from '@/components/reusable/cards/Skeletons/company-card-skeletons'
import Intro from '@/components/reusable/common/intro'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import TableActions from '@/components/reusable/tables/table-actions'
import { TableMode } from '@/components/reusable/tables/table-selector'
import TableSorter from '@/components/reusable/tables/table-sorter'
import LLink from '@/components/ui/llink'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteCompanyMutation, useUpdateCompanyMutation } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Eye, PencilLine, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  mode: TableMode
  isLoading: boolean
  isSuccess: boolean
  data?: IResponseWithMeta<WithId<ICompany>[]>
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
  from?: 'admin' | 'reseller'
}

export default function AdminCompanies({ mode, isLoading, isSuccess, data, params, setparams, from = 'admin' }: Props) {
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
      <CompanyCardSkeletons isLoading={isLoading} />

      {isSuccess && data?.data?.length ? (
        mode == 'grid' ? (
          <CardGrid>
            {data?.data?.map((company: WithId<ICompany>) => (
              <CompanyCard key={company._id} company={company} from={from} />
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
                {/* <TableHead className='text-right'>Payment</TableHead> */}
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
                    {/* <TableCell className='text-right'>${company.payment_amount}</TableCell> */}
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
                        <LLink href={`/${from}/companies/${company._id}`}>
                          <Eye className='text-text-primary' />
                        </LLink>
                        <LLink href={`/${from}/companies/update/${company._id}`}>
                          <PencilLine className='text-blue-primary' />
                        </LLink>
                        <Trash2
                          className='text-error cursor-pointer'
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

      {isSuccess && !data?.data?.length && <p className='mt-10 italic text-text-gray'>No companies created yet</p>}

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
