'use client'

import BotsImagesComp from '@/components/pages/admin/bots/BotImages/BotsImagesComp'
import ChatPreview from '@/components/pages/admin/bots/common/ChatPreview'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import usePush from '@/hooks/usePush'
import { useGetBotQuery, useUpdateBotMutation } from '@/redux/features/botsApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PencilLine } from 'lucide-react'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { scroller } from 'react-scroll'
import BotLinks from './BotLinks'
import EmbeddedWidgets from './EmbeddedWidgets'
import FAQ from './FAQ'
import KnowledgeBase from './KnowledgeBase'
import UpdateAdvanced from './UpdateAdvanced'
import UpdateAppearance from './UpdateApprearance'
import UpdateLLMSettings from './UpdateLLMSettings'

export default function UpdateBotForm({ updateFrom = 'admin' }: { updateFrom?: 'admin' | 'reseller' }) {
  const params = useSearchParams()
  const from = params.get('from')
  const push = usePush()
  const { id } = useParams()

  const [language, setlanguage] = useState<'en' | 'ar'>('en')

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
      setlanguage(data?.data?.language)
    }
  }, [data, isSuccess, reset])

  const discardChanges = () => {
    reset()
    push(`/${updateFrom}/bots`)
  }

  const [updateBot, { isSuccess: isBotUdpateSuccess, isLoading, isError, error }] = useUpdateBotMutation()

  const onSubmit = (data: any) => {
    updateBot({ id: id as string, body: data })
  }

  useEffect(() => {
    if (isBotUdpateSuccess) {
      toast.success('Bot updated successfully!')
      push(`/${updateFrom}/bots`)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isBotUdpateSuccess, isError, error, push, updateFrom])

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

      <div className='flex flex-col md:flex-row gap-x-5 relative gap-y-10'>
        <FormWrapper className='w-full md:w-1/2 order-2 md:order-1'>
          <UpdateAppearance />
          <UpdateLLMSettings />
          <UpdateAdvanced language={language} setlanguage={setlanguage} />
        </FormWrapper>
        <div className='w-full md:w-1/2 relative md:sticky right-0 top-0 md:top-20 scroll-pt-24 h-auto md:h-screen order-1 md:order-2 overflow-y-auto'>
          <ChatPreview />
        </div>
      </div>

      <div className='space-y-6 mt-6'>
        <KnowledgeBase companyId={data?.data?.company_id!} id='knowledgeBase' from={updateFrom} />
        <FAQ companyId={data?.data?.company_id!} from={updateFrom} />
        <BotLinks from={updateFrom} />
        <BotsImagesComp from={updateFrom} />
        <EmbeddedWidgets />
      </div>
    </Form>
  )
}
