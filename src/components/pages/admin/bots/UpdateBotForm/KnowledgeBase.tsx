'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import React from 'react'

export default function KnowledgeBase() {
  const { id } = useParams()
  return (
    <FormWrapper>
      <DashboardHeading title='Knowledge Base' variant='h4' extra={<Button variant='black'>View All</Button>} />

      <div className='flex gap-x-5 gap-y-3'>
        <DnDMultiUpload bot_id={id as string} accept='.pdf,.doc,.docx,.txt,.md' containerClassName='max-w-md' />
      </div>
    </FormWrapper>
  )
}
