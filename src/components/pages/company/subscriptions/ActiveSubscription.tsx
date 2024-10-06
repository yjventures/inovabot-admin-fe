'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import PackagesKkeletons from '@/components/reusable/cards/Skeletons/packages-skeletons'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { initParams } from '@/constants/form/init-params'
import { getUserRole } from '@/helpers/common'
import { getCompanyId } from '@/helpers/pages/companies'
import { cn } from '@/lib/utils'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import {
  useCancelSubscriptionMutation,
  useGetPackagesQuery,
  useUpdateSubscriptionMutation
} from '@/redux/features/packagesApi'
import { useSubscribeToPackageMutation } from '@/redux/features/resellersApi'
import { WithId } from '@/types/common/IResponse'
import { IPackage } from '@/types/IPackage'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { frequencies } from '../../admin/packages/AllPackages'

export default function ActiveSubscription() {
  const router = useRouter()
  // Get packages data
  const { data, isLoading, isSuccess } = useGetPackagesQuery(initParams({ limit: 100, sortOrder: 'asc' }))
  const [frequency, setFrequency] = useState(frequencies[0])
  const companyId = getCompanyId()
  const { data: companyData } = useGetCompanyQuery(companyId as string)

  const activePackage = data?.data?.find(
    pkg =>
      pkg?.price?.[companyData?.data?.recurring_type as keyof IPackage['price']]?.stripe_id ===
      companyData?.data?.price_id
  )

  // if active package is not free, hide it from the list
  const isActivePackageFree = activePackage?.hidden
  const filteredPackages = isActivePackageFree ? data?.data : data?.data?.filter(pkg => !pkg.hidden)

  // Subscribe to package
  const [
    subscribe,
    { isSuccess: isSubscribeSuccess, isError: isSubscribeError, error: subscribeError, data: subscribeData }
  ] = useSubscribeToPackageMutation()

  const subscribeFn = tier => {
    toast.success('Initializing subscription...')
    const packageData = tier.price[frequency.value]
    subscribe({
      price_id: packageData.stripe_id,
      package_id: tier._id,
      recurring_type: frequency.value,
      company_id: getCompanyId()
    })
  }

  useEffect(() => {
    if (isSubscribeSuccess) redirect(subscribeData?.stripeSession)
    if (isSubscribeError) toast.error(rtkErrorMessage(subscribeError))
  }, [isSubscribeSuccess, isSubscribeError, subscribeError, subscribeData])

  // Update subscription
  const [updateSubscription, { isSuccess: isUpdateSuccess, isError, error, data: updateData }] =
    useUpdateSubscriptionMutation()

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.dismiss()
      toast.success('Subscription updated successfully!')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isUpdateSuccess, isError, error, updateData])

  // Cancel subscription
  const [
    cancelSubscription,
    { isLoading: isCancelLoading, isSuccess: isCancelSuccess, isError: isCancelError, error: cancelError }
  ] = useCancelSubscriptionMutation()

  useEffect(() => {
    if (isCancelSuccess) {
      toast.success('Subscription cancelled successfully')
      router.refresh()
    }
    if (isCancelError) toast.error(rtkErrorMessage(cancelError))
  }, [isCancelSuccess, isCancelError, cancelError, router])

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
          {filteredPackages?.map((tier: WithId<IPackage>) => (
            <PriceCard
              key={tier._id}
              tier={tier}
              frequency={frequency}
              showPopover={false}
              className={cn({
                'border-dashed border-2':
                  activePackage?._id === tier._id && frequency.value === companyData?.data?.recurring_type
              })}
              child={
                activePackage ? (
                  activePackage?._id === tier._id && frequency.value === companyData?.data?.recurring_type ? (
                    <Button
                      variant='destructive'
                      className='w-full'
                      isLoading={isCancelLoading}
                      onClick={cancelSubscription}
                    >
                      Cancel Subscription
                    </Button>
                  ) : (
                    getUserRole() === 'company-admin' && (
                      <Button
                        variant='gradient'
                        className='w-full'
                        onClick={() => {
                          toast.loading('Updating subscription...')
                          updateSubscription({
                            price_id: tier.price[frequency.value].stripe_id,
                            package_id: tier._id,
                            recurring_type: frequency.value,
                            company_id: getCompanyId()
                          })
                        }}
                      >
                        {activePackage?.price?.[frequency.value]?.price && tier?.price?.[frequency.value]?.price
                          ? frequency.value !== companyData?.data?.recurring_type && activePackage?._id === tier?._id
                            ? 'Update Frequency'
                            : Number(activePackage?.price?.[frequency.value]?.price) >
                              Number(tier?.price?.[frequency.value]?.price)
                            ? 'Downgrade'
                            : 'Upgrade'
                          : 'Select'}
                      </Button>
                    )
                  )
                ) : (
                  <Button onClick={() => subscribeFn(tier)} variant='gradient' className='w-full'>
                    Subscribe
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
