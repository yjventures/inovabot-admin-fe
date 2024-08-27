'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { Skeleton } from '@/components/ui/skeleton'
import { initParams } from '@/constants/form/init-params'
import { useLogo } from '@/hooks/useLogo'
import usePush from '@/hooks/usePush'
import { cn } from '@/lib/utils'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { useDeleteCompanyMutation, useGetCompanyQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { ICategory } from '@/types/ICategory'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine, Trash2 } from 'lucide-react'
import { useParams } from 'next/navigation'
import { title } from 'process'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CompanyDetails() {
  const push = usePush()
  const { id } = useParams()
  const { data, isLoading, isSuccess: isCompanySuccess } = useGetCompanyQuery(id as string)
  const { logo, logo_dark, name, web_url, address, description, createdAt, expires_at } = { ...data?.data }

  const { data: categoriesData, isSuccess: isCategorySuccess, isLoading: iscategoryLoading } = useGetCategoriesQuery({})
  const [category, setcategory] = useState<string>('All')

  const logoSrc = useLogo(logo!, logo_dark!)

  type Params = IParams & { company_id: string; category: string }
  const params: Params = { ...initParams({}), company_id: id as string, category }
  const { data: botsData, isSuccess, isLoading: isBotsLoading } = useGetBotsQuery(params)

  const [open, setopen] = useState<boolean>(false)
  const [
    deleteCompany,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteCompanyMutation()

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.success('Company deleted successfully')
      push('/admin/companies')
    }
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError, push])

  return (
    <>
      <DashboardHeading title='Company Details' />
      <Tutorial
        videoId='oPVgo3jOUAc'
        title='Tutorial Title'
        description='Tutorial Description'
        ctaLabel='Tutorial CTA'
        ctaHref='/'
        className='mb-10'
      />
      {isLoading ? <Skeleton className='w-full rounded-lg h-72' /> : null}
      {isCompanySuccess ? (
        <CompanyIntoCard
          name={name!}
          logo={logoSrc}
          payment_status='paid'
          createdAt={createdAt!}
          expires_at={expires_at!}
          description={description!}
          address={address}
          web_url={web_url}
          topCTASection={
            <div className='flex flex-wrap gap-x-3 gap-2'>
              <LLink href={`/admin/companies/update/${id}`}>
                <Button icon={<PencilLine />}>Update Company</Button>
              </LLink>
              <Button icon={<Trash2 />} variant='destructive' onClick={() => setopen(true)}>
                Delete Company
              </Button>
            </div>
          }
        />
      ) : null}

      {iscategoryLoading ? (
        <div className='flex flex-wrap gap-x-3 gap-y-1.5 mt-6'>
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className='w-40 h-10 rounded-full' />
          ))}
        </div>
      ) : null}

      {isCategorySuccess ? (
        <div className='flex flex-wrap gap-x-3 mt-6'>
          {[{ _id: '1', title: 'All' }, ...categoriesData?.categories]?.map(cat => (
            <Button
              key={cat._id}
              variant='outline'
              onClick={() => setcategory(cat.title)}
              className={cn('rounded-full', { 'bg-gray-secondary': category === cat.title })}
            >
              {cat.title}
            </Button>
          ))}
        </div>
      ) : null}

      <BotCardSkeletons isLoading={isBotsLoading} className='mt-5' />

      {isSuccess ? (
        <CardGrid className='mt-5'>
          {botsData?.data?.map(bot => (
            <BotCard
              _id={bot?._id!}
              key={bot._id}
              name={bot.name!}
              category={bot.category!}
              model={bot.model!}
              createdAt={String(bot.createdAt!)}
            />
          ))}
        </CardGrid>
      ) : null}

      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        isLoading={isDeleteLoading}
        title='Are you sure to delete this company?'
        cb={() => deleteCompany(id as string)}
      />
    </>
  )
}
