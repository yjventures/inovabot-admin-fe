'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formateDate } from '@/utils/date/formateDate'
import { MessageCircleIcon, PencilLineIcon, Trash2 } from 'lucide-react'

export default function RecentCompanies() {
  const [params, setparams] = useState<IParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: ''
  })
  const { data, isLoading, isError } = useGetCompaniesQuery(params)
  const [mode, setmode] = useState<TableMode>('grid')
  return (
    <div>
      <TableSearchSelector params={params} setparams={setparams} mode={mode} setmode={setmode} />

      {mode == 'grid' ? (
        <CardGrid>
          {data?.data.map((company: WithId<ICompany>) => (
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
                    <MessageCircleIcon className='text-text-gray-light' />
                    <PencilLineIcon className='text-blue-primary' />
                    <Trash2 className='text-error' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
