'use client'

import Form from '@/components/reusable/form/form'
import { Input } from '@/components/reusable/form/input'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { LANDING_URL } from '@/configs'
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

  const [checkPassword, { isLoading, isSuccess, isError, error, data }] = useResetPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Password updated successfully')
      if (data?.user?.type === 'reseller') push('/login')
      else redirect(`${LANDING_URL}/login`)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  const { handleSubmit, watch } = methods

  const passwordVal = watch('password')
  const onSubmit = (data: any) => {
    if (data.password !== data.repeatPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (data.password.length < 8) {
      toast.error('Password should be at least 8 characters long!')
      return
    }
    checkPassword({ id, password: data.password })
  }
  return (
    <div className='flex items-center justify-center min-h-screen w-full max-w-md'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md'>
        <Typography variant='h3' className='mb-3'>
          Enter New Password
        </Typography>
        <Input name='password' label='New Password' placeholder='********' required type='password' />
        {passwordVal?.length && passwordVal?.length < 8 ? (
          <p className='text-sm font-medium text-destructive'>Password should be at least 8 characters long!</p>
        ) : null}
        <Input name='repeatPassword' label='Repeat Password' placeholder='********' required type='password' />
        <Button type='submit' variant='gradient' icon={<ChevronRight />} iconPosition='right' isLoading={isLoading}>
          Proceed
        </Button>
      </Form>
    </div>
  )
}
