'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { Skeleton } from '@/components/ui/skeleton'
import { initParams } from '@/constants/form/init-params'
import { getCompanyId } from '@/helpers/pages/companies'
import { useLogo } from '@/hooks/useLogo'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetCompanyQuery, useGetStorageInfoMutation } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { formatFileSize } from '@/utils/files/formatFileSize'
import { PencilLine, PlusSquare } from 'lucide-react'
import { useEffect } from 'react'

export default function CompanyDetailsForCompnay() {
  const id = getCompanyId()
  const { data, isLoading, isSuccess: isCompanySuccess } = useGetCompanyQuery(id as string)
  const { logo, logo_dark, name, web_url, address, description, createdAt, expires_at } = {
    ...data?.data
  }

  const [getStorageInfo, { data: storageData, isSuccess: isStorageSuccess }] = useGetStorageInfoMutation()

  useEffect(() => {
    if (id) {
      getStorageInfo(id as string)
    }
  }, [id, getStorageInfo])

  const logoSrc = useLogo(logo!, logo_dark!)

  type Params = IParams & { company_id: string; category: string }
  const params: Params = { ...initParams({ limit: 5 }), company_id: id as string, category: 'All' }
  const { data: botsData, isSuccess, isLoading: isBotsLoading } = useGetBotsQuery(params)

  return (
    <>
      <DashboardHeading title={name!} />
      <Tutorial
        videoId='qXgYQgCRqz8'
        title='Learn More'
        description='about the importance of having an AI chatbot'
        ctaLabel='Learn More'
        ctaHref='/'
        className='mb-10'
      />
      {isLoading ? <Skeleton className='w-full rounded-lg h-72' /> : null}
      {isCompanySuccess ? (
        <CompanyIntoCard
          name={name!}
          logo={logoSrc}
          payment_status={!!expires_at!}
          createdAt={createdAt!}
          expires_at={expires_at!}
          description={description!}
          address={address}
          web_url={web_url}
          extra={
            isStorageSuccess ? (
              <div className='px-4 pb-4 text-sm font-medium'>
                Total Storage Used: {formatFileSize(storageData?.data.usedStorage!)} /{' '}
                {formatFileSize(storageData?.data.totalStorage!)}
              </div>
            ) : null
          }
          topCTASection={
            <div className='flex flex-wrap gap-x-3 gap-2'>
              <LLink href={'/company/bots/create'}>
                <Button icon={<PlusSquare />}>Add New Bot</Button>
              </LLink>
              <LLink href={'/company/update'}>
                <Button icon={<PencilLine />}>Update Company</Button>
              </LLink>
            </div>
          }
        />
      ) : null}

      <DashboardHeading
        title='Recent Bots'
        variant='h3'
        extra={
          <LLink href='/company/bots'>
            <Button>View All</Button>
          </LLink>
        }
        className='mt-6'
      />
      <BotCardSkeletons isLoading={isBotsLoading} className='mt-5' />

      {isSuccess ? (
        botsData?.data?.length ? (
          <CardGrid className='mt-5'>
            {botsData?.data?.map(bot => (
              <BotCard
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
        ) : (
          <p className='italic text-text-secondary mt-5 min-h-72'>No bots created yet</p>
        )
      ) : null}
    </>
  )
}
