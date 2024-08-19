'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ChatPreview from './ChatPreview'
import Form from '@/components/reusable/form/form'
import { IBot } from '@/types/IBot'
import Appearance from './Appearance'

export default function CreateBotForm() {
  const methods = useForm<IBot>()
  const { handleSubmit } = methods

  const onSubmit = (data: IBot) => {
    console.log(data)
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive'>Discard</Button>
            <Button variant='gradient' icon={<PlusSquare />} type='submit'>
              Publish Agent
            </Button>
          </>
        }
      />

      <div className='flex gap-x-5'>
        <div className='w-1/2 bg-foreground rounded-xl p-4'>
          <Appearance />
        </div>
        <div className='w-1/2'>
          <ChatPreview />
        </div>
      </div>
    </Form>
  )
}
