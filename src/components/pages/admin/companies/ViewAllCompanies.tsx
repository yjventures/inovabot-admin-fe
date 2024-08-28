'use client'

import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { useState } from 'react'
import { initParams } from '@/constants/form/init-params'
import TablePagination from '@/components/reusable/tables/table-pagination'
import Companies from './Companies'

export default function ViewAllCompanies() {
  const [params, setparams] = useState<IParams>(initParams({}))
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

      <Companies
        mode={mode}
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={data}
        params={params}
        setparams={setparams}
      />

      {isSuccess && data?.data?.length && (
        <TablePagination params={params} setparams={setparams} metadata={data?.metadata!} />
      )}
    </div>
  )
}
