'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard, { type CompanyCardProps } from '@/components/reusable/cards/company-card'
import TableSearchSelector from '@/components/reusable/tables/table-search-selector'
import { TableMode } from '@/components/reusable/tables/table-selector'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
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
  return (
    <div>
      <TableSearchSelector params={params} setparams={setparams} mode={mode} setmode={setmode} />

      {mode == 'grid' ? (
        <CardGrid>
          {data?.data.map((company: WithId<ICompany>) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </CardGrid>
      ) : null}
    </div>
  )
}
