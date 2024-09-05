'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import PackagesKkeletons from '@/components/reusable/cards/Skeletons/packages-skeletons'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { initParams } from '@/constants/form/init-params'
import { getCompanyId } from '@/helpers/pages/companies'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import { useGetPackagesQuery, useUpdateSubscriptionMutation } from '@/redux/features/packagesApi'
import { WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { frequencies } from '../../admin/packages/AllPackages'

export default function ActiveSubscription() {
  const { data, isLoading, isSuccess } = useGetPackagesQuery(initParams({ limit: 100, sortOrder: 'asc' }))
  const [frequency, setFrequency] = useState(frequencies[0])
  const companyId = getCompanyId()
  const { data: companyData } = useGetCompanyQuery(companyId as string)

  const activePackage = data?.data?.find(
    pkg =>
      pkg?.price?.[companyData?.data?.recurring_type as keyof IPackage['price']]?.stripe_id ===
      companyData?.data?.price_id
  )

  const [
    updateSubscription,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess, isError, error, data: updateData }
  ] = useUpdateSubscriptionMutation()

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success('Subscription updated successfully!')
      console.log(updateData)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isUpdateSuccess, isError, error, updateData])

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
            <PriceCard
              key={tier._id}
              tier={tier}
              frequency={frequency}
              showPopover={false}
              child={
                activePackage?._id === tier._id && frequency.value === companyData?.data?.recurring_type ? (
                  <Button variant='outline' className='w-full' disabled>
                    Selected
                  </Button>
                ) : (
                  <Button
                    variant='gradient'
                    className='w-full'
                    isLoading={isUpdateLoading}
                    onClick={() =>
                      updateSubscription({
                        price_id: tier.price[frequency.value].stripe_id,
                        package_id: tier._id,
                        recurring_type: frequency.value
                      })
                    }
                  >
                    {activePackage?.price?.[frequency.value]?.price && tier?.price?.[frequency.value]?.price
                      ? frequency.value !== companyData?.data?.recurring_type && activePackage?._id === tier?._id
                        ? 'Update Frequency'
                        : activePackage?.price?.[frequency.value]?.price > tier?.price?.[frequency.value]?.price
                        ? 'Downgrade'
                        : 'Upgrade'
                      : 'Select'}
                  </Button>
                )
              }
            />
          ))}{' '}
        </CardGrid>
      ) : null}
    </div>
  )
}
