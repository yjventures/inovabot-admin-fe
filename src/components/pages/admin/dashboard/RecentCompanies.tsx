'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import CompanyCardSkeletons from '@/components/reusable/cards/Skeletons/company-card-skeletons'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { useGetCompaniesQuery } from '@/redux/features/companiesApi'
import { WithId } from '@/types/common/IResponse'
import { ICompany } from '@/types/ICompany'
import { PlusSquare } from 'lucide-react'

export default function RecentCompanies() {
  const { data, isLoading, isSuccess } = useGetCompaniesQuery(initParams({ limit: 5 }))

  return (
    <div className='mt-8'>
      <DashboardHeading
        variant='h3'
        title='Recent Companies'
        extra={
          <>
            <LLink href={`${getDashboardURLPath()}/companies`}>
              <Button variant='outline'>View All</Button>
            </LLink>
            <LLink href={`${getDashboardURLPath()}/companies/create`}>
              <Button variant='gradient' icon={<PlusSquare />}>
                Add New
              </Button>
            </LLink>
          </>
        }
      />

      <CompanyCardSkeletons isLoading={isLoading} className='mt-5' limit={5} />

      {isSuccess ? (
        data?.data?.length ? (
          <CardGrid>
            {data?.data?.map((company: WithId<ICompany>) => (
              <CompanyCard
                key={company._id}
                company={company}
                from={['super-admin', 'admin'].includes(getUserRole()) ? 'admin' : 'reseller'}
              />
            ))}
          </CardGrid>
        ) : (
          <p className='italic text-lg mt-5 text-text-secondary'>No companies created yet</p>
        )
      ) : null}
    </div>
  )
}
