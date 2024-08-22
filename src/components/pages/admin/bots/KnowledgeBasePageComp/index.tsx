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
import { dummyFilesData } from '../UpdateBotForm/KnowledgeBase'

export default function KnowledgeBasePageComp() {
  const [params, setparams] = useState<IParams>(initParams({}))
  const [searchValue, setsearchValue] = useState<string>('')
  return (
    <div>
      <DashboardHeading
        title='Knowledge Base'
        extra={
          <Button variant='black' icon={<FilePlus />}>
            Add Files
          </Button>
        }
      />

      <Search
        searchValue={searchValue}
        setsearchValue={setsearchValue}
        placeholder='Search Files'
        inputClassName='rounded-lg'
        className='max-w-lg'
      />

      <CardGrid className='mt-6'>
        {dummyFilesData
          .concat(dummyFilesData)
          .concat(dummyFilesData)
          .map(file => (
            <FileCard key={file._id} file={file} variant='vertical' />
          ))}
      </CardGrid>
      <TablePagination
        params={params}
        setparams={setparams}
        metadata={{ totalDocuments: 100, currentPage: 1, totalPage: 10 }}
      />
    </div>
  )
}
