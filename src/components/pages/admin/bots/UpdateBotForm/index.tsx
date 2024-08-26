'use client'

import { useForm } from 'react-hook-form'
import ChatPreview from '../common/ChatPreview'
import Form from '@/components/reusable/form/form'
import { useParams } from 'next/navigation'
import { useGetBotQuery, useUpdateBotMutation } from '@/redux/features/botsApi'
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
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

export default function UpdateBotForm() {
  const push = usePush()
  const { id } = useParams()
  const { data, isSuccess } = useGetBotQuery(id as string)
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

  const [updateBot, { isSuccess: isBotUdpateSuccess, isLoading, isError, error }] = useUpdateBotMutation()

  const onSubmit = (data: any) => {
    updateBot({ id: id as string, body: data })
  }

  useEffect(() => {
    if (isBotUdpateSuccess) {
      toast.success('Bot updated successfully!')
      push('/admin/bots')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isBotUdpateSuccess, isError, error, push])

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Update Assistant'
        extra={
          <>
            <Button variant='destructive' onClick={discardChanges}>
              Discard
            </Button>
            <Button variant='gradient' icon={<PencilLine />} type='submit' isLoading={isLoading}>
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
        <KnowledgeBase companyId={data?.data?.company_id!} />
        <FAQ companyId={data?.data?.company_id!} />

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
