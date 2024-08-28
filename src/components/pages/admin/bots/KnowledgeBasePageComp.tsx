'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Search from '@/components/reusable/tables/search'
import React, { Dispatch, SetStateAction, useState } from 'react'
import FileCard from '@/components/reusable/cards/file-card'
import { initParams } from '@/constants/form/init-params'
import { IParams } from '@/types/common/IParams'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { useParams } from 'next/navigation'
import { useGetAllBotFilesQuery } from '@/redux/features/knowledgeBaseApi'
import BotFileUploadModal from './BotFileUploadModal'

export default function KnowledgeBasePageComp() {
  const { id } = useParams()
  const [searchValue, setsearchValue] = useState<string>('')
  type Params = IParams & { bot_id: string }
  const [params, setparams] = useState<Params>({
    ...initParams({ limit: 2 }),
    bot_id: id as string,
    search: searchValue
  })

  const { data } = useGetAllBotFilesQuery(params)

  return (
    <div>
      <DashboardHeading title='Knowledge Base' extra={<BotFileUploadModal botId={id as string} />} />

      <Search
        searchValue={searchValue}
        setsearchValue={setsearchValue}
        placeholder='Search Files'
        inputClassName='rounded-lg'
        className='max-w-lg'
      />

      <CardGrid className='mt-6'>
        {data?.data?.map(file => (
          <FileCard key={file._id} file={file} variant='vertical' />
        ))}
      </CardGrid>
      <TablePagination
        params={params}
        setparams={setparams as Dispatch<SetStateAction<IParams>>}
        metadata={data?.metadata!}
      />
    </div>
  )
}
