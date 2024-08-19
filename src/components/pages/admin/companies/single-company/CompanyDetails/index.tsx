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
  const { email, logo, logo_dark, name, web_url, address, description } = { ...data?.compnay }
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
        name='Company Name'
        payment_status='paid'
        createdAt='2024-06-12T00:00:00.000Z'
        expires_at='2024-06-12T00:00:00.000Z'
        description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, exercitationem nostrum. Voluptate architecto vel perspiciatis cum, natus eum, dicta accusantium voluptas saepe mollitia delectus soluta hic impedit repellat veritatis at et! Iusto modi soluta reprehenderit inventore fugiat assumenda officia veritatis?'
        address='Dhaka, Bangladesh'
        web_url='https://www.company.com'
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
