'use client'

import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { Dispatch, SetStateAction, useState } from 'react'
import { initParams } from '@/constants/form/init-params'
import Companies from '../companies'
import TablePagination, { PaginationProps } from '@/components/reusable/tables/table-pagination'

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

      {data?.metadata && (
        <TablePagination
          metadata={data.metadata}
          params={params}
          setparams={setparams as Dispatch<SetStateAction<PaginationProps>>}
        />
      )}
    </div>
  )
}
