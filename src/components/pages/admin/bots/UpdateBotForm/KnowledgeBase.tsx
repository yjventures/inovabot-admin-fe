'use client'

import FileCard, { IFile } from '@/components/reusable/cards/file-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { useParams } from 'next/navigation'
import React from 'react'

export const dummyFilesData: IFile[] = [
  {
    _id: '1',
    name: 'file1.pdf',
    size: '100KB',
    url: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg'
  },
  {
    _id: '2',
    name: 'file2.pdf',
    size: '100KB',
    url: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg'
  },
  {
    _id: '3',
    name: 'file3.pdf',
    size: '100KB',
    url: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg'
  },
  {
    _id: '4',
    name: 'file4.pdf',
    size: '100KB',
    url: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg'
  }
]

export default function KnowledgeBase({ companyId }: { companyId: string }) {
  const { id } = useParams()
  return (
    <FormWrapper>
      <DashboardHeading
        title='Knowledge Base'
        variant='h4'
        extra={
          <LLink href={`/admin/bots/update/${id}/knowledge-base`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />

      <div className='flex gap-x-5 gap-y-3 justify-between'>
        <DnDMultiUpload
          bot_id={id as string}
          accept='.pdf,.doc,.docx,.txt,.md'
          containerClassName='max-w-md w-2/5'
          companyId={companyId}
        />

        <div className='grid grid-cols-2 gap-3 w-3/5'>
          {dummyFilesData.map(file => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
