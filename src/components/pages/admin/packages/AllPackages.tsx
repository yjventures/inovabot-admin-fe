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
import { useState } from 'react'

export const frequencies = [
  { value: 'monthly', priceSuffix: '/month' },
  { value: 'yearly', priceSuffix: '/year' }
]

export default function AllPackages() {
  const [params, setparams] = useState<IParams>(initParams({ limit: 4 }))
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
        <CardGrid total='packages'>
          {data?.data?.map(tier => (
            <PriceCard key={tier._id} tier={tier} frequency={frequency} />
          ))}
        </CardGrid>
      ) : null}

      <TablePagination metadata={data?.metadata!} setparams={setparams} params={params} />
    </div>
  )
}
