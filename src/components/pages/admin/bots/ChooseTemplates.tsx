'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import TemplateCardSkeletons from '@/components/reusable/cards/Skeletons/Template-card-skeletons'
import TemplateCard from '@/components/reusable/cards/template-card'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { initParams } from '@/constants/form/init-params'
import usePush from '@/hooks/usePush'
import { useGetTemplatesQuery } from '@/redux/features/templatesApi'
import { IParams } from '@/types/common/IParams'
import { WithId } from '@/types/common/IResponse'
import { ITemplate } from '@/types/Itemplate'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ChooseTemplates({ from }: { from: 'admin' | 'company' | 'reseller' }) {
  const searchParams = useSearchParams()
  const [params, setparams] = useState<IParams>(initParams({}))
  const push = usePush()
  const { data, isLoading, isSuccess } = useGetTemplatesQuery(params)
  return (
    <div>
      <TemplateCardSkeletons isLoading={isLoading} />
      {isSuccess && data?.data?.length ? (
        <CardGrid total={3}>
          {data?.data?.map((template: WithId<ITemplate>) => (
            <TemplateCard
              key={template._id}
              template={template}
              hidePopover
              className='cursor-pointer hover:shadow-lg transition-all duration-300'
              onClick={() =>
                push(`/${from}/bots/create?template=${template._id}&companyId=${searchParams.get('companyId')}`)
              }
            />
          ))}
        </CardGrid>
      ) : null}
      <TablePagination params={params} setparams={setparams} metadata={data?.metadata!} />
    </div>
  )
}
