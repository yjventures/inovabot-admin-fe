'use client'

import { useForm } from 'react-hook-form'
import ChatPreview from '../common/ChatPreview'
import Form from '@/components/reusable/form/form'
import { useParams } from 'next/navigation'
import { useGetBotQuery } from '@/redux/features/botsApi'
import { useEffect } from 'react'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { PencilLine } from 'lucide-react'
import usePush from '@/hooks/usePush'
import Typography from '@/components/ui/typography'
import KnowledgeBase from './KnowledgeBase'
import FAQ from './FAQ'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import Appearance from '../CreateBotForm/Appearance'
import LLMSettings from '../CreateBotForm/LLMSettings'
import Advanced from '../CreateBotForm/Advanced'
import EmbeddedWidgets from './EmbeddedWidgets'

export default function UpdateBotForm() {
  const push = usePush()
  const { id } = useParams()
  const { data, isSuccess } = useGetBotQuery(id as string)
  console.log(data?.data)
  const methods = useForm()
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (isSuccess) {
      reset(data?.data)
    }
  }, [data, isSuccess, reset])

  const discardChanges = () => {
    reset()
    push('/admin/bots')
  }

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Update Assistant'
        extra={
          <>
            <Button variant='destructive' onClick={discardChanges}>
              Discard
            </Button>
            <Button variant='gradient' icon={<PencilLine />} type='submit'>
              Update Agent
            </Button>
          </>
        }
      />

      <Typography variant='h4' className='mb-4'>
        Chatbot Preview
      </Typography>

      <div className='space-y-6'>
        <ChatPreview />
        <KnowledgeBase />
        <FAQ />

        <div className='flex justify-between gap-6'>
          <div className='space-y-6 w-1/2'>
            <FormWrapper>
              <Appearance />
            </FormWrapper>
            <FormWrapper>
              <LLMSettings />
            </FormWrapper>
          </div>
          <FormWrapper className='w-1/2'>
            <Advanced />
          </FormWrapper>
        </div>
        <EmbeddedWidgets />
      </div>
    </Form>
  )
}
