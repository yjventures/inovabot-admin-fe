'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { PlusSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import ChatPreview from './ChatPreview'
import Form from '@/components/reusable/form/form'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import { IBot } from '@/types/IBot'
import { Input } from '@/components/reusable/form/input'
import ColorInput from '@/components/reusable/form/color-input'

export default function CreateBotForm() {
  const methods = useForm<IBot>()
  const { handleSubmit } = methods

  const onSubmit = (data: IBot) => {
    console.log(data)
  }

  return (
    <div>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive'>Discard</Button>
            <Button variant='gradient' icon={<PlusSquare />}>
              Publish Agent
            </Button>
          </>
        }
      />

      <div className='flex gap-x-5'>
        <div className='w-1/2'>
          <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='bg-foreground rounded-xl p-4'>
            <SingleAccordion value='appearance' label='Appearance'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <DnDUpload name='logo' text='Light Mode Logo*' required />
                <DnDUpload name='logo_dark' text='Dark Mode Logo' />
              </div>
              <Input name='name' label='Assistant Name' placeholder='Assistant name here...' required />

              <div className='flex gap-x-3'>
                <ColorInput name='primary_color' label='Primary Color' required defaultValue='#3256ff' />
                <ColorInput name='secondary_color' label='Secondary Color' required defaultValue='#FFFFFF' />
                <ColorInput name='font_color' label='Font Color' required defaultValue='#000000' />
              </div>
            </SingleAccordion>
          </Form>
        </div>
        <div className='w-1/2'>
          <ChatPreview />
        </div>
      </div>
    </div>
  )
}
