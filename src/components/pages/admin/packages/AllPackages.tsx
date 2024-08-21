'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import Search from '@/components/reusable/tables/search'
import TablePagination, { PaginationProps } from '@/components/reusable/tables/table-pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { initParams } from '@/constants/form/init-params'
import { useGetPackagesQuery } from '@/redux/features/packagesApi'
import { IParams } from '@/types/common/IParams'
import { Dispatch, SetStateAction, useState } from 'react'

export default function AllPackages() {
  const [params, setparams] = useState<IParams>(initParams({}))
  const [search, setSearch] = useState<string>('')

  const { data, isLoading, isSuccess } = useGetPackagesQuery(params)

  const frequencies = [
    { value: 'monthly', priceSuffix: '/month' },
    { value: 'yearly', priceSuffix: '/year' }
  ]

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

      {isSuccess ? (
        <CardGrid total={4}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className='rounded-lg w-full h-96' />)
            : null}
          {isSuccess ? data?.data?.map(tier => <PriceCard key={tier._id} tier={tier} frequency={frequency} />) : null}
        </CardGrid>
      ) : null}

      <TablePagination
        metadata={data?.metadata!}
        setparams={setparams as Dispatch<SetStateAction<PaginationProps>>}
        params={params}
      />
    </div>
  )
}
