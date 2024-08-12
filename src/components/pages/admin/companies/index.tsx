'use client'

import Search from '@/components/reusable/tables/search'
import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { useState } from 'react'

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
  console.log(data?.data)
  return (
    <div>
      <TableSearchSelector params={params} setparams={setparams} mode={mode} setmode={setmode} />
    </div>
  )
}
