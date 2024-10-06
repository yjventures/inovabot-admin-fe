'use client'

import PriceCard from '@/components/reusable/cards/price-card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { useGetAllSubscriptionsQuery, useSubscribeToPackageMutation } from '@/redux/features/resellersApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function PricingPlans() {
  const params = useSearchParams()
  const company_id = params.get('companyId')
  const { isLoading, isSuccess, data } = useGetAllSubscriptionsQuery({
    page: 1,
    limit: 100,
    sortBy: 'createdAt',
    sortOrder: 'asc'
  })

  // Only showing non free packages
  const filteredPackages = data?.data?.filter(pkg => !pkg.hidden)

  const frequencies = [
    { value: 'monthly', priceSuffix: '/month' },
    { value: 'yearly', priceSuffix: '/year' }
  ]

  const [frequency, setFrequency] = useState(frequencies[0])

  const [
    subscribe,
    { isLoading: isSubscribeLoading, isSuccess: isSubscribeSuccess, isError, error, data: subscribeData }
  ] = useSubscribeToPackageMutation()

  const subscribeFn = tier => {
    const packageData = tier.price[frequency.value]
    subscribe({ price_id: packageData.stripe_id, package_id: tier._id, recurring_type: frequency.value, company_id })
  }

  useEffect(() => {
    if (isSubscribeSuccess) redirect(subscribeData?.stripeSession)
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSubscribeSuccess, isError, error, subscribeData])

  return (
    <div className='pt-20 pb-10 container'>
      <div className='flex items-center justify-center'>
        <Typography variant='body' className='text-sm sm:text-xl'>
          Billed Monthly
        </Typography>
        <Switch
          className='mx-2'
          onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
        />
        <Typography variant='body' className='text-text text-sm sm:text-xl'>
          Billed Anually
        </Typography>
      </div>

      <div className='isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3'>
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className='rounded-lg w-full h-96' />)
          : null}
        {isSuccess
          ? filteredPackages?.map(tier => (
              <PriceCard
                showPopover={false}
                tier={tier}
                frequency={frequency}
                key={tier.id}
                child={
                  <Button onClick={() => subscribeFn(tier)} variant='gradient' isLoading={isSubscribeLoading}>
                    Subscribe
                  </Button>
                }
              />
            ))
          : null}
      </div>
    </div>
  )
}
