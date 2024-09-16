'use client'

import TablePagination from '@/components/reusable/tables/table-pagination'
import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { initParams } from '@/constants/form/init-params'
import { useGetTemplatesQuery } from '@/redux/features/templatesApi'
import { IParams } from '@/types/common/IParams'
import { useState } from 'react'
import Templates from './Templates'

export default function AllTemplates() {
  const [params, setparams] = useState<IParams>(initParams({}))
  const { data, isLoading, isSuccess } = useGetTemplatesQuery(params)
  const [mode, setmode] = useState<TableMode>('grid')
  return (
    <div>
      <TableSearchSelector
        params={params}
        setparams={setparams}
        mode={mode}
        setmode={setmode}
        placeholder='Search template by name...'
      />

      <Templates
        mode={mode}
        isLoading={isLoading}
        isSuccess={isSuccess}
        data={data}
        params={params}
        setparams={setparams}
      />

      <TablePagination params={params} setparams={setparams} metadata={data?.metadata!} />
    </div>
  )
}
