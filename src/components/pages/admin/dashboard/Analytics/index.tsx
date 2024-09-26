'use client'

import StatisticsCard from '@/components/reusable/cards/statistics-card'
import { Skeleton } from '@/components/ui/skeleton'
import Typography from '@/components/ui/typography'
import { useDashboardAnalyticsQuery } from '@/redux/features/dashboardsApi'
import { useGetUserQuery } from '@/redux/features/usersApi'
import { getUserId } from '@/utils/auth/getUserId'
import { Bot } from 'lucide-react'
import { useState } from 'react'
import AnalyticsSelector from './AnalyticsSelector'

export default function Analytics() {
  const [time, settime] = useState<string | undefined>('all')
  const { data } = useDashboardAnalyticsQuery(time)
  const { data: userData, isLoading: isUserLoading, isSuccess: isUserSuccess } = useGetUserQuery(getUserId())

  console.log(userData)

  console.log(data)
  return (
    <div>
      {isUserLoading && (
        <div className='flex flex-wrap items-center gap-x-5 gap-y-2 justify-between'>
          <Skeleton className='w-full max-w-xl h-16' />
          <Skeleton className='w-full max-w-sm h-10' />
        </div>
      )}
      {isUserSuccess && (
        <div className='flex flex-wrap items-end gap-x-5 gap-y-2 justify-between'>
          <div className='space-y-1'>
            <Typography variant='h2'>Welcome back {userData?.user?.name}</Typography>
            <p className='text-text-secondary text-lg'>
              See the Analytics and the other important data in the dashboard
            </p>
          </div>
          <AnalyticsSelector filter={time} setfilter={settime} />
        </div>
      )}

      <div className='grid grid-cols-4 gap-x-6 mt-6'>
        <StatisticsCard title='Total Bots' icon={Bot} iconGradientClassName='from-violet-600 to-cyan-300' number='10' />
        <StatisticsCard title='Total Bots' icon={Bot} iconGradientClassName='from-violet-600 to-cyan-300' number='10' />
        <StatisticsCard title='Total Bots' icon={Bot} iconGradientClassName='from-violet-600 to-cyan-300' number='10' />
        <StatisticsCard title='Total Bots' icon={Bot} iconGradientClassName='from-violet-600 to-cyan-300' number='10' />
      </div>
    </div>
  )
}
