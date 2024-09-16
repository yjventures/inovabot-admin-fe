'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import usePush from '@/hooks/usePush'
import { useCreateTemplateMutation } from '@/redux/features/templatesApi'
import { ITemplate } from '@/types/Itemplate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TemplateAdvanced from './TemplateAdvances'
import TemplateAppearance from './TemplateAppearance'
import TemplateLLMSettings from './TemplateLLMSettings'

export default function CreateTemplateForm() {
  const methods = useForm()
  const push = usePush()
  const { handleSubmit } = methods
  const [category, setcategory] = useState<string>('')
  const [language, setlanguage] = useState<'en' | 'ar'>('en')

  const [createTemplate, { isLoading, isSuccess, isError, error, data }] = useCreateTemplateMutation()

  const onSubmit = (data: ITemplate) => {
    if (!category) return toast.error('Please select a category!')
    createTemplate({ ...data, category, language })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Template created successfully')
      push('/admin/templates')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  return (
    <div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DashboardHeading
          title='Create Template'
          extra={
            <Button variant='gradient' icon={<PlusSquare />} type='submit' isLoading={isLoading}>
              Create Template
            </Button>
          }
        />
        <div className='flex flex-col md:flex-row gap-x-5 gap-y-10'>
          <FormWrapper className='w-full md:w-1/2'>
            <TemplateAppearance category={category} setcategory={setcategory} />
            <TemplateLLMSettings />
          </FormWrapper>
          <FormWrapper className='w-full md:w-1/2'>
            <TemplateAdvanced language={language} setlanguage={setlanguage} />
          </FormWrapper>
        </div>
      </Form>
    </div>
  )
}
