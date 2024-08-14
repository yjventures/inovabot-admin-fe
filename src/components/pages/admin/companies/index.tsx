'use client'

import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { useState } from 'react'
import Companies from './companies'

export default function RecentCompanies() {
  const [params, setparams] = useState<IParams>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    search: ''
  })
  const { data, isLoading, isSuccess } = useGetCompaniesQuery(params)
  const [mode, setmode] = useState<TableMode>('grid')
  return (
    <div>
      <TableSearchSelector
        params={params}
        setparams={setparams}
        mode={mode}
        setmode={setmode}
        placeholder='Search company by name...'
      />

      <Companies mode={mode} isLoading={isLoading} isSuccess={isSuccess} data={data} />
    </div>
  )
}
