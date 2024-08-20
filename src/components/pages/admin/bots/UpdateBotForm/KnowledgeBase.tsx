'use client'

import FileCard from '@/components/reusable/cards/file-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { useParams } from 'next/navigation'
import React from 'react'

export const dummyFilesData = [
  { id: 1, name: 'file1.pdf', fileUrl: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg' },
  { id: 2, name: 'file2.pdf', fileUrl: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg' },
  { id: 3, name: 'file3.pdf', fileUrl: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg' },
  { id: 4, name: 'file4.pdf', fileUrl: 'https://www.mypunepulse.com/wp-content/uploads/2024/08/chota-bheem.jpeg' }
]

export default function KnowledgeBase() {
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
        <DnDMultiUpload bot_id={id as string} accept='.pdf,.doc,.docx,.txt,.md' containerClassName='max-w-md w-2/5' />

        <div className='grid grid-cols-2 gap-3 w-3/5'>
          {dummyFilesData.map(file => (
            <FileCard key={file.id} filename={file.name} fileUrl={file.fileUrl} />
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
