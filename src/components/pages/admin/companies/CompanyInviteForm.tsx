'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useSendCompanyInvitationMutation } from '@/redux/features/companiesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  name?: string
  email: string
  company_id: string
}

export default function CompanyInviteForm() {
  const push = usePush()

  const methods = useForm<FormData>()
  const { handleSubmit, setValue } = methods

  const params = useSearchParams()
  const company_id = params.has('companyId') && params.get('companyId')

  const [showEmailCheck, setshowEmailCheck] = useState<boolean>(false)

  useEffect(() => {
    if (company_id) setValue('company_id', company_id)
  }, [setValue, company_id])

  const [sendInvitation, { isLoading, isSuccess, isError, error }] = useSendCompanyInvitationMutation()

  const onSubmit = (data: FormData) => {
    sendInvitation(data)
  }

  useEffect(() => {
    if (isSuccess) {
      setshowEmailCheck(true)
      toast.success('Invitation sent successfully')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push])

  return showEmailCheck ? (
    <div className='flex items-center justify-center min-h-screen'>
      <FormWrapper>
        <Typography variant='h3'>Check your email</Typography>
      </FormWrapper>
    </div>
  ) : (
    <FormWrapper>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DashboardHeading title='User information' variant='h4' />
        <div className='max-w-md'>
          <Input name='name' label='Name' placeholder='Enter name' />
          <Input name='email' label='Email' type='email' placeholder='Enter email' required />
          <Button variant='gradient' icon={<Send />} type='submit' isLoading={isLoading}>
            Send Invitation
          </Button>
        </div>
      </Form>
    </FormWrapper>
  )
}
