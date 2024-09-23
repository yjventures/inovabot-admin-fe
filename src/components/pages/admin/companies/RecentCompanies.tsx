'use client'

import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { initParams } from '@/constants/form/init-params'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { useState } from 'react'
import AdminCompanies from './AdminCompanies'

export default function RecentCompanies() {
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

      <AdminCompanies
        mode={mode}
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={data}
        params={params}
        setparams={setparams}
      />
    </div>
  )
}
