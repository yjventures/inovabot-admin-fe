'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import usePush from '@/hooks/usePush'
import { useCreateBotMutation } from '@/redux/features/botsApi'
import { IBot } from '@/types/IBot'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import ChatPreview from '../common/ChatPreview'
import Advanced from './Advanced'
import Appearance from './Appearance'
import General from './General'
import LLMSettings from './LLMSettings'

export default function CreateCompanyBotForm() {
  const push = usePush()
  const methods = useForm<IBot>()
  const { handleSubmit, reset } = methods

  const [category, setcategory] = useState<string | undefined>(undefined)
  const [language, setlanguage] = useState<'en' | 'ar'>('en')

  const [createBot, { isLoading, isSuccess, isError, error, data }] = useCreateBotMutation()

  const onSubmit = (data: IBot) => {
    if (!category) return toast.error('Please select a category!')
    createBot({ ...data, category })
  }

  const discardChanges = () => {
    reset()
    push('/company/bots')
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot created successfully')
      push(`/company/bots/update/${data?.bot?._id}?from=creation`)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive' onClick={discardChanges}>
              Discard
            </Button>
            <Button variant='gradient' icon={<ArrowRight />} iconPosition='right' type='submit' isLoading={isLoading}>
              Proceed to Knowledgebase
            </Button>
          </>
        }
      />

      <div className='flex flex-col md:flex-row gap-x-5 relative gap-y-10'>
        <FormWrapper className='w-full md:w-1/2 order-2 md:order-1'>
          <General category={category} setcategory={setcategory} />
          <Appearance />
          <LLMSettings />
          <Advanced language={language} setlanguage={setlanguage} />
        </FormWrapper>
        <div className='w-full md:w-1/2 relative md:sticky right-0 top-0 md:top-20 scroll-pt-24 h-auto md:h-screen order-1 md:order-2 overflow-y-auto'>
          <ChatPreview />
        </div>
      </div>
    </Form>
  )
}
