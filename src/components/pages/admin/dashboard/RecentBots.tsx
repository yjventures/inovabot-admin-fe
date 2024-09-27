'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { getDashboardURLPath } from '@/helpers/common'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { PlusSquare } from 'lucide-react'

export default function RecentBots() {
  const params = { ...initParams({ limit: 5 }), category: 'All' }

  const { data: botsData, isSuccess, isLoading } = useGetBotsQuery(params)

  return (
    <div className='mt-8'>
      <DashboardHeading
        variant='h3'
        title='Recent Bots'
        extra={
          <>
            <LLink href={`${getDashboardURLPath()}/bots`}>
              <Button variant='outline'>View All</Button>
            </LLink>
            <LLink href={`${getDashboardURLPath()}/bots/create`}>
              <Button variant='gradient' icon={<PlusSquare />}>
                Add New
              </Button>
            </LLink>
          </>
        }
      />

      <BotCardSkeletons isLoading={isLoading} className='mt-5' limit={5} />

      {isSuccess && (
        <CardGrid className='mt-5'>
          {botsData?.data?.map(bot => (
            <BotCard
              logo_light={bot?.logo_light}
              logo_dark={bot?.logo_dark}
              _id={bot?._id!}
              key={bot._id}
              name={bot.name!}
              category={bot.category!}
              model={bot.model!}
              createdAt={String(bot.createdAt!)}
              embedding_url={bot.embedding_url!}
            />
          ))}
        </CardGrid>
      )}
    </div>
  )
}
