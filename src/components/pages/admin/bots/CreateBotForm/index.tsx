'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown, PlusSquare } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Form from '@/components/reusable/form/form'
import { IBot } from '@/types/IBot'
import Appearance from './Appearance'
import LLMSettings from './LLMSettings'
import Advanced from './Advanced'
import ChatPreview from '../common/ChatPreview'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { useGetComanyListQuery } from '@/redux/features/companiesApi'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useCreateBotMutation } from '@/redux/features/botsApi'
import toast from 'react-hot-toast'
import usePush from '@/hooks/usePush'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import General from './General'
import { useSearchParams } from 'next/navigation'

export default function CreateBotForm() {
  const push = usePush()
  const params = useSearchParams()

  const [company_id, setcompany_id] = useState('')
  const methods = useForm<IBot>()
  const { handleSubmit } = methods

  useEffect(() => {
    if (params.has('companyId')) setcompany_id(params.get('companyId') as string)
  }, [params])

  const [category, setcategory] = useState<string | undefined>(undefined)

  const [createBot, { isLoading, isSuccess, isError, error }] = useCreateBotMutation()

  const onSubmit = (data: IBot) => {
    if (!company_id) return toast.error('Please select a company!')
    if (!category) return toast.error('Please select a category!')
    createBot({ ...data, company_id, category })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Bot created successfully')
      push('/admin/bots')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push])

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <DashboardHeading
        title='Add an Assistant'
        extra={
          <>
            <Button variant='destructive'>Discard</Button>
            <Button variant='gradient' icon={<PlusSquare />} type='submit' isLoading={isLoading}>
              Publish Agent
            </Button>
          </>
        }
      />

      <div className='flex gap-x-5'>
        <FormWrapper className='w-1/2'>
          <General
            company_id={company_id}
            setcompany_id={setcompany_id}
            category={category}
            setcategory={setcategory}
          />
          <Appearance />
          <LLMSettings />
          <Advanced />
        </FormWrapper>
        <div className='w-1/2'>
          <ChatPreview />
        </div>
      </div>
    </Form>
  )
}
