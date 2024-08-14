import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import TableSkeleton from '@/components/reusable/tables/table-skeleton'
import { Skeleton } from '@/components/ui/skeleton'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formateDate } from '@/utils/date/formateDate'
import { MessageSquareMore, PencilLine, Trash2 } from 'lucide-react'
import { TableMode } from '@/components/reusable/tables/table-selector'

interface Props {
  mode: TableMode
  isLoading: boolean
  isSuccess: boolean
  data?: IResponseWithMeta<WithId<ICompany>[]>
}

export default function Companies({ mode, isLoading, isSuccess, data }: Props) {
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
                <TableHead>Company Name</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Bots</TableHead>
                <TableHead className='text-right'>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment on</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((company: WithId<ICompany>) => (
                <TableRow key={company._id}>
                  <TableCell>{company.name}</TableCell>
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
