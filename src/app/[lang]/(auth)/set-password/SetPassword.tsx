'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { useResetPasswordMutation } from '@/redux/features/authApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { ChevronRight } from 'lucide-react'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SetPassword() {
  const push = usePush()
  const methods = useForm()
  const params = useSearchParams()
  const id = params.has('id') && params.get('id')

  const [checkPassword, { isLoading, isSuccess, isError, error }] = useResetPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully')
      redirect('http://localhost:3001/en/login')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push])

  const { handleSubmit } = methods
  const onSubmit = (data: any) => checkPassword({ id, ...data })
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
        <Typography variant='h3'>Enter New Password</Typography>
        <Input name='password' label='New Password' placeholder='********' required type='password' />
        <Button type='submit' variant='gradient' icon={<ChevronRight />} iconPosition='right' isLoading={isLoading}>
          Proceed
        </Button>
      </Form>
    </div>
  )
}
