'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Form from '@/components/reusable/form/form'
import FormWrapper from '@/components/reusable/form/form-wrapper'
import { Input } from '@/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/reusable/form/select'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useSendCompanyInvitationMutation } from '@/redux/features/companiesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { MailCheck, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface FormData {
  name?: string
  email: string
  role: 'editor' | 'viewer'
}

export default function InviteTeamForm() {
  const push = usePush()

  const methods = useForm<FormData>()
  const { handleSubmit } = methods

  const [showEmailCheck, setshowEmailCheck] = useState<boolean>(false)

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
    <div className='flex items-center justify-center min-h-[70vh]'>
      <FormWrapper className='max-w-md flex flex-col justify-center items-center text-center text-balance gap-y-3'>
        <MailCheck size={72} strokeWidth={0.8} className='text-emerald-primary' />
        <Typography variant='h4'>Check your email</Typography>
        <p className='text-text-gray'>
          We&apos;ve send you an email with the verification link, please open it and click on the link and signup with
          the temporary password
        </p>
      </FormWrapper>
    </div>
  ) : (
    <FormWrapper>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DashboardHeading title='User information' variant='h4' />
        <div className='max-w-md'>
          <Input name='name' label='Name' placeholder='Enter name' />
          <Input name='email' label='Email' type='email' placeholder='Enter email' required />
          <Select name='role' label='Role' required>
            <SelectTrigger className='max-w-sm'>
              <SelectValue placeholder='Select a role' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='editor'>Viewer</SelectItem>
              <SelectItem value='viewer'>Editor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='gradient' icon={<Send />} type='submit' isLoading={isLoading}>
            Send Invitation
          </Button>
        </div>
      </Form>
    </FormWrapper>
  )
}
