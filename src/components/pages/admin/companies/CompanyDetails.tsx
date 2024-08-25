'use client'

import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import { initParams } from '@/constants/form/init-params'
import { cn } from '@/lib/utils'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { ICategory } from '@/types/ICategory'
import { useParams } from 'next/navigation'
import { useState } from 'react'

export default function CompanyDetails() {
  const { id } = useParams()
  const { data } = useGetCompanyQuery(id as string)
  const { email, logo, logo_dark, name, web_url, address, description, createdAt, expires_at } = { ...data?.data }

  const { data: categoriesData, isSuccess: isCategorySuccess } = useGetCategoriesQuery({})
  const [category, setcategory] = useState<string>('All')

  type Params = IParams & { company_id: string }
  const params: Params = { ...initParams({}), company_id: id as string }

  const { data: botsData } = useGetBotsQuery(params)

  console.log(botsData, categoriesData)
  return (
    <div>
      <DashboardHeading title='Company Details' />
      <Tutorial
        videoId='oPVgo3jOUAc'
        title='Tutorial Title'
        description='Tutorial Description'
        ctaLabel='Tutorial CTA'
        ctaHref='/'
        className='mb-10'
      />
      <CompanyIntoCard
        name={name!}
        payment_status='paid'
        createdAt={createdAt!}
        expires_at={expires_at!}
        description={description!}
        address={address}
        web_url={web_url}
        topCTASection={
          <div className='flex flex-wrap gap-x-3 gap-2'>
            <Button>Button</Button>
            <Button variant='black'>Action</Button>
            <Button variant='destructive'>Delete</Button>
          </div>
        }
      />

      {isCategorySuccess ? (
        <div className='flex flex-wrap gap-x-3'>
          {categoriesData?.categories?.map(cat => (
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
    </div>
  )
}
