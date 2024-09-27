'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import TemplateCardSkeletons from '@/components/reusable/cards/Skeletons/Template-card-skeletons'
import TemplateCard from '@/components/reusable/cards/template-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { useGetTemplatesQuery } from '@/redux/features/templatesApi'
import { WithId } from '@/types/common/IResponse'
import { ITemplate } from '@/types/Itemplate'
import { PlusSquare } from 'lucide-react'

export default function RecentTemplates() {
  const { data, isLoading, isSuccess } = useGetTemplatesQuery(initParams({ limit: 5 }))
  return (
    <div className='mt-8'>
      <DashboardHeading
        variant='h3'
        title='Quick Start Templates'
        extra={
          <>
            <LLink href={`${getDashboardURLPath()}/templates`}>
              <Button variant='outline'>View All</Button>
            </LLink>
            {['super-admin', 'admin'].includes(getUserRole()) && (
              <LLink href={`${getDashboardURLPath()}/templates/create`}>
                <Button variant='gradient' icon={<PlusSquare />}>
                  Add New
                </Button>
              </LLink>
            )}
          </>
        }
      />

      <TemplateCardSkeletons isLoading={isLoading} limit={5} className='mt-5' />

      {isSuccess ? (
        data?.data?.length ? (
          <CardGrid total={3} className='mt-5'>
            {data?.data?.map((template: WithId<ITemplate>) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </CardGrid>
        ) : (
          <p className='italic text-lg mt-5 text-text-secondary'>No tempates created yet</p>
        )
      ) : null}
    </div>
  )
}
