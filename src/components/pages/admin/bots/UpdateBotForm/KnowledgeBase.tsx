'use client'

import FileCard from '@/components/reusable/cards/file-card'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { initParams } from '@/constants/form/init-params'
import { useGetAllBotFilesQuery } from '@/redux/features/knowledgeBaseApi'
import { useParams } from 'next/navigation'
import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
  companyId: string
}

export default function KnowledgeBase({ companyId, ...rest }: Props) {
  const { id } = useParams()
  const { data } = useGetAllBotFilesQuery({ ...initParams({ limit: 4 }), bot_id: id as string })
  return (
    <FormWrapper {...rest}>
      <DashboardHeading
        title='Knowledge Base'
        variant='h5'
        extra={
          <LLink href={`/admin/bots/update/${id}/knowledge-base`}>
            <Button variant='black'>View All</Button>
          </LLink>
        }
      />

      <div className='flex gap-x-5 flex-col md:flex-row gap-y-3 justify-between'>
        <DnDMultiUpload
          bot_id={id as string}
          accept='.pdf,.doc,.docx,.txt,.md'
          containerClassName='max-w-full md:max-w-md w-full md:w-2/5'
          companyId={companyId}
        />

        <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-3 w-full md:w-3/5 items-start'>
          {data?.data?.map(file => (
            <FileCard key={file._id} file={file} />
          ))}
        </div>
      </div>
    </FormWrapper>
  )
}
