'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import PackagesKkeletons from '@/components/reusable/cards/Skeletons/packages-skeletons'
import Search from '@/components/reusable/tables/search'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { Switch } from '@/components/ui/switch'
import { initParams } from '@/constants/form/init-params'
import { useGetPackagesQuery } from '@/redux/features/packagesApi'
import { IParams } from '@/types/common/IParams'
import { WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'
import { useState } from 'react'

export interface IFrequency {
  value: 'monthly' | 'yearly'
  priceSuffix: string
}

export const frequencies: IFrequency[] = [
  { value: 'monthly', priceSuffix: '/month' },
  { value: 'yearly', priceSuffix: '/year' }
]

export default function AllPackages() {
  const [params, setparams] = useState<IParams>(initParams({ limit: 100, sortOrder: 'asc' }))
  const [search, setSearch] = useState<string>('')

  const { data, isLoading, isSuccess } = useGetPackagesQuery({ ...params, search })

  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div>
      <Search searchValue={search} setsearchValue={setSearch} className='max-w-2xl' placeholder='Search Packages...' />

      <div className='flex items-center justify-center my-10'>
        <p className='text-sm sm:text-xl'>Billed Monthly</p>
        <Switch
          className='mx-2'
          onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
        />
        <p className='text-text text-sm sm:text-xl'>Billed Anually</p>
      </div>

      <PackagesKkeletons isLoading={isLoading} />
      {isSuccess ? (
        data?.data?.length ? (
          <CardGrid total={3}>
            {data?.data?.map((tier: WithId<IPackage>) => (
              <PriceCard key={tier._id} tier={tier} frequency={frequency} />
            ))}
          </CardGrid>
        ) : (
          <p className='mt-10 italic text-text-secondary'>No packages created yet</p>
        )
      ) : null}

      <TablePagination metadata={data?.metadata!} setparams={setparams} params={params} />
    </div>
  )
}
