'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useGetBotQuery, useUpdateBotMutation } from '@/redux/features/botsApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { scroller } from 'react-scroll'
import ChatPreview from '../common/ChatPreview'
import BotLinks from './BotLinks'
import EmbeddedWidgets from './EmbeddedWidgets'
import FAQ from './FAQ'
import KnowledgeBase from './KnowledgeBase'
import UpdateAdvanced from './UpdateAdvanced'
import UpdateAppearance from './UpdateApprearance'
import UpdateLLMSettings from './UpdateLLMSettings'

export default function UpdateBotForm() {
  const params = useSearchParams()
  const from = params.get('from')
  const push = usePush()
  const { id } = useParams()
  const { data, isSuccess } = useGetBotQuery(id as string)
  const methods = useForm()
  const { handleSubmit, reset } = methods

  useEffect(() => {
    if (from && from === 'creation') {
      scroller.scrollTo('knowledgeBase', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -100
      })
    }
  }, [from])

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
        <KnowledgeBase companyId={data?.data?.company_id!} id='knowledgeBase' />
        <FAQ companyId={data?.data?.company_id!} />
        <BotLinks />

        <div className='flex justify-between gap-6'>
          <div className='space-y-6 w-1/2'>
            <FormWrapper>
              <UpdateAppearance />
            </FormWrapper>
            <FormWrapper>
              <UpdateLLMSettings />
            </FormWrapper>
          </div>
          <FormWrapper className='w-1/2'>
            <UpdateAdvanced />
          </FormWrapper>
        </div>
        <EmbeddedWidgets />
      </div>
    </Form>
  )
}
