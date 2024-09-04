'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import PackagesKkeletons from '@/components/reusable/cards/Skeletons/packages-skeletons'
import { Switch } from '@/components/ui/switch'
import { initParams } from '@/constants/form/init-params'
import { getCompanyId } from '@/helpers/pages/companies'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import { useGetPackagesQuery } from '@/redux/features/packagesApi'
import { WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'
import { useState } from 'react'
import { frequencies } from '../../admin/packages/AllPackages'

export default function ActiveSubscription() {
  const { data, isLoading, isSuccess } = useGetPackagesQuery(initParams({ limit: 100 }))
  const [frequency, setFrequency] = useState(frequencies[0])
  const companyId = getCompanyId()
  const { data: companyData } = useGetCompanyQuery(companyId as string)
  console.log(companyData)
  return (
    <div>
      <PackagesKkeletons isLoading={isLoading} />
      <div className='flex items-center justify-center my-10'>
        <p className='text-sm sm:text-xl'>Billed Monthly</p>
        <Switch
          className='mx-2'
          onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
        />
        <p className='text-text text-sm sm:text-xl'>Billed Anually</p>
      </div>
      {isSuccess ? (
        <CardGrid total='packages'>
          {data?.data?.map((tier: WithId<IPackage>) => (
            <PriceCard key={tier._id} tier={tier} frequency={frequency} showPopover={false} />
          ))}
        </CardGrid>
      ) : null}
    </div>
  )
}
