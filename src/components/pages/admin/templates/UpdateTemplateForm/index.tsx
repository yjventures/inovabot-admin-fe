'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Button } from '@/components/ui/button'
import usePush from '@/hooks/usePush'
import { useGetTemplateQuery, useUpdateTemplateMutation } from '@/redux/features/templatesApi'
import { ITemplate } from '@/types/Itemplate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import TemplateAdvanced from './TemplateAdvances'
import TemplateAppearance from './TemplateAppearance'
import TemplateLLMSettings from './TemplateLLMSettings'

export default function UpdateTemplateForm() {
  const { id } = useParams()
  const methods = useForm()
  const push = usePush()
  const { handleSubmit, reset } = methods

  const [category, setcategory] = useState<string>('')
  const [language, setlanguage] = useState<'en' | 'ar'>('en')

  const { data, isSuccess: isGetSuccess } = useGetTemplateQuery(id as string)

  useEffect(() => {
    if (isGetSuccess) {
      reset(data.template)
      setcategory(data.template.category)
      setlanguage(data.template.language)
    }
  }, [isGetSuccess, reset, data])

  const [updateTemplate, { isLoading, isSuccess, isError, error }] = useUpdateTemplateMutation()

  const onSubmit = (data: ITemplate) => {
    if (!category) return toast.error('Please select a category!')
    updateTemplate({ id: id as string, body: { ...data, category, language } })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Template updated successfully')
      push('/admin/templates')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  return (
    <div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DashboardHeading
          title='Update Template'
          extra={
            <Button variant='gradient' icon={<PlusSquare />} type='submit' isLoading={isLoading}>
              Update Template
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
