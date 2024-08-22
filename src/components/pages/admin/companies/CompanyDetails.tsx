'use client'

import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import { Button } from '@/components/ui/button'
import { useGetCompanyQuery } from '@/redux/features/companiesApi'
import { useParams } from 'next/navigation'

export default function CompanyDetails() {
  const { id } = useParams()
  const { data } = useGetCompanyQuery(id as string)
  const { email, logo, logo_dark, name, web_url, address, description, createdAt, expires_at } = { ...data?.data }
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
    </div>
  )
}
