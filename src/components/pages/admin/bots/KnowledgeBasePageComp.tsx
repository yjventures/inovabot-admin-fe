'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Search from '@/components/reusable/tables/search'
import { Button } from '@/components/ui/button'
import { FilePlus } from 'lucide-react'
import React, { useState } from 'react'
import FileCard from '@/components/reusable/cards/file-card'
import { initParams } from '@/constants/form/init-params'
import { IParams } from '@/types/common/IParams'
import TablePagination from '@/components/reusable/tables/table-pagination'
import { useParams } from 'next/navigation'
import { useGetAllBotFilesQuery } from '@/redux/features/knowledgeBaseApi'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import BotFileUploadModal from './BotFileUploadModal'

export default function KnowledgeBasePageComp() {
  const [params, setparams] = useState<IParams>(initParams({}))
  const [searchValue, setsearchValue] = useState<string>('')

  const { id } = useParams()
  const { data } = useGetAllBotFilesQuery({ botId: id as string, params: { ...params, search: searchValue } })

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
      <TablePagination params={params} setparams={setparams} metadata={data?.metadata!} />
    </div>
  )
}
