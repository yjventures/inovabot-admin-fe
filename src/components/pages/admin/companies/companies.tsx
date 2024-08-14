import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import React, { Dispatch, SetStateAction } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formateDate } from '@/utils/date/formateDate'
import { MessageSquareMore, PencilLine, Trash2 } from 'lucide-react'
import { TableMode } from '@/components/reusable/tables/table-selector'
import Intro from '@/components/reusable/common/intro'
import { IParams } from '@/types/common/IParams'
import TableSorter from '@/components/reusable/tables/table-sorter'

interface Props {
  mode: TableMode
  isLoading: boolean
  isSuccess: boolean
  data?: IResponseWithMeta<WithId<ICompany>[]>
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
}

export default function Companies({ mode, isLoading, isSuccess, data, params, setparams }: Props) {
  return (
    <>
      {isLoading ? (
        mode == 'grid' ? (
          <CardGrid>
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={index} className='w-full h-80' />
            ))}
          </CardGrid>
        ) : (
          <TableSkeleton />
        )
      ) : null}

      {isSuccess ? (
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
              {data?.data.map((company: WithId<ICompany>) => (
                <TableRow key={company?._id}>
                  <TableCell>
                    <Intro imgSrc={company?.logo} title={company?.name} description={company?.web_url} hasLink />
                  </TableCell>
                  <TableCell>{formateDate(company.createdAt, true)}</TableCell>
                  <TableCell>{company.bots}</TableCell>
                  <TableCell className='text-right'>${company.payment_amount}</TableCell>
                  <TableCell>{company.user_id}</TableCell>
                  <TableCell>{formateDate(company.last_subscribed, true)}</TableCell>
                  <TableCell>
                    <div className='flex gap-2 [&>svg]:cursor-pointer [&>svg]:size-[18px]'>
                      <MessageSquareMore className='text-text-gray-light' />
                      <PencilLine className='text-blue-primary' />
                      <Trash2 className='text-error' />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      ) : null}
    </>
  )
}
